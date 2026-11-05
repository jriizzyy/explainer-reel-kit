"""Generic narration: spec LINES -> build/<vid>/voice.wav + timing.json

usage: python3 -m engine.narrate vNN
Text markup inside a line:
  {cap|spoken}  caption shows `cap`, voice says `spoken`
  ||            extra pause after this point (end of a sentence)
"""
import json, re, sys, os, importlib, difflib
import numpy as np
import soundfile as sf

VOICE = os.environ.get("REEL_VOICE", "af_heart")
SPEED = float(os.environ.get("REEL_SPEED", "1.08"))
GAP_SENT = 0.16
GAP_LINE = 0.36
PAUSE = 0.55
LEAD = 0.30

_k = None
_w = None

def models():
    global _k, _w
    if _k is None:
        from kokoro_onnx import Kokoro
        from faster_whisper import WhisperModel
        M = os.environ.get("REEL_MODELS", os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models"))
        _k = Kokoro(os.path.join(M, "kokoro.onnx"), os.path.join(M, "voices.bin"))
        _w = WhisperModel("small.en", device="cpu", compute_type="int8")
    return _k, _w


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())


def clean_caption(c):
    c = c.strip()
    c = re.sub(r"^[\"'“”‘’(\[*_]+", "", c)
    c = re.sub(r"[\"'“”‘’)\]*_,.;:!…]+$", "", c)
    c = c.replace("…", "")
    return c


def prep(text):
    text = text.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    text = re.sub(r"\s*[—–]\s*", ", ", text)
    text = text.replace("**", "").replace("*", "")
    text = re.sub(r"[\U0001F300-\U0001FAFF☀-➿]", "", text)
    text = re.sub(r",\s*,", ",", text)
    return text.strip()


def tokens(text):
    out = []
    for m in re.finditer(r"\{([^|}]+)\|([^}]+)\}|(\S+)", text):
        if m.group(3):
            tok = m.group(3)
            if not re.search(r"[A-Za-z0-9$%]", tok):
                continue
            out.append((clean_caption(tok), tok.replace('"', "")))
        else:
            out.append((clean_caption(m.group(1)), m.group(2)))
    return out


def sentences(text):
    # split keeping {..|..} groups intact; pause markers produce extra gap
    parts = re.split(r"(?<=[.!?…])\s+(?=[A-Z\"'0-9{])|\s*\|\|\s*", text)
    marks = [m.group(0) for m in re.finditer(r"(?<=[.!?…])\s+(?=[A-Z\"'0-9{])|\s*\|\|\s*", text)]
    out = []
    for i, p in enumerate(parts):
        if not p or not p.strip():
            continue
        pause = i < len(marks) and "||" in marks[i]
        out.append((p.strip(), pause))
    return out


def synth(text):
    k, _ = models()
    sp = " ".join(s for _, s in tokens(text))
    sp = re.sub(r"\s+([,.!?])", r"\1", sp)
    audio, sr = k.create(sp, voice=VOICE, speed=SPEED, lang="en-us")
    audio = audio.astype(np.float32)
    idx = np.where(np.abs(audio) > 0.01)[0]
    a0 = max(0, idx[0] - int(0.02 * sr)); a1 = min(len(audio), idx[-1] + int(0.07 * sr))
    return audio[a0:a1], sr


def align(audio, sr, text):
    _, wm = models()
    a16 = np.interp(np.arange(0, len(audio), sr / 16000), np.arange(len(audio)), audio).astype(np.float32)
    segs, _ = wm.transcribe(a16, word_timestamps=True, language="en", beam_size=5)
    ww = [w for s in segs for w in s.words]
    toks = tokens(text)
    sp_words = [(ti, w) for ti, (_, s) in enumerate(toks) for w in s.split() if norm(w)]
    A = [norm(w) for _, w in sp_words]
    B = [norm(w.word) for w in ww]
    sm = difflib.SequenceMatcher(a=A, b=B, autojunk=False)
    times = [None] * len(A)
    for a, b, n in sm.get_matching_blocks():
        for j in range(n):
            times[a + j] = (ww[b + j].start, ww[b + j].end)
    dur = len(audio) / sr
    i = 0
    while i < len(times):
        if times[i] is None:
            j = i
            while j < len(times) and times[j] is None:
                j += 1
            s0 = times[i - 1][1] if i > 0 else 0.0
            s1 = times[j][0] if j < len(times) else dur
            if s1 < s0: s1 = s0
            step = (s1 - s0) / (j - i)
            for r in range(i, j):
                times[r] = (s0 + (r - i) * step, s0 + (r - i + 1) * step)
            i = j
        else:
            i += 1
    words = []
    for ti, (cap, _) in enumerate(toks):
        ts = [times[i] for i, (tj, _) in enumerate(sp_words) if tj == ti]
        if not ts:
            continue
        words.append({"w": cap, "s": ts[0][0], "e": ts[-1][1]})
    matched = sum(b.size for b in sm.get_matching_blocks())
    return words, matched, len(A), " ".join(w.word.strip() for w in ww)


def run(vid):
    spec = importlib.import_module(f"videos.{vid}")
    out = f"build/{vid}"
    os.makedirs(out, exist_ok=True)
    sr = 24000
    chunks = [np.zeros(int(LEAD * sr), np.float32)]
    t = LEAD
    lines = []
    allwords = []
    report = []
    for lid, raw in spec.LINES:
        text = prep(raw)
        lstart = t
        lwords = []
        sents = sentences(text)
        for si, (st, pause) in enumerate(sents):
            audio, sr = synth(st)
            words, m, n, heard = align(audio, sr, st)
            for w in words:
                w["s"] = round(w["s"] + t, 3); w["e"] = round(w["e"] + t, 3); w["line"] = lid
            lwords += words
            dur = len(audio) / sr
            chunks.append(audio)
            if m < n:
                report.append(f"  [{lid}] matched {m}/{n}: {heard}")
            gap = GAP_SENT if si < len(sents) - 1 else GAP_LINE
            if pause:
                gap += PAUSE
            chunks.append(np.zeros(int(gap * sr), np.float32))
            t += dur + gap
        lines.append({"id": lid, "start": round(lstart, 3), "end": round(t, 3), "words": lwords})
        allwords += lwords
        print(f"{lid:6s} {t - lstart:6.2f}s", flush=True)
    tail = getattr(spec, "END_HOLD", 3.2)
    chunks.append(np.zeros(int(tail * sr), np.float32))
    full = np.concatenate(chunks)
    sf.write(f"{out}/voice.wav", full, sr)
    total = len(full) / sr
    json.dump({"duration": total, "speech_end": t, "lines": lines, "words": allwords},
              open(f"{out}/timing.json", "w"), indent=0)
    print("total", round(total, 2))
    for r in report:
        print(r)


if __name__ == "__main__":
    for v in sys.argv[1:]:
        run(v)

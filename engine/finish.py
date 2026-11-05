"""Sound bed + whooshes, mix with voice, mux, and make a share copy under the upload limit.
python3 -m engine.finish vNN "Output Name"
"""
import json, sys, os, subprocess, importlib
import numpy as np
import soundfile as sf

SR = 48000
LIMIT_MB = 29.0


def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    from scipy.signal import lfilter
    return lfilter([1 - a], [1, -a], x)


def bed(vid):
    tm = json.load(open(f"build/{vid}/timing.json"))
    sc = json.load(open(f"build/{vid}/scenes.json"))
    spec = importlib.import_module(f"videos.{vid}")
    DUR = tm["duration"]
    N = int(DUR * SR)
    t = np.arange(N) / SR
    rng = np.random.default_rng(3)

    def hz(m): return 440 * 2 ** ((m - 69) / 12)
    prog = getattr(spec, "CHORDS", [[45, 57, 64, 67, 71], [41, 53, 60, 64, 69], [48, 55, 64, 67, 71], [43, 55, 62, 67, 71]])
    bar = 6.5
    pad = np.zeros(N)
    nb = int(DUR / bar) + 2
    for ci in range(nb):
        ch = prog[ci % len(prog)]
        s0 = int(ci * bar * SR); s1 = min(N, int((ci + 1) * bar * SR + 1.5 * SR))
        if s0 >= N:
            break
        seg = (np.arange(s1 - s0)) / SR
        n = s1 - s0
        e = np.ones(n)
        na, nr = min(int(1.6 * SR), n // 2), min(int(1.8 * SR), n // 2)
        e[:na] = np.linspace(0, 1, na) ** 2
        e[-nr:] *= np.linspace(1, 0, nr) ** 2
        acc = np.zeros(n)
        for k, m in enumerate(ch):
            f = hz(m)
            for det in (-0.12, 0.12):
                acc += np.sin(2 * np.pi * f * (1 + det / 100) * seg + k) * (0.9 if k == 0 else 0.45)
        pad[s0:s1] += acc * e
    pad *= 1 + 0.15 * np.sin(2 * np.pi * 0.11 * t)
    pad = pad / np.max(np.abs(pad)) * 0.036
    pad *= np.clip(t / 1.2, 0, 1) * np.clip((DUR - t) / 2.0, 0, 1)

    fx = np.zeros(N)

    def add(sig, at):
        s = int(at * SR)
        if s < 0:
            sig = sig[-s:]; s = 0
        if s >= N:
            return
        e = min(N, s + len(sig)); fx[s:e] += sig[:e - s]

    def whoosh(length=0.42, gain=0.085):
        n = int(length * SR)
        noise = rng.normal(0, 1, n)
        hp = noise - lowpass(noise, 700)
        sw = lowpass(hp, 5000)
        x = np.linspace(0, 1, n)
        return sw * np.sin(np.pi * x ** 0.7) ** 2 * gain

    def thump(gain=0.32):
        n = int(0.6 * SR); x = np.arange(n) / SR
        f = 55 + 60 * np.exp(-x * 18)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-x * 7) * gain

    add(thump(), 0.05)
    for st in sc["starts"][1:]:
        add(whoosh(), st - 0.32)
    mix = pad + fx
    sf.write(f"build/{vid}/bed.wav", np.stack([mix, mix], 1).astype(np.float32), SR)


def run(vid, name):
    bed(vid)
    b = f"build/{vid}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{b}/voice.wav", "-i", f"{b}/bed.wav", "-filter_complex",
                    "[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,"
                    "equalizer=f=180:t=q:w=1:g=-2,equalizer=f=4500:t=q:w=1.2:g=2[v];"
                    "[v][1:a]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[out]",
                    "-map", "[out]", "-ar", "48000", "-c:a", "pcm_s16le", f"{b}/mix.wav"], check=True)
    os.makedirs("out/master", exist_ok=True)
    os.makedirs("out/share", exist_ok=True)
    master = f"out/master/{name}.mp4"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{b}/video.mp4", "-i", f"{b}/mix.wav", "-map", "0:v", "-map", "1:a",
                    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", master], check=True)
    mb = os.path.getsize(master) / 1e6
    share = f"out/share/{name}.mp4"
    if mb <= LIMIT_MB:
        subprocess.run(["cp", master, share], check=True)
    else:
        dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", master]))
        abr = 128
        vbr = int((LIMIT_MB * 8e6 / dur) / 1000 - abr - 40)
        common = ["-c:v", "libx264", "-preset", "slow", "-b:v", f"{vbr}k", "-maxrate", f"{int(vbr * 2)}k", "-bufsize", f"{int(vbr * 3)}k",
                  "-pix_fmt", "yuv420p", "-passlogfile", f"{b}/pass"]
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{b}/video.mp4", *common, "-pass", "1", "-an", "-f", "null", "/dev/null"], check=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{b}/video.mp4", "-i", f"{b}/mix.wav", "-map", "0:v", "-map", "1:a",
                        *common, "-pass", "2", "-c:a", "aac", "-b:a", f"{abr}k", "-shortest", "-movflags", "+faststart", share], check=True)
    print("master", round(mb, 1), "MB  share", round(os.path.getsize(share) / 1e6, 1), "MB")


if __name__ == "__main__":
    run(sys.argv[1], sys.argv[2])

"""Render a web reel.
python3 web/render.py v02 stills 1.0 5.5 ...   -> build/v02w/s_<t>.png and a sheet
python3 web/render.py v02 sheet [step]         -> contact sheet every `step` seconds
python3 web/render.py v02 video [workers]      -> build/v02w/video.mp4
"""
import json, sys, os, subprocess, math
from concurrent.futures import ProcessPoolExecutor
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS = 30


def open_page(p, vid):
    b = p.chromium.launch(args=["--disable-gpu", "--font-render-hinting=none", "--disable-lcd-text"])
    page = b.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
    msgs = []
    page.on("console", lambda m: msgs.append(m.text))
    page.on("pageerror", lambda e: msgs.append("PAGEERROR " + str(e)))
    page.goto(f"file://{ROOT}/web/index.html?vid={vid}")
    page.wait_for_function("typeof window.boot === 'function' && typeof window.setup === 'function'")
    timing = json.load(open(f"{ROOT}/build/{vid}/timing.json"))
    info = page.evaluate("t => boot(t)", timing)
    return b, page, info, timing, msgs


def stills(vid, ts, out_dir):
    from PIL import Image
    with sync_playwright() as p:
        b, page, info, timing, msgs = open_page(p, vid)
        if info["missing"]:
            print("MISSING", info["missing"])
        paths = []
        for t in ts:
            page.evaluate(f"async () => {{ renderAt({t}); await window.__settle(); }}")
            fp = f"{out_dir}/s_{t:.2f}.png"
            page.screenshot(path=fp)
            paths.append(fp)
        for m in msgs:
            if "PAGEERROR" in m or "missing" in m.lower():
                print(m)
        b.close()
    return paths, info


def sheet(paths, out, cols=6, w=270):
    from PIL import Image
    ims = [Image.open(p).resize((w, int(w * 1920 / 1080))) for p in paths]
    rows = math.ceil(len(ims) / cols)
    s = Image.new("RGB", (cols * w, rows * ims[0].height), (0, 0, 0))
    for i, im in enumerate(ims):
        s.paste(im, ((i % cols) * w, (i // cols) * im.height))
    s.save(out)


def _worker(args):
    vid, a, b_, part = args
    out = f"{ROOT}/build/{vid}w/part{part}.mp4"
    with sync_playwright() as p:
        b, page, info, timing, msgs = open_page(p, vid)
        ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "image2pipe", "-c:v", "mjpeg", "-r", str(FPS), "-i", "-",
                               "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-r", str(FPS), out],
                              stdin=subprocess.PIPE)
        for f in range(a, b_):
            page.evaluate(f"async () => {{ renderAt({f / FPS}); await window.__settle(); }}")
            ff.stdin.write(page.screenshot(type="jpeg", quality=93))
            if (f - a) % 300 == 0:
                print(f"part{part} {f - a}/{b_ - a}", flush=True)
        ff.stdin.close(); ff.wait()
        b.close()
    return out


def video(vid, workers=2):
    os.makedirs(f"{ROOT}/build/{vid}w", exist_ok=True)
    timing = json.load(open(f"{ROOT}/build/{vid}/timing.json"))
    n = int(math.ceil(timing["duration"] * FPS))
    step = math.ceil(n / workers)
    jobs = [(vid, i * step, min(n, (i + 1) * step), i) for i in range(workers)]
    with ProcessPoolExecutor(workers) as ex:
        parts = list(ex.map(_worker, jobs))
    lst = f"{ROOT}/build/{vid}w/parts.txt"
    open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", f"{ROOT}/build/{vid}w/video.mp4"], check=True)
    print("video done")


if __name__ == "__main__":
    vid, mode = sys.argv[1], sys.argv[2]
    out_dir = f"{ROOT}/build/{vid}w"
    os.makedirs(out_dir, exist_ok=True)
    if mode == "stills":
        ts = [float(x) for x in sys.argv[3:]]
        paths, info = stills(vid, ts, out_dir)
        sheet(paths, f"{out_dir}/stills.png", cols=min(6, len(paths)), w=360)
        print(info["scenes"])
    elif mode == "sheet":
        a = float(sys.argv[3]); b = float(sys.argv[4]); st = float(sys.argv[5])
        ts = [round(a + i * st, 2) for i in range(int((b - a) / st) + 1)]
        paths, info = stills(vid, ts, out_dir)
        sheet(paths, f"{out_dir}/sheet.png", cols=6, w=300)
        print(len(paths), "frames")
    elif mode == "video":
        video(vid, int(sys.argv[3]) if len(sys.argv) > 3 else 2)

"""Render + finish a web reel end to end.
python3 web/finish.py v01 "01 - Claude YouTube Transcript Skill"
"""
import json, sys, os, subprocess, importlib.util
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)
sys.path.insert(0, f"{ROOT}/web")
import render as wr
from playwright.sync_api import sync_playwright
from engine import finish as fin

LIMIT_MB = 29.0


def main(vid, name, workers=2):
    os.chdir(ROOT)
    with sync_playwright() as p:
        b, page, info, timing, msgs = wr.open_page(p, vid)
        if info["missing"]:
            print("MISSING BEATS", info["missing"])
        json.dump({"starts": [float(s[1]) for s in info["scenes"]], "types": [s[0] for s in info["scenes"]]}, open(f"build/{vid}/scenes.json", "w"))
        b.close()
    wr.video(vid, workers)
    fin.bed(vid)
    bd = f"build/{vid}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{bd}/voice.wav", "-i", f"{bd}/bed.wav", "-filter_complex",
                    "[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,"
                    "equalizer=f=180:t=q:w=1:g=-2,equalizer=f=4500:t=q:w=1.2:g=2[v];"
                    "[v][1:a]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[out]",
                    "-map", "[out]", "-ar", "48000", "-c:a", "pcm_s16le", f"{bd}/mix.wav"], check=True)
    os.makedirs("out", exist_ok=True)
    out = f"out/{name}.mp4"
    dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f"{bd}w/video.mp4"]))
    vbr = int(min(12000, (LIMIT_MB * 8e6 / dur) / 1000 - 200))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{bd}w/video.mp4", "-i", f"{bd}/mix.wav", "-map", "0:v", "-map", "1:a",
                    "-c:v", "libx264", "-preset", "slow", "-b:v", f"{vbr}k", "-maxrate", f"{int(vbr * 1.6)}k", "-bufsize", f"{vbr * 3}k",
                    "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out], check=True)
    print("DONE", out, round(os.path.getsize(out) / 1e6, 1), "MB")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])

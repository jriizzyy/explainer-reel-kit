#!/usr/bin/env bash
# One-time setup: Python packages, Chromium for rendering, and the Kokoro voice model.
set -e
cd "$(dirname "$0")"

python3 -m pip install -r requirements.txt
python3 -m playwright install chromium

if ! command -v ffmpeg >/dev/null; then
  echo "ffmpeg is missing. Install it first: brew install ffmpeg (Mac), winget install Gyan.FFmpeg (Windows), sudo apt install ffmpeg (Linux)."
  exit 1
fi

mkdir -p models
BASE=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -f models/kokoro.onnx ] || curl -L -o models/kokoro.onnx "$BASE/kokoro-v1.0.onnx"
[ -f models/voices.bin ]  || curl -L -o models/voices.bin  "$BASE/voices-v1.0.bin"

python3 web/mkmedia.py
echo "Setup done. Try: python3 web/render.py v02 stills 3 14 24"

---
name: animated-explainer-reel
description: Build a vertical 1080x1920 animated explainer reel from a script, with narration, word-synced subtitles at the top, light and dark scenes, real brand logos and heavy UI animation. Use when asked to turn a script into a reel in this style.
---

# Animated explainer reel

You turn a written script into a finished vertical reel (1080x1920, 30 fps, MP4 under 29 MB). The look is a polished, hand-animated explainer: subtitles at the top, one animated visual per beat underneath, alternating dark and light backgrounds, real logos, and something moving in every frame.

Everything you need is in this repo. Paths below are relative to the repo root.

## Look at the style first

- `docs/style-frames.png` shows six frames from the reference video. Open it.
- `web/v02.js` is the finished, approved example. Read all of it before you write anything and copy its structure, conventions and level of detail.
- `web/v20.js` is a second example that mixes real photos and video clips into the same style.

What the style is:

- Full-bleed background that alternates between dark (`theme:'dark'`) and light (`theme:'light'`) scenes. Use both in every video.
- Subtitles are drawn by the engine at the top of the frame (y about 200 to 340), word by word, with a blue selection box on key words. Never put visuals above y=440. Keep the main visual between y=440 and y=1450. The bottom of the frame stays mostly empty.
- Every beat gets its own visual that animates in time with specific spoken words: app windows, chat UIs, terminals, code editors, dashboards, counters ticking, bars filling, toggles switching, cards dropping into slots, a cursor clicking, dots flowing along paths, receipts printing, timelines growing, documents with highlights.
- Variety is mandatory. Do not repeat a layout. Do not use "icon in a circle, then cross it out". Do not make scenes that are just big text; allow one or two title moments per video at most, and even those move.
- Things enter, move and react on the exact word they relate to.
- Scenes usually run 3 to 9 seconds. Aim for 12 to 22 scenes depending on length.

## Rules for what goes on screen

- Brand logos: whenever a brand, company, product or app is mentioned, use its real logo file with `LOGO(name, heightPx, {theme:'dark'|'light', text:false, round:false})`. Pass the scene's theme. `text:true` gives the wordmark when one exists. See `docs/logos.png` and `web/logos/index.js` for what exists. Never draw or imitate a logo. If a brand has no file, use a plain text label and say so in your report. To add a logo, drop the file in `web/logos/` and add it to `web/logos/index.js`.
- Mocked-up UI from real products carries a small "recreation" or "illustration" label. Invented numbers are labeled "illustration". Claims a company made are attributed on screen ("TypeSafe's claim").
- Never show real emails, share links or personal info.
- No em dashes or en dashes in on-screen text.
- Follow the script's own "Cutaways" and "Production notes" sections.

## Pipeline

1. Narration spec: write `videos/vNN.py` with `NAME`, `LINES` (list of `(id, text)`), and `END_HOLD` (seconds of silence at the end). See `videos/v02.py`. Text markup:
   - `{cap|spoken}`: subtitle shows `cap`, voice says `spoken`. Use it for numbers, acronyms and anything the voice mispronounces (`{RLHF|R L H F}`, `{0.59|zero point five nine}`).
   - `||`: an extra pause after that point.
2. Generate voice and word timings: `python3 -m engine.narrate vNN`. This writes `build/vNN/voice.wav` and `build/vNN/timing.json`. It prints any line where alignment missed words; fix those with `{cap|spoken}`.
3. Print the timings to plan against: `python3 tools/timing.py vNN`.
4. Storyboard as a comment at the top of `web/vNN.js`: the scene list with the words that trigger each animation.
5. Write `web/vNN.js`.
6. Check it:
   - `python3 web/render.py vNN sheet 0 <duration> 2` writes `build/vNNw/sheet.png`, one frame every 2 s.
   - `python3 web/render.py vNN stills 12.3 18.0 ...` writes `build/vNNw/stills.png` and `build/vNNw/s_<t>.png`.
   - Look at the images. Fix overlaps, text running off cards, anything clipped by the frame, empty frames, static scenes, anything that looks cheap. Check at least 3 stills per scene.
   - The stills command prints `MISSING [...]` when a `V.at` word was not found. Fix all of those.
7. Render and finish: `python3 web/finish.py vNN "Output name"`. This renders every frame, adds a soft music bed and a whoosh on each scene change, mixes, normalizes to -14 LUFS and writes `out/Output name.mp4` under 29 MB.

## Engine API (`web/engine.js`, do not edit it)

- `window.KEYS = [...]`: words that get the blue selection box. About one per sentence, the most important one, written exactly as they appear in the timing words (keep `?` if the word has it).
- `window.setup = function(){ ... V.scene({...}) ... }` defines scenes.
- Scene object: `{ name, theme:'dark'|'light', glow:[r,g,b], from:<s>, to?:<s>, build(root){ ...return refs }, update(T, r){ ... } }`. Use `[255,255,255]` glow on light scenes. `to` defaults to the next scene's `from`. `T` is absolute time in seconds. `update` must be a pure function of `T`: set every animated style from `T`, keep no accumulated state.
- Times: `V.lines[id].start` is the start of a script line. `V.at(word, n=0, after=0)` returns the start of the nth matching word after `after`. Always pass the line start as `after`. Matching is case-insensitive, strips punctuation except `. $ %`, tries an exact match and then a prefix match.
- Helpers:
  - `el(parent, html)` builds DOM from an HTML string and returns refs for every `[data-k]` element plus `.root`.
  - `A(T, start, dur, ease)` eased 0..1 appear. `pop(T, start, dur)` overshoot 0..1.1 (wrap in `clamp()` for opacity). `P(T, a, d)` linear 0..1. Easings: `E.out E.io E.in E.back E.spring`.
  - `lerp`, `clamp`, `mix`, `typed(str, T, t0, cps)` typewriter, `caret(T)` blinking caret, `fmt(n)` number with commas, `tf(el, x, y, scale, rot, opacity)`, `css(el, {...})`.
  - `CURSOR()` mouse cursor html, then `moveCursor(r, T, [[t,x,y],...], [clickTimes])`.
  - Real media: put files under `web/media/`, run `python3 web/mkmedia.py`, then use `hasMedia(path)`, `VIDEO(src, key)` and `seekVideo(r.key, seconds)` inside `update`. Video clips must be VP9 `.webm` (Chromium here has no H.264). See `web/v20.js`.
- CSS classes: `.card`, `.win` with `.bar` (window with traffic lights), `.chip`, `.pill`, `.lbl`, `.mono`, `.note`, `.strike`, `.caret`. CSS vars: `--fg --bg --mute --sub --card --line --fgr` (rgb triplet, use as `rgba(var(--fgr),.1)`), colors `--or --orl --vi --vil --bl --gr --rd --am`. Fonts: Inter for UI, JetBrains Mono for code and numbers.
- Pitfalls:
  - Do not store numbers on `r` under a name that collides with a `data-k` name. Prefix times like `r.tFoo`.
  - Elements created inside a nested `el()` call have refs on that nested result, not on the outer `r`.
  - Keep arcs and flips inside the frame; check stills at the peak of each motion.

## Finish with a short report

Scene count, logos that were missing, anything you were unsure about, and the output path.

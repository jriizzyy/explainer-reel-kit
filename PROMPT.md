# The prompt

Open this repo in Claude Code (or any coding agent with a terminal), put your script in `scripts/`, and paste the prompt below. Replace the two bracketed parts.

```
Make a vertical animated explainer reel from scripts/[your script file].md using this repo.

Read skill/animated-explainer-reel/SKILL.md first and follow it exactly. Then read web/v02.js in full and look at docs/style-frames.png so you match the style.

Use the video id [v30]. Steps:
1. Write videos/[v30].py from the script's spoken lines. Use {caption|spoken} for numbers, acronyms and brand names the voice might mispronounce, and || for dramatic pauses.
2. Run python3 -m engine.narrate [v30]. Fix any line it reports as mismatched and run it again.
3. Print the timings with python3 tools/timing.py [v30] and storyboard the scenes against the exact words.
4. Write web/[v30].js. Heavy animation, a different layout for every beat, real logos for every brand, dark and light scenes, nothing above y=440.
5. Check sheets and stills, look at every image, and fix anything that is clipped, overlapping, empty or static. No MISSING beats.
6. Render with python3 web/finish.py [v30] "[output name]".

Don't stop partway. Finish with the scene count, any brand that had no logo file, and the path to the MP4.
```

## Script format

Your script is a Markdown file with these sections. `scripts/02 - Jev Are We Overpaying for Claude.md` is a full example.

```
# Title

## Hook
Spoken: "..."

## Spoken lines
1. "..."
2. "..."

## Cutaways
- What should be on screen for specific lines.

## End card
On-screen text: "..."

## Production notes
- Tone, claims to attribute, things to label as illustration.
```

## Adding real photos or video clips

Put photos in `web/media/<topic>/` and clips (VP9 `.webm`) in `web/media/<topic>/clips/`, then run `python3 web/mkmedia.py`. Tell the agent which file goes with which line. To convert and trim a clip:

```
ffmpeg -ss 00:30 -to 00:43 -i source.mp4 -vf "scale=1080:-2,fps=30" -an -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 clip.webm
```

Only use footage and photos you have the rights to, and credit them.

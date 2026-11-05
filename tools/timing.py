"""Print each narration line with its word start times.
usage: python3 tools/timing.py vNN
"""
import json, sys

t = json.load(open(f"build/{sys.argv[1]}/timing.json"))
print(f"duration {t['duration']:.2f}s")
for L in t["lines"]:
    print(f"\n[{L['id']}] {L['start']:.2f} - {L['end']:.2f}")
    print("  " + "  ".join(f"{w['w']}@{w['s']:.2f}" for w in L["words"]))

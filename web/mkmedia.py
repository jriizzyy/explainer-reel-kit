import os, json
root = os.path.dirname(os.path.abspath(__file__))
fs = []
for d, _, files in os.walk(f'{root}/media'):
    for f in files:
        if f != 'index.js':
            fs.append(os.path.relpath(os.path.join(d, f), root))
open(f'{root}/media/index.js', 'w').write('window.MEDIA_FILES = ' + json.dumps(sorted(fs)) + ';\n')
print(len(fs), 'media files')

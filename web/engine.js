// Frame-deterministic motion engine. renderAt(T) is a pure function of T.
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const P = (t, a, d) => (d <= 0 ? (t >= a ? 1 : 0) : clamp((t - a) / d));
const E = {
  lin: x => x,
  out: x => 1 - Math.pow(1 - clamp(x), 3),
  out5: x => 1 - Math.pow(1 - clamp(x), 5),
  in: x => Math.pow(clamp(x), 3),
  io: x => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; },
  back: (x, s = 1.5) => { x = clamp(x); return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); },
  spring: x => { x = clamp(x); return 1 - Math.cos(x * Math.PI * 4.5) * Math.exp(-x * 6); },
};
const A = (t, a, d = 0.45, e = E.out) => e(P(t, a, d));        // appear 0..1
const pop = (t, a, d = 0.5) => E.back(P(t, a, d), 1.7);
const mix = (c1, c2, t) => c1.map((v, i) => Math.round(lerp(v, c2[i], t)));
const rgb = c => `rgb(${c[0]},${c[1]},${c[2]})`;
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const norm = w => w.toLowerCase().replace(/[^a-z0-9.$%]/g, '').replace(/\.$/, '');
function fmt(n) { return Math.round(n).toLocaleString('en-US'); }
function css(el, o) { for (const k in o) el.style[k] = o[k]; }
function tf(el, x, y, s = 1, r = 0, o) {
  el.style.transform = `translate(${x}px,${y}px) scale(${s}) rotate(${r}deg)`;
  if (o !== undefined) el.style.opacity = o;
}
function typed(str, t, t0, cps = 28) { const n = Math.floor(Math.max(0, t - t0) * cps); return str.slice(0, n); }
function caret(t) { return (Math.floor(t * 2.4) % 2 === 0) ? '<span class="caret"></span>' : '<span class="caret off"></span>'; }

const THEMES = {
  dark: { bg: [14, 14, 15], fg: [242, 242, 242], mute: [118, 118, 122], card: [24, 24, 26], line: [44, 44, 48], grid: 0.045, sub: [160, 160, 166] },
  light: { bg: [244, 243, 240], fg: [20, 20, 22], mute: [152, 150, 146], card: [255, 255, 255], line: [226, 224, 220], grid: 0.05, sub: [96, 96, 100] },
};

const V = {
  scenes: [], words: [], dur: 0, speechEnd: 0, keys: new Set(), chunks: [],
  scene(o) { this.scenes.push(o); return o; },
  at(word, n = 0, after = 0) {
    const w = norm(word);
    let pool = this.words.filter(x => x.s >= after - 0.05);
    let hits = pool.filter(x => norm(x.w) === w);
    if (hits.length <= n) hits = pool.filter(x => norm(x.w).startsWith(w));
    if (hits.length <= n) { console.warn('missing beat', word, after); this.missing.push(word + '@' + after.toFixed(1)); return after + 1; }
    return hits[n].s;
  },
  missing: [],
};

function el(parent, html) {
  const t = document.createElement('div');
  t.innerHTML = html.trim();
  const node = t.firstElementChild;
  parent.appendChild(node);
  const refs = { root: node };
  node.querySelectorAll('[data-k]').forEach(n => refs[n.dataset.k] = n);
  if (node.dataset && node.dataset.k) refs[node.dataset.k] = node;
  return refs;
}

function buildChunks() {
  const ws = V.words;
  const chunks = [];
  let cur = [];
  for (let i = 0; i < ws.length; i++) {
    const w = ws[i];
    cur.push(w);
    const nx = ws[i + 1];
    const gap = nx ? nx.s - w.e : 9;
    const endQ = /[?]$/.test(w.w);
    const lineBreak = !nx || nx.line !== w.line;
    const words = cur.length;
    let brk = lineBreak || (gap > 0.26 && words >= 2) || endQ || words >= 6 || (gap > 0.5);
    if (words >= 4 && nx && /^(and|but|so|or|which|that|because|then|instead)$/i.test(nx.w) && gap > 0.08) brk = true;
    if (brk) { chunks.push(cur); cur = []; }
  }
  if (cur.length) chunks.push(cur);
  V.chunks = chunks;
}

function renderCaption(T) {
  const box = document.getElementById('cap');
  let html = '';
  const ch = V.chunks;
  let idx = -1;
  for (let i = 0; i < ch.length; i++) if (ch[i][0].s - 0.06 <= T) idx = i;
  if (idx >= 0) {
    const c = ch[idx];
    const last = c[c.length - 1];
    const nextStart = idx + 1 < ch.length ? ch[idx + 1][0].s - 0.06 : 1e9;
    const hold = Math.min(nextStart, last.e + 1.0);
    if (T < hold) {
      const shown = c.filter(w => w.s - 0.06 <= T);
      shown.forEach((w, j) => {
        const isCur = j === shown.length - 1;
        const k = E.out(P(T, w.s - 0.06, 0.16));
        const key = V.keys.has(norm(w.w));
        const fade = T > last.e + 0.6 ? 1 - P(T, last.e + 0.6, 0.4) : 1;
        let inner = w.w;
        let cls = isCur ? 'w cur' : 'w prev';
        let sel = '';
        if (key) {
          const sk = E.out(P(T, w.s, 0.22));
          sel = `<span class="sel" style="clip-path: inset(-20px ${(1 - sk) * 100}% -20px -20px)"><i class="h1"></i><i class="h2" style="opacity:${sk}"></i></span>`;
          cls += ' key';
        }
        html += `<span class="${cls}" style="opacity:${k * fade};transform:translateY(${(1 - k) * 10}px)">${sel}<span class="tx">${inner}</span></span> `;
      });
    }
  }
  box.innerHTML = html;
}

let built = false;
function buildAll() {
  const stage = document.getElementById('stage');
  V.scenes.sort((a, b) => a.from - b.from);
  V.scenes.forEach((s, i) => {
    s.to = s.to ?? (i + 1 < V.scenes.length ? V.scenes[i + 1].from : V.dur);
  });
  V.scenes.forEach((s, i) => {
    const root = document.createElement('div');
    root.className = 'scene';
    stage.appendChild(root);
    s.root = root;
    s.idx = i;
    s.r = s.build(root, s) || {};
  });
  buildChunks();
  built = true;
}

function themeAt(T) {
  let wsum = 0, lsum = 0;
  for (const s of V.scenes) {
    const v = visOf(s, T);
    if (v > 0) { wsum += v; lsum += v * (s.theme === 'light' ? 1 : 0); }
  }
  return wsum > 0 ? lsum / wsum : 0;
}

function visOf(s, T) {
  const first = s.idx === 0, last = s.idx === V.scenes.length - 1;
  const fi = first ? 1 : E.io(P(T, s.from - 0.16, 0.36));
  const fo = last ? 1 : 1 - E.io(P(T, s.to - 0.2, 0.3));
  if (T < s.from - 0.2 || T > s.to + 0.12) return 0;
  return clamp(fi * fo);
}

function setTheme(m) {
  const d = THEMES.dark, l = THEMES.light;
  const r = document.documentElement.style;
  for (const k of ['bg', 'fg', 'mute', 'card', 'line', 'sub']) r.setProperty('--' + k, rgb(mix(d[k], l[k], m)));
  r.setProperty('--fgr', mix(d.fg, l.fg, m).join(','));
  r.setProperty('--gridc', m > 0.5 ? `rgba(0,0,0,${l.grid})` : `rgba(255,255,255,${d.grid})`);
  r.setProperty('--shadow', `0 40px 90px rgba(0,0,0,${lerp(0.55, 0.10, m)}), 0 4px 14px rgba(0,0,0,${lerp(0.35, 0.05, m)})`);
  r.setProperty('--m', m);
}

window.renderAt = function (T) {
  if (!built) buildAll();
  { const m0 = themeAt(T); setTheme(clamp((m0 - 0.5) * 2.2 + 0.5)); }
  const fadeAll = Math.min(clamp(T / 0.25), clamp((V.dur - T) / 0.45));
  document.getElementById('stage').style.opacity = fadeAll;
  for (const s of V.scenes) {
    const v = visOf(s, T);
    if (v <= 0) { s.root.style.display = 'none'; continue; }
    s.root.style.display = 'block';
    const enter = s.idx === 0 ? 1 : E.out(P(T, s.from - 0.16, 0.5));
    const exit = P(T, s.to - 0.2, 0.32);
    const sc = lerp(0.965, 1, enter) * lerp(1, 1.025, E.in(exit)) * (1 + 0.012 * clamp((T - s.from) / Math.max(1, s.to - s.from)));
    s.root.style.opacity = v;
    s.root.style.filter = (v < 0.98) ? `blur(${(1 - v) * 10}px)` : 'none';
    s.root.style.transform = `scale(${sc})`;
    s.update(T, s.r, s);
  }
  renderCaption(T);
  let gw = 0, gc = [0, 0, 0];
  for (const s of V.scenes) { const v = visOf(s, T); if (v > 0) { const c = s.glow || [90, 70, 255]; gw += v; gc = gc.map((x, i) => x + c[i] * v); } }
  if (gw > 0) document.documentElement.style.setProperty('--glowc', rgba(gc.map(x => Math.round(x / gw)), 0.24));
  document.getElementById('glow').style.opacity = 1 - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--m') || 0) * 0.85;
};

window.boot = async function (timing) {
  V.words = timing.words;
  V.dur = timing.duration;
  V.speechEnd = timing.speech_end;
  V.lines = {};
  timing.lines.forEach(L => V.lines[L.id] = L);
  if (window.KEYS) window.KEYS.forEach(k => V.keys.add(norm(k)));
  if (window.setup) window.setup();
  await document.fonts.ready;
  buildAll();
  return { missing: V.missing, scenes: V.scenes.map(s => [s.name || '', s.from.toFixed(2), s.to.toFixed(2)]) };
};

// ---------- shared visual builders ----------
// ---------- real brand logos (files in web/logos, list in logos/index.js) ----------
const ALIAS = { jev: 'typesafe', chatgpt: 'openai', 'claude code': 'claudecode', veo: 'deepmind', wan: 'qwen', hermes: 'hermesagent', blackmagic: 'si-blackmagicdesign',
  davinci: 'si-davinciresolve', youtube: 'si-youtube', instagram: 'si-instagram', tiktok: 'si-tiktok', fiverr: 'si-fiverr', ring: 'si-ring', gmail: 'si-gmail', x: 'si-x', react: 'si-react',
  chrome: 'si-googlechrome', drive: 'si-googledrive', sheets: 'si-googlesheets', e2b: 'e2b', composio: 'composio', agentmail: 'agentmail', orgo: 'orgo', higgsfield: 'higgsfield', seedance: 'seedance', slack: 'slack', tesla: 'si-tesla', spacex: 'si-spacex', rockstar: 'si-rockstargames', gta: 'si-rockstargames' };
function logoSrc(name, theme = 'dark', text = false) {
  const F = window.LOGO_FILES || [];
  let n = name.toLowerCase(); n = ALIAS[n] || n;
  const has = f => F.includes(f);
  const tries = text ? [`${n}-text-${theme}.png`] : [`${n}-color.png`, `${n}-${theme}.png`, `${n}.png`, `${n}.svg`, `${n}-${theme === 'dark' ? 'white' : 'black'}.png`, `si-${n}.svg`];
  for (const t of tries) if (has(t)) return { src: 'logos/' + t, mono: t.startsWith('si-') };
  if (n.startsWith('si-') && has(n + '.svg')) return { src: 'logos/' + n + '.svg', mono: true };
  console.warn('no logo for', name); return null;
}
// LOGO(name, heightPx, {theme:'dark'|'light', text:false, round:false})
function LOGO(name, h = 48, o = {}) {
  const theme = o.theme || 'dark';
  const s = logoSrc(name, theme, o.text);
  if (!s) return `<span style="font-weight:800">${name}</span>`;
  const inv = s.mono && theme === 'dark' ? 'filter:invert(1);' : '';
  const r = o.round ? `border-radius:${Math.round(h * 0.24)}px;` : '';
  return `<img class="logo" src="${s.src}" style="height:${h}px;width:auto;object-fit:contain;display:inline-block;vertical-align:middle;${inv}${r}${o.style || ''}">`;
}
const JEV_MARK = (size = 44) => LOGO('typesafe', size, { round: true });
const CLAUDE_TAG = (size = 1) => `<span class="ctag" style="font-size:${30 * size}px">${LOGO('claude', Math.round(30 * size * 1.05))}Claude</span>`;
const CURSOR = () => `<svg class="cursor" data-k="cursor" width="44" height="54" viewBox="0 0 22 27"><path d="M2 2 L2 21 L7 16.5 L10.5 24.5 L13.5 23.2 L10.2 15.5 L17 15.5 Z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg><div class="ripple" data-k="ripple"></div>`;
function moveCursor(r, T, path, clicks = []) {
  // path: [[t,x,y],...]
  if (!r.cursor) return;
  if (!path.length || T < path[0][0] - 0.25) { r.cursor.style.opacity = 0; r.ripple.style.opacity = 0; return; }
  let x = path[0][1], y = path[0][2];
  for (let i = 0; i < path.length - 1; i++) {
    const [t0, x0, y0] = path[i], [t1, x1, y1] = path[i + 1];
    if (T >= t0) { const k = E.io(P(T, t0, t1 - t0)); x = lerp(x0, x1, k); y = lerp(y0, y1, k); }
  }
  const lastT = path[path.length - 1][0];
  const op = A(T, path[0][0] - 0.25, 0.25) * (1 - P(T, lastT + 0.15, 0.3));
  let press = 1;
  let rip = 0, rx = x, ry = y;
  for (const c of clicks) {
    if (T >= c && T < c + 0.5) { const q = P(T, c, 0.5); rip = 1 - q; press = 1 - 0.15 * Math.sin(Math.min(1, q * 3) * Math.PI); }
  }
  tf(r.cursor, x, y, press, 0, op);
  r.ripple.style.opacity = rip * 0.6 * op;
  r.ripple.style.transform = `translate(${x - 30}px,${y - 30}px) scale(${1.4 - rip * 0.9})`;
}

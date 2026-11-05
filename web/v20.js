// Video 20 · Tesla Roadster can kickflip (condescending explainer)
// Storyboard
//  1 hook        0.0   kickflip clip slot (fallback: white Roadster silhouette flips on "kickflip", freeze on "A car")
//  2 stream      5.8   livestream player + Elon photo; "Slowly" -> playback speed drops to 0.5x
//  3 one/three  12.7   one car card, splits into three on "three"
//  4 trims      16.7   Performance / Thrust / Rocket cards, stamps on "invite only", "one seat", "not legal"
//  5 flip       26.9   thruster ports light up on "cold-gas", flip on "flip", empty cockpit on "nobody"
//  6 gta        35.5   Rocket trim vs GTA Online Rocket Voltic (clip slot), boost on "boosts", hop on "hops"
//  7 specs      43.9   full spec sheet from the event, rows dealt in, no narration of each item
//  8 timer      48.9   0.59 claim vs 0.81 live run, missing on-screen timer, "trust me bro" source stamp
//  9 hop        60.2   "flying car" struck to "hopping car", altitude chart with short bursts
// 10 2028       66.5   Elon photo, press release / website empty, quote card "2028, actually."
// 11 reserve    77.5   checkout recreation: price TBA, $5,000 now, $45,000 in 10 days, countdown, canceled
// 12 history    85.8   2017 prototype photo (or clip), semi trailer roll-out, 2017 promise chips
// 13 slips      99.1   timeline 2020 x, 2023 x, 2026 Apr > Aug > Oct 1 > Oct 15
// 14 halves    109.2   2017 vs 2026: range 620 -> 300, seats 4 -> 2
// 15 close     114.0   scorecard (kickflip yes, GTA hop yes, deadline no), calendar to 2028?, end card
window.KEYS = ['kickflip', 'Roadster', 'Slowly', 'three', 'Performance', 'Thrust', 'invite', 'legal', 'Cold-gas', 'standstill', 'Nobody',
  'GTA', 'boosts', 'money', 'spec', 'look', '0.59', 'claim', '0.81', 'timer', 'bro', 'flies', 'bursts', 'hop', '2028', 'press', 'website',
  'commitment', 'price', 'Fifty', 'forty-five', 'spot', '2017', 'semi', '2020', '2023', 'slipped', 'fifteenth', 'range', 'seats', 'deadline', 'Sure'];

// ---------- shared art ----------
let __cid = 0;
function CAR(w = 600, o = {}) {
  const id = 'c' + (__cid++);
  const body = o.body || '#f4f3ef', glass = o.glass || 'url(#g' + id + ')';
  const ports = o.ports ? [[70, 132], [535, 132], [160, 104], [462, 102], [578, 112], [578, 122]].map(([x, y], i) =>
    `<circle data-k="${o.k || 'car'}p${i}" cx="${x}" cy="${y}" r="7" fill="#1f2937" stroke="#9ca3af" stroke-width="2"/>`).join('') : '';
  return `<svg width="${w}" height="${w * 0.33}" viewBox="0 0 600 198" style="overflow:visible">
    <defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9c46a"/><stop offset=".55" stop-color="#b8860b"/><stop offset="1" stop-color="#5c4a14"/></linearGradient>
      <linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="${body}"/></linearGradient></defs>
    <ellipse cx="305" cy="176" rx="270" ry="12" fill="rgba(0,0,0,.35)"/>
    <path d="M28 124 C 28 104, 64 96, 126 90 L 228 62 C 266 50, 334 46, 386 53 L 474 72 C 532 82, 572 94, 578 114 L 578 132 C 578 140, 572 144, 560 144 L 44 144 C 32 144, 28 136, 28 124 Z" fill="url(#b${id})" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/>
    <path d="M240 66 C 274 56, 332 52, 376 57 L 436 72 L 262 78 Z" fill="${glass}"/>
    <path d="M60 118 L 200 104" stroke="rgba(0,0,0,.14)" stroke-width="2"/><path d="M300 108 L 520 108" stroke="rgba(0,0,0,.12)" stroke-width="2"/>
    <rect x="560" y="100" width="18" height="5" rx="2" fill="#ef4444"/><rect x="30" y="112" width="26" height="4" rx="2" fill="#fff" opacity=".9"/>
    ${[140, 470].map(x => `<g><circle cx="${x}" cy="144" r="33" fill="#111"/><circle cx="${x}" cy="144" r="20" fill="#3f3f46" stroke="#a1a1aa" stroke-width="3"/><circle cx="${x}" cy="144" r="5" fill="#d4d4d8"/></g>`).join('')}
    ${ports}</svg>`;
}
function PHOTO(src, credit, w, h, extra = '') {
  return `<div class="abs" style="width:${w}px;height:${h}px;border-radius:22px;overflow:hidden;box-shadow:var(--shadow);${extra}">
    <img src="${src}" style="width:100%;height:100%;object-fit:cover;display:block" data-k="img">
    <div class="mono" style="position:absolute;left:0;right:0;bottom:0;padding:10px 14px;font-size:15px;color:rgba(255,255,255,.85);background:linear-gradient(transparent,rgba(0,0,0,.7))">${credit}</div></div>`;
}
const ELON = { src: 'media/roadster/elon_press.jpg', credit: 'Photo: Daniel Oberhaus · CC BY-SA 4.0 · Wikimedia Commons' };
const ELON2 = { src: 'media/roadster/elon_2025.jpg', credit: 'Photo: U.S. Dept. of Defense · public domain · Wikimedia Commons' };
const R2017 = { src: 'media/roadster/roadster_2017.jpg', credit: 'Roadster prototype, Nov 2017 · Photo: Smnt · CC BY-SA 4.0 · Wikimedia Commons' };
function STAMP(txt, col = '#ef4444', sz = 34) { return `<div style="display:inline-block;padding:8px 18px;border:5px solid ${col};color:${col};font-weight:900;font-size:${sz}px;letter-spacing:2px;border-radius:10px;background:rgba(0,0,0,.03)">${txt}</div>`; }
function puff(ctxEl, n, k) { let h = ''; for (let i = 0; i < n; i++) h += `<div class="abs" data-k="${k}${i}" style="left:0;top:0;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle,rgba(220,235,255,.95),rgba(220,235,255,0) 70%)"></div>`; return h; }
// clip slot: real clip if provided, else fallback DOM. returns {has, v}
function clipHTML(name, k = 'vid') { const p = `media/roadster/clips/${name}.webm`; return hasMedia(p) ? VIDEO(p, k) : ''; }
function hasClip(name) { return hasMedia(`media/roadster/clips/${name}.webm`); }
const CLIPIN = { kickflip: 7.5, ramp: 2, live: 2.3, r2017: 8, gta: 2.5 }; // in-points (s) inside each clip, set when clips arrive

window.setup = function () {
  const at = (w, n = 0, after = 0) => V.at(w, n, after);
  const Ls = id => V.lines[id].start;

  // ============ 1. Hook ============
  V.scene({
    name: 'hook', theme: 'dark', glow: [120, 140, 255], from: 0,
    build(root) {
      const real = hasClip('kickflip');
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="abs" data-k="frame" style="left:60px;top:470px;width:960px;height:760px;border-radius:30px;overflow:hidden;background:#0b0d12;box-shadow:var(--shadow)">
          ${real ? clipHTML('kickflip') : `
          <div class="abs" style="inset:0;background:linear-gradient(#1b2030,#0b0d12 70%)"></div>
          <div class="abs" data-k="floor" style="left:0;right:0;top:560px;height:200px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 2px,transparent 2px 120px),linear-gradient(#2a2f3a,#14161c)"></div>
          <div class="abs" data-k="car" style="left:180px;top:390px;transform-origin:300px 100px">${CAR(600)}</div>
          ${puff(null, 10, 'pf')}`}
          <div class="abs" data-k="flash" style="inset:0;background:#fff;opacity:0"></div>
          <div class="abs mono" style="left:24px;top:20px;font-size:20px;color:rgba(255,255,255,.7)">${real ? 'Tesla · "The Kickflip"' : 'illustration'}</div>
        </div>
        <div class="abs" data-k="tag" style="left:0;right:0;top:1270px;text-align:center"><span style="font-size:64px;font-weight:900;letter-spacing:-1px">A car.</span></div>
      </div>`);
      r.real = real; r.tK = at('kickflip', 0, 0); r.tCar = at('car', 1, 3); r.tK2 = at('kickflip', 1, 4);
      return r;
    },
    update(T, r) {
      const k = A(T, 0, 0.5);
      r.frame.style.transform = `scale(${lerp(0.94, 1, k)})`; r.frame.style.opacity = k;
      if (r.real) { seekVideo(r.vid, CLIPIN.kickflip + T * (T > r.tCar && T < r.tK2 ? 0.25 : 1)); }
      else {
        const flip = (t0) => { const f = P(T, t0, 1.0); return [f, Math.sin(f * Math.PI) * 300, E.io(f) * 360]; };
        let [f, y, rot] = flip(r.tK - 0.1); y *= 0.62;
        if (T > r.tK2 - 0.2) { [f, y, rot] = flip(r.tK2 - 0.2); y *= 0.62; }
        const freeze = T > r.tCar - 0.1 && T < r.tK2 - 0.2 ? 1 : 0;
        if (freeze) { y = 150; rot = 200; }
        r.car.style.transform = `translateY(${-y}px) rotate(${rot}deg)`;
        for (let i = 0; i < 10; i++) {
          const p = r['pf' + i]; const t0 = (T > r.tK2 - 0.2 ? r.tK2 - 0.2 : r.tK - 0.1);
          const q = P(T, t0 + (i % 5) * 0.03, 0.7);
          const x = (i < 5 ? 230 : 730) + (i % 5) * 14 - 20, yy = 600 + q * 60;
          tf(p, x, yy, 1 + q * 3, 0, (q > 0 && q < 1) ? (1 - q) * 0.9 : 0);
        }
      }
      r.flash.style.opacity = (1 - P(T, r.tCar - 0.05, 0.25)) * (T > r.tCar - 0.05 ? 0.8 : 0);
      const tk = pop(T, r.tCar, 0.4);
      r.tag.style.opacity = clamp(tk) * (1 - A(T, r.tK2 + 0.6, 0.3)); r.tag.style.transform = `scale(${lerp(0.6, 1, clamp(tk))})`;
    },
  });

  // ============ 2. Livestream ============
  V.scene({
    name: 'stream', theme: 'light', glow: [255, 255, 255], from: Ls('l2'),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="win" data-k="w" style="left:70px;top:470px;width:940px;height:640px">
          <div class="bar"><i></i><i></i><i></i><span class="tt">Roadster Event · livestream</span></div>
          <div class="abs" style="left:0;right:0;top:64px;height:470px;background:#0b0d12;overflow:hidden">
            <div class="abs" style="inset:0;background:radial-gradient(ellipse at 50% 80%,#2b3550,#0b0d12 70%)"></div>
            <div class="abs" data-k="car" style="left:250px;top:250px">${CAR(440)}</div>
            <div class="abs" style="left:22px;top:20px;display:flex;gap:10px;align-items:center"><span class="pill" style="background:#ef4444;color:#fff">LIVE</span><span class="mono" data-k="views" style="color:#fff;font-size:22px"></span></div>
            <div class="abs" data-k="slow" style="right:22px;top:18px;padding:8px 16px;border-radius:10px;background:rgba(0,0,0,.6);color:#fff;font-size:26px;font-weight:800" class="mono"></div>
          </div>
          <div class="abs" style="left:24px;right:24px;top:556px;height:8px;border-radius:4px;background:rgba(var(--fgr),.12)"><div data-k="prog" style="height:100%;border-radius:4px;background:#ef4444;width:0"></div></div>
          <div class="abs" style="left:24px;top:584px;font-size:26px;font-weight:700;display:flex;gap:12px;align-items:center">${LOGO('tesla', 28, { theme: 'light' })}Tesla · Oct 15, 2026</div>
        </div>
        <div data-k="ph">${PHOTO(ELON.src, ELON.credit, 300, 360, 'left:690px;top:1000px;transform:rotate(4deg)')}</div>
        <div class="card" data-k="calm" style="left:90px;top:1150px;padding:20px 28px;font-size:34px;font-weight:800">before you get excited<span style="color:var(--mute)">...</span></div>
      </div>`);
      r.t0 = Ls('l2'); r.tEx = at('excited', 0, Ls('l2')); r.tSlow = at('slowly', 0, Ls('l2'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.5);
      r.w.style.opacity = k; r.w.style.transform = `translateY(${(1 - k) * 40}px)`;
      const slow = T > r.tSlow - 0.1;
      const rate = slow ? 0.5 : 1;
      r.views.textContent = fmt(1204000 + (T - r.t0) * 3100) + ' watching';
      r.slow.textContent = slow ? '0.5×' : '1×'; r.slow.style.background = slow ? 'var(--bl)' : 'rgba(0,0,0,.6)';
      r.slow.style.transform = `scale(${slow ? E.back(P(T, r.tSlow - 0.1, 0.35)) : 1})`;
      const tt = T - r.t0, eff = slow ? (r.tSlow - 0.1 - r.t0) + (T - r.tSlow + 0.1) * 0.5 : tt;
      r.car.style.transform = `translateX(${Math.sin(eff * 0.9) * 40}px)`;
      r.prog.style.width = (8 + eff * 3) + '%';
      const pk = A(T, r.t0 + 0.8, 0.5);
      r.ph.firstElementChild.style.opacity = pk; r.ph.firstElementChild.style.transform = `rotate(${lerp(10, 4, pk)}deg) translateY(${(1 - pk) * 40}px)`;
      const ck = pop(T, r.tEx - 0.1, 0.4);
      r.calm.style.opacity = clamp(ck); r.calm.style.transform = `scale(${lerp(0.7, 1, clamp(ck))})`;
    },
  });

  // ============ 3. One -> three ============
  V.scene({
    name: 'three', theme: 'dark', glow: [120, 140, 255], from: Ls('l3'),
    build(root) {
      let cards = '';
      ['PERFORMANCE', 'THRUST', 'ROCKET'].forEach((n, i) => cards += `<div class="card abs" data-k="c${i}" style="left:240px;top:640px;width:600px;height:330px;padding:24px 30px;transform-origin:50% 50%">
        <div class="lbl">${n}</div><div style="margin-top:40px">${CAR(540)}</div></div>`);
      const r = el(root, `<div class="abs" style="inset:0">${cards}
        <div class="abs mono" data-k="cnt" style="left:0;right:0;top:1060px;text-align:center;font-size:150px;font-weight:700"></div></div>`);
      r.tOne = at('one', 0, Ls('l3')); r.tThree = at('three', 0, Ls('l3'));
      return r;
    },
    update(T, r) {
      const sp = E.io(P(T, r.tThree - 0.2, 0.6));
      [0, 1, 2].forEach(i => {
        const c = r['c' + i];
        const a = A(T, r.tOne - 0.3, 0.4);
        const x = (i - 1) * 330 * sp, s = lerp(1, 0.52, sp), y = lerp(0, -40, sp);
        c.style.opacity = i === 0 ? a : sp * a;
        c.style.transform = `translate(${x}px,${y}px) scale(${s}) rotate(${(i - 1) * 3 * (1 - sp)}deg)`;
        c.style.zIndex = 3 - i;
      });
      r.cnt.textContent = T < r.tThree - 0.1 ? '1' : '3';
      r.cnt.style.opacity = A(T, r.tOne, 0.3);
      r.cnt.style.color = T > r.tThree - 0.1 ? 'var(--orl)' : 'var(--fg)';
      r.cnt.style.transform = `scale(${T > r.tThree - 0.1 ? E.back(P(T, r.tThree - 0.1, 0.4)) : 1})`;
    },
  });

  // ============ 4. Trims ============
  V.scene({
    name: 'trims', theme: 'light', glow: [255, 255, 255], from: Ls('l4'),
    build(root) {
      const defs = [
        ['Performance', 'road-ready · reservation', 'perf', []],
        ['Thrust', 'limited release · rear thrusters', 'thr', [4, 5]],
        ['Rocket', 'one seat · full thruster system', 'rkt', [0, 1, 2, 3, 4, 5]],
      ];
      let h = '';
      defs.forEach(([n, s, k], i) => h += `<div class="card abs" data-k="${k}" style="left:70px;top:${450 + i * 290}px;width:940px;height:260px;padding:26px 34px;overflow:hidden">
        <div style="font-size:46px;font-weight:900;letter-spacing:-1px">${n}</div><div class="mono" style="font-size:24px;color:var(--sub);margin-top:6px">${s}</div>
        <div class="abs" style="right:30px;top:40px">${CAR(430, { ports: true, k: k })}</div>
        <div class="abs" data-k="${k}s" style="left:34px;top:150px"></div></div>`);
      const r = el(root, `<div class="abs" style="inset:0">${h}<div class="note" style="top:1350px">Tesla's trims and claims · not road legal per Tesla's Roadster page</div></div>`);
      r.defs = defs;
      r.tP = at('performance', 0, Ls('l4')); r.tT = at('thrust', 0, Ls('l4')); r.tR = at('rocket', 0, Ls('l4'));
      r.tInv = at('invite', 0, Ls('l4')); r.tSeat = at('seat', 0, Ls('l4')); r.tLegal = at('legal', 0, Ls('l4'));
      r.perfs.innerHTML = `<span class="chip" style="font-size:24px">🛣 drives on roads</span>`;
      r.thrs.innerHTML = `<span class="chip" style="font-size:24px;border-color:var(--am)">limited</span>`;
      r.rkts.innerHTML = `<span data-k="st1" style="display:inline-block;margin-right:14px">${STAMP('INVITE ONLY', '#7357ff', 24)}</span><span data-k="st2" style="display:inline-block;margin-right:14px">${STAMP('1 SEAT', '#0ea5e9', 24)}</span><span data-k="st3" style="display:inline-block">${STAMP('NOT ROAD LEGAL', '#ef4444', 24)}</span>`;
      r.st = [...r.rkts.querySelectorAll('[data-k^="st"]')];
      return r;
    },
    update(T, r) {
      const ts = [r.tP, r.tT, r.tR];
      ['perf', 'thr', 'rkt'].forEach((k, i) => {
        const a = A(T, ts[i] - 0.35, 0.45);
        r[k].style.opacity = a; r[k].style.transform = `translateX(${(1 - a) * 120}px)`;
        const on = T > ts[i] - 0.2 && (i === 2 || T < ts[i + 1] - 0.2);
        r[k].style.borderColor = on ? 'var(--fg)' : ''; r[k].style.borderWidth = on ? '3px' : '1px';
        r.defs[i][3].forEach(p => {
          const port = r[k + 'p' + p]; if (!port) return;
          const lit = T > ts[i] + 0.5 + p * 0.06;
          const pulse = 0.6 + 0.4 * Math.sin(T * 8 + p);
          port.setAttribute('fill', lit ? `rgba(56,189,248,${pulse})` : '#1f2937');
          port.setAttribute('r', lit ? 9 : 7);
        });
      });
      [r.tInv, r.tSeat, r.tLegal].forEach((t, i) => { const s = r.st[i]; const k = E.back(P(T, t - 0.05, 0.35), 2); s.style.opacity = clamp(k * 3); s.style.transform = `scale(${lerp(2.2, 1, clamp(k))}) rotate(${[-4, 3, -3][i]}deg)`; });
    },
  });

  // ============ 5. Flip mechanics ============
  V.scene({
    name: 'flip', theme: 'dark', glow: [80, 160, 255], from: Ls('l5'),
    build(root) {
      const real = hasClip('ramp');
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="abs" data-k="stage" style="left:60px;top:450px;width:960px;height:820px;border-radius:30px;overflow:hidden;background:linear-gradient(#141a26,#090b10)">
          <div class="abs" style="left:0;right:0;top:620px;height:200px;background:linear-gradient(#262b36,#121418)"></div>
          <div class="abs" data-k="car" style="left:150px;top:430px;transform-origin:300px 100px">${CAR(660, { ports: true, k: 'fc' })}</div>
          ${puff(null, 14, 'pf')}
          <div class="chip abs" data-k="sx" style="left:30px;top:30px;font-size:26px">cold-gas thrusters · built with SpaceX</div>
          <div class="abs" data-k="cock" style="left:420px;top:180px;width:300px;height:180px;border-radius:24px;border:4px solid var(--bl);background:rgba(10,14,22,.9)">
            <div class="mono" style="padding:16px 20px;color:#93c5fd;font-size:22px">CABIN CAM</div>
            <div style="position:absolute;left:100px;top:70px;width:100px;height:90px;border-radius:24px 24px 8px 8px;border:4px dashed rgba(255,255,255,.35)"></div>
            <div class="abs mono" style="left:20px;bottom:14px;font-size:24px;color:#fff;font-weight:700">occupants: <span style="color:#f87171">0</span></div></div>
          ${real ? `<div class="abs" data-k="clipbox" style="inset:0">${clipHTML('ramp')}</div>` : ''}
          <div class="abs mono" style="right:24px;bottom:18px;font-size:18px;color:rgba(255,255,255,.6)">${real ? 'Tesla · "The Ramp"' : 'illustration · Tesla says no one was inside the demo cars'}</div>
        </div></div>`);
      r.real = real; r.t0 = Ls('l5'); r.tGas = at('cold-gas', 0, Ls('l5')); r.tSX = at('spacex', 0, Ls('l5')); r.tFlip = at('flip', 1, Ls('l5')); r.tNob = at('nobody', 0, Ls('l5'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.5);
      r.stage.style.opacity = k;
      for (let i = 0; i < 6; i++) { const p = r['fcp' + i]; const lit = T > r.tGas + i * 0.08; p.setAttribute('fill', lit ? `rgba(56,189,248,${0.6 + 0.4 * Math.sin(T * 9 + i)})` : '#1f2937'); p.setAttribute('r', lit ? 10 : 7); }
      r.sx.style.opacity = A(T, r.tSX - 0.6, 0.4);
      const f = P(T, r.tFlip - 0.15, 1.3);
      const y = Math.sin(f * Math.PI) * 200, rot = E.io(f) * -360;
      r.car.style.transform = `translateY(${-y}px) rotate(${rot}deg)`;
      for (let i = 0; i < 14; i++) {
        const q = P(T, r.tFlip - 0.2 + (i % 7) * 0.025, 0.8);
        const x = 150 + 70 + (i < 7 ? 0 : 450) + (i % 7) * 10, yy = 560 + q * 90 - (i % 3) * 10;
        tf(r['pf' + i], x, yy, 1 + q * 4, 0, q > 0 && q < 1 ? (1 - q) : 0);
      }
      const ck = pop(T, r.tNob - 0.1, 0.45);
      r.cock.style.opacity = clamp(ck); r.cock.style.transform = `scale(${lerp(0.6, 1, clamp(ck))})`;
      if (r.real) { const show = T > r.tFlip - 0.3 && T < r.tNob - 0.2; r.clipbox.style.opacity = show ? 1 : 0; if (show) seekVideo(r.vid, CLIPIN.ramp + (T - r.tFlip + 0.3)); }
    },
  });

  // ============ 6. GTA ============
  V.scene({
    name: 'gta', theme: 'dark', glow: [255, 120, 60], from: Ls('l6'),
    build(root) {
      const real = hasClip('gta');
      let traffic = '';
      for (let i = 0; i < 3; i++) traffic += `<div class="abs" data-k="tr${i}" style="left:0;top:0">${CAR(150, { body: ['#64748b', '#0ea5e9', '#a16207'][i], glass: '#111827' })}</div>`;
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="card" data-k="top" style="left:70px;top:450px;width:940px;height:300px;padding:24px 30px;overflow:hidden">
          <div style="display:flex;align-items:center;gap:14px">${LOGO('tesla', 34)}<span style="font-size:40px;font-weight:900">Roadster · Rocket</span></div>
          <div class="mono" style="font-size:22px;color:var(--sub);margin-top:6px">invite only · price not announced</div>
          <div class="abs" style="right:30px;top:90px">${CAR(420, { ports: true, k: 'tc' })}</div></div>
        <div class="abs" data-k="game" style="left:70px;top:790px;width:940px;height:520px;border-radius:26px;overflow:hidden;background:linear-gradient(#f59e0b 0%,#fb7185 35%,#312e81 75%)">
          ${real ? clipHTML('gta') : `
          <div class="abs" style="left:0;right:0;top:330px;bottom:0;background:linear-gradient(#3f3f46,#18181b)"></div>
          <div class="abs" style="left:0;right:0;top:420px;height:8px;background:repeating-linear-gradient(90deg,#facc15 0 60px,transparent 60px 120px)" data-k="lane"></div>
          ${traffic}
          <div class="abs" data-k="hero" style="left:0;top:0">${CAR(260, { body: '#111827', glass: '#ef4444' })}</div>
          <div class="abs" data-k="flame" style="left:0;top:0;width:120px;height:30px;border-radius:15px;background:linear-gradient(90deg,transparent,#f97316,#fde047)"></div>
          <div class="abs" style="left:24px;bottom:24px;width:150px;height:150px;border-radius:50%;border:5px solid #000;background:#4d7c0f;opacity:.85"></div>
          <div class="abs" style="left:190px;bottom:30px;width:300px;height:22px;border:3px solid #000;border-radius:4px;background:rgba(0,0,0,.4)"><div data-k="boost" style="height:100%;width:100%;background:#38bdf8"></div></div>
          <div class="abs" style="left:190px;bottom:58px;font-weight:900;font-size:22px;color:#fff;text-shadow:0 2px 0 #000">BOOST</div>
          <div class="abs" data-k="cash" style="right:26px;top:20px;font-weight:900;font-size:44px;color:#86efac;text-shadow:0 3px 0 #000;font-family:'JetBrains Mono'"></div>`}
          <div class="abs" data-k="btn" style="left:30px;top:30px;width:70px;height:70px;border-radius:50%;background:#1e3a8a;border:5px solid #93c5fd;color:#fff;font-weight:900;font-size:34px;display:flex;align-items:center;justify-content:center">A</div>
          <div class="abs mono" style="right:24px;bottom:16px;font-size:18px;color:#fff;text-shadow:0 1px 2px #000">${real ? 'GTA Online · Rocket Voltic (Rockstar Games)' : 'illustration · GTA Online Rocket Voltic style boost'}</div>
        </div>
        <div class="abs" data-k="price" style="left:0;right:0;top:1340px;text-align:center"><span class="chip" style="font-size:30px;border-color:var(--rd)">GTA: in-game cash · Tesla: real money</span></div>
      </div>`);
      r.real = real; r.t0 = Ls('l6'); r.tGTA = at('gta', 0, Ls('l6')); r.tPress = at('press', 0, Ls('l6')); r.tBoost = at('boosts', 0, Ls('l6')); r.tHop = at('hops', 0, Ls('l6')); r.tMoney = at('costs', 0, Ls('l6'));
      return r;
    },
    update(T, r) {
      const a = A(T, r.t0, 0.5); r.top.style.opacity = a; r.top.style.transform = `translateY(${(1 - a) * 30}px)`;
      const g = A(T, r.tGTA - 0.5, 0.5); r.game.style.opacity = g; r.game.style.transform = `translateY(${(1 - g) * 50}px)`;
      for (let i = 0; i < 6; i++) { const p = r['tcp' + i]; if (p) { const lit = T > r.tBoost; p.setAttribute('fill', lit ? '#38bdf8' : '#1f2937'); } }
      const pr = P(T, r.tPress - 0.05, 0.3);
      r.btn.style.opacity = A(T, r.tPress - 0.3, 0.2) * (1 - A(T, r.tHop + 0.8, 0.3));
      r.btn.style.transform = `scale(${pr > 0 && pr < 1 ? 0.8 : 1})`;
      if (r.real) { seekVideo(r.vid, CLIPIN.gta + (T - r.tGTA + 0.5)); }
      else {
        const run = Math.max(0, T - r.tGTA + 0.5);
        const boost = P(T, r.tBoost - 0.05, 1.4);
        const spd = 220 + (boost > 0 && boost < 1 ? 900 : 0);
        r.lane.style.backgroundPosition = `${-run * 400 - boost * 900}px 0`;
        const hop = P(T, r.tHop - 0.2, 1.1);
        const hx = lerp(80, 200, E.out(boost)), hy = 300 - Math.sin(hop * Math.PI) * 190;
        tf(r.hero, hx, hy, 1, hop > 0 && hop < 1 ? -10 * Math.sin(hop * Math.PI) : 0, 1);
        r.flame.style.opacity = boost > 0 && boost < 1 ? 1 : 0;
        tf(r.flame, hx - 110, hy + 50, 1 + 0.2 * Math.sin(T * 40), 0, boost > 0 && boost < 1 ? 1 : 0);
        for (let i = 0; i < 3; i++) { const x = ((560 + i * 260 - run * 120 - boost * 300) % 900 + 900) % 900; tf(r['tr' + i], x, 360, 1, 0, 1); }
        r.boost.style.width = (100 - boost * 100 + P(T, r.tBoost + 1.6, 3) * 100) + '%';
        r.cash.textContent = '$' + fmt(1250000 + run * 1200);
      }
      const pk = pop(T, r.tMoney, 0.4); r.price.style.opacity = clamp(pk); r.price.style.transform = `scale(${lerp(0.7, 1, clamp(pk))})`;
    },
  });

  // ============ 7. Spec sheet ============
  const SPECS = [
    ['Production', '2028', 'per Elon, on stage*'],
    ['0-60 mph', '0.59 s', 'as little as · live demo: 0.81 s'],
    ['Range', '300+ mi', ''],
    ['Top speed', '230+ mph', 'Elon: maybe Mach 0.5 (half in jest)'],
    ['It can...', 'fly', 'short thruster hops'],
    ['Suction downforce', 'up to 2G', 'even standing still'],
    ['Thrusters', 'cold gas', 'perimeter mounted · with SpaceX'],
    ['Aero', 'active', 'deploying wings'],
    ['Steering', 'by wire', ''],
    ['Materials', 'Mg · Ti · CF', 'magnesium, titanium, carbon fiber'],
  ];
  V.scene({
    name: 'specs', theme: 'light', glow: [255, 255, 255], from: Ls('l7'),
    build(root) {
      let rows = '';
      SPECS.forEach(([k, v, s], i) => rows += `<div data-k="s${i}" style="display:flex;align-items:center;height:76px;border-bottom:1px solid var(--line);gap:18px">
        <span class="mono" style="width:40px;color:var(--mute);font-size:20px">${String(i + 1).padStart(2, '0')}</span>
        <span style="width:300px;font-size:28px;font-weight:600;color:var(--sub)">${k}</span>
        <span style="flex:1"><span style="font-size:36px;font-weight:900;letter-spacing:-.5px">${v}</span>${s ? `<span class="mono" style="display:block;font-size:17px;color:var(--mute);margin-top:2px">${s}</span>` : ''}</span></div>`);
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="card" data-k="sheet" style="left:60px;top:440px;width:960px;padding:24px 34px">
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:8px">${LOGO('tesla', 34, { theme: 'light' })}<span style="font-size:34px;font-weight:900">Roadster · what they claimed</span><span style="flex:1"></span><span class="pill" style="background:#fee2e2;color:#b91c1c">TESLA'S CLAIMS</span></div>
          ${rows}</div>
        <div class="abs mono" data-k="foot" style="left:60px;top:1290px;font-size:18px;color:var(--mute)">*not on Tesla's site. No price announced.</div>
        <div class="abs" data-k="eye" style="right:90px;top:400px;font-size:70px">👀</div></div>`);
      r.t0 = Ls('l7'); r.tLook = at('look', 0, Ls('l7'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.4); r.sheet.style.opacity = k; r.sheet.style.transform = `translateY(${(1 - k) * 40}px)`;
      SPECS.forEach((_, i) => { const a = A(T, r.t0 + 0.4 + i * 0.62, 0.35); r['s' + i].style.opacity = a; r['s' + i].style.transform = `translateX(${(1 - a) * 40}px)`; });
      r.foot.style.opacity = A(T, r.t0 + 6.6, 0.4);
      const e = pop(T, r.tLook, 0.4); r.eye.style.opacity = clamp(e); r.eye.style.transform = `scale(${clamp(e)}) rotate(${Math.sin(T * 6) * 8}deg)`;
    },
  });

  // ============ 8. Timer ============
  V.scene({
    name: 'timer', theme: 'dark', glow: [255, 90, 90], from: Ls('l8'),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="abs" style="left:0;right:0;top:470px;text-align:center">
          <div class="lbl" data-k="lab">0 to 60 mph</div>
          <div class="mono" data-k="big" style="font-size:210px;font-weight:700;letter-spacing:-6px;line-height:1.1">0.00</div>
          <div data-k="claim" style="margin-top:4px"><span class="chip" style="font-size:28px;border-color:var(--orl);color:var(--orl)">0.59 s · Tesla's claim</span></div></div>
        <div class="abs" data-k="live" style="left:110px;top:950px;width:860px;height:330px;border-radius:24px;overflow:hidden;background:#0b0d12;border:2px solid rgba(255,255,255,.12)">
          ${hasClip('live') ? clipHTML('live') : `<div class="abs" style="inset:0;background:radial-gradient(ellipse at 50% 90%,#2b3550,#0b0d12 70%)"></div><div class="abs" data-k="lcar" style="left:0;top:170px">${CAR(330)}</div>`}
          <span class="pill abs" style="left:18px;top:16px;background:#ef4444;color:#fff">LIVE RUN</span>
          <div class="abs" data-k="hole" style="right:18px;top:16px;width:210px;height:80px;border:4px dashed #f87171;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#f87171;font-weight:800;font-size:22px" class="mono">timer: none</div>
          <div class="abs mono" style="left:18px;bottom:12px;font-size:16px;color:rgba(255,255,255,.6)">${hasClip('live') ? 'Tesla livestream, Oct 15' : 'illustration · per Jalopnik, no on-screen timing was shown'}</div></div>
        <div class="abs" data-k="bro" style="left:0;right:0;top:1300px;text-align:center">${STAMP('SOURCE: TRUST ME BRO', '#f87171', 40)}</div>
      </div>`);
      r.t0 = Ls('l8'); r.t59 = at('0.59', 0, Ls('l8')); r.tClaim = at('claim', 0, Ls('l8')); r.tLive = at('live', 0, Ls('l8')); r.t81 = at('0.81', 0, Ls('l8'));
      r.tTimer = at('timer', 0, Ls('l8')); r.tBro = at('trust', 0, Ls('l8'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.4);
      let v = 0;
      if (T > r.t59 - 0.6) v = E.out(P(T, r.t59 - 0.6, 0.7)) * 0.59;
      if (T > r.t81 - 0.9) v = E.io(P(T, r.t81 - 0.9, 0.9)) * 0.81;
      r.big.textContent = v.toFixed(2);
      r.big.style.color = T > r.t81 - 0.9 ? '#f87171' : '';
      r.lab.textContent = T > r.t81 - 0.9 ? 'live run, as reported' : '0 to 60 mph';
      r.big.parentElement.style.opacity = k;
      const ck = A(T, r.tClaim - 0.2, 0.3); r.claim.style.opacity = ck;
      const lk = A(T, r.tLive - 0.3, 0.4); r.live.style.opacity = lk; r.live.style.transform = `translateY(${(1 - lk) * 40}px)`;
      if (r.lcar) { const f = P(T, r.t81 - 0.9, 0.9); r.lcar.style.transform = `translateX(${lerp(40, 560, E.in(f))}px)`; }
      if (r.vid) seekVideo(r.vid, CLIPIN.live + (T - r.tLive + 0.3));
      const hk = pop(T, r.tTimer - 0.1, 0.4); r.hole.style.opacity = clamp(hk); r.hole.style.transform = `scale(${lerp(0.6, 1, clamp(hk))})`;
      const bk = E.back(P(T, r.tBro - 0.1, 0.35), 2); r.bro.style.opacity = clamp(bk * 3); r.bro.style.transform = `scale(${lerp(2, 1, clamp(bk))}) rotate(-4deg)`;
    },
  });

  // ============ 9. Hop ============
  V.scene({
    name: 'hop', theme: 'light', glow: [255, 255, 255], from: Ls('l9'),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="abs" style="left:0;right:0;top:470px;text-align:center;font-size:84px;font-weight:900;letter-spacing:-2px"><span data-k="h1" style="position:relative;display:inline-block">flying car<span class="strike" data-k="st" style="width:0;height:8px"></span></span>
          <div data-k="h2" style="color:var(--bl)">hopping car</div></div>
        <div class="card" data-k="ch" style="left:80px;top:760px;width:920px;height:500px;padding:28px">
          <div class="lbl">altitude · illustration</div>
          <svg width="860" height="380" style="margin-top:20px"><line x1="0" y1="340" x2="860" y2="340" stroke="rgba(0,0,0,.2)" stroke-width="3"/>
            <path data-k="path" d="" stroke="var(--vi)" stroke-width="7" fill="none" stroke-linejoin="round" stroke-linecap="round"/></svg>
          <div class="abs" data-k="tag" style="right:40px;top:40px"><span class="chip" style="font-size:26px">bursts, not flight</span></div></div>
        <div class="abs" data-k="cost" style="left:0;right:0;top:1290px;text-align:center"><span style="font-size:44px;font-weight:900">very expensive hop</span> <span class="mono" style="font-size:24px;color:var(--mute)">price: not announced</span></div>
      </div>`);
      r.t0 = Ls('l9'); r.tCalm = at('calm', 0, Ls('l9')); r.tB = at('bursts', 0, Ls('l9')); r.tHop = at('expensive', 0, Ls('l9'));
      return r;
    },
    update(T, r) {
      r.h1.style.opacity = A(T, r.t0, 0.3);
      r.st.style.width = (E.out(P(T, r.tCalm, 0.3)) * 100) + '%';
      r.h1.style.color = T > r.tCalm ? 'var(--mute)' : '';
      const h2 = pop(T, r.tCalm + 0.3, 0.4); r.h2.style.opacity = clamp(h2); r.h2.style.transform = `scale(${lerp(0.7, 1, clamp(h2))})`;
      const ck = A(T, r.tCalm + 0.4, 0.4); r.ch.style.opacity = ck;
      const prog = clamp((T - r.tCalm - 0.4) / 3.2);
      let d = 'M0 340';
      for (let x = 0; x <= 860 * prog; x += 6) {
        const u = x / 860; const bump = [0.15, 0.4, 0.68, 0.9].reduce((s, c) => s + Math.max(0, 1 - Math.abs(u - c) / 0.05) * 220, 0);
        d += ` L${x} ${340 - bump}`;
      }
      r.path.setAttribute('d', d);
      r.tag.style.opacity = A(T, r.tB - 0.1, 0.3);
      const c = pop(T, r.tHop - 0.1, 0.4); r.cost.style.opacity = clamp(c); r.cost.style.transform = `scale(${lerp(0.8, 1, clamp(c))})`;
    },
  });

  // ============ 10. 2028 ============
  V.scene({
    name: 'y2028', theme: 'dark', glow: [140, 120, 255], from: Ls('l10'),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div data-k="ph">${PHOTO(ELON2.src, ELON2.credit, 420, 540, 'left:70px;top:460px')}</div>
        <div class="card" data-k="cal" style="left:540px;top:470px;width:440px;height:300px;overflow:hidden;text-align:center">
          <div style="background:#ef4444;color:#fff;font-weight:800;font-size:30px;padding:14px">PRODUCTION</div>
          <div class="mono" style="font-size:120px;font-weight:700;margin-top:20px">2028<span style="color:var(--orl)">*</span></div></div>
        <div class="card" data-k="pr" style="left:540px;top:800px;width:440px;height:96px;display:flex;align-items:center;gap:16px;padding:0 24px;font-size:28px;font-weight:700">📄 press release<span style="flex:1"></span><span style="color:#f87171;font-size:40px">✕</span></div>
        <div class="card" data-k="ws" style="left:540px;top:916px;width:440px;height:96px;display:flex;align-items:center;gap:16px;padding:0 24px;font-size:28px;font-weight:700">🌐 date on site<span style="flex:1"></span><span style="color:#f87171;font-size:40px">✕</span></div>
        <div class="card" data-k="q" style="left:70px;top:1050px;width:600px;padding:22px 28px;font-size:30px;color:var(--sub)">"When does production start?"</div>
        <div class="card" data-k="a" style="left:300px;top:1170px;width:690px;padding:26px 32px;border-color:var(--orl)">
          <div style="font-size:60px;font-weight:900;letter-spacing:-1px">"2028, actually."</div><div class="mono" style="font-size:20px;color:var(--mute);margin-top:6px">Elon Musk, on stage, Oct 15 · that's it</div></div>
      </div>`);
      r.t0 = Ls('l10'); r.t28 = at('2028', 0, Ls('l10')); r.tPr = at('press', 0, Ls('l10')); r.tWs = at('website', 0, Ls('l10')); r.tAsk = at('somebody', 0, Ls('l10')); r.tA = at('2028', 1, Ls('l10')); r.tCom = at('commitment', 0, Ls('l10'));
      return r;
    },
    update(T, r) {
      const p = A(T, r.t0, 0.5); r.ph.firstElementChild.style.opacity = p; r.ph.firstElementChild.style.transform = `scale(${lerp(1.06, 1, p)})`;
      const c = pop(T, r.t28 - 0.1, 0.45); r.cal.style.opacity = clamp(c); r.cal.style.transform = `rotate(${lerp(-8, 0, clamp(c))}deg) scale(${lerp(0.7, 1, clamp(c))})`;
      [['pr', r.tPr], ['ws', r.tWs]].forEach(([k, t]) => { const a = A(T, t - 0.2, 0.35); r[k].style.opacity = a; r[k].style.transform = `translateX(${(1 - a) * 60}px)`; });
      const q = A(T, r.tAsk - 0.1, 0.35); r.q.style.opacity = q; r.q.style.transform = `translateY(${(1 - q) * 20}px)`;
      const a = pop(T, r.tA - 0.15, 0.45); r.a.style.opacity = clamp(a); r.a.style.transform = `scale(${lerp(0.7, 1, clamp(a))})`;
      r.a.style.boxShadow = T > r.tCom ? `0 0 ${40 * A(T, r.tCom, 0.4)}px rgba(232,121,75,.5), var(--shadow)` : '';
    },
  });

  // ============ 11. Reservation ============
  V.scene({
    name: 'reserve', theme: 'light', glow: [255, 255, 255], from: Ls('l11'),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="win" data-k="w" style="left:90px;top:450px;width:900px;height:860px">
          <div class="bar"><i></i><i></i><i></i><span class="tt">Reserve your Roadster · recreation</span></div>
          <div style="padding:34px 40px">
            <div style="display:flex;align-items:center;gap:14px">${LOGO('tesla', 40, { theme: 'light' })}<span style="font-size:46px;font-weight:900">Roadster</span></div>
            <div style="display:flex;justify-content:space-between;margin-top:30px;font-size:32px"><span style="color:var(--sub)">Vehicle price</span><span data-k="price" class="mono" style="font-weight:700"></span></div>
            <div style="height:1px;background:var(--line);margin:24px 0"></div>
            <div style="display:flex;justify-content:space-between;font-size:32px"><span style="color:var(--sub)">Reservation</span><span data-k="res" class="mono" style="font-weight:800"></span></div>
            <div data-k="r1" style="margin-top:26px;display:flex;align-items:center;gap:16px;font-size:30px"><span data-k="c1" style="width:40px;height:40px;border-radius:50%;border:3px solid var(--line)"></span>Due now<span style="flex:1"></span><span class="mono" style="font-weight:700">$5,000</span></div>
            <div data-k="r2" style="margin-top:18px;display:flex;align-items:center;gap:16px;font-size:30px"><span style="width:40px;height:40px;border-radius:50%;border:3px solid var(--line)"></span>Due within 10 days<span style="flex:1"></span><span class="mono" style="font-weight:700">$45,000</span></div>
            <div data-k="btn" style="margin-top:34px;height:84px;border-radius:14px;background:var(--fg);color:var(--bg);display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800">Place reservation</div>
            <div data-k="cd" style="margin-top:30px;text-align:center"><span class="mono" data-k="cdt" style="font-size:44px;font-weight:700"></span><div class="lbl" style="margin-top:6px">left to pay the rest</div></div>
          </div>
          <div class="abs" data-k="cx" style="left:120px;top:560px">${STAMP('RESERVATION CANCELED', '#ef4444', 44)}</div>
        </div>
        ${CURSOR()}</div>`);
      r.t0 = Ls('l11'); r.tPrice = at('price', 0, Ls('l11')); r.tRes = at('fifty', 0, Ls('l11')); r.tNow = at('five', 0, Ls('l11')); r.tRest = at('forty-five', 0, Ls('l11')); r.tLose = at('lose', 0, Ls('l11'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.5); r.w.style.opacity = k; r.w.style.transform = `translateY(${(1 - k) * 40}px)`;
      r.price.textContent = T > r.tPrice - 0.1 ? 'not announced' : '';
      r.price.style.color = 'var(--rd)';
      const rv = E.out(P(T, r.tRes - 0.2, 0.8)) * 50000; r.res.textContent = T > r.tRes - 0.2 ? '$' + fmt(rv) : '';
      [['r1', r.tNow], ['r2', r.tRest]].forEach(([n, t]) => { const a = A(T, t - 0.2, 0.3); r[n].style.opacity = a; });
      const click = r.tNow + 0.4;
      moveCursor(r, T, [[r.tNow - 0.6, 800, 1400], [click - 0.05, 540, 1065]], [click]);
      r.btn.style.background = T > click ? 'var(--gr)' : ''; r.btn.textContent = T > click ? '$5,000 paid ✓' : 'Place reservation';
      r.c1.style.background = T > click ? 'var(--gr)' : 'transparent';
      const cdk = A(T, r.tRest + 0.2, 0.3); r.cd.style.opacity = cdk;
      const left = Math.max(0, 10 - E.in(P(T, r.tRest + 0.3, r.tLose - r.tRest)) * 10);
      const dd = Math.floor(left), hh = Math.floor((left - dd) * 24);
      r.cdt.textContent = `${dd}d ${String(hh).padStart(2, '0')}h`;
      r.cdt.style.color = left < 2 ? 'var(--rd)' : '';
      const x = E.back(P(T, r.tLose + 0.1, 0.35), 2); r.cx.style.opacity = clamp(x * 3); r.cx.style.transform = `scale(${lerp(2, 1, clamp(x))}) rotate(-8deg)`;
    },
  });

  // ============ 12. 2017 ============
  V.scene({
    name: 'h2017', theme: 'dark', glow: [255, 170, 80], from: Ls('l12'),
    build(root) {
      const real = hasClip('r2017');
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="abs" data-k="pf" style="left:60px;top:450px;width:960px;height:560px;border-radius:26px;overflow:hidden;box-shadow:var(--shadow);filter:sepia(.25)">
          ${real ? clipHTML('r2017') : `<img data-k="img" src="${R2017.src}" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover">`}
          <div class="abs mono" style="left:0;right:0;bottom:0;padding:12px 16px;font-size:16px;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.75))">${real ? 'Tesla · Semi & Roadster unveil, Nov 16, 2017' : R2017.credit}</div>
          <div class="abs" style="left:20px;top:18px;padding:8px 16px;border-radius:8px;background:rgba(0,0,0,.6);font-family:'JetBrains Mono';font-size:24px;color:#fde68a;font-weight:700">NOV 16, 2017</div></div>
        <div class="abs" data-k="semi" style="left:60px;top:1030px;width:960px;height:150px">
          <div class="abs" style="left:60px;top:20px;width:600px;height:110px;border-radius:10px;background:#3f3f46;border:3px solid #71717a"></div>
          <div class="abs" style="left:660px;top:50px;width:120px;height:80px;border-radius:10px 30px 8px 8px;background:#52525b"></div>
          <div class="abs" data-k="mini" style="left:0;top:40px">${CAR(220)}</div>
          <span class="abs mono" style="left:70px;top:-10px;font-size:20px;color:var(--sub)">out of the back of a semi</span></div>
        <div class="abs" style="left:60px;top:1210px;width:960px;display:flex;gap:16px;justify-content:center" data-k="chips">
          <span class="chip" data-k="k1" style="font-size:30px">620 mi range</span><span class="chip" data-k="k2" style="font-size:30px">4 seats</span><span class="chip" data-k="k3" style="font-size:30px;border-color:var(--orl);color:var(--orl)">on sale 2020</span></div>
      </div>`);
      r.real = real; r.t0 = Ls('l12'); r.t17 = at('2017', 0, Ls('l12')); r.tSemi = at('drove', 0, Ls('l12')); r.tR = at('six', 0, Ls('l12')); r.tS = at('four', 0, Ls('l12')); r.t20 = at('2020', 0, Ls('l12'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.6); r.pf.style.opacity = k;
      if (r.real) seekVideo(r.vid, CLIPIN.r2017 + (T - r.t0));
      else if (r.img) r.img.style.transform = `scale(${1.05 + (T - r.t0) * 0.012}) translateX(${-(T - r.t0) * 4}px)`;
      const s = A(T, r.tSemi - 0.3, 0.4); r.semi.style.opacity = s;
      r.mini.style.transform = `translateX(${lerp(380, 760, E.io(P(T, r.tSemi, 1.4)))}px)`;
      [['k1', r.tR], ['k2', r.tS], ['k3', r.t20]].forEach(([n, t]) => { const a = pop(T, t - 0.1, 0.4); r[n].style.opacity = clamp(a); r[n].style.transform = `scale(${lerp(0.6, 1, clamp(a))})`; });
    },
  });

  // ============ 13. Slips ============
  V.scene({
    name: 'slips', theme: 'light', glow: [255, 255, 255], from: Ls('l13'),
    build(root) {
      const items = [['2020', 'on sale', at('came', 0, Ls('l13')), 'x'], ['2023', 'new target', at('2023', 0, Ls('l13')), 'x'],
        ['APR 2026', 'unveil', at('april', 0, Ls('l13')), 'x'], ['AUG 2026', 'unveil', at('august', 0, Ls('l13')), 'x'],
        ['OCT 1', 'unveil', at('october', 0, Ls('l13')), 'x'], ['OCT 15', 'unveil happened', at('fifteenth', 0, Ls('l13')), 'ok']];
      let h = '';
      items.forEach(([d, s], i) => h += `<div class="abs" data-k="i${i}" style="left:${i % 2 ? 560 : 100}px;top:${470 + Math.floor(i / 2) * 290}px;width:420px;height:250px">
        <div class="card" style="position:absolute;inset:0;overflow:hidden;text-align:center"><div data-k="hd${i}" style="background:#ef4444;color:#fff;font-weight:800;font-size:22px;padding:10px;letter-spacing:2px">${s.toUpperCase()}</div>
          <div class="mono" style="font-size:68px;font-weight:700;margin-top:34px">${d}</div></div>
        <div class="abs" data-k="x${i}" style="left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:220px;font-weight:300;color:${s === 'unveil happened' ? 'var(--gr)' : 'rgba(239,68,68,.85)'}">${s === 'unveil happened' ? '✓' : '✕'}</div></div>`);
      const r = el(root, `<div class="abs" style="inset:0">${h}<div class="abs" data-k="nr" style="left:560px;top:520px"></div></div>`);
      r.items = items; r.tNo = at('no', 0, Ls('l13'));
      return r;
    },
    update(T, r) {
      r.items.forEach((it, i) => {
        const t = it[2], ap = pop(T, t - 0.35, 0.45);
        const box = r['i' + i]; box.style.opacity = clamp(ap); box.style.transform = `scale(${lerp(0.7, 1, clamp(ap))}) rotate(${(i % 2 ? 2 : -2) * (1 - clamp(ap))}deg)`;
        const xk = E.back(P(T, (i === 0 ? r.tNo : t + 0.3), 0.3), 2); r['x' + i].style.opacity = clamp(xk * 2); r['x' + i].style.transform = `scale(${lerp(1.6, 1, clamp(xk))})`;
        if (it[1] === 'unveil happened') r['hd' + i].style.background = 'var(--gr)';
      });
    },
  });

  // ============ 14. Halves ============
  V.scene({
    name: 'halves', theme: 'dark', glow: [255, 120, 80], from: Ls('l14'),
    build(root) {
      const seat = (k) => `<div data-k="${k}" style="width:110px;height:130px;border-radius:30px 30px 14px 14px;background:#3f3f46;border:4px solid #a1a1aa;display:inline-block;margin:0 10px"></div>`;
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="card" style="left:70px;top:460px;width:940px;height:360px;padding:32px 40px" data-k="c1">
          <div class="lbl">range</div>
          <div style="display:flex;align-items:center;gap:20px;margin-top:40px"><span class="mono" style="width:90px;font-size:26px;color:var(--sub)">2017</span><div style="flex:1;height:46px;border-radius:12px;background:rgba(255,255,255,.08)"><div style="height:100%;width:100%;border-radius:12px;background:#a1a1aa"></div></div><span class="mono" style="width:150px;font-size:34px;font-weight:700">620 mi</span></div>
          <div style="display:flex;align-items:center;gap:20px;margin-top:30px"><span class="mono" style="width:90px;font-size:26px;color:var(--orl)">2026</span><div style="flex:1;height:46px;border-radius:12px;background:rgba(255,255,255,.08)"><div data-k="bar" style="height:100%;width:100%;border-radius:12px;background:var(--or)"></div></div><span class="mono" data-k="rv" style="width:150px;font-size:34px;font-weight:700;color:var(--orl)"></span></div></div>
        <div class="card" style="left:70px;top:860px;width:940px;height:400px;padding:32px 40px;text-align:center" data-k="c2">
          <div class="lbl" style="text-align:left">seats</div>
          <div style="margin-top:50px">${seat('s0')}${seat('s1')}${seat('s2')}${seat('s3')}</div>
          <div class="mono" data-k="sv" style="font-size:40px;font-weight:700;margin-top:30px"></div></div>
      </div>`);
      r.t0 = Ls('l14'); r.tR = at('half', 0, Ls('l14')); r.tS = at('half', 1, Ls('l14'));
      return r;
    },
    update(T, r) {
      const a = A(T, r.t0, 0.4); r.c1.style.opacity = a; const b = A(T, r.t0 + 0.3, 0.4); r.c2.style.opacity = b;
      const f = E.io(P(T, r.tR - 0.1, 0.8)); r.bar.style.width = lerp(100, 48.4, f) + '%'; r.rv.textContent = (T > r.tR - 0.1 ? '300+' : '620') + ' mi';
      const g = P(T, r.tS - 0.1, 0.6);
      for (let i = 0; i < 4; i++) { const s = r['s' + i]; if (i >= 2) { s.style.opacity = 1 - E.io(g); s.style.transform = `translateY(${E.in(g) * 120}px) rotate(${E.in(g) * 25}deg)`; } else { s.style.borderColor = T > r.tS ? 'var(--orl)' : '#a1a1aa'; } }
      r.sv.textContent = T > r.tS ? '4 → 2' : '4';
    },
  });

  // ============ 15. Close ============
  V.scene({
    name: 'close', theme: 'dark', glow: [140, 120, 255], from: Ls('l15'),
    build(root) {
      const row = (k, t, ok) => `<div class="card" data-k="${k}" style="position:relative;height:110px;display:flex;align-items:center;padding:0 34px;font-size:40px;font-weight:800;margin-bottom:22px">${t}<span style="flex:1"></span><span data-k="${k}m" style="font-size:60px;color:${ok ? 'var(--gr)' : '#f87171'}">${ok ? '✓' : '✕'}</span></div>`;
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="abs" data-k="list" style="left:110px;top:460px;width:860px">${row('k1', 'Kickflip', 1)}${row('k2', 'GTA-style hop', 1)}${row('k3', 'Hit a deadline', 0)}</div>
        <div class="card" data-k="cal" style="left:330px;top:900px;width:420px;height:290px;overflow:hidden;text-align:center">
          <div style="background:#ef4444;color:#fff;font-weight:800;font-size:28px;padding:12px">PRODUCTION</div>
          <div class="mono" data-k="yr" style="font-size:110px;font-weight:700;margin-top:20px"></div></div>
        <div class="abs" data-k="sure" style="left:0;right:0;top:1230px;text-align:center;font-size:44px;font-weight:800;color:var(--sub)">sure. we'll see.</div>
        <div class="abs" data-k="end" style="left:0;right:0;top:640px;text-align:center">
          <div style="font-size:84px;font-weight:900;letter-spacing:-2px;line-height:1.1">Kickflips: <span style="color:var(--gr)">delivered.</span><br>Deadlines: <span style="color:var(--orl)">pending.</span></div>
          <div style="margin-top:50px;display:inline-block">${CAR(520)}</div></div>
      </div>`);
      r.t0 = Ls('l15'); r.t1 = at('kickflip', 0, Ls('l15')); r.t2 = at('hop', 0, Ls('l15')); r.t3 = at('deadline', 0, Ls('l15')); r.t28 = at('2028', 0, Ls('l15')); r.tSure = at('sure', 0, Ls('l15'));
      r.tEnd = r.tSure + 1.3;
      return r;
    },
    update(T, r) {
      const out = A(T, r.tEnd, 0.5);
      [['k1', r.t1], ['k2', r.t2], ['k3', r.t3]].forEach(([k, t], i) => {
        const a = A(T, t - 0.3, 0.35); r[k].style.opacity = a * (1 - out); r[k].style.transform = `translateX(${(1 - a) * 60}px)`;
        const m = E.back(P(T, t + 0.1, 0.35), 2); r[k + 'm'].style.opacity = clamp(m * 2); r[k + 'm'].style.display = 'inline-block'; r[k + 'm'].style.transform = `scale(${lerp(2, 1, clamp(m))})`;
        if (i === 2) r[k].style.borderColor = T > t + 0.1 ? '#f87171' : '';
      });
      const c = pop(T, r.t28 - 0.3, 0.4); r.cal.style.opacity = clamp(c) * (1 - out); r.cal.style.transform = `scale(${lerp(0.7, 1, clamp(c))})`;
      const yrs = [2020, 2023, 2026, 2027, 2028];
      const yi = Math.min(4, Math.floor(P(T, r.t28 - 0.2, 0.9) * 5));
      r.yr.innerHTML = T > r.tSure - 0.1 ? '2028<span style="color:var(--orl)">?</span>' : String(yrs[yi]);
      const s = A(T, r.tSure, 0.3); r.sure.style.opacity = s * (1 - out);
      const e = A(T, r.tEnd, 0.6); r.end.style.opacity = e; r.end.style.transform = `translateY(${(1 - e) * 30}px)`;
      r.end.lastElementChild.style.transform = `translateX(${Math.sin(T * 1.3) * 14}px)`;
    },
  });
};

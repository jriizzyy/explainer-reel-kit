// Video 02 · "This new model just exposed why we may be overpaying for Claude"
window.KEYS = ['Jev', 'decision-only', 'LLM', 'spam?', 'retry', 'tool', 'human', 'Thousands', 'flagship-model', 'possible', 'probability',
  'multiple-choice', 'exam', 'Almeida', 'RLHF', 'instructions', 'betting', 'cheaper', 'invent', 'format', 'schema', 'off-script', 'System', 'fast', 'word-by-word',
  'gut', 'essay', '50', 'nothing', 'thinking', 'choosing', 'decisions', 'costume?', 'smartest', 'expensive'];

window.setup = function () {
  const at = (w, n = 0, after = 0) => V.at(w, n, after);
  const Ls = id => V.lines[id].start;

  // ============ 1. Hook: the model card ============
  V.scene({
    name: 'card', theme: 'dark', glow: [110, 80, 255],
    from: 0,
    build(root, s) {
      const names = ['chat-xl', 'LLM 70B', 'reasoner', 'code-pro', 'chat-mini', 'vision-2', 'LLM 8B', 'assistant', 'writer', 'chat-4', 'agent-1', 'LLM 405B',
        'coder', 'summarizer', 'chat-lite', 'LLM 13B', 'thinker', 'chat-max', 'LLM 1B', 'planner', 'chat-pro', 'LLM 32B', 'tutor', 'chat-turbo'];
      let chips = '';
      names.forEach((n, i) => { chips += `<div class="chip mono abs" data-k="c${i}" style="font-size:24px;font-weight:500;color:var(--sub)">${n}</div>`; });
      const r = el(root, `<div class="abs" style="inset:0">${chips}
        <div class="card" data-k="card" style="left:150px;top:610px;width:780px;padding:44px 48px;transform-origin:390px 300px">
          <div style="display:flex;align-items:center;gap:22px">
            <div data-k="mark">${JEV_MARK(84)}</div>
            <div><div style="font-size:66px;font-weight:800;letter-spacing:-1px;line-height:1">Jev</div>
              <div class="mono" style="font-size:24px;color:var(--mute);margin-top:8px">by TypeSafe AI</div></div>
            <div style="flex:1"></div>
            <span class="pill" data-k="newp" style="background:var(--vi);color:#fff">NEW MODEL</span>
          </div>
          <div style="height:1px;background:var(--line);margin:34px 0 22px"></div>
          <div class="lbl" data-k="caplbl">Capabilities</div>
          <div data-k="rows" style="margin-top:8px"></div>
          <div data-k="out" style="overflow:hidden;height:0">
            <div class="lbl" style="margin-top:6px">Output</div>
            <div style="display:flex;align-items:center;gap:18px;margin-top:20px">
              <span class="chip" style="border-color:var(--vi);color:var(--vil);font-size:34px;padding:12px 26px" data-k="dpill"></span>
            </div>
            <div style="display:flex;gap:16px;margin-top:26px" data-k="opts"></div>
          </div>
        </div>
        <div data-k="tiles" class="abs" style="inset:0"></div>
        <div class="abs" data-k="selbox" style="border:4px solid var(--bl);border-radius:6px;background:rgba(59,130,246,.08)">
          <i style="position:absolute;left:-10px;top:-10px;width:18px;height:18px;border-radius:50%;background:var(--bl);border:3px solid #fff"></i>
          <i style="position:absolute;right:-10px;bottom:-10px;width:18px;height:18px;border-radius:50%;background:var(--bl);border:3px solid #fff"></i>
          <div class="abs" style="left:50%;top:-74px;transform:translateX(-50%);font-size:44px;font-weight:800;color:var(--bl)">?</div>
        </div>
      </div>`);
      const rows = [['Chat', at('chat', 0, 2)], ['Write code', at('code', 0, 3)], ['Generate text', at('generate', 0, 4)]];
      r.rowsData = rows.map(([label, t], i) => {
        const x = el(r.rows, `<div style="height:96px;display:flex;align-items:center;position:relative;overflow:hidden">
          <div style="position:relative;font-size:40px;font-weight:600" data-k="lab">${label}<div class="strike" data-k="st" style="width:0"></div></div>
          <div style="flex:1"></div><span class="mono" data-k="no" style="font-size:24px;color:var(--rd);margin-right:22px;font-weight:700">OFF</span>
          <div data-k="tg" style="width:92px;height:52px;border-radius:26px;position:relative"><div data-k="kn" style="position:absolute;top:5px;width:42px;height:42px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div></div>
        </div>`);
        x.t = t; return x;
      });
      r.bEls = [];
      ['spam', 'not spam', 'needs a human'].forEach((o, i) => {
        const z = el(r.opts, `<div class="chip" data-k="o${i}" style="font-size:26px;font-weight:600"><span style="width:22px;height:22px;border-radius:50%;border:3px solid var(--mute);display:inline-block" data-k="b${i}"></span>${o}</div>`);
        r.bEls.push(z['b' + i]);
      });
      r.optEls = [0, 1, 2].map(i => r.opts.children[i]);
      // tiles
      r.tileEls = [];
      const cols = 5, rows2 = 5, tw = 180, th = 150, g = 18;
      const x0 = 540 - (cols * tw + (cols - 1) * g) / 2, y0 = 960 - (rows2 * th + (rows2 - 1) * g) / 2;
      for (let rr = 0; rr < rows2; rr++) for (let cc = 0; cc < cols; cc++) {
        if (rr === 2 && cc === 2) continue;
        const x = el(r.tiles, `<div class="win" style="left:${x0 + cc * (tw + g)}px;top:${y0 + rr * (th + g)}px;width:${tw}px;height:${th}px;border-radius:16px">
          <div style="height:26px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:5px;padding:0 10px"><i style="width:7px;height:7px;border-radius:50%;background:#555"></i><i style="width:7px;height:7px;border-radius:50%;background:#555"></i><span class="mono" style="font-size:14px;color:var(--mute);margin-left:auto">LLM</span></div>
          <div style="padding:10px 12px">
            <div style="margin-left:auto;width:70px;height:18px;border-radius:9px;background:rgba(var(--fgr),.14)"></div>
            <div data-k="l1" style="margin-top:12px;height:10px;border-radius:5px;background:rgba(var(--fgr),.22)"></div>
            <div data-k="l2" style="margin-top:8px;height:10px;border-radius:5px;background:rgba(var(--fgr),.22)"></div>
            <div data-k="l3" style="margin-top:8px;height:10px;border-radius:5px;background:rgba(var(--fgr),.22)"></div>
          </div></div>`);
        x.d = Math.hypot(rr - 2, cc - 2); x.seed = rr * 7 + cc * 3;
        r.tileEls.push(x);
      }
      r.tJev = at('jev', 0, 1); r.tDec = at('decision-only', 0, 7); r.tLLM = at('isn\'t', 0, 10); r.tWhat = at('what', 0, 12);
      r.chipPos = names.map((n, i) => {
        const a = i * 2.39996, rad = 210 + (i % 6) * 70;
        return [540 + Math.cos(a) * rad * 1.05, 930 + Math.sin(a) * rad * 1.15, (i % 5) * 0.06];
      });
      return r;
    },
    update(T, r) {
      // drifting model chips that scatter when Jev is named
      r.chipPos.forEach(([x, y, d], i) => {
        const c = r['c' + i];
        const k = A(T, 0.05 + d, 0.5);
        const sc = E.in(P(T, r.tJev - 0.15, 0.7));
        const ang = Math.atan2(y - 930, x - 540);
        const dx = Math.cos(ang) * 600 * sc, dy = Math.sin(ang) * 600 * sc;
        const drift = Math.sin(T * 0.8 + i) * 12;
        c.style.left = '0px'; c.style.top = '0px';
        tf(c, x - 80 + dx + drift, y - 25 + dy + Math.cos(T * 0.7 + i) * 8, lerp(0.8, 1, k), 0, k * (1 - sc) * (i % 3 === 0 ? 1 : 0.75));
      });
      // card
      const ck = pop(T, r.tJev - 0.1, 0.6);
      const zoomOut = E.io(P(T, r.tLLM, 0.8));
      const zoomBack = E.io(P(T, r.tWhat, 0.6));
      const cs = lerp(0.6, 1, ck) * lerp(1, 0.232, zoomOut) * lerp(1, 1.6, zoomBack);
      const cy = lerp(0, 960 - 610 - 300, zoomOut) * 1;
      r.card.style.transform = `translate(0px,${lerp(40, 0, ck) + cy}px) scale(${cs})`;
      r.card.style.opacity = clamp(ck * 1.2);
      r.card.style.borderColor = zoomOut > 0 ? `rgba(115,87,255,${zoomOut})` : '';
      r.card.style.borderWidth = (1 + zoomOut * 5) + 'px';
      r.mark.style.filter = `drop-shadow(0 0 ${20 + 18 * Math.sin(T * 3)}px rgba(115,87,255,.7))`;
      r.newp.style.opacity = A(T, r.tJev + 0.25);
      // capability rows: appear ON, then switch OFF with strike
      const collapse = E.io(P(T, r.tDec - 0.1, 0.5));
      r.rowsData.forEach((x, i) => {
        const ap = A(T, x.t - 0.45, 0.35), off = E.io(P(T, x.t + 0.05, 0.3));
        x.root.style.opacity = ap * lerp(1, 0.42, off);
        x.root.style.transform = `translateX(${(1 - ap) * 30}px)`;
        x.root.style.height = (96 * (1 - collapse)) + 'px';
        x.tg.style.background = rgb(mix([115, 87, 255], [70, 70, 76], off));
        x.kn.style.left = (5 + 40 * (1 - off)) + 'px';
        x.st.style.width = `calc(${E.out(P(T, x.t + 0.1, 0.3)) * 100}% + 12px)`;
        x.no.style.opacity = A(T, x.t + 0.25, 0.2);
      });
      r.caplbl.style.opacity = 1 - collapse;
      r.caplbl.style.height = (30 * (1 - collapse)) + 'px';
      const oh = E.io(P(T, r.tDec, 0.5));
      r.out.style.height = (250 * oh) + 'px';
      r.dpill.innerHTML = typed('decision-only', T, r.tDec + 0.1, 26) + (T < r.tDec + 1 ? caret(T) : '');
      r.optEls.forEach((o, i) => {
        const k = A(T, r.tDec + 0.5 + i * 0.12, 0.3);
        o.style.opacity = k; o.style.transform = `translateY(${(1 - k) * 14}px)`;
        const pk = i === 0 ? A(T, r.tDec + 1.2, 0.25) : 0;
        o.style.borderColor = pk ? `rgba(115,87,255,${pk})` : '';
        r.bEls[i].style.background = pk ? `rgba(115,87,255,${pk})` : 'transparent';
        r.bEls[i].style.borderColor = pk ? 'var(--vi)' : 'var(--mute)';
      });
      // LLM tiles
      r.tileEls.forEach(x => {
        const k = pop(T, r.tLLM + 0.25 + x.d * 0.1, 0.45);
        const dim = lerp(1, 0.22, E.io(P(T, r.tWhat, 0.5)));
        x.root.style.opacity = clamp(k) * dim;
        x.root.style.transform = `scale(${lerp(0.6, 1, clamp(k))})`;
        const ph = (T * 0.9 + x.seed * 0.13) % 2.2;
        [x.l1, x.l2, x.l3].forEach((l, j) => { l.style.width = (clamp((ph - j * 0.45) / 0.45) * [100, 88, 60][j]) + '%'; });
      });
      // selection box around Jev tile
      const sb = A(T, r.tWhat + 0.35, 0.3);
      const w = 780 * 0.232 * 1.6 + 40, h = 560 * 0.232 * 1.6 + 40;
      css(r.selbox, { left: (540 - w / 2) + 'px', top: (960 - h / 2) + 'px', width: w + 'px', height: (h) + 'px', opacity: sb, clipPath: `inset(-90px ${(1 - sb) * 100}% -20px -20px)` });
    },
  });

  // ============ 2. Support inbox ============
  V.scene({
    name: 'inbox', theme: 'light', glow: [255, 255, 255],
    from: Ls('l1'),
    build(root) {
      const tickets = [['M', '#f97316', 'Mia R.', 'WIN A FREE PHONE!!! click now'], ['#', '#64748b', 'Order 4821', 'Payment API timed out (502)'],
        ['S', '#0ea5e9', 'Sam K.', 'Can I get a refund for March?'], ['P', '#a855f7', 'Priya D.', 'Delete all my data or I call a lawyer'],
        ['L', '#22c55e', 'Leo T.', 'Password reset email never arrives'], ['A', '#ec4899', 'Ana M.', 'Love the new update!']];
      let rows = '';
      tickets.forEach(([i, c, n, s], k) => {
        rows += `<div data-k="row${k}" style="height:104px;display:flex;align-items:center;gap:22px;padding:0 30px;border-bottom:1px solid var(--line);position:relative">
          <div data-k="hl${k}" class="abs" style="left:0;top:0;bottom:0;width:7px;background:var(--vi)"></div>
          <div style="width:56px;height:56px;border-radius:50%;background:${c};color:#fff;font-weight:700;font-size:26px;display:flex;align-items:center;justify-content:center">${i}</div>
          <div style="flex:1;min-width:0"><div style="font-size:27px;font-weight:700">${n}</div><div style="font-size:24px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s}</div></div>
          <span class="pill" data-k="tag${k}" style="font-size:19px"></span></div>`;
      });
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="win" data-k="win" style="left:90px;top:540px;width:900px;height:${64 + 104 * 6}px">
          <div class="bar"><i></i><i></i><i></i><span class="tt">Support · Inbox</span></div>${rows}</div>
        <div class="chip abs" data-k="agent" style="left:0;top:0;background:var(--vi);border-color:var(--vi);color:#fff;font-size:24px;padding:10px 18px"><span style="width:12px;height:12px;border-radius:50%;background:#fff"></span>AI agent</div>
        <div class="abs mono" data-k="cnt" style="left:90px;top:1250px;width:900px;text-align:right;font-size:26px;color:var(--sub)"></div>
        <div data-k="bubs"></div>
      </div>`);
      r.qs = [
        { t: at('spam?', 0, Ls('l1')), row: 0, q: 'Is this spam?', o: ['spam', 'not spam'], pick: 0, tag: 'SPAM', tc: '#ef4444' },
        { t: at('retry', 0, Ls('l1')), row: 1, q: 'Retry that failed call?', o: ['retry', 'skip'], pick: 0, tag: 'RETRY', tc: '#f59e0b' },
        { t: at('which', 0, Ls('l1')), row: 2, q: 'Which tool next?', o: ['refund', 'lookup', 'escalate'], pick: 1, tag: 'LOOKUP', tc: '#0ea5e9' },
        { t: at('does', 0, Ls('l1')), row: 3, q: 'Does a human need this?', o: ['yes', 'no'], pick: 0, tag: 'HUMAN', tc: '#a855f7' },
      ];
      r.qs.forEach((q, i) => {
        let opts = q.o.map((o, j) => `<span class="chip" data-k="o${j}" style="font-size:24px;padding:8px 18px">${o}</span>`).join('');
        q.b = el(r.bubs, `<div class="card abs" style="left:430px;top:0;width:560px;padding:26px 30px;border-radius:22px;z-index:5">
          <div style="display:flex;align-items:center;gap:14px"><span style="width:38px;height:38px;border-radius:12px;background:var(--vi);color:#fff;font-weight:800;font-size:24px;display:flex;align-items:center;justify-content:center">?</span>
          <span style="font-size:32px;font-weight:700">${q.q}</span></div>
          <div style="display:flex;gap:12px;margin-top:20px">${opts}</div></div>`);
      });
      r.tAgent = at('agent', 0, Ls('l1')); r.tStart = at('all', 0, Ls('l1'));
      return r;
    },
    update(T, r) {
      const wk = A(T, r.from ?? 0, 0.1);
      const win = A(T, Ls('l1') + 0.05, 0.6);
      r.win.style.transform = `translateY(${(1 - win) * 60}px)`;
      r.win.style.opacity = win;
      // agent position follows current question row
      let cur = -1;
      r.qs.forEach((q, i) => { if (T >= q.t - 0.7) cur = i; });
      const rowY = i => 540 + 64 + 104 * i;
      let ay = rowY(0) + 30;
      r.qs.forEach((q, i) => { if (T >= q.t - 0.7) ay = lerp(ay, rowY(q.row) + 30, E.io(P(T, q.t - 0.7, 0.4))); });
      const ak = A(T, r.tAgent, 0.4);
      tf(r.agent, lerp(-40, 18, ak), ay, 1, 0, ak);
      for (let k = 0; k < 6; k++) {
        const on = r.qs.some(q => q.row === k && T >= q.t - 0.7 && T < (r.qs[r.qs.indexOf(q) + 1]?.t ?? 1e9) - 0.7);
        r['hl' + k].style.opacity = on ? 1 : 0;
        r['row' + k].style.background = on ? 'rgba(115,87,255,.07)' : 'transparent';
      }
      let done = 0;
      r.qs.forEach((q, i) => {
        const nxt = i + 1 < r.qs.length ? r.qs[i + 1].t - 0.8 : 1e9;
        const k = pop(T, q.t - 0.25, 0.4), out = E.in(P(T, nxt, 0.35));
        const y = rowY(q.row) + 92;
        q.b.root.style.top = y + 'px';
        q.b.root.style.opacity = clamp(k) * (1 - out);
        q.b.root.style.transform = `translateY(${(1 - clamp(k)) * 20 - out * 40}px) scale(${lerp(0.9, 1, clamp(k)) * lerp(1, 0.6, out)})`;
        q.b.root.style.transformOrigin = '90% 0%';
        const pk = A(T, q.t + 0.45, 0.2);
        q.o.forEach((o, j) => {
          const c = q.b['o' + j];
          const on = j === q.pick ? pk : 0;
          c.style.background = on ? `rgba(115,87,255,${on})` : '';
          c.style.color = on > 0.5 ? '#fff' : '';
          c.style.borderColor = on ? 'var(--vi)' : '';
        });
        const tk = A(T, q.t + 0.65, 0.3);
        const tag = r['tag' + q.row];
        tag.textContent = q.tag; tag.style.background = q.tc; tag.style.color = '#fff';
        tag.style.opacity = tk; tag.style.transform = `scale(${lerp(0.6, 1, E.back(P(T, q.t + 0.65, 0.35)))})`;
        if (T >= q.t + 0.45) done++;
      });
      r.cnt.textContent = T > r.tStart ? `decisions made: ${done}` : '';
    },
  });

  // ============ 3. Thousands of decisions burning money ============
  V.scene({
    name: 'burn', theme: 'dark', glow: [255, 110, 50],
    from: at('thousands', 0, Ls('l1')),
    build(root) {
      let dots = '';
      for (let i = 0; i < 70; i++) dots += `<div class="abs" data-k="d${i}" style="left:0;top:0;width:12px;height:12px;border-radius:50%;background:var(--vil);box-shadow:0 0 12px rgba(168,153,255,.9)"></div>`;
      let plus = '';
      for (let i = 0; i < 10; i++) plus += `<div class="abs mono" data-k="p${i}" style="left:0;top:0;font-size:28px;font-weight:700;color:var(--orl)">+$</div>`;
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="abs" style="left:0;right:0;top:500px;text-align:center"><div class="mono" data-k="num" style="font-size:150px;font-weight:700;letter-spacing:-4px;text-shadow:0 0 40px rgba(255,255,255,.25)">0</div>
          <div class="lbl" style="margin-top:6px">tiny decisions today</div></div>
        ${dots}
        <div class="card" data-k="box" style="left:250px;top:930px;width:580px;height:250px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px">
          <div class="lbl">every call goes to</div><div style="font-size:52px;font-weight:800">Flagship model</div></div>
        ${plus}
        <div class="abs" style="left:250px;top:1225px;width:580px">
          <div style="display:flex;justify-content:space-between;font-size:26px;color:var(--sub)"><span>spend</span><span class="mono" data-k="cost" style="color:var(--orl);font-weight:700"></span></div>
          <div style="margin-top:14px;height:22px;border-radius:11px;background:rgba(255,255,255,.08);overflow:hidden"><div data-k="bar" style="height:100%;width:0;border-radius:11px;background:linear-gradient(90deg,#f59e0b,#ef4444)"></div></div>
        </div>
        <div class="note" style="top:1340px" data-k="nt">illustration</div>
      </div>`);
      r.t0 = at('thousands', 0, Ls('l1')); r.tEach = at('each', 0, Ls('l1')); r.tBurn = at('burning', 0, Ls('l1'));
      return r;
    },
    update(T, r) {
      const n = E.out(P(T, r.t0, 1.9)) * 4812 + Math.max(0, T - r.t0 - 1.9) * 40;
      r.num.textContent = fmt(n);
      r.num.style.transform = `scale(${lerp(0.7, 1, pop(T, r.t0, 0.5))})`;
      const bk = pop(T, r.t0 + 0.4, 0.5);
      r.box.style.transform = `scale(${lerp(0.8, 1, clamp(bk))})`; r.box.style.opacity = clamp(bk);
      const heat = A(T, r.tEach, 1.2);
      r.box.style.borderColor = `rgba(239,90,50,${heat})`;
      r.box.style.boxShadow = `0 0 ${80 * heat}px rgba(239,90,50,${0.45 * heat}), var(--shadow)`;
      for (let i = 0; i < 70; i++) {
        const d = r['d' + i];
        const side = i % 2 ? 1 : -1;
        const per = 1.6, ph = ((T - r.t0) * 0.9 + i / 70 * per) % per / per;
        const st = r.t0 + 0.3 + (i / 70) * 0.8;
        if (T < st) { d.style.opacity = 0; continue; }
        const sx = 540 + side * 620, sy = 700 + ((i * 53) % 600);
        const ex = 540 + side * 60, ey = 1055;
        const x = lerp(sx, ex, E.in(ph)), y = lerp(sy, ey, ph) + Math.sin(ph * Math.PI) * -80 * ((i % 3) - 1);
        d.style.opacity = Math.sin(ph * Math.PI) * A(T, st, 0.3);
        d.style.transform = `translate(${x}px,${y}px)`;
      }
      for (let i = 0; i < 10; i++) {
        const p = r['p' + i];
        const ph = ((T - r.tEach) * 0.8 + i / 10) % 1;
        if (T < r.tEach) { p.style.opacity = 0; continue; }
        p.style.opacity = Math.sin(ph * Math.PI) * heat;
        p.style.transform = `translate(${290 + (i * 97) % 480}px,${940 - ph * 160}px)`;
      }
      const c = E.io(P(T, r.tBurn - 0.3, 2.4));
      r.cost.textContent = '$' + (c * 1284.6).toFixed(2);
      r.bar.style.width = (c * 100) + '%';
      r.nt.style.opacity = A(T, r.tBurn, 0.4);
    },
  });

  // ============ 4. Jev API call ============
  V.scene({
    name: 'api', theme: 'light', glow: [255, 255, 255],
    from: Ls('l2'),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="win" data-k="req" style="left:110px;top:470px;width:860px;height:330px">
          <div class="bar"><i></i><i></i><i></i><span class="tt">agent.py</span></div>
          <pre class="mono" data-k="code" style="padding:28px 34px;font-size:29px;line-height:1.55;white-space:pre"></pre></div>
        <div class="abs" data-k="line" style="left:539px;top:800px;width:3px;height:0;background:var(--vi)"></div>
        <div class="abs" data-k="pulse" style="left:528px;top:800px;width:26px;height:26px;border-radius:50%;background:var(--vi);box-shadow:0 0 20px var(--vi)"></div>
        <div class="chip abs" data-k="node" style="left:430px;top:868px;font-size:34px;padding:12px 26px;border-color:var(--vi)">${JEV_MARK(44)}<b>Jev</b></div>
        <div class="card" data-k="res" style="left:110px;top:990px;width:860px;padding:30px 36px">
          <div class="lbl" style="margin-bottom:14px">decision</div><div data-k="rows"></div></div>
      </div>`);
      const opts = [['spam', 0.91], ['not_spam', 0.07], ['needs_human', 0.02]];
      r.rowEls = opts.map(([o, v], i) => {
        const x = el(r.rows, `<div style="display:flex;align-items:center;gap:22px;height:84px;border-radius:16px;padding:0 18px;margin:0 -18px">
          <span class="mono" style="width:240px;font-size:30px;font-weight:600">${o}</span>
          <div style="flex:1;height:18px;border-radius:9px;background:rgba(var(--fgr),.08);overflow:hidden"><div data-k="b" style="height:100%;width:0;border-radius:9px;background:var(--vi)"></div></div>
          <span class="mono" data-k="v" style="width:90px;text-align:right;font-size:28px;font-weight:700"></span>
          <span data-k="ck" style="width:40px;height:40px;border-radius:50%;background:var(--gr);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:24px">✓</span></div>`);
        x.v0 = v; return x;
      });
      r.t0 = Ls('l2'); r.tOpt = at('possible', 0, Ls('l2')); r.tPick = at('picks', 0, Ls('l2')); r.tProb = at('probability', 0, Ls('l2'));
      return r;
    },
    update(T, r) {
      const wk = A(T, r.t0, 0.5);
      r.req.style.opacity = wk; r.req.style.transform = `translateY(${(1 - wk) * 40}px)`;
      const L1 = 'jev.decide(\n  "Is this spam?",\n', L2 = '  options=["spam", "not_spam",\n           "needs_human"])';
      let s = typed(L1, T, r.t0 + 0.3, 34);
      if (T > r.tOpt - 0.2) s = L1 + typed(L2, T, r.tOpt - 0.2, 38);
      const hl = s.replace(/("[^"\n]*"?)/g, '<span style="color:#7357ff">$1</span>').replace('jev.decide', '<span style="color:#0ea5e9">jev.decide</span>').replace('options', '<span style="color:#e8794b">options</span>');
      r.code.innerHTML = hl + caret(T);
      const go = r.tOpt + 1.3;
      const lk = E.io(P(T, go, 0.35));
      r.line.style.height = (190 * lk) + 'px';
      const pp = P(T, go + 0.1, 0.5);
      r.pulse.style.opacity = pp > 0 && pp < 1 ? 1 : 0;
      r.pulse.style.transform = `translateY(${pp * 175}px)`;
      const nk = pop(T, go + 0.2, 0.45);
      r.node.style.opacity = clamp(nk); r.node.style.transform = `scale(${lerp(0.6, 1, clamp(nk))})`;
      r.node.style.boxShadow = `0 0 ${40 * A(T, go + 0.5, 0.3) * (0.6 + 0.4 * Math.sin(T * 5))}px rgba(115,87,255,.6)`;
      const rk = A(T, r.tPick - 0.5, 0.45);
      r.res.style.opacity = rk; r.res.style.transform = `translateY(${(1 - rk) * 40}px)`;
      r.rowEls.forEach((x, i) => {
        const bv = E.out(P(T, r.tProb - 0.1 + i * 0.08, 0.9)) * x.v0;
        x.b.style.width = (bv * 100) + '%';
        x.b.style.background = i === 0 ? 'var(--vi)' : 'rgba(var(--fgr),.35)';
        x.v.textContent = T > r.tProb - 0.1 ? bv.toFixed(2) : '';
        const pk = i === 0 ? A(T, r.tPick, 0.25) : 0;
        x.root.style.background = `rgba(115,87,255,${0.1 * pk})`;
        x.ck.style.opacity = pk; x.ck.style.transform = `scale(${E.back(P(T, r.tPick, 0.35))})`;
      });
    },
  });

  // ============ 5. Multiple-choice exam ============
  V.scene({
    name: 'exam', theme: 'light', glow: [255, 255, 255],
    from: at('it\'s', 0, Ls('l2') + 5),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="abs" data-k="paper" style="left:150px;top:520px;width:780px;height:820px;background:#fffdf7;border-radius:10px;box-shadow:0 40px 80px rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.06);padding:56px 60px;color:#222;
          background-image:repeating-linear-gradient(transparent 0 63px, rgba(59,130,246,.12) 63px 65px);background-position:0 120px">
          <div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:40px;font-weight:800;letter-spacing:2px">AGENT EXAM</span><span class="mono" style="font-size:26px;color:#888">Q. 4,812</span></div>
          <div class="mono" style="font-size:24px;color:#888;margin-top:12px">name: support-agent</div>
          <div style="font-size:46px;font-weight:700;margin-top:70px">Is this spam?</div>
          <div data-k="opts" style="margin-top:40px"></div>
          <div class="abs" data-k="grade" style="right:50px;top:170px;font-family:'Inter';font-size:64px;font-weight:800;color:#dc2626;transform:rotate(-12deg)">✓ 0.91</div>
        </div>
        <svg class="abs" data-k="pencil" width="64" height="300" viewBox="0 0 32 150" style="left:0;top:0;transform-origin:0 0">
          <polygon points="16,0 8,22 24,22" fill="#f5d0a9"/><polygon points="16,0 13,8 19,8" fill="#333"/>
          <rect x="8" y="22" width="16" height="100" fill="#facc15"/><rect x="8" y="22" width="5" height="100" fill="#eab308"/>
          <rect x="8" y="122" width="16" height="12" fill="#a3a3a3"/><rect x="8" y="134" width="16" height="14" rx="3" fill="#f472b6"/></svg>
      </div>`);
      const opts = ['spam', 'not spam', 'needs a human'];
      r.ob = opts.map((o, i) => el(r.opts, `<div style="display:flex;align-items:center;gap:30px;height:96px">
        <span class="mono" style="font-size:34px;font-weight:700;width:34px">${'ABC'[i]}</span>
        <span data-k="bub" style="width:52px;height:52px;border-radius:50%;border:4px solid #333;position:relative;overflow:hidden;display:inline-block"><span data-k="ink" style="position:absolute;left:0;top:0;bottom:0;width:0;background:#1f2937"></span></span>
        <span style="font-size:40px;font-weight:600">${o}</span></div>`));
      r.t0 = at('it\'s', 0, Ls('l2') + 5); r.tExam = at('exam', 0, Ls('l2')); r.tAgents = at('agents', 0, Ls('l2'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.6);
      r.paper.style.transform = `translateY(${(1 - k) * 80}px) rotate(${lerp(4, -2, k)}deg)`;
      r.paper.style.opacity = k;
      const fill = E.io(P(T, r.tExam - 0.3, 0.7));
      // bubble A position in page coords (approx)
      const bx = 150 + 60 + 34 + 30 + 26, by = 520 + 56 + 300 + 48;
      const pin = E.io(P(T, r.t0 + 0.5, 0.8));
      const wig = fill > 0 && fill < 1 ? Math.sin(T * 40) * 10 : 0;
      const px = lerp(900, bx + wig, pin), py = lerp(1500, by - 6 + Math.cos(T * 37) * 6 * (fill > 0 && fill < 1), pin);
      const pout = E.in(P(T, r.tAgents - 0.3, 0.5));
      r.pencil.style.transform = `translate(${px + pout * 300}px,${py + pout * 300}px) rotate(-28deg)`;
      r.pencil.style.opacity = A(T, r.t0 + 0.3, 0.3) * (1 - pout);
      r.ob[0].ink.style.width = (fill * 100) + '%';
      const g = E.back(P(T, r.tAgents - 0.2, 0.4));
      r.grade.style.opacity = clamp(g); r.grade.style.transform = `rotate(-12deg) scale(${lerp(1.8, 1, clamp(g))})`;
    },
  });

  // ============ 6. Diogo profile + RLHF loop ============
  V.scene({
    name: 'profile', theme: 'light', glow: [255, 255, 255],
    from: Ls('l3'),
    to: at('one', 0, Ls('l3')),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="card" data-k="card" style="left:110px;top:440px;width:860px;padding:36px 40px">
          <div style="display:flex;gap:30px;align-items:center">
            <div style="width:140px;height:140px;border-radius:50%;background:linear-gradient(135deg,#a899ff,#5b3df5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:54px;font-weight:800">DA</div>
            <div><div data-k="name" style="font-size:56px;font-weight:800;letter-spacing:-1px;min-height:68px"></div>
              <div class="mono" data-k="sub" style="font-size:26px;color:var(--sub);margin-top:6px;display:flex;align-items:center;gap:10px">${LOGO('typesafe', 30, { round: true })} builder of Jev · TypeSafe AI</div></div></div>
          <div style="display:flex;flex-direction:column;gap:16px;margin-top:30px" data-k="facts"></div>
        </div>
        <div class="abs" data-k="loop" style="left:0;top:0;width:1080px;height:1920px"></div>
      </div>`);
      r.facts = [[`${LOGO('openai', 32, { theme: 'light' })} Former OpenAI researcher`, at('former', 0, Ls('l3'))], ['Worked on the RLHF research', at('rlhf', 0, Ls('l3'))]].map(([f, t]) => {
        const x = el(r.facts, `<div style="display:flex;align-items:center;gap:16px;font-size:32px;font-weight:600"><span style="width:36px;height:36px;border-radius:50%;background:var(--vi);color:#fff;font-size:20px;display:flex;align-items:center;justify-content:center">✓</span>${f}</div>`);
        x.t = t; return x;
      });
      // RLHF loop
      const cx = 540, cy = 1215, R = 210;
      const nodes = [['model answers', -90], ['people rank them', 0], ['reward signal', 90], ['model updates', 180]];
      let svg = `<svg class="abs" style="left:0;top:0" width="1080" height="1920"><circle data-k="ring" cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(115,87,255,.35)" stroke-width="5" stroke-dasharray="${2 * Math.PI * R}" stroke-dashoffset="${2 * Math.PI * R}" transform="rotate(-90 ${cx} ${cy})"/></svg>`;
      r.loopR = el(r.loop, `<div class="abs" style="inset:0">${svg}
        <div class="abs" data-k="mid" style="left:${cx - 120}px;top:${cy - 50}px;width:240px;text-align:center"><div style="font-size:48px;font-weight:800;color:var(--vi)">RLHF</div><div class="mono" data-k="midsub" style="font-size:22px;color:var(--sub)">learning from feedback</div></div>
        <div class="abs" data-k="dot" style="left:0;top:0;width:24px;height:24px;border-radius:50%;background:var(--vi);box-shadow:0 0 20px var(--vi)"></div>
        <div class="chip abs" data-k="res" style="left:0;top:${cy + R + 70}px;width:auto;border-color:var(--gr);font-size:28px">${LOGO('openai', 30, { theme: 'light' })} ChatGPT follows instructions</div>
      </div>`);
      r.nodeEls = nodes.map(([n, a], i) => {
        const rad = a * Math.PI / 180;
        const x = el(r.loop, `<div class="chip abs" style="left:${cx + Math.cos(rad) * R}px;top:${cy + Math.sin(rad) * R}px;font-size:26px;transform:translate(-50%,-50%)">${n}</div>`);
        x.i = i; return x;
      });
      r.cx = cx; r.cy = cy; r.R = R;
      r.tName = at('diogo', 0, Ls('l3')); r.tR = at('rlhf', 0, Ls('l3')); r.tTaught = at('taught', 0, Ls('l3'));
      return r;
    },
    update(T, r) {
      const k = A(T, Ls('l3'), 0.5);
      const shift = E.io(P(T, r.tR - 0.3, 0.6));
      r.card.style.opacity = k; r.card.style.transform = `translateY(${(1 - k) * 40 + lerp(220, 0, shift)}px)`;
      r.name.innerHTML = typed('Diogo Almeida', T, r.tName - 0.1, 22) + (T < r.tName + 1 ? caret(T) : '');
      r.facts.forEach(x => { const a = A(T, x.t - 0.1, 0.35); x.root.style.opacity = a; x.root.style.transform = `translateX(${(1 - a) * 30}px)`; });
      const lk = A(T, r.tR + 0.2, 0.5);
      const circ = 2 * Math.PI * r.R;
      r.loopR.ring.setAttribute('stroke-dashoffset', circ * (1 - E.io(P(T, r.tR + 0.2, 1.0))));
      r.loopR.mid.style.opacity = lk;
      r.nodeEls.forEach(x => { const a = pop(T, r.tR + 0.3 + x.i * 0.22, 0.4); x.root.style.opacity = clamp(a); x.root.style.transform = `translate(-50%,-50%) scale(${lerp(0.6, 1, clamp(a))})`; });
      const ang = (T - r.tR) * 2.2 - Math.PI / 2;
      tf(r.loopR.dot, r.cx + Math.cos(ang) * r.R - 12, r.cy + Math.sin(ang) * r.R - 12, 1, 0, A(T, r.tR + 1.2, 0.3));
      const rk = pop(T, r.tTaught + 0.4, 0.45);
      r.loopR.res.style.opacity = clamp(rk);
      r.loopR.res.style.transform = `translateX(-50%) scale(${lerp(0.7, 1, clamp(rk))})`;
      r.loopR.res.style.left = '540px';
    },
  });

  // ============ 7. Eras timeline ============
  V.scene({
    name: 'eras', theme: 'dark', glow: [110, 80, 255],
    from: at('one', 0, Ls('l3')),
    build(root) {
      let bubbles = '';
      for (let i = 0; i < 9; i++) bubbles += `<div class="abs" data-k="bb${i}" style="left:0;top:0;width:${90 + (i % 3) * 30}px;height:46px;border-radius:23px 23px 23px 6px;background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.18)"></div>`;
      let nodes = '';
      const pts = [[700, 0], [790, -90], [790, 90], [880, -140], [880, -40], [880, 40], [880, 140], [960, -170], [960, -110], [960, 110]];
      pts.forEach(([x, y], i) => nodes += `<div class="abs" data-k="n${i}" style="left:${x - 14}px;top:${960 + y - 14}px;width:28px;height:28px;border-radius:50%;border:3px solid var(--vil);background:var(--bg)"></div>`);
      const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [3, 8], [6, 9]];
      let es = edges.map(([a, b], i) => `<line data-k="e${i}" x1="${pts[a][0]}" y1="${960 + pts[a][1]}" x2="${pts[b][0]}" y2="${960 + pts[b][1]}" stroke="rgba(168,153,255,.7)" stroke-width="4" stroke-dasharray="200" stroke-dashoffset="200"/>`).join('');
      const r = el(root, `<div class="abs" style="inset:0">
        <svg class="abs" width="1080" height="1920" style="left:0;top:0">${es}<line data-k="dash" x1="640" y1="960" x2="700" y2="960" stroke="rgba(168,153,255,.8)" stroke-width="4" stroke-dasharray="10 10"/></svg>
        <div class="abs" data-k="axis" style="left:80px;top:1080px;height:2px;width:920px;background:rgba(255,255,255,.18)"></div>
        <div class="abs" data-k="bar" style="left:110px;top:944px;height:32px;width:0;border-radius:16px;background:linear-gradient(90deg,#3b3b44,#6b6b78)"></div>
        ${bubbles}${nodes}
        <div class="abs lbl" data-k="l1" style="left:110px;top:1110px;display:flex;align-items:center;gap:12px">${LOGO('openai', 30)} the chatbot era</div>
        <div class="abs lbl" data-k="l2" style="left:690px;top:1110px;color:var(--vil)">next era?</div>
        <div class="abs" data-k="now" style="left:640px;top:780px;width:3px;height:330px;background:var(--fg)"><span class="mono abs" style="left:-30px;top:-44px;font-size:24px;color:var(--fg)">now</span></div>
        <div class="abs" data-k="who" style="left:80px;top:760px;display:flex;align-items:center;gap:14px">
          <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#a899ff,#5b3df5);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:24px">DA</div>
          <span style="font-size:26px;color:var(--sub)">helped build it</span></div>
        <div class="chip abs" data-k="bet" style="left:690px;top:1190px;border-color:var(--vi);color:var(--vil)">his bet: decisions</div>
      </div>`);
      r.pts = pts; r.nE = edges.length;
      r.t0 = at('one', 0, Ls('l3')); r.tHelped = at('helped', 0, Ls('l3')); r.tNow = at('now', 0, Ls('l3') + 10); r.tBet = at('betting', 0, Ls('l3')); r.tNot = at('chatbots', 0, Ls('l3') + 12);
      return r;
    },
    update(T, r) {
      const g = E.io(P(T, r.t0, 1.4));
      r.bar.style.width = (530 * g) + 'px';
      r.axis.style.transform = `scaleX(${A(T, r.t0, 0.8)})`; r.axis.style.transformOrigin = '0 0';
      for (let i = 0; i < 9; i++) {
        const b = r['bb' + i];
        const bx = 120 + i * 58, by = 860 - (i % 3) * 60 - (i % 2) * 20;
        const k = pop(T, r.t0 + 0.15 + i * 0.13, 0.4);
        const fade = 1 - 0.65 * A(T, r.tNot, 0.5);
        tf(b, bx, by + Math.sin(T * 1.5 + i) * 5, lerp(0.5, 1, clamp(k)), 0, clamp(k) * fade);
      }
      r.l1.style.opacity = A(T, r.t0 + 0.8); r.who.style.opacity = A(T, r.tHelped - 0.2); r.who.style.transform = `translateY(${(1 - A(T, r.tHelped - 0.2)) * 20}px)`;
      const nk = A(T, r.tNow - 0.1, 0.35);
      r.now.style.opacity = nk; r.now.style.transform = `scaleY(${nk})`; r.now.style.transformOrigin = '0 100%';
      r.dash.style.opacity = A(T, r.tBet - 0.2, 0.3);
      for (let i = 0; i < r.nE; i++) r['e' + i].setAttribute('stroke-dashoffset', 200 * (1 - E.out(P(T, r.tBet + 0.1 + i * 0.12, 0.4))));
      r.pts.forEach((_, i) => {
        const k = pop(T, r.tBet + i * 0.12, 0.35);
        const lit = (Math.floor((T - r.tBet) * 4) % r.pts.length) === i && T > r.tBet + 1;
        const n = r['n' + i];
        n.style.opacity = clamp(k); n.style.transform = `scale(${clamp(k)})`;
        n.style.background = lit ? 'var(--vil)' : 'var(--bg)';
        n.style.boxShadow = lit ? '0 0 22px var(--vi)' : 'none';
      });
      r.l2.style.opacity = A(T, r.tBet + 0.4);
      const bk = pop(T, r.tNot + 0.2, 0.4);
      r.bet.style.opacity = clamp(bk); r.bet.style.transform = `scale(${lerp(0.7, 1, clamp(bk))})`;
    },
  });

  // ============ 8. Smaller chatbot objection ============
  V.scene({
    name: 'mini', theme: 'light', glow: [255, 255, 255],
    from: Ls('l4'),
    to: at('jev\'s', 0, Ls('l4')),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="card" data-k="pick" style="left:190px;top:450px;width:700px;padding:26px 30px;z-index:3">
          <div class="lbl">model</div>
          <div style="margin-top:14px;height:78px;border:2px solid var(--line);border-radius:16px;display:flex;align-items:center;padding:0 22px;font-size:32px;font-weight:600">
            <span data-k="val" class="mono"></span><span style="flex:1"></span><span style="color:var(--mute)">▾</span></div>
          <div data-k="dd" style="overflow:hidden;height:0">
            <div data-k="o1" style="height:76px;margin-top:10px;border-radius:14px;display:flex;align-items:center;padding:0 22px;font-size:30px" class="mono">flagship-xl<span style="flex:1"></span><span style="color:var(--mute)">$$$</span></div>
            <div data-k="o2" style="height:76px;border-radius:14px;display:flex;align-items:center;padding:0 22px;font-size:30px" class="mono">chat-mini<span style="flex:1"></span><span style="color:var(--gr);font-weight:700">$</span></div>
          </div>
          <div class="chip abs" data-k="ok" style="right:-24px;top:-26px;background:var(--gr);border-color:var(--gr);color:#fff;font-size:24px">works, technically</div>
        </div>
        <div class="card" data-k="out" style="left:110px;top:740px;width:860px;padding:30px 34px">
          <div class="lbl">allowed answers</div>
          <div style="display:flex;gap:14px;margin-top:16px"><span class="chip mono" style="font-size:26px">spam</span><span class="chip mono" style="font-size:26px">not_spam</span><span class="chip mono" style="font-size:26px">needs_human</span></div>
          <div style="height:1px;background:var(--line);margin:28px 0"></div>
          <div class="lbl">chat-mini says</div>
          <div style="display:flex;align-items:center;gap:22px;margin-top:18px"><div class="mono" style="font-size:34px;min-height:46px;position:relative;display:inline-block" data-k="a1w"><span data-k="a1"></span>
            <svg class="abs" data-k="wav" style="left:0;bottom:-14px" width="320" height="14"><path d="M0 7 Q 10 0 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 T 140 7 T 160 7 T 180 7 T 200 7 T 220 7 T 240 7 T 260 7 T 280 7 T 300 7 T 320 7" stroke="#ef4444" stroke-width="3.5" fill="none"/></svg></div>
          <span class="pill" data-k="inv" style="background:#fee2e2;color:#b91c1c;font-size:20px">NEVER AN OPTION</span></div>
          <div class="mono" style="font-size:28px;margin-top:34px;color:var(--sub);white-space:pre" data-k="a2"></div>
          <div data-k="err" style="margin-top:22px;height:64px;border-radius:14px;background:#fee2e2;color:#b91c1c;display:flex;align-items:center;gap:14px;padding:0 22px;font-size:26px;font-weight:700"><span style="width:30px;height:30px;border-radius:50%;background:#ef4444;color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px">!</span>JSON parse error · unexpected end of input</div>
        </div>
        ${CURSOR()}
      </div>`);
      r.t0 = Ls('l4'); r.tSmall = at('smaller', 0, Ls('l4')); r.tTech = at('technically', 0, Ls('l4')); r.tBut = at('but', 0, Ls('l4'));
      r.tInv = at('invent', 0, Ls('l4')); r.tNever = at('never', 0, Ls('l4')); r.tBreak = at('break', 0, Ls('l4')); r.tFmt = at('format', 0, Ls('l4'));
      return r;
    },
    update(T, r) {
      const pk = A(T, r.t0, 0.5);
      const outk = A(T, r.tBut - 0.1, 0.5);
      r.pick.style.opacity = pk;
      r.pick.style.transform = `translateY(${(1 - pk) * 40 + lerp(220, 0, outk)}px) scale(${lerp(1.08, 0.86, outk)})`;
      const open = E.io(P(T, r.tSmall - 0.9, 0.3)) * (1 - E.io(P(T, r.tSmall + 0.3, 0.3)));
      r.dd.style.height = (166 * open) + 'px';
      r.val.textContent = T >= r.tSmall + 0.2 ? 'chat-mini' : 'flagship-xl';
      r.o2.style.background = T > r.tSmall - 0.4 ? 'rgba(59,130,246,.12)' : 'transparent';
      const ok = pop(T, r.tTech, 0.4);
      r.ok.style.opacity = clamp(ok) * (1 - outk); r.ok.style.transform = `rotate(4deg) scale(${clamp(ok)})`;
      const y0 = 450 + 220;
      moveCursor(r, T, [[r.tSmall - 1.4, 900, 1250], [r.tSmall - 1.0, 820, y0 + 78], [r.tSmall - 0.5, 780, y0 + 78 + 90 + 76 * 1.4], [r.tSmall + 0.6, 1000, 1400]], [r.tSmall - 0.95, r.tSmall + 0.1]);
      r.out.style.opacity = outk; r.out.style.transform = `translateY(${(1 - outk) * 60}px)`;
      r.a1.innerHTML = typed('probably_spam', T, r.tInv, 22);
      const wv = E.out(P(T, r.tNever - 0.1, 0.4));
      r.wav.style.clipPath = `inset(0 ${(1 - wv) * 100}% 0 0)`;
      r.a1.style.color = wv > 0 ? '#b91c1c' : '';
      const ik = pop(T, r.tNever + 0.2, 0.35);
      r.inv.style.opacity = clamp(ik); r.inv.style.transform = `scale(${clamp(ik)})`;
      r.a2.textContent = typed('{"label": "spam", "reason": "looks li', T, r.tBreak - 0.1, 30);
      const ek = A(T, r.tFmt + 0.1, 0.3);
      r.err.style.opacity = ek; r.err.style.transform = `translateX(${Math.sin(T * 60) * 8 * (1 - P(T, r.tFmt + 0.1, 0.4)) * (ek > 0)}px)`;
    },
  });

  // ============ 9. Schema lock ============
  V.scene({
    name: 'schema', theme: 'light', glow: [255, 255, 255],
    from: at('jev\'s', 0, Ls('l4')),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="win" style="left:130px;top:470px;width:820px;height:190px" data-k="sch">
          <div class="bar"><i></i><i></i><i></i><span class="tt">output schema</span></div>
          <pre class="mono" style="padding:24px 32px;font-size:30px"><span style="color:#e8794b">label</span>: enum[<span style="color:#7357ff">"spam"</span>, <span style="color:#7357ff">"not_spam"</span>,
       <span style="color:#7357ff">"needs_human"</span>]</pre></div>
        <div class="abs" data-k="rail" style="left:110px;top:1240px;width:860px;height:150px;border-radius:30px;background:rgba(var(--fgr),.05);border:2px dashed rgba(var(--fgr),.18)"></div>
        <div data-k="slots"></div>
        <div data-k="balls"></div>
        <div class="abs" data-k="lk" style="left:0;right:0;top:1440px;text-align:center"><span class="chip" style="border-color:var(--vi);color:var(--vi)">🔒 locked to the schema</span></div>
      </div>`);
      const names = ['spam', 'not_spam', 'needs_human'];
      r.slots = names.map((n, i) => el(r.slots, `<div class="abs" style="left:${140 + i * 280}px;top:1260px;width:240px;height:110px;border-radius:22px;border:3px solid rgba(var(--fgr),.25);background:var(--card);display:flex;align-items:center;justify-content:center">
        <span class="mono" style="font-size:26px;font-weight:700;color:var(--sub)" data-k="t">${n}</span></div>`));
      const mk = (label, col) => el(r.balls, `<div class="abs mono" style="left:0;top:0;padding:16px 26px;border-radius:999px;background:${col};color:#fff;font-size:28px;font-weight:700;box-shadow:0 14px 30px rgba(0,0,0,.18);white-space:nowrap">${label}</div>`);
      r.b1 = mk('spam', '#7357ff'); r.b2 = mk('not_spam', '#f59e0b'); r.b3 = mk('probably_spam', '#ef4444');
      r.wrong = el(r.balls, `<span class="pill abs" style="background:#fef3c7;color:#92400e;font-size:20px">WRONG, BUT VALID</span>`);
      r.blocked = el(r.balls, `<span class="pill abs" style="background:#fee2e2;color:#b91c1c;font-size:20px">✕ NOT IN SCHEMA</span>`);
      r.tLock = at('locked', 0, Ls('l4')); r.tWrong = at('wrong', 0, Ls('l4')); r.tWander = at('wander', 0, Ls('l4'));
      r.t0 = at('jev\'s', 0, Ls('l4'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.5);
      r.sch.style.opacity = k; r.sch.style.transform = `translateY(${(1 - k) * 30}px)`;
      r.slots.forEach((s, i) => { const a = A(T, r.t0 + 0.2 + i * 0.1, 0.4); s.root.style.opacity = a; s.root.style.transform = `translateY(${(1 - a) * 30}px)`; });
      r.rail.style.opacity = A(T, r.t0 + 0.1);
      const drop = (b, tA, slotX, w) => {
        const f = P(T, tA - 0.5, 0.55);
        const y = lerp(760, 1290, E.in(f)) - (f >= 1 ? Math.max(0, Math.sin(P(T, tA + 0.05, 0.3) * Math.PI)) * 30 * (1 - P(T, tA + 0.05, 0.3)) : 0);
        tf(b.root, slotX + 120 - w / 2, y, 1, (1 - f) * -8, A(T, tA - 0.55, 0.2));
      };
      drop(r.b1, r.tLock, 140, 120);
      drop(r.b2, r.tWrong, 420, 175);
      const fl = (i, tA, col) => { const f = A(T, tA + 0.05, 0.15) * (1 - A(T, tA + 0.5, 0.6)); r.slots[i].root.style.boxShadow = `0 0 0 ${8 * f}px ${col}`; r.slots[i].root.style.borderColor = T > tA ? col : ''; };
      fl(0, r.tLock, 'rgba(115,87,255,.5)'); fl(1, r.tWrong, 'rgba(245,158,11,.5)');
      if (T > r.tLock) r.slots[0].root.style.borderColor = 'var(--vi)';
      if (T > r.tWrong) r.slots[1].root.style.borderColor = 'var(--am)';
      r.lk.style.opacity = A(T, r.tLock + 0.2, 0.3) * (1 - A(T, r.tWrong - 0.3, 0.3));
      const wk = pop(T, r.tWrong + 0.15, 0.35);
      tf(r.wrong.root, 420 + 20, 1210, clamp(wk), 0, clamp(wk));
      // off-script attempt: aims between slots, bounces off the rail and flies away
      const f3 = P(T, r.tWander - 0.45, 1.4);
      let x3, y3, rot = 0;
      if (f3 < 0.38) { const u = E.in(f3 / 0.38); x3 = lerp(300, 380, u); y3 = lerp(760, 1196, u); }
      else { const u = (f3 - 0.38) / 0.62; x3 = lerp(380, 900, u); y3 = 1196 - Math.sin(u * Math.PI * 0.9) * 330 + u * 120; rot = u * 160; }
      tf(r.b3.root, x3 - 110, y3 - 30, 1, rot, A(T, r.tWander - 0.5, 0.2) * (1 - P(T, r.tWander + 0.7, 0.4)));
      const bk = pop(T, r.tWander + 0.1, 0.35);
      tf(r.blocked.root, 270, 1150, clamp(bk), 0, clamp(bk));
    },
  });

  // ============ 10. System One vs word-by-word ============
  V.scene({
    name: 'sys1', theme: 'dark', glow: [110, 80, 255],
    from: Ls('l5'),
    to: at('your', 0, Ls('l5')),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="abs" data-k="hd" style="left:0;right:0;top:470px;text-align:center"><span style="font-size:30px;color:var(--sub)">TypeSafe calls Jev a</span>
          <div style="font-size:92px;font-weight:800;letter-spacing:-2px;margin-top:4px">System <span style="color:var(--vil)">One</span> model</div></div>
        <div class="card" data-k="c1" style="left:90px;top:760px;width:900px;height:250px;padding:28px 34px">
          <div style="display:flex;justify-content:space-between"><span class="lbl" style="color:var(--vil)">fast · instinctive</span><span class="mono" data-k="n1" style="font-size:24px;color:var(--sub)"></span></div>
          <div style="display:flex;align-items:center;gap:26px;margin-top:40px">
            <span class="chip mono" data-k="q" style="font-size:30px;min-width:220px;justify-content:center"></span>
            <div style="flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,.1);position:relative"><div data-k="zap" class="abs" style="left:0;top:-6px;width:60px;height:16px;border-radius:8px;background:var(--vil);box-shadow:0 0 20px var(--vi)"></div></div>
            <span class="chip mono" data-k="ans" style="font-size:30px;background:var(--vi);border-color:var(--vi);color:#fff;min-width:200px;justify-content:center"></span>
            <span class="mono" style="font-size:26px;color:var(--vil)">0.02s</span></div></div>
        <div class="card" data-k="c2" style="left:90px;top:1050px;width:900px;height:330px;padding:28px 34px">
          <div style="display:flex;justify-content:space-between"><span class="lbl">slow · word by word</span><span class="mono" data-k="tm" style="font-size:24px;color:var(--sub)"></span></div>
          <div data-k="essay" style="font-size:31px;line-height:1.45;margin-top:22px;color:var(--fg)"></div></div>
      </div>`);
      r.qs = [['spam?', 'spam'], ['retry?', 'retry'], ['tool?', 'lookup'], ['human?', 'no'], ['urgent?', 'yes'], ['refund?', 'approve']];
      r.words = 'Okay, let me think about this. The sender is not someone we know, the subject line is in all caps, and it promises a free phone, which is a common pattern in'.split(' ');
      r.t0 = Ls('l5'); r.tSys = at('system', 0, Ls('l5')); r.tFast = at('fast', 0, Ls('l5')); r.tSlow = at('slow', 0, Ls('l5'));
      return r;
    },
    update(T, r) {
      const hk = A(T, r.t0, 0.5);
      r.hd.style.opacity = hk;
      const shrink = E.io(P(T, r.tSys + 0.9, 0.6));
      r.hd.style.transform = `translateY(${(1 - hk) * 30 - shrink * 20}px) scale(${lerp(1, 0.78, shrink)})`;
      const c1 = A(T, r.tFast - 1.4, 0.5), c2 = A(T, r.tFast - 1.1, 0.5);
      r.c1.style.opacity = c1; r.c1.style.transform = `translateY(${(1 - c1) * 40}px)`;
      r.c2.style.opacity = c2; r.c2.style.transform = `translateY(${(1 - c2) * 40}px)`;
      const t1 = Math.max(0, T - r.tFast + 0.6);
      const per = 0.55;
      const i = Math.floor(t1 / per) % r.qs.length, ph = (t1 % per) / per;
      r.q.textContent = r.qs[i][0];
      r.zap.style.left = (E.out(clamp(ph / 0.15)) * 100) + '%';
      r.zap.style.transform = 'translateX(-60px)';
      r.zap.style.opacity = ph < 0.25 ? 1 : 0;
      r.ans.textContent = ph > 0.12 ? r.qs[i][1] : '';
      r.ans.style.transform = `scale(${ph > 0.12 ? E.back(clamp((ph - 0.12) / 0.15)) : 0.8})`;
      r.n1.textContent = T > r.tFast - 0.6 ? `decisions: ${Math.floor(t1 / per) + 1}` : '';
      const tw = Math.max(0, T - r.tFast + 0.5);
      const nw = Math.floor(tw * 3.2);
      r.essay.innerHTML = r.words.slice(0, nw).join(' ') + (T > r.tFast - 0.5 ? caret(T) : '');
      r.tm.textContent = T > r.tFast - 0.5 ? `${tw.toFixed(1)}s · still writing` : '';
      const sl = A(T, r.tSlow, 0.3);
      r.c2.style.borderColor = `rgba(255,255,255,${0.1 + 0.3 * sl})`;
    },
  });

  // ============ 11. Gut vs essay ============
  V.scene({
    name: 'gut', theme: 'dark', glow: [110, 80, 255],
    from: at('your', 0, Ls('l5')),
    build(root) {
      let lines = '';
      for (let i = 0; i < 12; i++) lines += `<div data-k="ln${i}" style="height:12px;border-radius:6px;background:rgba(255,255,255,.25);margin-bottom:18px;width:0"></div>`;
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="card" data-k="L" style="left:80px;top:640px;width:440px;height:600px;padding:34px;display:flex;flex-direction:column">
          <div style="font-size:42px;font-weight:800">Your gut</div><div class="mono" style="font-size:24px;color:var(--vil);margin-top:6px">0.02s</div>
          <svg width="372" height="220" style="margin-top:60px"><path data-k="ecg" d="M0 110 L120 110 L140 110 L160 30 L180 190 L200 110 L372 110" stroke="var(--vil)" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="700" stroke-dashoffset="700"/></svg>
          <span class="chip mono" data-k="yes" style="align-self:flex-start;margin-top:40px;background:var(--vi);border-color:var(--vi);color:#fff;font-size:30px">spam</span></div>
        <div class="card" data-k="R" style="left:560px;top:640px;width:440px;height:600px;padding:34px;overflow:hidden">
          <div style="font-size:42px;font-weight:800">Writing an essay</div><div class="mono" data-k="tm" style="font-size:24px;color:var(--sub);margin-top:6px"></div>
          <div style="margin-top:40px">${lines}</div></div>
      </div>`);
      r.tGut = at('gut', 0, Ls('l5')); r.tEssay = at('essay', 0, Ls('l5'));
      return r;
    },
    update(T, r) {
      const a = A(T, r.tGut - 0.25, 0.35), b = A(T, r.tGut, 0.35);
      r.L.style.opacity = a; r.L.style.transform = `translateY(${(1 - a) * 40}px)`;
      r.R.style.opacity = b; r.R.style.transform = `translateY(${(1 - b) * 40}px)`;
      r.ecg.setAttribute('stroke-dashoffset', 700 * (1 - E.out(P(T, r.tGut, 0.3))));
      const yk = pop(T, r.tGut + 0.25, 0.3);
      r.yes.style.transform = `scale(${clamp(yk)})`; r.yes.style.opacity = clamp(yk);
      const tw = Math.max(0, T - r.tGut);
      for (let i = 0; i < 12; i++) r['ln' + i].style.width = (clamp((tw * 3 - i * 0.55) / 0.55) * [96, 88, 92, 70, 95, 84, 90, 60, 93, 87, 91, 50][i]) + '%';
      r.tm.textContent = `${(tw * 1.0).toFixed(1)}s and counting`;
    },
  });

  // ============ 12. 50x race ============
  V.scene({
    name: 'race', theme: 'dark', glow: [110, 80, 255],
    from: Ls('l6'),
    to: at('but', 0, Ls('l6')),
    build(root) {
      let cards = '';
      for (let i = 0; i < 50; i++) cards += `<div class="abs" data-k="j${i}" style="left:0;top:0;width:34px;height:42px;border-radius:7px;background:var(--vil);box-shadow:0 0 10px rgba(115,87,255,.6)"></div>`;
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="card" style="left:70px;top:560px;width:940px;height:250px" data-k="L1"></div>
        <div class="card" style="left:70px;top:860px;width:940px;height:250px;border-color:rgba(115,87,255,.5)" data-k="L2"></div>
        <div class="abs" style="left:110px;top:590px;font-size:34px;font-weight:800">Chatbot</div>
        <div class="abs" style="left:110px;top:890px;font-size:34px;font-weight:800;display:flex;gap:12px;align-items:center">${JEV_MARK(36)}Jev</div>
        <div class="abs" style="left:480px;top:640px;width:120px;height:140px;border-radius:18px;border:3px solid rgba(255,255,255,.3)"></div>
        <div class="abs" style="left:480px;top:940px;width:120px;height:140px;border-radius:18px;border:3px solid var(--vil)"></div>
        <div class="abs" data-k="c1" style="left:0;top:0;width:34px;height:42px;border-radius:7px;background:#9a9aa2"></div>
        ${cards}
        <div class="abs mono" data-k="n1" style="left:760px;top:650px;font-size:90px;font-weight:700;width:220px;text-align:right">0</div>
        <div class="abs mono" data-k="n2" style="left:760px;top:950px;font-size:90px;font-weight:700;width:220px;text-align:right;color:var(--vil)">0</div>
        <div class="abs" data-k="x" style="left:0;right:0;top:1170px;text-align:center"><span style="font-size:110px;font-weight:800;color:var(--vil);letter-spacing:-3px">up to 50×</span><div class="mono" style="font-size:26px;color:var(--sub);margin-top:4px">faster on decision calls · TypeSafe's claim</div></div>
      </div>`);
      r.t0 = Ls('l6'); r.t50 = at('50', 0, Ls('l6'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.5);
      ['L1', 'L2'].forEach((x, i) => { const a = A(T, r.t0 + i * 0.12, 0.5); r[x].style.opacity = a; r[x].style.transform = `translateX(${(1 - a) * 50}px)`; });
      const run0 = r.t0 + 0.5, dur = 4.3;
      const f1 = P(T, run0, dur);
      tf(r.c1, lerp(250, 790, E.io(f1)), 690, 1, 0, A(T, run0 - 0.2, 0.3));
      r.n1.textContent = f1 >= 1 ? '1' : '0';
      let done = 0;
      for (let i = 0; i < 50; i++) {
        const st = run0 + i * (dur * 0.75 / 50);
        const f = P(T, st, 0.5);
        const x = lerp(250, 760, E.io(f)), y = 990 + (f >= 1 ? -((i % 5) * 9) : 0);
        const stackX = 700 + (i % 10) * 2;
        tf(r['j' + i], f >= 1 ? stackX : x, f >= 1 ? 990 - Math.floor(i / 10) * 6 : y, 1, 0, T >= st - 0.1 ? (f >= 1 ? 0.25 : 1) : 0);
        if (f >= 1) done++;
      }
      r.n2.textContent = done;
      const xk = pop(T, r.t50, 0.5);
      r.x.style.opacity = clamp(xk); r.x.style.transform = `scale(${lerp(0.7, 1, clamp(xk))})`;
    },
  });

  // ============ 13. The limit: no essay ============
  V.scene({
    name: 'limit', theme: 'light', glow: [255, 255, 255],
    from: at('but', 0, Ls('l6')),
    to: at('so', 0, Ls('l6')),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="win" data-k="w" style="left:110px;top:470px;width:860px;height:900px">
          <div class="bar"><i></i><i></i><i></i><span class="tt">Jev · playground</span></div>
          <div style="padding:34px">
            <div class="lbl">prompt</div>
            <div style="margin-top:14px;min-height:110px;border:2px solid var(--line);border-radius:18px;padding:22px 24px;font-size:32px;display:flex;align-items:flex-start;gap:10px"><span data-k="p" style="flex:1"></span>
              <span data-k="send" style="width:60px;height:60px;border-radius:50%;background:var(--fg);color:var(--bg);display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800">↑</span></div>
            <div class="lbl" style="margin-top:40px">response</div>
            <div data-k="resp" style="margin-top:14px;height:360px;border:3px dashed rgba(var(--fgr),.2);border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">
              <div class="mono" data-k="zero" style="font-size:90px;font-weight:700;color:var(--mute)">∅</div>
              <div class="mono" data-k="zt" style="font-size:28px;color:var(--sub)">0 tokens of text</div></div>
          </div></div>
        ${CURSOR()}
      </div>`);
      r.t0 = at('but', 0, Ls('l6')); r.tAsk = at('ask', 0, Ls('l6')); r.tNothing = at('nothing', 0, Ls('l6'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.5);
      r.w.style.opacity = k; r.w.style.transform = `translateY(${(1 - k) * 40}px)`;
      r.p.innerHTML = typed('Write me an essay about remote work.', T, r.tAsk - 0.3, 26) + (T < r.tAsk + 1.3 ? caret(T) : '');
      const click = r.tAsk + 1.2;
      moveCursor(r, T, [[r.tAsk + 0.4, 700, 1300], [click - 0.1, 900, 700]], [click]);
      r.send.style.background = T > click ? 'var(--vi)' : 'var(--fg)';
      const spin = T > click && T < r.tNothing;
      r.zero.style.opacity = A(T, r.tNothing - 0.1, 0.3);
      r.zero.style.transform = `scale(${lerp(0.6, 1, E.back(P(T, r.tNothing - 0.1, 0.4)))})`;
      r.zt.style.opacity = A(T, r.tNothing + 0.1, 0.3);
      r.resp.style.borderColor = spin ? `rgba(115,87,255,${0.4 + 0.3 * Math.sin(T * 8)})` : '';
    },
  });

  // ============ 14. Router: Claude thinks, Jev chooses ============
  V.scene({
    name: 'router', theme: 'dark', glow: [140, 90, 255],
    from: at('so', 0, Ls('l6')),
    build(root) {
      const tasks = [['write the reply', 0], ['is this spam?', 1], ['plan the fix', 0], ['retry or skip?', 1], ['explain the bug', 0], ['pick a tool', 1], ['needs a human?', 1], ['draft the email', 0], ['urgent?', 1]];
      let ch = '';
      tasks.forEach((t, i) => ch += `<div class="chip abs" data-k="tk${i}" style="left:0;top:0;font-size:24px;padding:8px 18px">${t[0]}</div>`);
      const r = el(root, `<div class="abs" style="inset:0">
        <svg class="abs" width="1080" height="1920" style="left:0;top:0"><path data-k="pl" d="M540 760 C 540 900, 290 920, 290 1060" stroke="rgba(232,121,75,.45)" stroke-width="4" fill="none"/><path data-k="pr" d="M540 760 C 540 900, 790 920, 790 1060" stroke="rgba(115,87,255,.6)" stroke-width="4" fill="none"/></svg>
        <div class="abs" data-k="rt" style="left:470px;top:690px;width:140px;height:140px;border-radius:50%;border:3px solid rgba(255,255,255,.3);background:var(--card);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:var(--sub)">router</div>
        <div class="card" data-k="cl" style="left:90px;top:1060px;width:400px;height:300px;padding:34px;border-color:rgba(232,121,75,.5)">
          ${CLAUDE_TAG(1.5)}<div class="lbl" data-k="cll" style="margin-top:24px;font-size:26px">for the thinking</div><div data-k="cln" class="mono" style="font-size:24px;color:var(--sub);margin-top:16px"></div></div>
        <div class="card" data-k="jv" style="left:590px;top:1060px;width:400px;height:300px;padding:34px;border-color:rgba(115,87,255,.6)">
          <div style="display:flex;align-items:center;gap:14px;font-size:45px;font-weight:700">${JEV_MARK(48)}Jev</div><div class="lbl" data-k="jvl" style="margin-top:24px;font-size:26px">for the choosing</div><div data-k="jvn" class="mono" style="font-size:24px;color:var(--sub);margin-top:16px"></div></div>
        <div class="abs" data-k="vs" style="left:500px;top:1170px;width:80px;height:80px;border-radius:50%;background:var(--bg);border:3px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:26px">VS<div class="abs" data-k="vsx" style="left:-6px;top:37px;width:92px;height:5px;background:var(--rd);transform:rotate(-35deg)"></div></div>
        ${ch}
      </div>`);
      r.tasks = tasks;
      r.t0 = at('so', 0, Ls('l6')); r.tVs = at('versus', 0, Ls('l6')); r.tThink = at('thinking', 0, Ls('l6')); r.tChoose = at('choosing', 0, Ls('l6'));
      return r;
    },
    update(T, r) {
      const ck = A(T, r.t0, 0.5);
      r.cl.style.opacity = ck; r.jv.style.opacity = ck;
      const apart = E.io(P(T, r.tVs + 0.6, 0.5));
      r.cl.style.transform = `translate(${lerp(60, 0, apart)}px,${(1 - ck) * 40}px)`;
      r.jv.style.transform = `translate(${lerp(-60, 0, apart)}px,${(1 - ck) * 40}px)`;
      const vk = A(T, r.t0 + 0.2, 0.3);
      r.vs.style.opacity = vk * (1 - A(T, r.tVs + 0.7, 0.3));
      r.vsx.style.transform = `rotate(-35deg) scaleX(${E.out(P(T, r.tVs + 0.25, 0.25))})`;
      const rk = pop(T, r.tVs + 0.8, 0.45);
      r.rt.style.opacity = clamp(rk); r.rt.style.transform = `scale(${clamp(rk)})`;
      r.pl.style.opacity = A(T, r.tVs + 1.0); r.pr.style.opacity = A(T, r.tVs + 1.0);
      const tl = A(T, r.tThink - 0.1, 0.3), tc = A(T, r.tChoose - 0.1, 0.3);
      r.cll.style.color = tl > 0.5 ? 'var(--orl)' : ''; r.jvl.style.color = tc > 0.5 ? 'var(--vil)' : '';
      r.cl.style.boxShadow = `0 0 ${70 * tl * (1 - tc * 0.6)}px rgba(232,121,75,.35), var(--shadow)`;
      r.jv.style.boxShadow = `0 0 ${70 * tc}px rgba(115,87,255,.45), var(--shadow)`;
      let nC = 0, nJ = 0;
      const start = r.tVs + 1.0;
      const bez = (p0, p1, p2, p3, u) => { const v = 1 - u; return v * v * v * p0 + 3 * v * v * u * p1 + 3 * v * u * u * p2 + u * u * u * p3; };
      r.tasks.forEach(([name, side], i) => {
        const st = start + i * 0.42;
        const f = P(T, st, 1.3);
        const c = r['tk' + i];
        if (T < st) { c.style.opacity = 0; return; }
        let x, y;
        if (f < 0.35) { const u = E.out(f / 0.35); x = 540; y = lerp(470, 760, u); }
        else { const u = E.io((f - 0.35) / 0.65); const tx = side ? 790 : 290; x = bez(540, 540, tx, tx, u); y = bez(760, 900, 920, 1080, u); }
        const w = c.offsetWidth || 200;
        tf(c, x - w / 2, y - 26, f >= 1 ? 0.6 : 1, 0, f >= 1 ? 0 : 1);
        c.style.borderColor = f > 0.35 ? (side ? 'var(--vi)' : 'var(--or)') : '';
        if (f >= 1) side ? nJ++ : nC++;
      });
      r.cln.textContent = nC ? `${nC} handled` : '';
      r.jvn.textContent = nJ ? `${nJ} handled` : '';
    },
  });

  // ============ 15. Costume: call log scan ============
  V.scene({
    name: 'log', theme: 'light', glow: [255, 255, 255],
    from: Ls('l7'),
    to: at('the', 0, Ls('l7') + 5),
    build(root) {
      const rows = [['Classify this ticket: spam or not?', 1], ['Write a reply to the customer', 0], ['Should we retry? yes or no', 1], ['Which tool: refund, lookup, escalate?', 1],
        ['Summarize this 40-message thread', 0], ['Is this urgent? yes or no', 1], ['Route to billing or tech?', 1], ['Draft the release notes', 0]];
      let h = '';
      rows.forEach(([t, d], i) => h += `<div data-k="r${i}" style="height:92px;display:flex;align-items:center;gap:20px;padding:0 28px;border-bottom:1px solid var(--line)">
        <span class="mono" style="font-size:22px;color:var(--mute);width:80px">#${1041 + i}</span><span class="mono" style="flex:1;font-size:25px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t}</span>
        <span class="pill" data-k="g${i}" style="width:150px;text-align:center;font-size:19px"></span></div>`);
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="win" data-k="w" style="left:70px;top:470px;width:940px;height:${64 + 92 * 8 + 70}px">
          <div class="bar"><i></i><i></i><i></i><span class="tt">Claude API · calls (example log)</span></div>${h}
          <div style="height:70px;display:flex;align-items:center;justify-content:flex-end;padding:0 28px;font-size:26px;font-weight:700" data-k="cnt"></div></div>
        <div class="abs" data-k="scan" style="left:70px;width:940px;height:6px;background:var(--bl);box-shadow:0 0 30px var(--bl);top:534px"></div>
      </div>`);
      r.rows = rows;
      r.t0 = Ls('l7'); r.tDec = at('decisions', 0, Ls('l7')); r.tCost = at('costume?', 0, Ls('l7'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.5);
      r.w.style.opacity = k; r.w.style.transform = `translateY(${(1 - k) * 40}px)`;
      const sStart = r.tDec - 1.0, sDur = 2.0;
      const sp = P(T, sStart, sDur);
      const sy = 534 + sp * 92 * 8;
      r.scan.style.top = sy + 'px';
      r.scan.style.opacity = sp > 0 && sp < 1 ? 1 : 0;
      let found = 0;
      r.rows.forEach(([t, d], i) => {
        const rowY = 534 + i * 92 + 46;
        const passed = sy >= rowY && T > sStart;
        const g = r['g' + i], row = r['r' + i];
        const flip = d && passed ? E.io(clamp((sy - rowY) / 120)) : 0;
        g.textContent = flip > 0.5 ? 'decision' : 'chat';
        g.style.background = flip > 0.5 ? 'var(--vi)' : 'rgba(var(--fgr),.08)';
        g.style.color = flip > 0.5 ? '#fff' : 'var(--sub)';
        g.style.transform = `rotateX(${(flip < 0.5 ? flip : 1 - flip) * 180}deg)`;
        row.style.background = d && passed ? 'rgba(115,87,255,.08)' : 'transparent';
        g.style.opacity = A(T, r.t0 + 0.3 + i * 0.05, 0.3);
        if (d && passed) found++;
      });
      r.cnt.innerHTML = T > sStart ? `<span style="color:var(--vi)">${found}</span>&nbsp;of 8 are decisions in a chatbot costume` : '';
    },
  });

  // ============ 16. Receipt ============
  V.scene({
    name: 'receipt', theme: 'dark', glow: [255, 140, 60],
    from: at('the', 0, Ls('l7') + 5),
    to: at('kind', 0, Ls('l7')),
    build(root) {
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="abs" data-k="slot" style="left:190px;top:590px;width:700px;height:22px;border-radius:11px;background:#2a2a2e;box-shadow:inset 0 4px 8px rgba(0,0,0,.6)"></div>
        <div class="abs" data-k="clip" style="left:220px;top:601px;width:640px;height:0;overflow:hidden">
          <div data-k="paper" style="width:640px;background:#f7f5ef;color:#1f1f1f;padding:44px 44px 70px;font-family:'JetBrains Mono',monospace;position:relative">
            <div style="text-align:center;font-size:28px;font-weight:700;letter-spacing:3px">AGENT BILL · THIS WEEK</div>
            <div style="text-align:center;font-size:20px;color:#888;margin-top:6px">illustration</div>
            <div style="border-top:2px dashed #bbb;margin:26px 0"></div>
            <div data-k="l1" style="display:flex;font-size:25px;position:relative"><span style="flex:1">flagship · 5,120 decisions</span><span>$184.30</span><div class="abs" data-k="s1" style="left:0;top:16px;height:3px;background:#dc2626;width:0"></div></div>
            <div data-k="l1b" style="display:flex;font-size:25px;color:#16a34a;margin-top:12px;font-weight:700"><span style="flex:1">→ decision model · 5,120</span><span>$3.70</span></div>
            <div style="display:flex;font-size:25px;margin-top:18px"><span style="flex:1">flagship · 640 writing tasks</span><span>$62.10</span></div>
            <div style="border-top:2px dashed #bbb;margin:26px 0"></div>
            <div style="display:flex;font-size:36px;font-weight:700;align-items:baseline"><span style="flex:1">TOTAL</span><span data-k="tot"></span></div>
            <div class="abs" data-k="stamp" style="left:250px;top:150px;padding:8px 16px;border:4px solid #dc2626;color:#dc2626;font-weight:800;font-size:22px;transform:rotate(-8deg);border-radius:8px">JUST THE MOST EXPENSIVE</div>
          </div></div>
      </div>`);
      r.t0 = at('the', 0, Ls('l7') + 5); r.tSmart = at('smartest', 0, Ls('l7')); r.tSome = at('sometimes', 0, Ls('l7'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0 - 0.1, 0.4);
      r.slot.style.opacity = k;
      const pr = E.io(P(T, r.t0 + 0.1, 1.6));
      r.clip.style.height = (620 * pr) + 'px';
      const re = E.io(P(T, r.tSmart - 0.2, 0.5));
      r.s1.style.width = (re * 100) + '%';
      r.l1.style.color = re > 0.5 ? '#aaa' : '';
      r.l1b.style.height = (re * 40) + 'px'; r.l1b.style.overflow = 'hidden'; r.l1b.style.opacity = re;
      const tot = lerp(246.40, 65.80, E.io(P(T, r.tSmart + 0.3, 0.8)));
      r.tot.textContent = '$' + tot.toFixed(2);
      r.tot.style.color = T > r.tSmart + 0.3 ? '#16a34a' : '';
      r.clip.style.height = (lerp(620, 660, re) * pr) + 'px';
      const sk = pop(T, r.tSome + 0.3, 0.35);
      r.stamp.style.opacity = clamp(sk); r.stamp.style.transform = `rotate(-8deg) scale(${lerp(1.8, 1, clamp(sk))})`;
    },
  });

  // ============ 17. Close ============
  V.scene({
    name: 'close', theme: 'dark', glow: [120, 90, 255],
    from: at('kind', 0, Ls('l7')),
    build(root) {
      let dots = '';
      for (let i = 0; i < 16; i++) dots += `<div class="abs" data-k="d${i}" style="left:0;top:0;width:14px;height:14px;border-radius:50%"></div>`;
      const r = el(root, `<div class="abs" style="inset:0">
        <div class="card" data-k="cl" style="left:110px;top:1080px;width:380px;height:170px;padding:30px;border-color:rgba(232,121,75,.5)">${CLAUDE_TAG(1.3)}<div class="lbl" style="margin-top:16px;color:var(--orl)">thinking</div></div>
        <div class="card" data-k="jv" style="left:590px;top:1080px;width:380px;height:170px;padding:30px;border-color:rgba(115,87,255,.6)"><div style="display:flex;align-items:center;gap:12px;font-size:39px;font-weight:700">${JEV_MARK(40)}Jev</div><div class="lbl" style="margin-top:16px;color:var(--vil)">choosing</div></div>
        ${dots}
        <div class="abs" data-k="q" style="left:90px;right:90px;top:560px;text-align:center;font-size:78px;font-weight:800;letter-spacing:-1.5px;line-height:1.12">Are AI agents <span style="position:relative;display:inline-block">overusing<span data-k="sel" class="abs" style="left:-10px;right:-10px;top:4px;bottom:-4px;border:4px solid var(--bl);background:rgba(59,130,246,.14);border-radius:4px"></span></span> frontier models?</div>
      </div>`);
      r.t0 = at('kind', 0, Ls('l7'));
      return r;
    },
    update(T, r) {
      const k = A(T, r.t0, 0.6);
      r.cl.style.opacity = k; r.jv.style.opacity = k;
      const fl = Math.sin(T * 1.2) * 8;
      r.cl.style.transform = `translateY(${(1 - k) * 40 + fl}px)`; r.jv.style.transform = `translateY(${(1 - k) * 40 - fl}px)`;
      for (let i = 0; i < 16; i++) {
        const side = i % 2;
        const ph = ((T - r.t0) * 0.5 + i / 16) % 1;
        const x = side ? lerp(540, 780, ph) : lerp(540, 300, ph), y = 900 + ph * 170 - Math.sin(ph * Math.PI) * 60;
        const d = r['d' + i];
        d.style.background = side ? 'var(--vil)' : 'var(--orl)';
        tf(d, x, y, 1, 0, Math.sin(ph * Math.PI) * k * 0.9);
      }
      const qa = A(T, V.speechEnd - 0.4, 0.6);
      r.q.style.opacity = qa; r.q.style.transform = `translateY(${(1 - qa) * 30}px)`;
      const sk = E.out(P(T, V.speechEnd + 0.3, 0.3));
      r.sel.style.clipPath = `inset(-10px ${(1 - sk) * 100}% -10px -10px)`;
      r.sel.style.opacity = sk;
    },
  });
};

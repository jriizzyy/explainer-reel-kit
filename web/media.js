// Real media (photos + optional video clips) for reels. Clips are .webm (VP9) in media/<set>/clips/.
window.__pending = [];
window.MEDIA_FILES = window.MEDIA_FILES || [];
function hasMedia(p) { return window.MEDIA_FILES.includes(p); }
function seekVideo(v, t) {
  if (!v) return;
  const d = v.duration || 1e9;
  const target = Math.max(0, Math.min(t, d - 0.05));
  if (v.readyState >= 1 && Math.abs(v.currentTime - target) < 0.004) return;
  window.__pending.push(new Promise(res => {
    const done = () => res();
    if (v.readyState < 1) { v.addEventListener('loadedmetadata', () => { v.addEventListener('seeked', done, { once: true }); v.currentTime = Math.max(0, Math.min(t, v.duration - 0.05)); }, { once: true }); }
    else { v.addEventListener('seeked', done, { once: true }); v.currentTime = target; }
    setTimeout(done, 4000);
  }));
}
window.__settle = async () => { const p = window.__pending; window.__pending = []; if (p.length) await Promise.all(p); };
// a video element filling its parent; returns html
function VIDEO(src, k = 'vid', fit = 'cover') { return `<video data-k="${k}" src="${src}" muted preload="auto" playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:${fit}"></video>`; }

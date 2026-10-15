/* Varient Designs — app shell, visitor journey, motion and micro-interactions. */
(function () {
  'use strict';
  const { CONTACT, CASES, WORK, CLIENTS, SKUS, TIMELINE, SERVICES, MODULES, PERSONAS, JOURNEY, QUESTIONS } = window.VD;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = !!window.gsap && !!window.ScrollTrigger;
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);
  const app = $('#app'), hdr = $('#hdr'), burger = $('#burger');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---------- small helpers ---------- */
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  const ARROW_UP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>';
  const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path class="pl-h" d="M5 12h14"/><path class="pl-v" d="M12 5v14"/></svg>';
  const REG = (cls = '') => `<svg class="${cls}" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="50" cy="50" r="28"/><circle cx="50" cy="50" r="13"/><path d="M4 50h92M50 4v92"/></svg>`;
  const ICON = {
    presence: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="20" cy="20" r="11"/><path class="ic-move" d="M28 28l12 12"/><path d="M15 20h10" class="ic-blink"/></svg>',
    premium: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 18l8-9h16l8 9-16 22z"/><path d="M8 18h32M20 9l-4 9 8 22 8-22-4-9" class="ic-move"/></svg>',
    growth: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 38h36"/><path class="ic-move" d="M8 32l10-10 7 6 15-15"/><path d="M32 13h8v8"/></svg>',
    tech: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 14l-10 10 10 10M31 14l10 10-10 10"/><path class="ic-move" d="M27 9l-6 30"/></svg>'
  };
  const kicker = t => `<span class="kicker">${t}</span>`;
  const arrowBtn = (href, label, tone = '', up = false, extra = '') =>
    `<a href="${href}" class="arrow-btn${up ? ' up' : ''}" ${tone ? `data-tone="${tone}"` : ''} ${extra}><span class="lbl">${label}</span><span class="circ mag">${up ? ARROW_UP : ARROW}</span></a>`;
  const pill = (href, label, extra = '') => `<a href="${href}" class="pill mag" ${extra}><span class="pf"></span><span class="pl">${label}</span><span class="pd">${ARROW}</span></a>`;
  const lines = arr => arr.map(l => `<span class="lm"><span>${l}</span></span>`).join('');
  const words = (txt, cls = '') => txt.split(' ').map(w => `<span class="w ${cls}">${w}</span>`).join(' ');
  const copyRow = (val, cls = 'mono') => `<span class="copy-row"><span class="${cls} selectable">${val}</span><button class="copy-btn" type="button" data-copy="${val}">Copy</button></span>`;
  const mq = (items, dur = 40, rev = false, cls = '') => { const inner = items.join(''); return `<div class="mq ${cls}"><div class="mq-t${rev ? ' rev' : ''}" style="--mq-d:${dur}s">${inner}${inner}</div></div>`; };
  const caseBy = slug => CASES.find(c => c.slug === slug);
  const personaBy = id => PERSONAS.find(p => p.id === id);
  const coverFor = key => {
    if (art.covers[key]) return art.covers[key]();
    const w = WORK.find(x => x.key === key);
    if (!w) return art.feed('Varient', ['#111111', '#D9CDB6', '#E5322A']);
    if (w.kind === 'dieline') return `<img class="cover-img" src="assets/img/pack/onlyapna-front.jpg" alt="" loading="lazy" draggable="false">`;
    if (w.key === 'social') return `<img class="cover-img" src="assets/img/social/glob-independence.jpg" alt="" loading="lazy" draggable="false" style="object-position:center 30%">`;
    if (w.key === 'art') return `<img class="cover-img" src="assets/img/art/lucid-dream.jpg" alt="" loading="lazy" draggable="false" style="object-position:center 35%">`;
    if (w.kind === 'feed') return `<img class="cover-img" src="assets/img/social/unitech-banner.jpg" alt="" loading="lazy" draggable="false">`;
    return art.site(w.name, w.pal);
  };
  const artFrom = ([group, key]) => group === 'covers' ? art.covers[key]() : art.reel[key]();
  const pad = n => String(n).padStart(2, '0');
  /* poster ornaments */
  const STAR = (cls = '') => { let d = ''; const n = 16; for (let i = 0; i < n * 2; i++) { const a = i * Math.PI / n - Math.PI / 2, r = i % 2 ? 22 + (i * 7 % 5) : 50; d += (i ? 'L' : 'M') + (50 + Math.cos(a) * r).toFixed(1) + ' ' + (50 + Math.sin(a) * r).toFixed(1); } return `<svg class="starburst ${cls}" viewBox="0 0 100 100" aria-hidden="true"><path d="${d}Z" fill="currentColor"/></svg>`; };
  const SPARK = (cls = '') => `<svg class="spark ${cls}" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 0 C21.5 14 26 18.5 40 20 C26 21.5 21.5 26 20 40 C18.5 26 14 21.5 0 20 C14 18.5 18.5 14 20 0Z" fill="currentColor"/></svg>`;
  const GLOBE = (cls = '') => `<svg class="globe ${cls}" viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="50" cy="50" r="46"/><ellipse class="gm1" cx="50" cy="50" rx="30" ry="46"/><ellipse class="gm2" cx="50" cy="50" rx="12" ry="46"/><path d="M4 50h92M10 28h80M10 72h80"/></svg>`;
  /* stock photography (assets/img) */
  const baImg = (f, alt) => `<img class="ba-img" src="assets/img/${f}" alt="${alt}" draggable="false" decoding="async">`;
  const BA_IMG = {
    range: [baImg('nx-before.jpg', 'Old Nutripleks bottles: five labels in different colours, typefaces and styles'), baImg('nx-after.jpg', 'New Nutripleks bottles: one white bottle family with a shared brand zone and illustrated product names')],
    hero: [baImg('nx-before.jpg', 'Old Nutripleks bottles, including Nutri 909 and Nutri Kadva'), baImg('nx-after-2.jpg', 'Redesigned Nutri 909, Bio 909, Nutri Kadva, Rakshak, Florigen and Sniper bottles')]
  };
  const ph = (name, alt = '', cls = '') => `<figure class="ph ${cls}"${alt ? '' : ' aria-hidden="true"'}><img src="assets/img/${name.includes('.') ? name : name + '.jpg'}" alt="${alt}" loading="lazy" decoding="async" draggable="false"></figure>`;
  const PIMG = { presence: 'p-ht-barista.png', premium: 'p-ht-brand-kit.png', growth: 'p-ht-phone-woman.png', tech: 'p-ht-code-light.png' };
  const TIMG = { presence: ['p-duo-cafe', 'A busy café seen from above'], premium: ['p-duo-flatlay-dark', 'Premium accessories laid out on a dark surface'], growth: ['p-duo-desk-white', 'A phone, notebook and laptop on a white desk'], tech: ['p-duo-code', 'Code on a laptop screen'] };
  const JIMG = ['p-st-barista.png', 'p-st-map-tools.png', 'p-st-brand-kit.png', 'p-st-code.png', 'p-st-desk-dark.png', 'p-st-phone-woman.png'];

  /* ---------- cleanup registry (per view) ---------- */
  let cleanups = [];
  const onCleanup = fn => cleanups.push(fn);
  let ctx = null, mm = null;

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!RM && window.Lenis && hasGSAP) {
    lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToY = (y, immediate) => lenis ? lenis.scrollTo(y, { immediate, duration: 1.2 }) : window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
  const scrollToEl = (el, off = 0) => el && scrollToY(el.getBoundingClientRect().top + window.scrollY - off);

  /* ======================================================================
     VISITOR STATE — the problem they picked, the plan they're building,
     and their health-check result. Kept per browser as a convenience.
     ====================================================================== */
  const S = { persona: null, plan: [], check: null, answers: [] };
  try { const saved = JSON.parse(localStorage.getItem('vd-journey') || 'null'); if (saved) Object.assign(S, saved, { answers: [] }); } catch (e) { /* storage blocked */ }
  const save = () => { try { localStorage.setItem('vd-journey', JSON.stringify({ persona: S.persona, plan: S.plan, check: S.check })); } catch (e) { /* ignore */ } };

  function setPersona(id, opts = {}) { document.body.classList.remove('hdr-hide');
    S.persona = id; save();
    $$('[data-persona]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.persona === id)));
    $$('.pcard').forEach(c => c.classList.toggle('chosen', c.dataset.card === id));
    renderPath(true); updateDock(); renderDrawer();
    const cta = $('.close-cta h2'); if (cta && current && current.view === 'home') cta.innerHTML = closeTitle();
    if (opts.scroll) { const p = $('#path'); if (p) setTimeout(() => scrollToEl(p, 20), 80); }
    if (opts.toast) toast(`Path set: ${personaBy(id).short}`);
  }
  function addModule(id, src) { document.body.classList.remove('hdr-hide');
    if (!S.plan.includes(id)) { S.plan.push(id); save(); fly(src); toast(`Added to your plan: ${MODULES[id].name}`); }
    else { S.plan = S.plan.filter(x => x !== id); save(); toast(`Removed: ${MODULES[id].name}`); }
    syncAddButtons(); updateDock(); renderDrawer();
  }
  const addBtn = (id, small = false) => `<button type="button" class="add${small ? ' sm' : ''}" data-add="${id}" aria-pressed="${S.plan.includes(id)}"><span class="add-ic">${PLUS}</span><span class="add-t">${MODULES[id].name}</span><span class="add-s">${S.plan.includes(id) ? 'In plan' : 'Add'}</span></button>`;
  function syncAddButtons() {
    $$('[data-add]').forEach(b => { const on = S.plan.includes(b.dataset.add); b.setAttribute('aria-pressed', String(on)); const s = $('.add-s', b); if (s) s.textContent = on ? 'In plan' : 'Add'; });
  }

  /* ---------- dock + drawer ---------- */
  const dock = $('#dock'), drawer = $('#drawer');
  function updateDock() {
    const show = !!(S.persona || S.plan.length || S.check);
    dock.hidden = !show;
    $('.dk-l', dock).textContent = S.persona ? personaBy(S.persona).short : 'Your plan';
    $('.dk-c', dock).textContent = S.plan.length;
  }
  function renderDrawer() {
    const p = S.persona && personaBy(S.persona);
    const groups = PERSONAS.map(x => ({ x, mods: Object.keys(MODULES).filter(k => MODULES[k].track === x.id && !S.plan.includes(k)) })).filter(g => g.mods.length);
    drawer.innerHTML = `
      <div class="dr-head"><span class="kicker">Your plan</span><button type="button" class="x" data-drawer-close>Close</button></div>
      <p class="dr-lab">The problem</p>
      <div class="chips">${PERSONAS.map(x => `<button type="button" class="chip" data-persona="${x.id}" aria-pressed="${S.persona === x.id}">${x.short}</button>`).join('')}</div>
      ${p ? `<p class="dr-out">${p.outcome}</p>` : '<p class="dr-out dim">Pick the problem that sounds most like yours.</p>'}
      ${S.check ? `<p class="dr-lab">Health check</p><div class="dr-scores">${['presence', 'premium', 'growth', 'tech'].map(a => `<span><b>${S.check[a]}</b>${personaBy(a).axis}</span>`).join('')}</div>` : ''}
      <p class="dr-lab">In your plan · ${S.plan.length}</p>
      ${S.plan.length ? `<ul class="dr-list">${S.plan.map(k => `<li><span>${MODULES[k].name}</span><button type="button" class="dr-rm" data-add="${k}" aria-label="Remove ${MODULES[k].name}">Remove</button></li>`).join('')}</ul>` : '<p class="dim dr-empty">Nothing yet. Add modules below, or let the health check suggest them.</p>'}
      <p class="dr-lab">Add more</p>
      ${groups.map(g => `<div class="dr-group"><span class="dr-g">${g.x.short}</span>${g.mods.map(k => addBtn(k, true)).join('')}</div>`).join('')}
      <div class="dr-cta">${pill('#contact', 'Send this plan', 'data-drawer-close')}${S.check ? '' : arrowBtn('#check', 'Take the health check', '', false, 'data-drawer-close')}${S.plan.length || S.persona ? '<button type="button" class="btn-ghost" data-clear>Start over</button>' : ''}</div>`;
  }
  function openDrawer() { renderDrawer(); document.body.classList.add('drawer-open'); dock.setAttribute('aria-expanded', 'true'); if (lenis) lenis.stop(); setTimeout(() => $('[data-drawer-close]', drawer)?.focus(), 300); }
  function closeDrawer() { if (!document.body.classList.contains('drawer-open')) return; document.body.classList.remove('drawer-open'); dock.setAttribute('aria-expanded', 'false'); if (lenis && !document.body.classList.contains('menu-open')) lenis.start(); }
  dock.addEventListener('click', () => document.body.classList.contains('drawer-open') ? closeDrawer() : openDrawer());
  drawer.addEventListener('click', e => {
    if (e.target.closest('[data-drawer-close]')) closeDrawer();
    if (e.target.closest('[data-clear]')) { S.persona = null; S.plan = []; S.check = null; save(); syncAddButtons(); renderPath(true); updateDock(); renderDrawer(); $$('[data-persona]').forEach(b => b.setAttribute('aria-pressed', 'false')); toast('Plan cleared'); }
  });

  /* fly a dot from the button to the dock */
  function fly(src) {
    updateDock();
    if (!src || RM || !hasGSAP || dock.hidden) { bump(); return; }
    const a = src.getBoundingClientRect(), b = dock.getBoundingClientRect();
    const d = document.createElement('span'); d.className = 'fly'; document.body.appendChild(d);
    const x0 = a.left + a.width / 2, y0 = a.top + a.height / 2, x1 = b.left + 26, y1 = b.top + b.height / 2;
    gsap.set(d, { x: x0, y: y0 });
    gsap.to(d, { x: x1, duration: .8, ease: 'power1.inOut' });
    gsap.to(d, { y: Math.min(y0, y1) - 120, duration: .4, ease: 'power2.out', onComplete: () => gsap.to(d, { y: y1, duration: .4, ease: 'power2.in', onComplete: () => { d.remove(); bump(); } }) });
  }
  function bump() { dock.classList.remove('bump'); void dock.offsetWidth; dock.classList.add('bump'); }

  /* toast */
  let toastT;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200); }

  /* ======================================================================
     TEMPLATES
     ====================================================================== */
  const footer = () => `
  <footer class="foot paper">
    <div class="wrap">
      <div class="foot-top">
        <div>${kicker('Say hello')}<h2 style="margin-top:18px">Got a problem worth solving? <em class="it">Bring it.</em></h2></div>
        <div class="foot-contact">${copyRow(CONTACT.email, 'mail selectable')}${copyRow(CONTACT.phone)}${pill('#contact', 'Start a project')}</div>
      </div>
      <div class="foot-word" aria-hidden="true"><svg viewBox="0 0 1000 190"><text x="500" y="168" text-anchor="middle" style="font-family:'Archivo','Arial Narrow',sans-serif;font-stretch:62%;font-weight:900" font-size="236" textLength="990" lengthAdjust="spacingAndGlyphs">VARIENT</text></svg></div>
      <div class="foot-grid">
        <div><h4>Problems we solve</h4><ul>${PERSONAS.map(p => `<li><a href="#solutions" data-track="${p.id}">${p.short}</a></li>`).join('')}</ul></div>
        <div><h4>Studio</h4><ul><li><a href="#work">Work</a></li><li><a href="#check">Brand health check</a></li><li><a href="#studio">Studio</a></li><li><a href="#contact">Contact</a></li></ul></div>
        <div><h4>Case studies</h4><ul>${CASES.map(c => `<li><a href="#work-${c.slug}">${c.name}</a></li>`).join('')}</ul></div>
        <div><h4>Elsewhere</h4><ul><li><a href="${CONTACT.site}" target="_blank" rel="noopener">vallabhgulve.com ↗</a></li><li>Pune, Maharashtra, India</li></ul></div>
      </div>
      <div class="foot-bot"><span>© 2026 Varient Designs</span><span>Website, branding, packaging and digital marketing studio in Pune · Stock photography for preview</span>${arrowBtn('#top', 'Back to top', 'dark', true, 'data-top')}</div>
    </div>
  </footer>`;

  const closeTitle = () => {
    const t = { presence: 'Let’s get you <em>found.</em>', premium: 'Let’s make you <em>look the part.</em>', growth: 'Let’s make the posts <em>pay.</em>', tech: 'Let’s make the tools <em>work for you.</em>' };
    return t[S.persona] || 'Let’s build <em>the next shelf.</em>';
  };
  const RING_TXT = 'SHIP IT ✶ SHIP IT ✶ SHIP IT ✶ ';
  const closeCTA = (title) => `
  <section class="close-cta tv-sec paper bone">
    <div class="wrap cc-grid">
      <div class="cc-copy">
        ${kicker('Next')}
        <h2 style="margin-top:22px">${title || closeTitle()}</h2>
        <div class="close-row">${pill('#contact', 'Start a project')}${arrowBtn('#check', 'Take the 2-minute health check', 'dark')}</div>
      </div>
      <div class="tv-stage" aria-hidden="true">
        <div class="tv">
          <div class="tv-body"><div class="tv-screen"><canvas class="tv-static" width="160" height="120"></canvas><span class="tv-txt">VARIENT</span></div><div class="tv-side"><i></i><i></i><i></i><b></b></div></div>
        </div>
        <div class="ring"><div class="ring-in">${RING_TXT.split('').map((c, i, arr) => `<span style="--a:${(i * 360 / arr.length).toFixed(2)}deg"><b>${c === ' ' ? '&nbsp;' : c}</b><i>${c === ' ' ? '&nbsp;' : c}</i></span>`).join('')}</div></div>
      </div>
    </div>
    <div class="wrap cc-foot mono"><span>${GLOBE('cc-globe')} Concept poster · Varient</span><span>${new Date().toLocaleDateString('en-GB').replace(/\//g, '.')}</span></div>
  </section>`;

  const symptomList = p => `<ul class="ticks" data-for="${p.id}">${p.symptoms.map((s, i) => `<li><button type="button" class="tick" aria-pressed="false" id="tk-${p.id}-${i}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="1" width="22" height="22" rx="5"/><path class="ck" d="M6 12.5l4 4 8-9"/></svg><span>${s}</span></button></li>`).join('')}</ul>`;

  /* ---------- HOME ---------- */
  const home = () => `
  <section class="poster paper" aria-label="Varient Designs">
    <div class="pst">
      <p class="pst-top mono"><span>VD—PUNE</span><span>18°31′N · 73°51′E</span><span>SCREENS &amp; SHELVES</span></p>
      <h1 class="pst-title"><span class="l1">Look</span><span class="l2">the part.</span><span class="sr-only"> Varient Designs, a design studio in Pune for websites, brands, packaging and digital marketing.</span></h1>
      <div class="pst-sky ph"><img src="assets/img/p-sky.jpg" alt="" decoding="async"></div>
      <p class="pst-red" aria-hidden="true">Break<br>the<br>ordinary</p>
      <div class="pst-fly" aria-hidden="true">
        <div class="fly-a">${art.single('pouch', 0, true)}</div>
        <div class="fly-b"><span class="fb-in"><b>RISE<br>EARLY.</b><em>Harvest proud.</em></span></div>
        <div class="fly-c"><span class="fs-bar">${ICON.presence}<span class="fs-q">design studio near me<i></i></span></span><span class="fs-r"><b>Varient Designs</b><em>varientdesigns.com · Pune</em></span></div>
      </div>
      ${STAR('pst-star')}
      <div class="pst-foot">
        <p class="pst-tag">Good business.<br>Does it look it?</p>
        <button type="button" class="pst-go mag" data-scrollto=".pick-sec">What’s in your way? ↓</button>
        <div class="pst-yr">${GLOBE('pst-globe')}<span>’26</span></div>
      </div>
    </div>
  </section>

  <section class="pick-sec paper bone" aria-label="What’s in your way?">
    <div class="wrap">
      <div class="pick-head">
        <div>${kicker('Start here')}<h2>What’s in <b>your way?</b></h2></div>
        <p>We design websites, brands, packaging and the digital systems behind them. Pick the problem that sounds most like yours.</p>
      </div>
      <div class="picker" role="group" aria-label="What’s in your way?">
        ${PERSONAS.map(p => `<button type="button" class="pick mag" data-persona="${p.id}" data-go aria-pressed="${S.persona === p.id}" style="--tint:${p.tint}"><span class="pk-n">${p.n}</span><span class="pk-ic" aria-hidden="true">${ICON[p.id]}</span><span class="pk-t">${p.problem}</span><span class="pk-s">${p.short} ${ARROW}</span></button>`).join('')}
      </div>
      <button type="button" class="h2-skip u-link" data-scrollto=".fam">Not sure yet? Look around first ↓</button>
    </div>
  </section>

  <section class="band red-sec" aria-hidden="true">
    ${mq(['Online presence', 'Premium brands', 'Packaging', 'Digital marketing', 'SEO', 'Tech and automation', 'UX/UI'].map((t, i) => `<span class="${i % 2 ? 'it' : ''}">${t}</span><span class="star">✳</span>`), 38, false, 'skewy')}
  </section>

  <section class="fam paper bone" aria-label="Sound familiar?">
    <div class="fam-pin">
      <div class="wrap fam-head">
        <div>${kicker('Sound familiar?')}<h2 style="margin-top:16px">Tick what sounds like <em class="it">your week.</em></h2></div>
        <p>Four problems walk through our door most often. Tick the ones you recognise and we’ll point you to the fix.</p>
      </div>
      <div class="fam-track">
        ${PERSONAS.map(p => `<article class="pcard tilt${S.persona === p.id ? ' chosen' : ''}" data-card="${p.id}" style="--tint:${p.tint}">
          <span class="glare" aria-hidden="true"></span>
          <header><span class="pc-n">${p.n}</span><span class="pc-ic" aria-hidden="true">${ICON[p.id]}</span></header>
          ${ph(PIMG[p.id], '', 'pc-ph')}
          <p class="pc-who">${p.who}</p>
          <h3>${p.problem}</h3>
          ${symptomList(p)}
          <div class="pc-foot"><span class="pc-count" aria-live="polite">0 of 4</span><button type="button" class="pc-cta mag" data-persona="${p.id}" data-go aria-pressed="${S.persona === p.id}">This is me ${ARROW}</button></div>
        </article>`).join('')}
        <article class="pcard pcard-end"><h3>None of these?</h3><p>Most problems are a mix. The health check scores all four in two minutes.</p>${pill('#check', 'Take the check')}</article>
      </div>
    </div>
  </section>

  <section class="path paper" id="path" aria-live="polite">
    <div class="wrap"><div class="path-body"></div></div>
  </section>

  <section class="think red-sec" aria-label="Thinking different also gets results">
    <div class="grid-ov" aria-hidden="true"></div>
    <div class="th-art" aria-hidden="true">
      <img class="th-bw" src="assets/img/p-face-bw.jpg" alt="" loading="lazy">
      <img class="th-ht" src="assets/img/p-face-ht.png" alt="" loading="lazy">
      ${[0, 1, 2, 3].map(i => `<div class="gb gb${i}"><img src="assets/img/p-face-bw.jpg" alt="" loading="lazy"></div>`).join('')}
    </div>
    <span class="th-logo" aria-hidden="true">Varient<sup>designs</sup></span>
    <p class="th-lab tr">Strategy<br>Identity<br>Packaging<br>Websites<br>Results<i></i></p>
    <p class="th-lab ml">Ideas that<br>connect<i></i></p>
    <p class="th-lab mr">Another way<br>to see your<br>business.<i></i></p>
    <p class="th-lab bl">Your outside<br>design &amp; marketing team<i></i></p>
    <p class="th-lab br">varientdesigns.com</p>
    <h2 class="th-title"><span class="tw">Thinking</span> <span class="tw">different</span> <span class="tw">also</span> <b class="tw">gets</b> <b class="tw">results.</b></h2>
  </section>

  <section class="ba-sec paper bone">
    <div class="wrap">
      <div class="ba-head">
        <div>${kicker('Nutripleks, before and after')}<h2 style="margin-top:16px" data-rv>${lines(['Same product.', '<em class="it">Different price tag.</em>'])}</h2></div>
        <p>Drag the line. These are the real Nutripleks bottles, before and after we rebuilt the range.</p>
      </div>
      <div class="chips ba-tabs" role="tablist" aria-label="Before and after examples">
        ${[['range', 'The full range'], ['hero', 'Nutri 909 and Kadva']].map(([k, l], i) => `<button type="button" class="chip" role="tab" data-ba="${k}" aria-selected="${i === 0}" aria-pressed="${i === 0}">${l}</button>`).join('')}
      </div>
      <div class="ba" role="slider" tabindex="0" aria-label="Before and after comparison" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" data-cursor="Drag">
        <div class="ba-before">${BA_IMG.range[0]}</div>
        <div class="ba-after">${BA_IMG.range[1]}</div>
        <div class="ba-line"><span class="ba-knob">${ARROW.replace('<svg', '<svg style="transform:scaleX(-1)"')}${ARROW}</span></div>
        <span class="ba-tag l">Before</span><span class="ba-tag r">After</span>
      </div>
      <ol class="ba-notes"></ol>
    </div>
  </section>

  <section class="reveal yel-sec" aria-label="The reveal">
    <div class="rv-pin">
      <canvas class="rv-canvas" aria-hidden="true"></canvas>
      <div class="rv-fallback" aria-hidden="true"><span class="rvf-dome"></span><span class="rvf-plate"></span></div>
      <div class="rv-copy">
        ${kicker('The reveal')}
        <h2>We don’t just redesign.<br><b>We reveal.</b></h2>
        <p>Your best brand is already in there. We take the lid off, then build everything around it.</p>
      </div>
      <ul class="rv-tags" aria-label="What's under the lid">${['Strategy', 'Identity', 'Packaging', 'Website', 'Content', 'Systems'].map((t, i) => `<li style="--i:${i}">${t}</li>`).join('')}</ul>
      <p class="rv-hint mono" aria-hidden="true">Scroll to lift ↓</p>
    </div>
  </section>

  <section class="jr blue-sec ink" aria-label="How a project runs">
    <div class="jr-pin">
      <div class="wrap jr-head">
        <p class="jr-codes mono"><span>04/26</span><span>VD.PSD1</span><span>PUNE·IN</span></p>
        <h2 class="jr-serif">The J${SPARK('jr-o')}urney</h2>
        <p class="jr-sub mono">From first<br>call to<br>first<br>customer</p>
      </div>
      <div class="jr-track">
        <svg class="jr-path" aria-hidden="true"><path class="jr-ghost"/><path class="jr-line"/></svg>
        <span class="jr-dot" aria-hidden="true"><i></i>You</span>
        ${JOURNEY.map(([t, d, g], i) => `<article class="jr-card" style="--i:${i}">${ph(JIMG[i], '', 'jr-ph')}<span class="jr-n">${pad(i + 1)}</span><h3>${t}</h3><p>${d}</p><p class="jr-get"><span>You get</span>${g}</p></article>`).join('')}
      </div>
    </div>
  </section>

  <section class="stack" aria-label="Selected work">
    <div class="stack-pin">
      <div class="panel" style="--tint:#111111">
        <div class="panel-text">${kicker('The proof')}<h3 style="font-style:normal">Proof, <em class="accent">not promises.</em></h3><p>Four projects, two crafts. Each one wipes in over the last.</p></div>
        <div class="panel-media">${art.hero()}</div>
      </div>
      ${CASES.map((c, i) => `
      <article class="panel" style="--tint:${c.tint}">
        <div class="panel-head"><span><b>0${i + 1}</b> / Case study</span><span>${PERSONAS.filter(p => p.cases.includes(c.slug)).map(p => p.short).join(' · ')}</span></div>
        <div class="panel-text"><p class="tags"><b>${c.client}</b> · ${c.tags.join(' · ')}</p><h3>${c.name}</h3><p>${c.line}</p>${arrowBtn('#work-' + c.slug, 'See the project')}${liveLink(c.slug)}</div>
        <a class="panel-media${webPreview.has(c.slug) ? ' has-wp' : ''}" href="#work-${c.slug}" data-cursor="View" aria-label="${c.name} case study, website preview">${webPreview.has(c.slug) ? webPreview(c.slug) : art.covers[c.slug]()}</a>
        <span class="panel-num" aria-hidden="true">0${i + 1}</span>
      </article>`).join('')}
      <nav class="rail" aria-label="Projects">${CASES.map((c, i) => `<a href="#work-${c.slug}" data-i="${i}">0${i + 1} ${c.name}</a>`).join('')}</nav>
    </div>
  </section>

  <section class="tease hand-sec ink">
    <div class="hs-bg" aria-hidden="true"><img src="assets/img/p-bw-barista.jpg" alt="" loading="lazy"></div>
    <div class="wrap tease-grid">
      <div>
        ${kicker('Two-minute health check')}
        <h2 class="hand" aria-label="How does your brand really score?"><span>How does</span><span>your <b>brand</b></span><span>really</span><span><b>score?</b></span></h2>
        <p class="hand-sm">Eight questions. One honest score.</p>
        <p class="body-serif dim" style="margin-top:20px">You get a score for presence, premium feel, growth and tech, and a plan you can send us.</p>
        <div style="margin-top:28px">${pill('#check', 'Start the check')}</div>
      </div>
      <div class="tease-visual"><div class="tease-card">
        <span class="label dim">Question 1 of 8</span>
        <p class="tq">${QUESTIONS[0].q}</p>
        <div class="tq-opts">${QUESTIONS[0].a.map((a, i) => `<button type="button" class="opt" data-first="${i}"><span class="ol">${'ABCD'[i]}</span>${a}</button>`).join('')}</div>
      </div></div>
    </div>
  </section>

  <section class="wall red-sec" aria-label="Clients">
    ${REG('wall-mark spin')}
    <div class="wrap">${kicker('Clients')}<h2 style="margin-top:16px">Who we’ve <em class="it">made things for.</em></h2></div>
    <div class="wall-rows">${[0, 1, 2, 3].map(r => {
      const items = CLIENTS.filter((_, i) => i % 4 === r).map(n => { const w = WORK.find(x => x.name === n || n.toLowerCase().startsWith(x.name.toLowerCase()));
        const href = w && w.kind === 'case' ? '#work-' + w.key : '#work';
        return `<a href="${href}" data-k="${w ? w.key : ''}" data-n="${n}" data-t="${w ? w.type : 'Client'}"><span>${n}</span><sup>${pad(CLIENTS.indexOf(n) + 1)}</sup></a>`; });
      return `<div class="wall-row">${mq(items, 70 + r * 12, r % 2 === 1, 'skewy')}</div>`; }).join('')}</div>
    <div class="wrap wall-foot"><span class="label dim">( And more on the way )</span>${arrowBtn('#work', 'See all work')}</div>
  </section>

  <section class="credits paper">
    <div class="wrap">
      ${kicker('Trusted by')}
      <div class="credits-vp"><div class="credits-track">${[...CLIENTS, ...CLIENTS].map(c => `<span>${c}</span>`).join('')}</div></div>
      <p class="sr-only">Clients: ${CLIENTS.join(', ')}.</p>
      <p class="closer">Next on the shelf: <mark>your brand?</mark></p>
    </div>
  </section>
  ${closeCTA()}`;

  /* personalised path block */
  function pathHTML() {
    const p = S.persona && personaBy(S.persona);
    if (!p) return `
      <div class="path-empty">
        ${kicker('Your path')}
        <h2>Pick a problem. <em class="it">We’ll draw the route.</em></h2>
        <div class="picker picker-sm">${PERSONAS.map(x => `<button type="button" class="pick mag" data-persona="${x.id}" aria-pressed="false"><span class="pk-n">${x.n}</span><span class="pk-t">${x.problem}</span></button>`).join('')}</div>
        <p class="body-serif dim">Or let the <a class="u-link" href="#check">two-minute health check</a> decide for you.</p>
      </div>`;
    return `
      <div class="path-top">
        <div>${kicker('Your path · ' + p.short)}<h2 class="path-title">${p.problem.replace(/\.$/, '')}<em class="it">? Here’s the fix.</em></h2></div>
        <div class="chips" role="group" aria-label="Change problem">${PERSONAS.map(x => `<button type="button" class="chip" data-persona="${x.id}" aria-pressed="${x.id === p.id}">${x.short}</button>`).join('')}</div>
      </div>
      <div class="path-grid">
        <div class="path-out">
          <p class="label dim">Where you’ll end up</p>
          <p class="po-big">${p.outcome}</p>
          <ol class="path-steps">${p.steps.map((s, i) => `<li><span class="ps-n">${pad(i + 1)}</span><span>${s}</span></li>`).join('')}</ol>
        </div>
        <div class="path-side">
          <p class="label dim">Build your plan</p>
          <div class="adds">${p.modules.map(m => addBtn(m)).join('')}</div>
          <p class="label dim" style="margin-top:28px">Proof</p>
          <div class="path-cases">${p.cases.map(s => { const c = caseBy(s); return `<a class="pcase tilt" href="#work-${c.slug}" data-cursor="View"><span class="glare" aria-hidden="true"></span><span class="pcm">${webPreview.has(c.slug) ? webPreview.mini(c.slug) : art.covers[c.slug]()}</span><span class="pct">${c.name}<em>${c.tags[0]}</em></span></a>`; }).join('')}</div>
        </div>
      </div>
      <div class="path-cta">${pill('#contact', 'Start with this')}${arrowBtn('#solutions', 'See the full solution', 'dark', false, `data-track="${p.id}"`)}</div>`;
  }
  function renderPath(animate) {
    const body = $('.path-body', app); if (!body) return;
    const go = () => { body.innerHTML = pathHTML(); if (hasGSAP && !RM && animate) gsap.from(body.children, { y: 30, opacity: 0, stagger: .08, duration: .7, ease: 'power3.out', clearProps: 'all' }); if (hasGSAP) ScrollTrigger.refresh(); };
    if (animate && hasGSAP && !RM && body.children.length) gsap.to(body.children, { y: -20, opacity: 0, duration: .25, stagger: .03, onComplete: go });
    else go();
  }

  /* ---------- SOLUTIONS ---------- */
  const solutions = () => `
  <section class="page-hero paper"><div class="wrap">
    ${kicker('Solutions')}
    <h1 data-rv>${lines(['Tell us the problem.', '<em>We’ll bring the fix.</em>'])}</h1>
    <div class="picker picker-sm" style="margin-top:44px">${PERSONAS.map(p => `<button type="button" class="pick mag" data-jump-track="${p.id}"><span class="pk-n">${p.n}</span><span class="pk-ic" aria-hidden="true">${ICON[p.id]}</span><span class="pk-t">${p.problem}</span></button>`).join('')}</div>
  </div></section>
  ${PERSONAS.map((p, i) => `
  <section class="track ink" id="track-${p.id}" style="--tint:${p.tint}">
    <div class="wrap">
      <div class="track-head">
        <div>
          <span class="tn">${p.n} / 04 · ${p.short}</span>
          <h2 data-rv>${lines([p.problem])}</h2>
          <p class="label dim" style="margin-top:18px">For ${p.who.toLowerCase()}</p>
          <p class="lede" style="margin-top:22px;max-width:30ch">${p.outcome}</p>
        </div>
        <div class="track-ticks"><p class="label dim">Tick what’s true for you</p>${symptomList(p)}<p class="tk-verdict dim" aria-live="polite"></p></div>
      </div>
      ${ph(TIMG[p.id][0], TIMG[p.id][1], 'track-ph')}
      <div class="track-steps">${p.steps.map((s, k) => `<div class="tstep"><span class="ps-n">${pad(k + 1)}</span><p>${s}</p></div>`).join('')}</div>
      <div class="track-foot">
        <div><p class="label dim">Modules</p><div class="adds">${p.modules.map(m => addBtn(m)).join('')}</div></div>
        <div><p class="label dim">Proof</p><div class="path-cases">${p.cases.map(s => { const c = caseBy(s); return `<a class="pcase tilt" href="#work-${c.slug}" data-cursor="View"><span class="glare" aria-hidden="true"></span><span class="pcm">${webPreview.has(c.slug) ? webPreview.mini(c.slug) : art.covers[c.slug]()}</span><span class="pct">${c.name}<em>${c.tags[0]}</em></span></a>`; }).join('')}</div></div>
      </div>
      <div class="path-cta">${pill('#contact', 'Start with this', `data-persona="${p.id}"`)}${i < PERSONAS.length - 1 ? `<button type="button" class="u-link label" data-jump-track="${PERSONAS[i + 1].id}">Next problem: ${PERSONAS[i + 1].short} →</button>` : ''}</div>
    </div>
  </section>`).join('')}
  <section class="svc ink">
    <div class="wrap">
      <div class="svc-head"><div>${kicker('The crafts behind it')}<h2 style="margin-top:16px">Two crafts, <em class="it">three ways in.</em></h2></div><p>Hover a row to see what’s inside.</p></div>
      <div class="svc-list">${SERVICES.map(s => `<div class="svc-row" tabindex="0"><span class="n"><i></i>${s.n}</span><span class="tz"><h3>${s.name}<span class="gh" aria-hidden="true">${s.name}</span></h3><span class="items">${mq(s.items.map(x => `<span>${x}</span>`), 28)}</span></span></div>`).join('')}</div>
    </div>
  </section>
  <section class="process paper"><div class="wrap">
    ${kicker('The method')}
    <h2 class="serif" style="font-size:var(--t-2xl);line-height:1;margin-top:18px" data-rv>${lines(['Three steps, <em class="it">in this order.</em>'])}</h2>
    <ol>
      <li><span class="pn">01</span><h3>Understand the user</h3><p class="body-serif dim">Interviews, audits, and a look at what’s actually on the shelf or in the analytics.</p></li>
      <li><span class="pn">02</span><h3>Build the system</h3><p class="body-serif dim">Grid, type, colour, components and label structure, tested on real content.</p></li>
      <li><span class="pn">03</span><h3>Ship the artifact</h3><p class="body-serif dim">Production-ready builds and print-ready files, checked before they leave the studio.</p></li>
    </ol>
  </div></section>
  ${closeCTA()}`;

  /* ---------- HEALTH CHECK ---------- */
  const check = () => `
  <section class="chk ink">
    <div class="wrap">
      <div class="chk-head">${kicker('Brand health check')}<h1 data-rv>${lines(['Eight questions.', '<em>One honest score.</em>'])}</h1></div>
      <div class="chk-box">
        <div class="chk-top">
          <span class="chk-n label">Question <b>1</b> of ${QUESTIONS.length}</span>
          <span class="chk-axis label"></span>
          <svg class="chk-ring" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19"/><circle class="cr" cx="22" cy="22" r="19" pathLength="100"/></svg>
        </div>
        <div class="chk-q"></div>
        <div class="chk-nav"><button type="button" class="btn-ghost" data-back>← Back</button><span class="label dim">Your answers stay in this browser.</span></div>
      </div>
      <div class="chk-res" hidden></div>
    </div>
  </section>
  ${closeCTA()}`;

  function radarSVG(sc, size = 360) {
    const c = size / 2, R = size * .36, ax = ['presence', 'premium', 'growth', 'tech'], ang = [-90, 0, 90, 180].map(a => a * Math.PI / 180);
    const pt = (i, v) => [c + Math.cos(ang[i]) * R * v, c + Math.sin(ang[i]) * R * v];
    const grid = [.25, .5, .75, 1].map(g => `<polygon points="${ax.map((_, i) => pt(i, g).join(',')).join(' ')}" class="rd-grid"/>`).join('');
    const axes = ax.map((_, i) => `<line x1="${c}" y1="${c}" x2="${pt(i, 1)[0]}" y2="${pt(i, 1)[1]}" class="rd-grid"/>`).join('');
    const labels = ax.map((a, i) => { const [x, y] = pt(i, 1.2); return `<text x="${x}" y="${y + 4}" text-anchor="middle" class="rd-lab">${personaBy(a).axis.toUpperCase()}</text>`; }).join('');
    return `<svg class="radar" viewBox="0 0 ${size} ${size}" data-scores='${JSON.stringify(sc)}' role="img" aria-label="Scores: ${ax.map(a => personaBy(a).axis + ' ' + sc[a]).join(', ')}">${grid}${axes}<polygon class="rd-poly" points="${ax.map(() => c + ',' + c).join(' ')}"/>${ax.map((_, i) => `<circle class="rd-pt" r="5" cx="${c}" cy="${c}"/>`).join('')}${labels}</svg>`;
  }
  function animateRadar(svgEl) {
    const sc = JSON.parse(svgEl.dataset.scores), size = svgEl.viewBox.baseVal.width, c = size / 2, R = size * .36;
    const ax = ['presence', 'premium', 'growth', 'tech'], ang = [-90, 0, 90, 180].map(a => a * Math.PI / 180);
    const poly = $('.rd-poly', svgEl), pts = $$('.rd-pt', svgEl);
    const draw = t => { const P = ax.map((a, i) => [c + Math.cos(ang[i]) * R * (sc[a] / 100) * t, c + Math.sin(ang[i]) * R * (sc[a] / 100) * t]); poly.setAttribute('points', P.map(p => p.join(',')).join(' ')); P.forEach((p, i) => { pts[i].setAttribute('cx', p[0]); pts[i].setAttribute('cy', p[1]); }); };
    if (RM || !hasGSAP) return draw(1);
    const o = { t: 0 }; gsap.to(o, { t: 1, duration: 1.4, ease: 'elastic.out(1, .6)', onUpdate: () => draw(o.t) });
  }

  /* ---------- WORK ---------- */
  const work = () => `
  <section class="ink">
    <div class="wrap work-hero">
      <div>${kicker('Work')}<h1 class="display" style="margin-top:16px">Work</h1></div>
      <div class="hint"><span>Drag to drift. Click a tile to open it.</span><span class="label">${WORK.length} projects · screens, shelves and feeds</span></div>
    </div>
    <div class="wrap work-bar">
      <div class="chips" role="group" aria-label="Filter by craft">${['All', 'Screen', 'Shelf', 'Social'].map((f, i) => `<button class="chip" type="button" data-f="${f}" aria-pressed="${i === 0}">${f}</button>`).join('')}</div>
      <div class="chips" role="group" aria-label="View"><button class="chip" type="button" data-v="canvas" aria-pressed="true">Canvas</button><button class="chip" type="button" data-v="index" aria-pressed="false">Index</button></div>
    </div>
    <div class="work-views">
      <div class="drift" data-cursor="Drag" aria-label="Project canvas"><div class="drift-plane"></div><div class="drift-vignette"></div></div>
      <div class="wrap index-list">${WORK.map((w, i) => `<a class="ix-row" href="${w.kind === 'case' ? '#work-' + w.key : '#work'}" data-k="${w.key}" data-craft="${w.craft}"><span class="ixn">${pad(i + 1)}</span><span class="ixt">${w.name}</span><span class="ixc">${w.craft}</span><span class="ixd">${w.kind === 'case' ? 'Case study' : w.type}</span><span class="arrow-btn"><span class="circ">${ARROW}</span></span></a>`).join('')}</div>
    </div>
  </section>
  <section class="pos ink"><div class="wrap pos-grid">
    <h2 data-rv>${lines(['The proof,', '<em class="it">not the promise.</em>'])}</h2>
    <p class="body-serif dim">Four projects have full case studies. The rest are a quick look. Ask about any of them and we’ll walk you through it, from first research call to the files that went to print.</p>
  </div></section>
  ${closeCTA('Your project <em>goes here next.</em>')}`;

  /* ---------- CASE ---------- */
  const shelfSection = () => `
  <section class="shelf ink" aria-label="The Nutripleks shelf">
    <div class="shelf-pin">
      <div class="wrap shelf-head"><div>${kicker('The shelf')}<h2 style="margin-top:16px">26 SKUs. <em>One family.</em></h2></div><p>The range, format by format. Hover a pack to see what it is.</p></div>
      <div class="shelf-track-wrap"><div class="shelf-track">${SKUS.map((s, i) => `<div class="sku" tabindex="0"><span class="sku-tag">${pad(i + 1)} · ${s.tag}</span>${art.single(s.kind, s.i, s.light)}<span class="sku-n">${pad(i + 1)}</span></div>`).join('')}</div></div>
      <div><div class="shelf-floor"></div><div class="wrap shelf-foot"><span class="label dim">Illustration of the range by format</span><span class="shelf-prog" aria-hidden="true"><b></b></span></div></div>
    </div>
  </section>`;
  const caseView = slug => {
    const c = caseBy(slug); if (!c) return notFound();
    const idx = CASES.indexOf(c), next = CASES[(idx + 1) % CASES.length], others = CASES.filter(x => x !== c).slice(0, 2);
    const solves = PERSONAS.filter(p => p.cases.includes(c.slug));
    return `
    <section class="case-hero" style="--tint:${c.tint}">
      <div class="wrap ch-top">
        ${kicker('Case study · 0' + (idx + 1))}
        <h1 class="display" data-rv>${lines([c.name])}</h1>
        <p class="lede">${c.line}</p>
        <dl class="case-meta"><div><dt>Client</dt><dd>${c.client}</dd></div><div><dt>Problem solved</dt><dd>${solves.map(p => p.short).join(', ')}</dd></div><div><dt>Scope</dt><dd>${c.tags.join(', ')}</dd></div></dl>
      </div>
      ${c.slug === 'nutripleks' || !webPreview.has(c.slug) ? `<div class="case-media">${art.covers[c.slug]()}</div>` : ''}
    </section>
    ${window.webPreview && webPreview.has(c.slug) ? `<section class="case-prev ink" style="background:${c.tint}"><div class="wrap">
      <div class="cp-head">${kicker('Website preview')}<p class="label dim">${webPreview.live(c.slug) ? 'Captured from the live site · scrolls on its own, hover to pause' : 'Desktop and phone · scrolls on its own, hover to pause'}</p>${liveLink(c.slug)}</div>
      ${webPreview(c.slug, { cls: 'wp-lg' })}
    </div></section>` : ''}
    <section class="case-q ink"><div class="wrap"><h2 data-rv>${lines([c.q])}</h2><p data-fade>${c.a}</p></div></section>
    <section class="ink"><div class="wrap">
      <div class="case-sec"><div>${kicker('The brief')}<h3>Where it started</h3></div><div>${c.brief.map(p => `<p class="body-serif" data-fade>${p}</p>`).join('')}</div></div>
      <div class="case-sec"><div>${kicker('The system')}<h3>What we built</h3></div><div>${c.system.map(p => `<p class="body-serif" data-fade>${p}</p>`).join('')}</div></div>
    </div></section>
    <section class="case-quote ink"><div class="wrap"><span class="pq" aria-hidden="true">“</span><blockquote data-rv>${lines([c.quote])}</blockquote></div></section>
    ${c.slug === 'nutripleks' ? shelfSection() : ''}
    <section class="gal ink"><div class="gal-pin">
      <div class="wrap gal-head">${kicker('Gallery')}<span class="label dim">Keep scrolling</span></div>
      <div class="gal-track">${c.gallery.map((g, i) => `<figure class="gal-item"><div class="gm">${artFrom(g)}</div><figcaption><b>0${i + 1}</b><span>${g[2]}</span></figcaption></figure>`).join('')}</div>
    </div></section>
    <section class="ink"><div class="wrap">
      <div class="case-sec"><div>${kicker('The craft')}<h3>How it shipped</h3></div><div>${c.craftText.map(p => `<p class="body-serif" data-fade>${p}</p>`).join('')}<div class="deliv">${c.deliverables.map(d => `<span>${d}</span>`).join('')}</div></div></div>
      ${solves.length ? `<div class="case-sec"><div>${kicker('Same problem?')}<h3>Start your own</h3></div><div><p class="body-serif dim">If ${solves.map(p => `“${p.problem.toLowerCase().replace(/\.$/, '')}”`).join(' or ')} sounds like you, this is the route we’d take.</p><div class="path-cta" style="margin-top:24px">${solves.map(p => `<button type="button" class="chip" data-persona="${p.id}" data-go-path aria-pressed="${S.persona === p.id}">Set my path: ${p.short}</button>`).join('')}</div></div></div>` : ''}
    </div></section>
    <section class="see-also ink"><div class="wrap">
      ${kicker('See also')}
      <div class="sa-grid">${others.map(o => `<a class="sa-card tilt" href="#work-${o.slug}" data-cursor="View"><span class="glare" aria-hidden="true"></span><div class="sm">${webPreview.has(o.slug) ? webPreview.mini(o.slug) : art.covers[o.slug]()}</div><div class="sr"><h3>${o.name}</h3><span class="label dim">${o.tags.slice(0, 2).join(' · ')}</span></div></a>`).join('')}</div>
    </div></section>
    <a class="next-proj ink" href="#work-${next.slug}" data-cursor="Next"><span class="np-bg" aria-hidden="true">${art.covers[next.slug]()}</span><span class="wrap np-in"><span class="label dim">Next project</span><span class="display">${next.name} →</span></span></a>
    ${closeCTA('Want this <em>for your brand?</em>')}`;
  };

  /* ---------- STUDIO ---------- */
  function barcode() {
    let x = 0, out = ''; const pattern = '2131121311221312131122113121321112311212';
    for (let i = 0; i < pattern.length; i++) { const w = +pattern[i] * 1.6; if (i % 2 === 0) out += `<rect x="${x}" y="0" width="${w}" height="54"/>`; x += w; }
    return `<svg viewBox="0 0 ${x} 54" preserveAspectRatio="none" aria-hidden="true" fill="currentColor">${out}</svg>`;
  }
  const studio = () => {
    const METHOD = [
      { t: 'Understand the user.', line: 'Before a pixel or a fold, we find out who’s holding it.', img: 'p-ht-phone-woman.png', cap: 'Research · audits · data',
        design: ['User interviews', 'Brand and competitor audit', 'Shelf and store audit', 'Personas and journeys'],
        tech: ['Analytics and GA4 audit', 'SEO and search-intent research', 'Site speed and Core Web Vitals', 'Tech stack and data audit'],
        out: 'A short audit: what to fix first, and why.' },
      { t: 'Build the system.', line: 'One grid for the app and the carton. One voice for the post and the label.', img: 'p-ht-brand-kit.png', cap: 'Identity · UX/UI · CMS',
        design: ['Identity and guidelines', 'Packaging system and dielines', 'UX/UI and design system', 'Content and tone of voice'],
        tech: ['WordPress and headless CMS', 'E-commerce: Shopify, WooCommerce', 'API, CRM and payment integrations', 'ETL pipelines and data cleaning'],
        out: 'A system your team can run without us.' },
      { t: 'Ship the artifact.', line: 'Files that print right the first time. Sites that load before anyone gets bored.', img: 'p-duo-code.jpg', cap: 'Print · launch · automation',
        design: ['Print-ready artwork', '3D mockups and shelf tests', 'Social and campaign kits'],
        tech: ['Hosting, domains, SSL and backups', 'Automation: forms to CRM, WhatsApp, email', 'Dashboards and reporting', 'Support and maintenance plans'],
        out: 'A launch with a checklist, and someone on call after it.' }
    ];
    const nos = ['Just make the logo bigger', 'Can we use a template?', 'Copy the competitor', 'Add a gradient', 'Make it pop', 'We’ll fix it in print'];
    return `
  <section class="page-hero paper"><div class="wrap">${kicker('Studio')}<h1 data-rv>${lines(['Two crafts.', '<em>One discipline.</em>'])}</h1></div></section>
  <section class="mantra ink" aria-label="Things we hear in briefs">${mq(nos.map(n => `<span><s>${n}</s></span><span class="x">or do it properly.</span>`), 60, false, 'skewy')}</section>
  <section class="photo-band ink">${ph('p-duo-map-tools', 'A field notebook, map, pencil and camera on a desk', 'pb-ph')}<div class="wrap pb-cap"><span class="kicker">Research first</span><p>Every project starts with what people actually see, hold and search for.</p></div></section>
  <section class="manifesto ink" aria-label="The method">
    <div class="mf-stage">
      <div class="mf-bg spin">${REG()}</div>
      <div class="mf-steps" aria-hidden="true">${['Understand', 'Build', 'Ship'].map((t, i) => `<span${i ? '' : ' class="on"'}><b>0${i + 1}</b>${t}</span>`).join('')}</div>
      ${METHOD.map((m, i) => `<div class="mf-beat" data-i="${i}">
        <div class="mf-left">
          <p class="mf-no mono">0${i + 1} / 03 · The method</p>
          <p class="display">${words(m.t)}</p>
          <p class="it">${m.line}</p>
          <figure class="mf-pic">${ph(m.img, '', 'mf-ph')}<figcaption class="mono">${m.cap}</figcaption></figure>
        </div>
        <div class="mf-card">
          <p class="mf-ch mono">What happens here</p>
          <div class="mf-cols">
            <div><h4>Design</h4><ul>${m.design.map(x => `<li>${x}</li>`).join('')}</ul></div>
            <div><h4>Technical</h4><ul class="tech">${m.tech.map(x => `<li>${x}</li>`).join('')}</ul></div>
          </div>
          <p class="mf-out"><span class="mono">You get</span>${m.out}</p>
        </div>
      </div>`).join('')}
    </div>
  </section>
  <section class="facts paper">
    <div class="wrap facts-grid">
      <div>${kicker('The label')}<h2 style="margin-top:22px" data-rv>${lines(['Every pack has to tell', 'the truth in a small space.', '<em class="it">Here’s ours.</em>'])}</h2></div>
      <div class="label-card" role="table" aria-label="Studio facts">
        <div class="lc-h">Studio Facts</div>
        <div class="lc-s"><span>Serving size: 1 brand, every surface</span></div>
        <div class="lc-row thick" role="row"><b role="cell">Amount per studio</b><span role="cell"></span></div>
        <div class="lc-row" role="row"><b role="cell">Crafts</b><span class="num" role="cell" data-count="2">2</span></div>
        <div class="lc-row" role="row"><b role="cell">Years in practice</b><span class="num" role="cell" data-count="6">6</span></div>
        <div class="lc-row" role="row"><span class="lc-ind" role="cell">Websites shipped end to end</span><span class="num" role="cell" data-count="11">11</span></div>
        <div class="lc-row" role="row"><span class="lc-ind" role="cell">SKUs in one packaging system</span><span class="num" role="cell" data-count="26">26</span></div>
        <div class="lc-row thick" role="row"><b role="cell">Services</b><span class="num" role="cell" data-count="8">8</span></div>
        <p class="lc-fine">UX/UI · packaging · brand identity · WordPress and web · CMS development · ETL pipelines · SEO · social media.</p>
        <p class="lc-fine"><b>Ingredients:</b> user research, information architecture, typography, colour, dielines, code. <b>Contains:</b> opinions. Made in Pune, India.</p>
        <div class="lc-bar">${barcode()}<span class="mono">VD · 2018–2026</span></div>
      </div>
    </div>
  </section>
  <section class="values paper"><div class="wrap">
    ${kicker('How we work')}
    <h2 class="serif" style="font-size:var(--t-2xl);line-height:1;margin-top:18px" data-rv>${lines(['Four rules, <em class="it">no exceptions.</em>'])}</h2>
    <div class="val-list">${[['Understand the user.', 'Research comes before a single frame or fold. We talk to the people who will tap it and the people who will pick it up.'], ['Build the system.', 'Grids, type, colour and rules that hold across a website, an app and a twenty-six-pack range.'], ['Ship the artifact.', 'Print-ready files and production-ready builds. Design isn’t done until it’s on the shelf or live on the site.'], ['One brand, every surface.', 'The post, the label and the product page should feel like the same company. That’s the whole job.']]
      .map(([h, p], i) => `<div class="val"><span class="vn">0${i + 1}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
  </div></section>
  <section class="founder ink"><div class="wrap founder-grid">
    <figure style="margin:0"><div class="pf tilt"><span class="glare" aria-hidden="true"></span>${art.portrait()}<p class="hand pf-hand" aria-hidden="true"><span>The brand</span><span>you want</span><span>to <b>build</b></span><span>wants to be</span><span><b>built.</b></span></p></div><figcaption class="label dim" style="margin-top:12px">Vallabh Gulve · Founder</figcaption></figure>
    <div>
      ${kicker('Who holds the pen tool')}
      <h2>Vallabh <em class="it accent" style="text-transform:none;font-weight:400">Gulve</em></h2>
      <p class="body-serif dim">Trained at the MIT Institute of Design, with a Bachelor of Design in UX. Six years across digital product design and physical packaging, from research and wireframes to dielines and print. Every project gets the person who designs it, not a handover.</p>
      <div class="tl">${TIMELINE.map(([y, r, o]) => `<div class="tl-row"><span class="ty">${y}</span><span>${r}</span><span class="tr">${o}</span></div>`).join('')}</div>
    </div>
  </div>
  <div class="toolkit" aria-label="Toolkit">${mq(['Figma', 'Adobe Illustrator', 'Adobe XD', 'Photoshop', 'InDesign', 'WordPress', 'UX research', 'System design'].map(t => `<span>${t}</span>`), 40)}</div>
  </section>
  ${closeCTA('Bring the brief. <em>We’ll bring the system.</em>')}`;
  };

  /* ---------- CONTACT ---------- */
  function planSummary() {
    const p = S.persona && personaBy(S.persona);
    const parts = [];
    if (p) parts.push(`Problem: ${p.problem}`);
    if (S.plan.length) parts.push(`Plan: ${S.plan.map(k => MODULES[k].name).join(', ')}`);
    if (S.check) parts.push(`Health check: ${['presence', 'premium', 'growth', 'tech'].map(a => `${personaBy(a).axis} ${S.check[a]}`).join(', ')}`);
    return parts.join('\n');
  }
  const contact = () => {
    const opts = [...PERSONAS.map(p => p.short), 'Not sure yet'];
    const pre = S.persona ? personaBy(S.persona).short : 'Not sure yet';
    const sum = planSummary();
    return `
  <section class="page-hero paper"><div class="wrap">
    ${kicker('Three doors')}
    <h1 data-rv>${lines(['Shall we', '<em>talk?</em>'])}</h1>
    <p class="lede dim" style="margin-top:26px">A brief, a half-formed idea, or a shelf that needs fixing. Pick a way in.</p>
    ${sum ? `<div class="ct-plan"><span class="kicker">Coming with you</span><pre>${sum.replace(/</g, '&lt;')}</pre><button type="button" class="btn-ghost" data-open-drawer>Edit plan</button></div>` : ''}
  </div></section>
  <section class="doors ink"><div class="wrap">
    <h2 data-rv>${lines(['Where do we start?'])}</h2>
    <div class="door-grid">
      <button class="door tilt" type="button" data-door="project" aria-expanded="false" aria-controls="p-project"><span class="glare" aria-hidden="true"></span><span class="dn">01</span><span class="dk">( The project )</span><h3>Submit a project</h3><p>Five questions, about two minutes.${sum ? ' Your plan is already filled in.' : ''}</p><span class="dgo">Open the form ${ARROW}</span></button>
      <button class="door tilt" type="button" data-door="message" aria-expanded="false" aria-controls="p-message"><span class="glare" aria-hidden="true"></span><span class="dn">02</span><span class="dk">( The note )</span><h3>Write a message</h3><p>For quick questions. Short is fine.</p><span class="dgo">Write a message ${ARROW}</span></button>
      <button class="door tilt" type="button" data-door="call" aria-expanded="false" aria-controls="p-call"><span class="glare" aria-hidden="true"></span><span class="dn">03</span><span class="dk">( The call )</span><h3>Book a call</h3><p>Thirty minutes, no commitment.</p><span class="dgo">Pick a slot ${ARROW}</span></button>
    </div>
    <form class="panel-form" id="p-project" novalidate>
      <div class="step-head"><span class="label">Step <span class="sn">1</span> of 5</span><span class="step-bar"><b style="transform:scaleX(.2)"></b></span></div>
      <fieldset class="step on" data-s="1"><legend>What do you need most?</legend><div class="opts">${opts.map((o, i) => `<label><input type="radio" name="what" value="${o}" id="what-${i}" ${o === pre ? 'checked' : ''}><span>${o}</span></label>`).join('')}</div></fieldset>
      <fieldset class="step" data-s="2"><legend>Tell us about the business.</legend><div class="field" style="margin-top:14px"><label for="f-brand">A few lines is plenty</label><textarea id="f-brand" name="brand" rows="5" placeholder="What you sell, who buys it, and what isn’t working yet.">${sum ? sum + '\n\n' : ''}</textarea></div></fieldset>
      <fieldset class="step" data-s="3"><legend>When do you need it?</legend><div class="opts">${['As soon as possible', 'In 1–3 months', 'In 3–6 months', 'Flexible'].map((o, i) => `<label><input type="radio" name="when" value="${o}" id="when-${i}" ${i === 1 ? 'checked' : ''}><span>${o}</span></label>`).join('')}</div></fieldset>
      <fieldset class="step" data-s="4"><legend>What budget are you working with?</legend><div class="opts">${['Under ₹1 lakh', '₹1–3 lakh', '₹3–8 lakh', '₹8 lakh +', 'Let’s discuss'].map((o, i) => `<label><input type="radio" name="budget" value="${o}" id="budget-${i}" ${i === 4 ? 'checked' : ''}><span>${o}</span></label>`).join('')}</div></fieldset>
      <fieldset class="step" data-s="5"><legend>Who should we reply to?</legend><div class="two" style="margin-top:14px">
        <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" autocomplete="name" placeholder="Your name"><span class="err"></span></div>
        <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" placeholder="you@company.com"><span class="err"></span></div>
      </div></fieldset>
      <div class="form-nav"><button type="button" class="btn-ghost" data-prev>← Back</button><button type="submit" class="btn-solid"><span class="nx">Next</span>${ARROW}</button></div>
    </form>
    <form class="panel-form" id="p-message" novalidate>
      <p class="q-lab">Write us a note.</p>
      <div class="two" style="margin-top:22px">
        <div class="field"><label for="m-name">Name</label><input id="m-name" autocomplete="name" placeholder="Your name"><span class="err"></span></div>
        <div class="field"><label for="m-email">Email</label><input id="m-email" type="email" autocomplete="email" placeholder="you@company.com"><span class="err"></span></div>
      </div>
      <div class="field" style="margin-top:22px"><label for="m-msg">Message</label><textarea id="m-msg" rows="4" placeholder="What’s on your mind?"></textarea><span class="err"></span></div>
      <div class="form-nav"><span></span><button type="submit" class="btn-solid">Prepare message ${ARROW}</button></div>
    </form>
    <form class="panel-form" id="p-call" novalidate>
      <p class="q-lab">Pick a 30-minute slot <span class="dim" style="font-size:.6em">(India Standard Time)</span></p>
      <div class="opts slots">${slots().map((s, i) => `<label><input type="radio" name="slot" value="${s}" id="slot-${i}" ${i === 0 ? 'checked' : ''}><span>${s}</span></label>`).join('')}</div>
      <div class="two" style="margin-top:26px">
        <div class="field"><label for="c-name">Name</label><input id="c-name" autocomplete="name" placeholder="Your name"><span class="err"></span></div>
        <div class="field"><label for="c-email">Email</label><input id="c-email" type="email" autocomplete="email" placeholder="you@company.com"><span class="err"></span></div>
      </div>
      <div class="form-nav"><span></span><button type="submit" class="btn-solid">Request this slot ${ARROW}</button></div>
    </form>
  </div></section>
  <section class="reach paper"><div class="wrap">
    <div class="reach-grid">
      <div>${kicker('Direct line')}<h2 style="margin-top:18px" data-rv>${lines(['Prefer email?', '<em class="it">Write straight in.</em>'])}</h2></div>
      <div style="display:grid;gap:14px">${copyRow(CONTACT.email, 'mail selectable')}${copyRow(CONTACT.phone)}<span class="label dim">Varient Designs · Pune, Maharashtra, India</span></div>
    </div>
  </div>
  <div class="wrap">${ph('p-bw-cafe', 'A café in the afternoon, seen from above', 'reach-ph')}</div>
  <div class="cities">${mq(['Pune', 'Remote', 'Wherever your shelf is', 'Pune', 'Remote', 'Wherever your customers are'].map(c => `<span>${c}</span>`), 34)}</div>
  </section>`;
  };
  function slots() {
    const out = [], d = new Date(); d.setDate(d.getDate() + 1);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    while (out.length < 8) { if (d.getDay() !== 0 && d.getDay() !== 6) { const l = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`; out.push(l + ' · 11:00'); out.push(l + ' · 16:00'); } d.setDate(d.getDate() + 1); }
    return out;
  }
  const notFound = () => `<section class="nf ink"><div><p class="kicker">404</p><h1 class="display">Off the shelf.</h1><p class="lede dim" style="margin:20px auto 30px">This page doesn’t exist, or it moved.</p>${arrowBtn('#home', 'Back to home')}</div></section>`;

  /* ======================================================================
     ROUTER + TRANSITIONS
     ====================================================================== */
  const VIEWS = { home, work, solutions, check, studio, contact, case: r => caseView(r.slug), notFound };
  const TITLES = { home: 'Varient Designs · Websites, branding, packaging and digital marketing, Pune', work: 'Work · Varient Designs', solutions: 'Solutions · Varient Designs', check: 'Brand health check · Varient Designs', studio: 'Studio · Varient Designs', contact: 'Contact · Varient Designs' };
  function parse() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h || h === 'home' || h === 'top') return { view: 'home' };
    if (h === 'services') return { view: 'solutions' };
    if (h.startsWith('work-')) return caseBy(h.slice(5)) ? { view: 'case', slug: h.slice(5) } : { view: 'notFound' };
    if (VIEWS[h] && h !== 'case') return { view: h };
    return { view: 'notFound' };
  }
  let current = null, first = true, transitioning = false, pendingTrack = null;
  const curtain = $('.curtain');
  function curtainDown() {
    if (!hasGSAP || RM) { curtain.style.clipPath = 'inset(0 0 0 0)'; return Promise.resolve(); }
    return new Promise(res => gsap.fromTo(curtain, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: .6, ease: 'power4.inOut', onComplete: res }))
      .then(() => gsap.fromTo('.curtain .cm', { opacity: 0, scale: .8, rotate: -20 }, { opacity: 1, scale: 1, rotate: 0, duration: .25 }));
  }
  function curtainUp() {
    if (!hasGSAP || RM) { curtain.style.clipPath = 'inset(0 0 100% 0)'; return Promise.resolve(); }
    gsap.to('.curtain .cm', { opacity: 0, duration: .15 });
    return new Promise(res => gsap.fromTo(curtain, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: .65, ease: 'power4.inOut', delay: .08, onComplete: res }));
  }
  async function route() {
    closeMenu(); closeDrawer();
    const r = parse();
    if (location.hash === '#top') { history.replaceState(null, '', current ? '#' + (current.view === 'case' ? 'work-' + current.slug : current.view) : '#home'); scrollToY(0); return; }
    if (current && r.view === current.view && r.slug === current.slug) { if (pendingTrack) jumpTrack(); else scrollToY(0); return; }
    if (transitioning) return;
    transitioning = true;
    if (!first) await curtainDown();
    render(r);
    if (!first) await curtainUp();
    first = false; transitioning = false;
    if (pendingTrack) setTimeout(jumpTrack, 200);
  }
  function jumpTrack() { const t = document.getElementById('track-' + pendingTrack); pendingTrack = null; if (t) scrollToEl(t, 20); }
  function render(r) {
    teardown();
    current = r;
    app.innerHTML = VIEWS[r.view](r) + footer();
    document.title = r.view === 'case' ? `${caseBy(r.slug).name} case study · Varient Designs` : (TITLES[r.view] || 'Varient Designs');
    const navKey = r.view === 'case' ? 'work' : r.view;
    $$('.nav a').forEach(a => a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + navKey));
    hdr.classList.add('on'); document.body.dataset.view = r.view;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); else window.scrollTo(0, 0);
    if (hasGSAP && !RM) ctx = gsap.context(() => {}, app);
    const init = INITS[r.view]; if (init) init(r);
    initCommon();
    syncAddButtons();
    const top0 = () => { window.scrollTo(0, 0); document.documentElement.scrollTop = 0; if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); };
    top0();
    if (hasGSAP) requestAnimationFrame(() => { top0(); if (ScrollTrigger.clearScrollMemory) ScrollTrigger.clearScrollMemory(); ScrollTrigger.refresh(); ScrollTrigger.sort(); ScrollTrigger.refresh(); top0(); });
  }
  function teardown() {
    cleanups.forEach(fn => { try { fn(); } catch (e) { /* ignore */ } }); cleanups = [];
    if (ctx) { ctx.revert(); ctx = null; }
    if (mm) { mm.revert(); mm = null; }
    if (hasGSAP) ScrollTrigger.getAll().forEach(t => t.kill());
    hideFollower(); closeQuick();
  }

  /* ======================================================================
     COMMON INIT + DELEGATED INTERACTIONS
     ====================================================================== */
  function initCommon() {
    if (ctx) ctx.add(() => {
      $$('[data-rv]', app).forEach(el => gsap.from($$('.lm > span', el), { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: .1, scrollTrigger: { trigger: el, start: 'top 88%' } }));
      $$('[data-fade]', app).forEach(el => gsap.from(el, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));
      $$('.close-cta h2', app).forEach(el => gsap.from(el, { yPercent: 30, opacity: 0, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 85%' } }));
      $$('.ph:not(.h2-photo):not(.pc-ph):not(.jr-ph):not(.mf-ph)', app).forEach(f => {
        const st = { trigger: f, start: 'top 90%' };
        gsap.fromTo(f, { clipPath: 'inset(14% 10% 14% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power3.out', scrollTrigger: st });
        gsap.fromTo($('img', f), { scale: 1.3 }, { scale: 1.06, duration: 2, ease: 'power3.out', scrollTrigger: st });
        if (f.matches('.track-ph, .pb-ph, .reach-ph')) gsap.fromTo($('img', f), { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      $$('.cc-bg img', app).forEach(im => gsap.fromTo(im, { yPercent: -10, scale: 1.15 }, { yPercent: 10, scale: 1.05, ease: 'none', scrollTrigger: { trigger: im.closest('.close-cta'), start: 'top bottom', end: 'bottom top', scrub: true } }));
    });
    const fw = $('.foot-word', app);
    if (fw) {
      if (RM || !('IntersectionObserver' in window)) fw.classList.add('on');
      else { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fw.classList.add('on'); io.disconnect(); } }), { threshold: .4 }); io.observe(fw); onCleanup(() => io.disconnect()); }
    }
    initCounts();
    initTV();
    initPreviews();
  }

  /* website previews: scroll the page inside its frame while on screen */
  const liveLink = (key, cls = '') => { const u = window.webPreview && webPreview.live(key); return u ? `<a class="live-link ${cls}" href="${u}" target="_blank" rel="noopener">Visit the live site <span aria-hidden="true">↗</span></a>` : ''; };
  const sizeWp = w => $$('.wp-view, .wp-pview', w).forEach(v => { const pg = $('.wp-page', v); const d = pg.offsetHeight - v.clientHeight; pg.style.setProperty('--end', (d > 0 ? -d : 0) + 'px'); });
  document.addEventListener('pointerover', e => { const h = e.target.closest && e.target.closest('.tile, .pcase, .sa-card, .wp-mini'); const m = h && (h.matches('.wp-mini') ? h : h.querySelector('.wp-mini')); if (m) sizeWp(m); }, { passive: true });
  function initPreviews() {
    const wps = $$('[data-wp]:not(.wp-mini)', app); if (!wps.length) return;
    const size = () => wps.forEach(sizeWp);
    $$('[data-wp] img.wp-shot', app).forEach(im => { if (!im.complete) im.addEventListener('load', () => sizeWp(im.closest('[data-wp]')), { once: true }); });
    size(); requestAnimationFrame(size);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(size) : null; if (ro) wps.forEach(w => ro.observe(w));
    if (RM) return;
    const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting)), { threshold: .15 });
    wps.forEach(w => io.observe(w));
    onCleanup(() => { io.disconnect(); if (ro) ro.disconnect(); });
  }

  document.addEventListener('click', e => {
    const t = e.target;
    const cp = t.closest('[data-copy]');
    if (cp) { const v = cp.dataset.copy, done = () => { const o = cp.textContent; cp.textContent = 'Copied'; setTimeout(() => cp.textContent = o, 1400); }; if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(v).then(done).catch(() => selectNear(cp)); else selectNear(cp); return; }
    if (t.closest('[data-top]')) { e.preventDefault(); scrollToY(0); return; }
    const add = t.closest('[data-add]'); if (add) { e.preventDefault(); addModule(add.dataset.add, add); return; }
    const per = t.closest('[data-persona]');
    if (per) {
      const isLink = per.tagName === 'A';
      setPersona(per.dataset.persona, { scroll: per.hasAttribute('data-go') && current.view === 'home', toast: !per.hasAttribute('data-go') || current.view !== 'home' });
      if (per.hasAttribute('data-go-path')) { location.hash = 'home'; setTimeout(() => scrollToEl($('#path'), 20), 1500); }
      if (!isLink) return;
    }
    const tr = t.closest('[data-track]'); if (tr) { pendingTrack = tr.dataset.track; if (current.view === 'solutions') { e.preventDefault(); jumpTrack(); } return; }
    const jt = t.closest('[data-jump-track]'); if (jt) { pendingTrack = jt.dataset.jumpTrack; jumpTrack(); return; }
    const st = t.closest('[data-scrollto]'); if (st) { scrollToEl($(st.dataset.scrollto), 0); return; }
    if (t.closest('[data-open-drawer]')) { openDrawer(); return; }
    const tick = t.closest('.tick'); if (tick) { toggleTick(tick); return; }
    const fq = t.closest('[data-first]'); if (fq) { S.answers = [+fq.dataset.first]; fq.classList.add('picked'); setTimeout(() => { location.hash = 'check'; }, 350); return; }
  });
  function selectNear(btn) { const s = btn.parentElement.querySelector('.selectable'); if (!s) return; const r = document.createRange(); r.selectNodeContents(s); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); btn.textContent = 'Selected'; setTimeout(() => btn.textContent = 'Copy', 1400); }

  function toggleTick(btn) { document.body.classList.remove('hdr-hide');
    const on = btn.getAttribute('aria-pressed') !== 'true'; btn.setAttribute('aria-pressed', String(on));
    const list = btn.closest('.ticks'), id = list.dataset.for, n = $$('.tick[aria-pressed="true"]', list).length;
    const card = btn.closest('.pcard');
    if (card) { $('.pc-count', card).textContent = `${n} of 4`; card.classList.toggle('hot', n >= 2); }
    const verdict = btn.closest('.track') && $('.tk-verdict', btn.closest('.track'));
    if (verdict) verdict.textContent = n === 0 ? '' : n === 1 ? 'One tick. Worth a look.' : n < 4 ? `${n} ticks. This is probably your track.` : 'Four ticks. Let’s talk this week.';
    if (n >= 2 && S.persona !== id && card) { /* nudge, don't force */ $('.pc-cta', card).classList.add('nudge'); }
  }

  /* ======================================================================
     VIEW INITS
     ====================================================================== */
  const INITS = {
    home() {
      renderPath(false);
      initPoster();
      initThink();
      initReveal();
      initBA();
      initWall();
      if (!hasGSAP || RM) return;
      ctx.add(() => {
        const tl = gsap.timeline({ delay: first ? .15 : .5 });
        tl.from('.pst-title .l1, .pst-title .l2', { yPercent: 105, opacity: 0, stagger: .12, duration: 1.1, ease: 'power4.out' })
          .fromTo('.pst-sky', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut' }, '<.2')
          .from('.pst-sky img', { scale: 1.3, duration: 1.8, ease: 'power3.out' }, '<')
          .from('.pst-fly > div', { y: 260, rotate: (i) => [-40, 30, -20][i], opacity: 0, stagger: .1, duration: 1.3, ease: 'back.out(1.4)' }, '<.4')
          .from('.pst-star', { scale: 0, rotate: -180, duration: 1.2, ease: 'back.out(1.8)' }, '<.1')
          .from('.pst-red, .pst-top, .pst-foot > *', { y: 20, opacity: 0, stagger: .06, duration: .7 }, '<.2');
        gsap.to('.pst-fly .fly-a', { yPercent: -45, rotate: 14, ease: 'none', scrollTrigger: { trigger: '.poster', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.pst-fly .fly-b', { yPercent: -80, rotate: -18, ease: 'none', scrollTrigger: { trigger: '.poster', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.pst-fly .fly-c', { yPercent: -120, ease: 'none', scrollTrigger: { trigger: '.poster', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.pst-title .l1', { xPercent: -6, ease: 'none', scrollTrigger: { trigger: '.poster', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.pst-title .l2', { xPercent: 5, ease: 'none', scrollTrigger: { trigger: '.poster', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.pst-sky img', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.poster', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.from('.pick', { y: 50, rotate: (i) => (i % 2 ? 2 : -2), opacity: 0, stagger: .08, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.pick-sec', start: 'top 75%' } });
        gsap.from('.th-title .tw', { yPercent: 110, opacity: 0, stagger: .08, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.think', start: 'top 60%' } });
        gsap.from('.th-lab', { opacity: 0, x: -14, stagger: .08, duration: .7, scrollTrigger: { trigger: '.think', start: 'top 60%' } });
        gsap.fromTo('.th-art', { yPercent: 8, scale: 1.08 }, { yPercent: -6, scale: 1, ease: 'none', scrollTrigger: { trigger: '.think', start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.from('.hand span', { opacity: 0, y: 30, rotate: -6, stagger: .12, duration: .8, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.hand-sec', start: 'top 70%' } });
        gsap.from('.jr-serif', { yPercent: 40, opacity: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: '.jr', start: 'top 80%' } });
      });
      mm = gsap.matchMedia();
      mm.add({ desk: '(min-width: 861px)', mob: '(max-width: 860px)' }, c => {
        const { desk } = c.conditions;
        if (desk) {
          // familiar cards: pinned horizontal scroll
          const track = $('.fam-track', app);
          const dist = () => Math.max(0, track.scrollWidth - innerWidth);
          gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.fam-pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true } });
          initJourney(true);
          initStack();
        } else {
          gsap.from('.pcard', { y: 50, opacity: 0, stagger: .1, duration: .8, scrollTrigger: { trigger: '.fam-track', start: 'top 85%' } });
          initJourney(false);
        }
        gsap.from('.tease-card', { y: 60, rotate: 2, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.tease', start: 'top 75%' } });
      });
    },
    work() { initWork(); },
    solutions() {
      if (!hasGSAP || RM) return;
      ctx.add(() => {
        $$('.track', app).forEach(tk => {
          gsap.from($$('.tstep', tk), { y: 40, opacity: 0, stagger: .1, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: $('.track-steps', tk), start: 'top 85%' } });
          gsap.from($$('.add', tk), { x: -20, opacity: 0, stagger: .06, duration: .6, scrollTrigger: { trigger: $('.track-foot', tk), start: 'top 85%' } });
        });
      });
    },
    check() { initCheck(); },
    case(r) {
      if (!hasGSAP || RM) return;
      mm = gsap.matchMedia();
      mm.add({ desk: '(min-width: 861px)', any: '(min-width: 0px)' }, c => {
        gsap.fromTo('.case-media .art', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.case-media', start: 'top bottom', end: 'bottom top', scrub: true } });
        const g = parseFloat(getComputedStyle($('.wrap', app)).paddingLeft) || 24;
        gsap.fromTo('.case-media', { clipPath: `inset(0px ${g}px 0px ${g}px)` }, { clipPath: 'inset(0px 0px 0px 0px)', ease: 'none', scrollTrigger: { trigger: '.case-media', start: 'top 80%', end: 'top 10%', scrub: true } });
        if (c.conditions.desk) {
          if ($('.shelf-track', app)) initShelf();
          const track = $('.gal-track', app), dist = () => Math.max(0, track.scrollWidth - innerWidth);
          if (dist() > 40) gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.gal-pin', start: 'top top', end: () => '+=' + dist(), scrub: .6, pin: true, invalidateOnRefresh: true, anticipatePin: 1 } });
        }
      });
    },
    studio() {
      if (!hasGSAP || RM) return;
      mm = gsap.matchMedia();
      mm.add({ desk: '(min-width: 861px)', mob: '(max-width: 860px)' }, c => {
        const beats = $$('.mf-beat', app);
        if (c.conditions.desk) {
          gsap.set(beats, { autoAlpha: 0 });
          const tl = gsap.timeline({ scrollTrigger: { trigger: '.mf-stage', start: 'top top', end: '+=' + beats.length * 90 + '%', scrub: 1, pin: true, anticipatePin: 1, onUpdate: s => { const k = Math.min(beats.length - 1, Math.floor(s.progress * beats.length)); $$('.mf-steps span', app).forEach((el, j) => el.classList.toggle('on', j === k)); } } });
          beats.forEach((b, i) => { const at = i * 1.2; tl.fromTo($$('.mf-card li, .mf-pic, .mf-out', b), { opacity: 0, x: 30 }, { opacity: 1, x: 0, stagger: .02, duration: .3, immediateRender: false }, at + .12); tl.to(b, { autoAlpha: 1, duration: .1 }, at).fromTo($$('.w', b), { yPercent: 40, opacity: .08 }, { yPercent: 0, opacity: 1, stagger: .06, duration: .45, ease: 'power3.out' }, at).fromTo($('.it', b), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: .45 }, at + .3); if (i < beats.length - 1) tl.to(b, { autoAlpha: 0, y: -40, duration: .2 }, at + 1); });
          tl.to('.mf-bg', { rotate: 90, duration: beats.length * 1.2, ease: 'none' }, 0);
        } else beats.forEach(b => gsap.from(b.children, { y: 40, opacity: 0, stagger: .1, duration: .9, scrollTrigger: { trigger: b, start: 'top 85%' } }));
      });
    },
    contact() { initContact(); }
  };

  /* ---------- hero: mouse parallax + letter wave ---------- */
  function initHeroParallax() {
    const hero = $('.hero2', app); if (!hero) return;
    const t = $('.wave', hero);
    t.innerHTML = t.textContent.split(' ').map(w => `<span class="wd">${w.split('').map(ch => `<span class="ch">${ch}</span>`).join('')}</span>`).join(' ');
    if (!FINE || RM) return;
    const fl = $$('.fl', hero), chs = $$('.ch', t);
    let mx = .5, my = .5, cx = .5, cy = .5, px = -999, raf;
    const mv = e => { const r = hero.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height; px = e.clientX; };
    const loop = () => {
      cx += (mx - cx) * .07; cy += (my - cy) * .07;
      fl.forEach(f => { const d = +f.dataset.depth; f.style.translate = `${(cx - .5) * -40 * d}px ${(cy - .5) * -30 * d}px`; });
      chs.forEach(c => { const r = c.getBoundingClientRect(); const d = Math.abs(px - (r.left + r.width / 2)); const k = Math.max(0, 1 - d / 140); c.style.translate = `0 ${(-k * 18).toFixed(1)}%`; c.style.color = k > .55 ? 'var(--cyan-ink)' : ''; });
      raf = requestAnimationFrame(loop);
    };
    hero.addEventListener('mousemove', mv); hero.addEventListener('mouseleave', () => { mx = my = .5; px = -999; });
    raf = requestAnimationFrame(loop);
    onCleanup(() => cancelAnimationFrame(raf));
  }

  /* ---------- before / after slider ---------- */
  function initBA() {
    const box = $('.ba', app); if (!box) return;
    const notes = { range: ['Five unrelated labels became one family', 'One white bottle, one brand zone, one logo position', 'Each product gets its own illustration, not its own brand'], hero: ['The same Nutri 909 and Nutri Kadva, rebuilt from scratch', 'The product name becomes the artwork', 'Readable from arm’s length on a crowded agri shelf'] };
    let v = 50;
    const set = (n, animate) => { v = clamp(n, 0, 100); box.style.setProperty('--ba', v + '%'); box.setAttribute('aria-valuenow', Math.round(v)); };
    const fromX = x => { const r = box.getBoundingClientRect(); set(((x - r.left) / r.width) * 100); };
    let drag = false;
    box.addEventListener('pointerdown', e => { drag = true; box.setPointerCapture(e.pointerId); fromX(e.clientX); box.classList.add('dragging'); });
    box.addEventListener('pointermove', e => { if (drag) fromX(e.clientX); });
    box.addEventListener('pointerup', () => { drag = false; box.classList.remove('dragging'); });
    box.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { set(v - 5); e.preventDefault(); } if (e.key === 'ArrowRight') { set(v + 5); e.preventDefault(); } if (e.key === 'Home') set(0); if (e.key === 'End') set(100); });
    const showNotes = k => { $('.ba-notes', app).innerHTML = notes[k].map((n, i) => `<li><span>${pad(i + 1)}</span>${n}</li>`).join(''); if (hasGSAP && !RM) gsap.from('.ba-notes li', { y: 16, opacity: 0, stagger: .08, duration: .5 }); };
    $$('[data-ba]', app).forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.ba;
      $$('[data-ba]', app).forEach(x => { x.setAttribute('aria-pressed', String(x === b)); x.setAttribute('aria-selected', String(x === b)); });
      const swap = () => { $('.ba-before', box).innerHTML = BA_IMG[k][0]; $('.ba-after', box).innerHTML = BA_IMG[k][1]; showNotes(k); };
      if (hasGSAP && !RM) gsap.to(box, { opacity: 0, scale: .98, duration: .2, onComplete: () => { swap(); gsap.to(box, { opacity: 1, scale: 1, duration: .4, ease: 'power3.out' }); } }); else swap();
    }));
    showNotes('range'); set(50);
    if (hasGSAP && !RM) {
      const o = { v: 50 };
      ctx.add(() => gsap.timeline({ scrollTrigger: { trigger: box, start: 'top 70%', once: true } })
        .to(o, { v: 22, duration: .8, ease: 'power2.inOut', onUpdate: () => set(o.v) })
        .to(o, { v: 78, duration: 1.1, ease: 'power2.inOut', onUpdate: () => set(o.v) })
        .to(o, { v: 50, duration: .8, ease: 'power2.inOut', onUpdate: () => set(o.v) }));
    }
  }

  /* ---------- journey: pinned track with a drawn route ---------- */
  function initJourney(desk) {
    const track = $('.jr-track', app), svg = $('.jr-path', app), line = $('.jr-line', app), ghost = $('.jr-ghost', app), dot = $('.jr-dot', app), cards = $$('.jr-card', app);
    const build = () => {
      const W = track.scrollWidth, H = 120;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.style.width = W + 'px';
      const pts = cards.map((c, i) => [c.offsetLeft + c.offsetWidth / 2, i % 2 ? 90 : 30]);
      let d = `M${pts[0][0] - 120} 60 C${pts[0][0] - 60} 60 ${pts[0][0] - 60} ${pts[0][1]} ${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], m = (x1 - x0) / 2; d += ` C${x0 + m} ${y0} ${x1 - m} ${y1} ${x1} ${y1}`; }
      line.setAttribute('d', d); ghost.setAttribute('d', d);
      const len = line.getTotalLength(); line.style.strokeDasharray = len; line.style.strokeDashoffset = len;
      return { len, pts };
    };
    let geo = build();
    const setP = p => {
      line.style.strokeDashoffset = geo.len * (1 - p);
      const pt = line.getPointAtLength(geo.len * p); dot.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
      cards.forEach((c, i) => c.classList.toggle('on', pt.x >= geo.pts[i][0] - 10));
    };
    if (!desk) {
      svg.style.display = 'none'; dot.style.display = 'none';
      cards.forEach(c => gsap.from(c, { y: 40, opacity: 0, duration: .8, scrollTrigger: { trigger: c, start: 'top 88%', onEnter: () => c.classList.add('on') } }));
      return;
    }
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.jr-pin', start: 'top top', end: () => '+=' + (dist() + innerHeight * .4), pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true,
      onRefresh: () => { geo = build(); }, onUpdate: s => setP(s.progress) } });
    setP(0);
  }

  /* ---------- poster hero: mouse parallax on the flying objects ---------- */
  function initPoster() {
    const p = $('.poster', app); if (!p || !FINE || RM) return;
    const fl = $$('.pst-fly > div', p), star = $('.pst-star', p);
    let mx = 0, my = 0, cx = 0, cy = 0, raf;
    p.addEventListener('mousemove', e => { const r = p.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - .5; my = (e.clientY - r.top) / r.height - .5; });
    const loop = () => { raf = requestAnimationFrame(loop); if (window.scrollY > innerHeight * 1.2) return; cx += (mx - cx) * .06; cy += (my - cy) * .06; fl.forEach((f, i) => { const d = [1.6, 2.6, 1][i]; f.style.translate = `${cx * -50 * d}px ${cy * -40 * d}px`; }); if (star) star.style.translate = `${cx * 30}px ${cy * 30}px`; };
    raf = requestAnimationFrame(loop); onCleanup(() => cancelAnimationFrame(raf));
  }

  /* ---------- red grid: glitch blocks ---------- */
  function initThink() {
    const sec = $('.think', app); if (!sec) return;
    const blocks = $$('.gb', sec);
    const shuffle = () => blocks.forEach((b, i) => {
      const x = 8 + Math.random() * 55, y = [18, 34, 52, 66][i] + Math.random() * 8, w = 14 + Math.random() * 28, h = 5 + Math.random() * 9;
      b.style.clipPath = `inset(${y}% ${Math.max(0, 100 - x - w)}% ${Math.max(0, 100 - y - h)}% ${x}%)`;
      b.style.transform = `translateX(${(Math.random() - .5) * 60}px)`;
    });
    shuffle();
    if (!RM) { const id = setInterval(shuffle, 1500); onCleanup(() => clearInterval(id)); }
  }

  /* ---------- 3D cloche reveal (three.js) ---------- */
  function initReveal() {
    const sec = $('.reveal', app); if (!sec) return;
    const cv = $('.rv-canvas', sec);
    let renderer;
    try { if (!window.THREE || RM) throw 0; renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); } catch (e) { sec.classList.add('rv-static'); return; }
    const T = THREE;
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.outputEncoding = T.sRGBEncoding;
    const scene = new T.Scene(), root = new T.Group(); scene.add(root);
    const cam = new T.PerspectiveCamera(30, 1, .1, 100); cam.position.set(0, 2.2, 10.5);
    scene.add(new T.HemisphereLight(0xffffff, 0x6b4a00, .85));
    const key = new T.DirectionalLight(0xffffff, 1.35); key.position.set(-4, 9, 6); key.castShadow = true; key.shadow.mapSize.set(512, 512); key.shadow.camera.left = -6; key.shadow.camera.right = 6; key.shadow.camera.top = 6; key.shadow.camera.bottom = -6; scene.add(key);
    const rimL = new T.DirectionalLight(0xfff0c2, .9); rimL.position.set(6, 3, -5); scene.add(rimL);
    const black = new T.MeshStandardMaterial({ color: 0x151515, roughness: .38, metalness: .3, side: T.DoubleSide });
    const geos = [];
    const mesh = (g, m) => { geos.push(g); const o = new T.Mesh(g, m); o.castShadow = true; o.receiveShadow = true; return o; };
    const plate = new T.Group();
    plate.add(mesh(new T.CylinderGeometry(2.5, 2.25, .08, 96), black));
    const prim = mesh(new T.TorusGeometry(2.48, .055, 16, 140), black); prim.rotation.x = Math.PI / 2; prim.position.y = .045; plate.add(prim);
    root.add(plate);
    const dome = new T.Group();
    dome.add(mesh(new T.SphereGeometry(1.8, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2), black));
    const lip = mesh(new T.TorusGeometry(1.8, .04, 12, 140), black); lip.rotation.x = Math.PI / 2; dome.add(lip);
    const stem = mesh(new T.CylinderGeometry(.06, .1, .2, 24), black); stem.position.y = 1.88; dome.add(stem);
    const knob = mesh(new T.SphereGeometry(.17, 32, 16), black); knob.position.y = 2.05; dome.add(knob);
    dome.position.y = .05; root.add(dome);
    const shape = pts => { const sh = new T.Shape(); pts.forEach(([x, y], i) => i ? sh.lineTo((x - 50) / 100, (50 - y) / 100) : sh.moveTo((x - 50) / 100, (50 - y) / 100)); return sh; };
    const ext = { depth: .2, bevelEnabled: true, bevelThickness: .025, bevelSize: .015, bevelSegments: 3 };
    const red = new T.MeshStandardMaterial({ color: 0xE5322A, roughness: .32, metalness: .1 });
    const cream = new T.MeshStandardMaterial({ color: 0xF1ECE3, roughness: .45, metalness: .05 });
    const logo = new T.Group();
    const a1 = mesh(new T.ExtrudeGeometry(shape([[6, 10], [26, 10], [54, 90], [44, 90]]), ext), red);
    const a2 = mesh(new T.ExtrudeGeometry(shape([[74, 10], [94, 10], [60, 90], [50, 90]]), ext), cream);
    [a1, a2].forEach(m => { m.position.z = -.1; logo.add(m); });
    logo.scale.setScalar(2.2); logo.position.y = 1.05; root.add(logo);
    const floor = new T.Mesh(new T.PlaneGeometry(30, 30), new T.ShadowMaterial({ opacity: .2 })); geos.push(floor.geometry);
    floor.rotation.x = -Math.PI / 2; floor.position.y = -.05; floor.receiveShadow = true; root.add(floor);
    let aimY = 0, narrow = false;
    const size = () => { const r = cv.getBoundingClientRect(); if (!r.width) return; renderer.setSize(r.width, r.height, false); cam.aspect = r.width / r.height; cam.updateProjectionMatrix(); root.position.x = r.width > 860 ? 2.1 : 0; root.position.y = r.width > 860 ? -.6 : -1.4; aimY = r.width > 860 ? 0 : 1.15; narrow = r.width <= 860; };
    size(); window.addEventListener('resize', size);
    let p = 0, mx = 0, my = 0, raf, visible = true, t0 = performance.now();
    const ease = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
    if (hasGSAP) ctx.add(() => ScrollTrigger.create({ trigger: $('.rv-pin', sec), start: 'top top', end: '+=150%', pin: true, scrub: .6, anticipatePin: 1, onUpdate: s => { p = s.progress; sec.classList.toggle('open', p > .42); sec.style.setProperty('--p', p.toFixed(3)); } }));
    sec.addEventListener('mousemove', e => { const r = sec.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - .5; my = (e.clientY - r.top) / r.height - .5; });
    const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { threshold: 0 }); io.observe(sec);
    const loop = now => {
      raf = requestAnimationFrame(loop); if (!visible) return;
      const t = (now - t0) / 1000, e = ease(p * 1.25);
      dome.position.y = .05 + e * (narrow ? 1.25 : 2.6) + Math.sin(t * 1.6) * .03 * e; dome.position.x = -e * (narrow ? 2.6 : .9); dome.rotation.z = e * (narrow ? .55 : .32);
      logo.visible = e > .02; logo.rotation.y = t * .7 + e * 4; logo.position.y = .9 + e * .35 + Math.sin(t * 2) * .04; logo.scale.setScalar(2.2 * (.55 + .45 * e));
      plate.rotation.y = t * .05;
      cam.position.x += (mx * 1.6 - cam.position.x) * .05; cam.position.y += (2.2 - my * 1.2 - cam.position.y) * .05; cam.lookAt(root.position.x * .55, 1.1 + root.position.y + aimY, 0);
      renderer.render(scene, cam);
    };
    raf = requestAnimationFrame(loop);
    onCleanup(() => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', size); geos.forEach(g => g.dispose()); [black, red, cream].forEach(m => m.dispose()); renderer.dispose(); });
  }

  /* ---------- CRT static + 3D text ring tilt ---------- */
  function initTV() {
    $$('.tv-sec', app).forEach(sec => {
      const cv = $('.tv-static', sec); if (!cv) return;
      const c = cv.getContext('2d'), img = c.createImageData(cv.width, cv.height), d = img.data;
      let raf, on = false, f = 0;
      const draw = () => { raf = requestAnimationFrame(draw); if (!on || f++ % 2) return; for (let i = 0; i < d.length; i += 4) { const v = Math.random() * 255; d[i] = 120 + v * .52; d[i + 1] = v * .22; d[i + 2] = v * .18; d[i + 3] = 255; } c.putImageData(img, 0, 0); };
      if (RM) { on = true; draw(); cancelAnimationFrame(raf); } else raf = requestAnimationFrame(draw);
      const io = new IntersectionObserver(es => { on = es[0].isIntersecting; }); io.observe(sec);
      const stage = $('.tv-stage', sec);
      const mv = e => { const r = stage.getBoundingClientRect(); stage.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 24 + 'deg'); stage.style.setProperty('--rx', ((e.clientY - r.top) / r.height - .5) * -14 + 'deg'); };
      if (FINE && !RM) sec.addEventListener('mousemove', mv);
      onCleanup(() => { cancelAnimationFrame(raf); io.disconnect(); });
    });
  }

  /* ---------- count-up ---------- */
  function initCounts() {
    const nums = $$('[data-count]', app); if (!nums.length || RM || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; io.unobserve(e.target); const el = e.target, end = +el.dataset.count, t0 = performance.now(); const step = now => { const p = Math.min(1, (now - t0) / 1200); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }; el.textContent = '0'; requestAnimationFrame(step); }), { threshold: .6 });
    nums.forEach(n => io.observe(n)); onCleanup(() => io.disconnect());
  }

  /* ---------- project stack ---------- */
  function initStack() {
    const sec = $('.stack-pin', app); if (!sec) return; const panels = $$('.panel', sec), rest = panels.slice(1), rail = $$('.rail a', sec), n = rest.length, len = n + .85;
    let active = -1; const setActive = k => { if (k === active) return; active = k; rail.forEach((a, j) => a.classList.toggle('on', j === k)); };
    const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + Math.round(len * innerHeight), pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: s => setActive(Math.max(-1, Math.min(n - 1, Math.round(s.progress * len) - 1))) } });
    rest.forEach((p, i) => {
      tl.fromTo(p, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 1 }, i);
      tl.fromTo($('.panel-media', p), { scale: 1.08, yPercent: 6 }, { scale: 1, yPercent: 0, ease: 'power2.out', duration: 1 }, i);
      tl.fromTo($('.panel-num', p), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .8 }, i + .2);
      tl.fromTo($$('.panel-text > *', p), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: .06, duration: .5 }, i + .35);
    });
    rail.forEach((a, j) => a.addEventListener('click', e => { e.preventDefault(); const st = tl.scrollTrigger; scrollToY(st.start + ((j + 1) / len) * (st.end - st.start) + 4); }));
  }

  /* ---------- shelf (Nutripleks case) ---------- */
  function initShelf() {
    const track = $('.shelf-track', app), prog = $('.shelf-prog b', app), dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.shelf-pin', start: 'top top', end: () => '+=' + dist(), scrub: .6, pin: true, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: s => { prog.style.transform = `scaleX(${s.progress})`; } } });
    gsap.from($$('.sku', track), { y: 60, opacity: 0, stagger: .03, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.shelf-pin', start: 'top 70%' } });
  }

  /* ---------- health check ---------- */
  function initCheck() {
    const box = $('.chk-box', app), qEl = $('.chk-q', app), res = $('.chk-res', app);
    let i = S.answers.length ? S.answers.length : 0;
    const total = QUESTIONS.length;
    const show = dir => {
      const q = QUESTIONS[i];
      $('.chk-n b', box).textContent = i + 1;
      $('.chk-axis', box).textContent = personaBy(q.axis).axis;
      $('.chk-ring .cr', box).style.strokeDashoffset = 100 - (i / total) * 100;
      $('[data-back]', box).style.visibility = i ? 'visible' : 'hidden';
      qEl.innerHTML = `<h2 class="cq">${q.q}</h2><div class="tq-opts big">${q.a.map((a, k) => `<button type="button" class="opt mag${S.answers[i] === k ? ' picked' : ''}" data-ans="${k}"><span class="ol">${'ABCD'[k]}</span>${a}</button>`).join('')}</div>`;
      if (hasGSAP && !RM) gsap.from(qEl.children, { x: dir * 50, opacity: 0, stagger: .06, duration: .5, ease: 'power3.out' });
      $('.opt', qEl)?.focus({ preventScroll: true });
    };
    const finish = () => {
      const sc = {}; ['presence', 'premium', 'growth', 'tech'].forEach(a => { const idx = QUESTIONS.map((q, k) => q.axis === a ? k : -1).filter(k => k >= 0); sc[a] = Math.round(idx.reduce((s, k) => s + (S.answers[k] || 0), 0) / (idx.length * 3) * 100); });
      S.check = sc;
      const weakest = ['presence', 'premium', 'growth', 'tech'].sort((a, b) => sc[a] - sc[b]);
      if (!S.persona) S.persona = weakest[0];
      save(); updateDock();
      const recs = []; weakest.filter(a => sc[a] < 67).forEach(a => personaBy(a).modules.slice(0, 2).forEach(m => { if (!recs.includes(m)) recs.push(m); }));
      if (!recs.length) recs.push(...personaBy(weakest[0]).modules.slice(0, 2));
      const verdict = v => v < 40 ? 'Needs work' : v < 70 ? 'Getting there' : 'Strong';
      box.hidden = true; res.hidden = false;
      res.innerHTML = `
        <div class="res-grid">
          <div class="res-radar">${radarSVG(sc)}</div>
          <div>
            <span class="kicker">Your result</span>
            <h2 class="res-h">Start with <em class="it">${personaBy(weakest[0]).short.toLowerCase()}.</em></h2>
            <div class="res-bars">${['presence', 'premium', 'growth', 'tech'].map(a => `<div class="rb"><span class="rb-l">${personaBy(a).axis}</span><span class="rb-t"><b style="--v:${sc[a]}%"></b></span><span class="rb-v">${sc[a]}</span><span class="rb-x">${verdict(sc[a])}</span></div>`).join('')}</div>
            <p class="body-serif dim" style="margin-top:20px">${personaBy(weakest[0]).outcome}</p>
            <p class="label dim" style="margin-top:28px">Recommended for your plan</p>
            <div class="adds">${recs.map(m => addBtn(m)).join('')}</div>
            <div class="path-cta" style="margin-top:28px"><button type="button" class="btn-solid" data-add-all="${recs.join(',')}">Add all and send ${ARROW}</button><button type="button" class="btn-ghost" data-retake>Retake the check</button></div>
          </div>
        </div>`;
      animateRadar($('.radar', res));
      if (hasGSAP && !RM) { gsap.from($$('.rb b', res), { width: 0, stagger: .1, duration: 1, ease: 'power3.out' }); gsap.from($$('.res-grid > div:last-child > *', res), { y: 30, opacity: 0, stagger: .06, duration: .6 }); }
      $('[data-add-all]', res).addEventListener('click', e => { e.currentTarget.dataset.addAll.split(',').forEach(m => { if (!S.plan.includes(m)) S.plan.push(m); }); save(); updateDock(); bump(); location.hash = 'contact'; });
      $('[data-retake]', res).addEventListener('click', () => { S.answers = []; i = 0; res.hidden = true; box.hidden = false; show(1); });
      syncAddButtons(); scrollToEl(res, 100);
    };
    qEl.addEventListener('click', e => {
      const b = e.target.closest('[data-ans]'); if (!b) return;
      S.answers[i] = +b.dataset.ans; $$('.opt', qEl).forEach(o => o.classList.toggle('picked', o === b));
      setTimeout(() => { if (i < total - 1) { i++; show(1); } else finish(); }, 320);
    });
    qEl.addEventListener('keydown', e => { const k = 'abcd'.indexOf(e.key.toLowerCase()); if (k >= 0) $$('.opt', qEl)[k]?.click(); });
    $('[data-back]', box).addEventListener('click', () => { if (i > 0) { i--; show(-1); } });
    show(1);
  }

  /* ---------- client wall follower ---------- */
  const follower = $('#follower');
  let fActive = false, fx = 0, fy = 0, tx = 0, ty = 0, fRaf = 0;
  function hideFollower() { fActive = false; follower.classList.remove('on'); }
  function initWall() {
    const rows = $('.wall-rows', app); if (!rows || !FINE) return;
    const fi = $('.fi', follower), fn = $('.fn', follower), ft = $('.ft', follower);
    const loop = () => { fx += (tx - fx) * .14; fy += (ty - fy) * .14; follower.style.transform = `translate(${fx + 24}px, ${fy - 90}px)`; if (fActive) fRaf = requestAnimationFrame(loop); };
    rows.addEventListener('mouseover', e => { const a = e.target.closest('a[data-n]'); if (!a) return; fi.innerHTML = coverFor(a.dataset.k || 'social'); fn.textContent = a.dataset.n; ft.textContent = a.dataset.t; if (!fActive) { fActive = true; fx = tx = e.clientX; fy = ty = e.clientY; follower.classList.add('on'); cancelAnimationFrame(fRaf); fRaf = requestAnimationFrame(loop); } });
    rows.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    rows.addEventListener('mouseleave', hideFollower);
    onCleanup(() => { cancelAnimationFrame(fRaf); hideFollower(); });
  }

  /* ---------- work: drift canvas ---------- */
  function initWork() {
    const root = $('.work-views', app), drift = $('.drift', app), plane = $('.drift-plane', app);
    let filter = 'All', tiles = [], BW = 0, BH = 0, tw = 0, th = 0, G = 18;
    const build = () => {
      tw = Math.round(Math.min(380, Math.max(220, innerWidth * .22))); th = Math.round(tw * .72); G = Math.round(tw * .07);
      const cols = Math.max(5, Math.ceil(drift.clientWidth / (tw + G)) + 2), rows = Math.max(4, Math.ceil(drift.clientHeight / (th + G)) + 2);
      BW = cols * (tw + G); BH = rows * (th + G);
      let html = '', k = 0; tiles = [];
      for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) { const it = WORK[(k * 7 + c) % WORK.length]; k++; html += `<a class="tile" href="${it.kind === 'case' ? '#work-' + it.key : '#work'}" data-k="${it.key}" data-craft="${it.craft}" data-cursor="Open" style="width:${tw}px;height:${th}px" draggable="false" aria-label="${it.name}, ${it.type}">${webPreview.has(it.key) ? webPreview.mini(it.key, 'wp-tile') : coverFor(it.key)}<span class="tcap"><span>${it.name}</span><span>${it.craft}</span></span></a>`; tiles.push({ x: c * (tw + G), y: r * (th + G) + (c % 2 ? (th + G) / 2 : 0) }); }
      plane.innerHTML = html; $$('.tile', plane).forEach((el, i) => tiles[i].el = el); applyFilter();
    };
    let ox = 0, oy = 0, cx = 0, cy = 0, dragging = false, moved = 0, lx = 0, ly = 0, raf = 0, idle = true, idleT;
    const mod = (a, n) => ((a % n) + n) % n;
    const frame = () => { if (!dragging && idle && !RM) { ox -= .35; oy -= .12; } cx += (ox - cx) * .1; cy += (oy - cy) * .1; for (const t of tiles) t.el.style.transform = `translate3d(${mod(t.x + cx + tw, BW) - tw}px, ${mod(t.y + cy + th, BH) - th}px, 0)`; raf = requestAnimationFrame(frame); };
    const down = e => { dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; drift.classList.add('dragging'); idle = false; drift.setPointerCapture && drift.setPointerCapture(e.pointerId); };
    const movep = e => { if (!dragging) return; const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; ox += dx * 1.4; oy += dy * 1.4; moved += Math.abs(dx) + Math.abs(dy); };
    const up = e => { if (!dragging) return; dragging = false; drift.classList.remove('dragging'); clearTimeout(idleT); idleT = setTimeout(() => idle = true, 2500); if (moved < 6) { const tile = document.elementFromPoint(e.clientX, e.clientY)?.closest('.tile'); if (tile) openTile(tile.dataset.k); } };
    drift.addEventListener('pointerdown', down); window.addEventListener('pointermove', movep); window.addEventListener('pointerup', up);
    drift.addEventListener('click', e => { const t = e.target.closest('.tile'); if (t) { e.preventDefault(); if (e.detail === 0) openTile(t.dataset.k); } });
    const onResize = () => build(); window.addEventListener('resize', onResize);
    build(); raf = requestAnimationFrame(frame);
    function applyFilter() { $$('.tile', plane).forEach(t => t.classList.toggle('dim', filter !== 'All' && t.dataset.craft !== filter)); $$('.ix-row', app).forEach(t => t.classList.toggle('dim', filter !== 'All' && t.dataset.craft !== filter)); }
    $$('[data-f]', app).forEach(b => b.addEventListener('click', () => { filter = b.dataset.f; $$('[data-f]', app).forEach(x => x.setAttribute('aria-pressed', String(x === b))); applyFilter(); }));
    const setView = v => { root.classList.toggle('view-index', v === 'index'); $$('[data-v]', app).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.v === v))); if (hasGSAP) ScrollTrigger.refresh(); };
    $$('[data-v]', app).forEach(b => b.addEventListener('click', () => setView(b.dataset.v)));
    if (innerWidth < 861) setView('index');
    $$('.ix-row', app).forEach(r => r.addEventListener('click', e => { const w = WORK.find(x => x.key === r.dataset.k); if (w && w.kind !== 'case') { e.preventDefault(); openTile(w.key); } }));
    onCleanup(() => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', movep); window.removeEventListener('pointerup', up); window.removeEventListener('resize', onResize); clearTimeout(idleT); });
  }
  const quick = $('#quick'); let lastFocus = null;
  function openTile(key) {
    const w = WORK.find(x => x.key === key); if (!w) return;
    if (w.kind === 'case') { location.hash = 'work-' + w.key; return; }
    lastFocus = document.activeElement;
    if (w.key === 'only-apna') {
      const im = (f, a, c = '') => `<figure class="sg-i pack ${c}"><img src="assets/img/pack/${f}" alt="${a}" loading="lazy" draggable="false"></figure>`;
      quick.innerHTML = `<div class="quick-card qc-social"><div class="qt"><button class="x" type="button" data-close>Close</button><span class="kicker">Packaging</span><h3 id="quick-title">Only Apna</h3><p class="body-serif" style="color:var(--on-paper-dim)">Packaging for Only Apna’s premium organic range: a 500 g jaggery powder pouch and 5 L cold-pressed sunflower and groundnut oil labels. One logo and type system across the range, each product with its own colour and illustration, and back panels that carry the full story, nutrition facts and FSSAI details.</p>${arrowBtn('#contact', 'Ask about this project', 'dark')}</div>
        <div class="sg"><p class="sg-h mono">Jaggery powder pouch · front and back</p><div class="sg-row two">${im('onlyapna-front.jpg', 'Only Apna organic jaggery powder pouch, front')}${im('onlyapna-back.jpg', 'Only Apna jaggery powder pouch, back panel')}</div>
        <p class="sg-h mono">Cold-pressed sunflower oil · 5 L label, front and back</p><div class="sg-row two land">${im('onlyapna-sunflower-front.jpg', 'Only Apna cold-pressed sunflower oil label, front')}${im('onlyapna-sunflower-back.jpg', 'Only Apna cold-pressed sunflower oil label, back with nutrition facts')}</div>
        <p class="sg-h mono">Cold-pressed groundnut oil · 5 L label, front and back</p><div class="sg-row two land">${im('onlyapna-groundnut-front.jpg', 'Only Apna cold-pressed groundnut oil label, front')}${im('onlyapna-groundnut-back.jpg', 'Only Apna cold-pressed groundnut oil label, back with nutrition facts')}</div></div></div>`;
      quick.classList.add('on'); if (lenis) lenis.stop(); setTimeout(() => $('[data-close]', quick)?.focus(), 50);
      return;
    }
    if (w.key === 'art') {
      const A = [['lucid-dream','Lucid Dream poster: a figure facing a giant bubble in the clouds'],['sun-rabbit','Rabbit tangled in golden leaves beneath a sun'],['blood-moons','Three blood moons over a fluid-art landscape'],['batman','Batman portrait in charcoal tones with red splatter'],['demon-reflection','Red horned demon reflected in dark water'],['hand-portal','A hand reaching through a white ring'],['red-sun-fairy','Line-art fairy against a red sun'],['paper-plane','Hand holding a paper plane, charcoal on black'],['red-mask','Red ornamental mask on black'],['red-skull','Horned red skull in a white frame']];
      quick.innerHTML = `<div class="quick-card qc-social"><div class="qt"><button class="x" type="button" data-close>Close</button><span class="kicker">Illustration &amp; art</span><h3 id="quick-title">Illustration &amp; art</h3><p class="body-serif" style="color:var(--on-paper-dim)">Digital paintings, poster art and personal pieces by Vallabh Gulve. Mostly black, white and one hard red: the same eye for contrast that goes into every pack and page.</p>${arrowBtn('#contact', 'Commission a piece', 'dark')}</div>
        <div class="sg"><p class="sg-h mono">Selected pieces</p><div class="sg-grid art">${A.map(([f, a]) => `<figure class="sg-i"><img src="assets/img/art/${f}.jpg" alt="${a}" loading="lazy" draggable="false"></figure>`).join('')}</div></div></div>`;
      quick.classList.add('on'); if (lenis) lenis.stop(); setTimeout(() => $('[data-close]', quick)?.focus(), 50);
      return;
    }
    if (w.key === 'unitech') {
      const im = (f, a, c = '') => `<figure class="sg-i ${c}"><img src="assets/img/social/${f}" alt="${a}" loading="lazy" draggable="false"></figure>`;
      quick.innerHTML = `<div class="quick-card qc-social"><div class="qt"><button class="x" type="button" data-close>Close</button><span class="kicker">Event creatives</span><h3 id="quick-title">Uni-Tech Automation</h3><p class="body-serif" style="color:var(--on-paper-dim)">The visual identity for Uni-Tech Automation’s Bharari 2025 event, “Srujan”: a glowing sapling growing out of a clock face, carried across the stage banner, the welcome poster and the directional standee.</p>${arrowBtn('#contact', 'Ask about this work', 'dark')}</div>
        <div class="sg"><p class="sg-h mono">Bharari 2025 “Srujan” · banner, poster, standee</p><div class="sg-row">${im('unitech-banner.jpg', 'Srujan event banner for Uni-Tech Automation with a glowing sapling on a clock face', 'wide')}${im('unitech-poster.jpg', 'Namaskar Suswagatam welcome poster for Srujan')}${im('unitech-standee.jpg', 'Welcome to Srujan directional standee', 'tall')}</div></div></div>`;
      quick.classList.add('on'); if (lenis) lenis.stop(); setTimeout(() => $('[data-close]', quick)?.focus(), 50);
      return;
    }
    if (w.key === 'social') {
      const im = (f, a, c = '') => `<figure class="sg-i ${c}"><img src="assets/img/social/${f}" alt="${a}" loading="lazy" draggable="false"></figure>`;
      const site = k => `<a class="sg-site" href="#work-${k}">${webPreview.mini(k)}<span>${caseBy(k).name} <em>Website and digital</em></span></a>`;
      quick.innerHTML = `<div class="quick-card qc-social"><div class="qt"><button class="x" type="button" data-close>Close</button><span class="kicker">Social &amp; digital</span><h3 id="quick-title">Social &amp; digital</h3><p class="body-serif" style="color:var(--on-paper-dim)">Product posters, brochure panels, campaign posts and market updates for Globriddge, posters and campaigns for Sitaram Sugars, and the websites we designed for Globriddge and Good Garden. Open either site for the full case study.</p>${arrowBtn('#contact', 'Ask about this work', 'dark')}</div>
        <div class="sg"><p class="sg-h mono">Globriddge · social posts</p><div class="sg-grid">${[['glob-instagram-table','From India to the World Instagram post'],['glob-independence','Independence Day 2026 post'],['glob-arabica','Arabica coffee beans product poster'],['glob-india-tea','India Tea product poster'],['glob-turmeric','Turmeric finger product poster'],['glob-dehydrated-onion','Dehydrated onion product post'],['glob-ashwagandha','Ashwagandha and ginseng wellness post'],['glob-black-cardamom','Black cardamom product flat lay'],['glob-green-cardamom','Green cardamom product poster'],['glob-shipping','Global shipping amid conflict risks update'],['glob-container','Branded shipping container mock-up']].map(([f, a]) => `<figure class="sg-i"><img src="assets/img/social/${f}.jpg" alt="Globriddge ${a}" loading="lazy" draggable="false"></figure>`).join('')}</div><p class="sg-h mono">Globriddge · brochure panels</p><div class="sg-grid tallg">${[['glob-brochure-finest','Exporting India’s Finest'],['glob-brochure-doorstep','From Farms to Your Doorstep'],['glob-brochure-destinations','Exporting to 50+ Global Destinations'],['glob-brochure-partner','Your Trusted Export Partner']].map(([f, a]) => `<figure class="sg-i"><img src="assets/img/social/${f}.jpg" alt="Globriddge brochure: ${a}" loading="lazy" draggable="false"></figure>`).join('')}</div><p class="sg-h mono">Sitaram Sugars · posters and campaigns</p><div class="sg-grid">${[['sitaram-poster','Sitaram Sugars brand poster'],['sitaram-sugar-process','Sugar making process infographic'],['sitaram-sugarcane-water','Sugarcane water importance campaign post']].map(([f, a]) => `<figure class="sg-i"><img src="assets/img/social/${f}.jpg" alt=" ${a}" loading="lazy" draggable="false"></figure>`).join('')}</div><p class="sg-h mono">Globriddge and Good Garden · websites</p><div class="sg-sites">${site('globriddge')}${site('good-garden')}</div></div></div>`;
      quick.classList.add('on'); if (lenis) lenis.stop(); requestAnimationFrame(() => $$('[data-wp]', quick).forEach(sizeWp)); $$('img.wp-shot', quick).forEach(x => x.addEventListener('load', () => sizeWp(x.closest('[data-wp]')), { once: true })); setTimeout(() => $('[data-close]', quick)?.focus(), 50);
      return;
    }
    quick.innerHTML = `<div class="quick-card"><div class="qm">${webPreview.has(w.key) ? webPreview(w.key, { cls: 'wp-quick on' }) : coverFor(w.key)}</div><div class="qt"><button class="x" type="button" data-close>Close</button><span class="kicker">Quick look</span><h3 id="quick-title">${w.name}</h3><p class="body-serif" style="color:var(--on-paper-dim)">${w.type}${w.craft === 'Social' ? '. Feed graphics, campaign creative and brand content that carry the identity from package to post.' : '. One of the websites we’ve designed and shipped end to end.'}</p>${arrowBtn('#contact', 'Ask about this project', 'dark')}${liveLink(w.key, 'dark')}</div></div>`;
    quick.classList.add('on'); if (lenis) lenis.stop(); requestAnimationFrame(() => $$('[data-wp]', quick).forEach(sizeWp)); $$('img.wp-shot', quick).forEach(im => im.addEventListener('load', () => sizeWp(im.closest('[data-wp]')), { once: true })); setTimeout(() => $('[data-close]', quick)?.focus(), 50);
  }
  function closeQuick() { if (!quick.classList.contains('on')) return; quick.classList.remove('on'); if (lenis && !document.body.classList.contains('menu-open')) lenis.start(); lastFocus && lastFocus.focus && lastFocus.focus(); }
  quick.addEventListener('click', e => { const f = e.target.closest('.sg-i img'); if (f) { e.stopPropagation(); const z = document.createElement('div'); z.className = 'sg-zoom'; z.setAttribute('data-lenis-prevent', ''); z.innerHTML = `<img src="${f.getAttribute('src')}" alt="${f.alt}">`; z.addEventListener('click', () => z.remove()); document.body.appendChild(z); } }, true);
  quick.addEventListener('click', e => { if (e.target === quick || e.target.closest('[data-close]') || e.target.closest('a[href^="#"]')) closeQuick(); });

  /* ---------- contact ---------- */
  function initContact() {
    const doors = $$('.door', app);
    const open = id => { doors.forEach(d => d.setAttribute('aria-expanded', String(d.dataset.door === id))); $$('.panel-form', app).forEach(p => p.classList.toggle('on', p.id === 'p-' + id)); const p = $('#p-' + id, app); if (p) { scrollToEl(p, 120); const f = $('input, textarea', p); setTimeout(() => f && f.focus({ preventScroll: true }), 700); } if (hasGSAP) ScrollTrigger.refresh(); };
    doors.forEach(d => d.addEventListener('click', () => open(d.dataset.door)));
    if (S.persona || S.plan.length) setTimeout(() => open('project'), first ? 400 : 900);
    const emailOK = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
    const need = (inp, msg) => { const err = inp.parentElement.querySelector('.err'); const bad = !inp.value.trim() || (inp.type === 'email' && !emailOK(inp.value)); if (err) err.textContent = bad ? msg : ''; return !bad; };
    const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    const FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT.email;
    const mailto = (subject, text) => `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    const doneView = (form, title, text, subject) => { form.innerHTML = `<div class="done"><span class="kicker">Almost there</span><h3>${title}</h3><p class="body-serif" style="color:var(--on-paper-dim)">We couldn’t send it from here. Tap “Email it” to send it from your own email app, or copy the text and send it to <b>${CONTACT.email}</b>.</p><pre class="selectable" data-lenis-prevent>${esc(text)}</pre><div class="copy-row"><a class="btn-solid" href="${mailto(subject, text)}">Email it</a><button class="btn-solid" type="button" data-copy="${esc(text)}">Copy text</button><span class="mono">${CONTACT.email}</span></div></div>`; if (hasGSAP && !RM) gsap.from(form.firstChild.children, { y: 20, opacity: 0, stagger: .07, duration: .6 }); };
    const sentView = (form, title, who) => { form.innerHTML = `<div class="done"><span class="kicker">Sent</span><h3>${title}</h3><p class="body-serif" style="color:var(--on-paper-dim)">Thanks, ${esc(who)}. It’s in Vallabh’s inbox now. Expect a reply within one working day at the email you gave us.</p></div>`; if (hasGSAP && !RM) gsap.from(form.firstChild.children, { y: 20, opacity: 0, stagger: .07, duration: .6 }); };
    const send = async (form, { subject, text, name, email, sentTitle, readyTitle }) => {
      const btn = $('button[type="submit"], .nx', form); if (btn) { btn.disabled = true; btn.dataset.l = btn.textContent; btn.textContent = 'Sending…'; }
      try {
        const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name, email, _replyto: email, _subject: subject, message: text, _template: 'box', _captcha: 'false' }) });
        const j = await r.json().catch(() => ({}));
        if (r.ok && (j.success === true || j.success === 'true')) { sentView(form, sentTitle, name); return; }
        throw new Error(j.message || 'send failed');
      } catch (err) { doneView(form, readyTitle, text, subject); }
    };
    const pf = $('#p-project', app); let step = 1; const total = 5;
    const show = () => { $$('.step', pf).forEach(s => s.classList.toggle('on', +s.dataset.s === step)); $('.sn', pf).textContent = step; $('.step-bar b', pf).style.transform = `scaleX(${step / total})`; $('[data-prev]', pf).style.visibility = step === 1 ? 'hidden' : 'visible'; $('.nx', pf).textContent = step === total ? 'Prepare brief' : 'Next'; };
    $('[data-prev]', pf).addEventListener('click', () => { if (step > 1) { step--; show(); } });
    pf.addEventListener('submit', e => {
      e.preventDefault();
      if (step < total) { step++; show(); const f = $('.step.on input, .step.on textarea', pf); f && f.focus({ preventScroll: true }); return; }
      const nm = $('#f-name', pf), em = $('#f-email', pf);
      if (!(need(nm, 'Add your name so we know who to reply to.') & need(em, 'Enter an email like name@company.com.'))) return;
      const fd = new FormData(pf);
      send(pf, { subject: 'New project brief from ' + nm.value.trim(), name: nm.value.trim(), email: em.value.trim(), sentTitle: 'Your brief is sent.', readyTitle: 'Your brief is ready.', text: `New project brief\n\nNeed: ${fd.get('what')}\nTimeline: ${fd.get('when')}\nBudget: ${fd.get('budget')}\n\nAbout the business:\n${(fd.get('brand') || '—').trim()}\n\nFrom: ${nm.value.trim()} <${em.value.trim()}>` });
    });
    show();
    const pm = $('#p-message', app);
    pm.addEventListener('submit', e => { e.preventDefault(); const n = $('#m-name', pm), em = $('#m-email', pm), m = $('#m-msg', pm); if (!(need(n, 'Add your name.') & need(em, 'Enter an email like name@company.com.') & need(m, 'Write a line or two.'))) return; send(pm, { subject: 'New message from ' + n.value.trim(), name: n.value.trim(), email: em.value.trim(), sentTitle: 'Your note is sent.', readyTitle: 'Your note is ready.', text: `${m.value.trim()}\n\n${n.value.trim()} <${em.value.trim()}>` }); });
    const pc = $('#p-call', app);
    pc.addEventListener('submit', e => { e.preventDefault(); const n = $('#c-name', pc), em = $('#c-email', pc); if (!(need(n, 'Add your name.') & need(em, 'Enter an email like name@company.com.'))) return; send(pc, { subject: 'Call request from ' + n.value.trim(), name: n.value.trim(), email: em.value.trim(), sentTitle: 'Your call request is sent.', readyTitle: 'Your call request is ready.', text: `Call request: 30 minutes\nPreferred slot: ${new FormData(pc).get('slot')} IST\n${planSummary() ? '\n' + planSummary() + '\n' : ''}\n${n.value.trim()} <${em.value.trim()}>` }); });
  }

  /* ======================================================================
     MICRO-INTERACTIONS (global)
     ====================================================================== */
  // magnetic elements
  if (FINE && !RM && hasGSAP) {
    let cur = null;
    const release = el => gsap.to(el, { x: 0, y: 0, duration: .9, ease: 'elastic.out(1, .4)' });
    document.addEventListener('mousemove', e => {
      const el = e.target.closest && e.target.closest('.mag');
      if (el !== cur) { if (cur) release(cur); cur = el; }
      if (!cur) return;
      const r = cur.getBoundingClientRect(), k = cur.classList.contains('circ') ? .45 : .22;
      gsap.to(cur, { x: (e.clientX - (r.left + r.width / 2)) * k, y: (e.clientY - (r.top + r.height / 2)) * k, duration: .4, ease: 'power3.out' });
    }, { passive: true });
  }
  // text scramble on nav links
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#/*+';
  function scramble(el) {
    if (RM || el._busy) return; el._busy = true; const final = el.dataset.txt || (el.dataset.txt = el.textContent); let f = 0; const n = final.length;
    const tick = () => { el.textContent = final.split('').map((c, i) => c === ' ' ? ' ' : (i < f / 2 ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''); f++; if (f / 2 <= n) requestAnimationFrame(tick); else { el.textContent = final; el._busy = false; } };
    tick();
  }
  document.addEventListener('mouseover', e => { const el = e.target.closest && e.target.closest('[data-scramble]'); if (el && !el.contains(e.relatedTarget)) scramble(el); });
  // tilt + glare
  if (FINE && !RM) {
    document.addEventListener('pointermove', e => {
      const el = e.target.closest && e.target.closest('.tilt'); if (!el) return;
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(900px) rotateY(${(x - .5) * 9}deg) rotateX(${(.5 - y) * 9}deg) translateZ(0)`;
      el.style.setProperty('--gx', x * 100 + '%'); el.style.setProperty('--gy', y * 100 + '%'); el.classList.add('tilting');
    }, { passive: true });
    document.addEventListener('pointerout', e => { const el = e.target.closest && e.target.closest('.tilt'); if (el && !el.contains(e.relatedTarget)) { el.style.transform = ''; el.classList.remove('tilting'); } });
  }
  // scroll progress + velocity skew + burger width
  const prog = $('.progress b');
  let skew = 0;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight; prog.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    burger.classList.toggle('wide', scrollY > 80);
    const y = scrollY, solid = y > 60;
    hdr.classList.toggle('solid', solid); document.body.classList.toggle('hdr-solid', solid);
    if (Math.abs(y - lastY) > 6) { document.body.classList.toggle('hdr-hide', y > lastY && y > 420); lastY = y; }
    if (y < 60) document.body.classList.remove('hdr-hide');
  };
  let lastY = 0;
  window.addEventListener('scroll', onScroll, { passive: true });
  if (lenis) {
    lenis.on('scroll', l => { skew = clamp(-l.velocity * .35, -9, 9); });
    // skew only the marquee rows that are on screen, and only while the value is changing
    let cur = 0;
    gsap.ticker.add(() => {
      const nx = cur + (skew - cur) * .12; skew *= .9;
      if (Math.abs(nx - cur) < .01 && Math.abs(nx) < .02) { if (cur !== 0) { cur = 0; $$('.skewy').forEach(el => { el.style.transform = ''; }); } return; }
      cur = nx; const t = `skewY(${nx.toFixed(2)}deg)`;
      $$('.skewy').forEach(el => { const r = el.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) el.style.transform = t; });
    });
  }

  /* ======================================================================
     MENU, CURSOR, INTRO, BOOT
     ====================================================================== */
  function openMenu() { document.body.classList.add('menu-open'); burger.setAttribute('aria-expanded', 'true'); burger.querySelector('.sr-only').textContent = 'Close menu'; if (lenis) lenis.stop(); setTimeout(() => $('#menu a')?.focus(), 400); }
  function closeMenu() { if (!document.body.classList.contains('menu-open')) return; document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); burger.querySelector('.sr-only').textContent = 'Open menu'; if (lenis) lenis.start(); }
  burger.addEventListener('click', () => document.body.classList.contains('menu-open') ? closeMenu() : openMenu());
  $('#menu').addEventListener('click', e => { const a = e.target.closest('a[href^="#"]'); if (a && a.getAttribute('href') === location.hash) { e.preventDefault(); closeMenu(); scrollToY(0); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeQuick(); closeDrawer(); } });
  $('#skip').addEventListener('click', () => { app.focus(); scrollToEl(app); });

  function initCursor() {
    if (!FINE) return;
    document.body.classList.add('has-cursor');
    const dot = $('#cdot'), ring = $('#cring'), lab = ring.querySelector('span');
    let mx = -100, my = -100, rx = -100, ry = -100, pdx = -100, pdy = -100, vx = 0, vy = 0, prx = -100, pry = -100, last = performance.now(), f = 0, label = null, hov = false, on = false;
    const lerp = (a, b, t) => a + (b - a) * t;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; if (!on) { on = true; document.body.classList.add('c-on'); rx = mx; ry = my; } }, { passive: true });
    document.addEventListener('mouseleave', () => { on = false; document.body.classList.remove('c-on'); });
    document.addEventListener('mousedown', () => document.body.classList.add('c-down'));
    document.addEventListener('mouseup', () => document.body.classList.remove('c-down'));
    const loop = now => {
      const dt = Math.min(now - last, 64); last = now;
      if (on && f++ % 3 === 0) {
        const el = document.elementFromPoint(mx, my), lEl = el && el.closest('[data-cursor]');
        const nl = lEl ? lEl.dataset.cursor : null, nh = !!(el && el.closest('a, button, label, input, textarea, .sku'));
        if (nl !== label) { label = nl; lab.textContent = label || ''; document.body.classList.toggle('c-label', !!label); }
        if (nh !== hov) { hov = nh; document.body.classList.toggle('c-hover', hov && !label); }
      }
      vx = lerp(vx, mx - pdx, .15); vy = lerp(vy, my - pdy, .15); pdx = mx; pdy = my;
      const sp = Math.hypot(vx, vy), ang = Math.atan2(vy, vx) * 180 / Math.PI, s = RM ? 0 : Math.min(sp * .04, .6);
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) rotate(${ang}deg) scale(${1 + s}, ${1 - s * .5})`;
      const k = 1 - Math.exp(-dt / 70); rx = lerp(rx, mx, k); ry = lerp(ry, my, k);
      const rvx = rx - prx, rvy = ry - pry; prx = rx; pry = ry;
      const rs = label || RM ? 0 : Math.min(Math.hypot(rvx, rvy) * .06, .35), ra = Math.atan2(rvy, rvx) * 180 / Math.PI;
      ring.style.transform = label ? `translate(${rx}px, ${ry}px) translate(-50%, -50%)` : `translate(${rx}px, ${ry}px) translate(-50%, -50%) rotate(${ra}deg) scale(${1 + rs}, ${1 - rs * .5})`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  function intro() {
    let seen = false;
    try { seen = sessionStorage.getItem('vd-intro') === '1'; } catch (e) { /* storage blocked */ }
    if (seen || RM) return Promise.resolve();
    try { sessionStorage.setItem('vd-intro', '1'); } catch (e) { /* ignore */ }
    const el = document.createElement('div'); el.className = 'intro'; el.setAttribute('aria-hidden', 'true');
    const img = n => `<img src="assets/img/${n}.jpg" alt="">`;
    const pics = [art.covers.nutripleks(), img('p-sky'), art.covers.globriddge(), img('p-duo-cafe'), art.covers['sapar-arts'](), img('p-duo-flatlay-dark'), art.covers['good-garden'](), img('p-duo-desk-white'), img('p-bw-barista')];
    el.innerHTML = `<div class="intro-grid">${pics.map((p, i) => `<div style="--i:${[2, 7, 0, 5, 9, 4, 1, 8, 3, 6][i]}">${p}</div>`).join('')}</div>
      <div class="intro-logo"><svg viewBox="0 0 1000 200"><text x="500" y="176" text-anchor="middle" style="font-family:'Archivo','Arial Narrow',sans-serif;font-stretch:62%;font-weight:900" font-size="250" textLength="960" lengthAdjust="spacingAndGlyphs">VARIENT</text></svg><p class="intro-tag">Screens <em>&amp;</em> shelves.</p></div>
      <button class="intro-skip" type="button">Skip ${ARROW.replace('<svg', '<svg width="14"')}</button>`;
    document.body.appendChild(el); burger.style.opacity = '0'; hdr.style.opacity = '0';
    if (lenis) lenis.stop();
    return new Promise(res => {
      let done = false;
      const finish = () => { if (done) return; done = true; el.classList.add('leave'); if (lenis) lenis.start(); setTimeout(() => el.remove(), 850); res(); };
      const t1 = setTimeout(() => el.classList.add('converge'), 1500), t2 = setTimeout(finish, 4300);
      el.querySelector('.intro-skip').addEventListener('click', () => { clearTimeout(t1); clearTimeout(t2); finish(); });
    });
  }

  if (RM || !hasGSAP) document.documentElement.classList.add('static');
  $$('.nav a, .menu .mt').forEach(a => a.setAttribute('data-scramble', ''));
  initCursor();
  updateDock();
  window.addEventListener('hashchange', route);
  intro().then(() => { burger.style.opacity = ''; hdr.style.opacity = ''; });
  route();
  if (hasGSAP) window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => hasGSAP && ScrollTrigger.refresh());
})();

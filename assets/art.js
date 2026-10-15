/* Varient Designs — generated artwork.
   Every image on the site is drawn here as SVG, so the site ships with no
   photo dependencies. Swap any `art.*` call for a real <img> when the
   photography and pack shots are ready. */
(function () {
  const F_DISPLAY = "font-family:'Archivo','Arial Narrow',sans-serif;font-stretch:62%";
  const F_SERIF = "font-family:'Instrument Serif',Georgia,serif";
  const F_MONO = "font-family:'IBM Plex Mono',ui-monospace,monospace";

  let uid = 0;
  const svg = (w, h, inner, cls = '') =>
    `<svg class="art ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${inner}</svg>`;

  /* ---------- packaging primitives (x = left edge, b = baseline) ---------- */
  const label = (x, y, w, h, c) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c.label || '#EEEAE0'}"/>
    <rect x="${x}" y="${y}" width="${Math.max(4, w * 0.07)}" height="${h}" fill="${c.code}"/>
    <circle cx="${x + w * 0.5}" cy="${y + h * 0.36}" r="${Math.min(w, h) * 0.13}" fill="none" stroke="${c.ink || '#14261C'}" stroke-width="${Math.max(1, w * 0.012)}"/>
    <text x="${x + w * 0.5}" y="${y + h * 0.36 + Math.min(w, h) * 0.06}" text-anchor="middle" style="${F_DISPLAY};font-weight:800" font-size="${Math.min(w, h) * 0.16}" fill="${c.ink || '#14261C'}">N</text>
    <rect x="${x + w * 0.18}" y="${y + h * 0.66}" width="${w * 0.64}" height="${Math.max(2, h * 0.06)}" fill="${c.ink || '#14261C'}"/>
    <rect x="${x + w * 0.26}" y="${y + h * 0.8}" width="${w * 0.48}" height="${Math.max(1.5, h * 0.035)}" fill="${c.code}"/>`;

  const bottle = (x, b, h, w, c) => {
    const bodyTop = b - h * 0.74;
    return `<g class="pack">
      <rect x="${x + w * 0.3}" y="${b - h}" width="${w * 0.4}" height="${h * 0.07}" rx="${w * 0.04}" fill="${c.cap}"/>
      <rect x="${x + w * 0.35}" y="${b - h * 0.94}" width="${w * 0.3}" height="${h * 0.08}" fill="${c.body}"/>
      <path d="M${x} ${bodyTop + w * 0.1} Q${x} ${b - h * 0.86} ${x + w * 0.35} ${b - h * 0.87} L${x + w * 0.65} ${b - h * 0.87} Q${x + w} ${b - h * 0.86} ${x + w} ${bodyTop + w * 0.1} Z" fill="${c.body}"/>
      <rect x="${x}" y="${bodyTop}" width="${w}" height="${h * 0.74}" rx="${w * 0.09}" fill="${c.body}"/>
      ${label(x, b - h * 0.56, w, h * 0.34, c)}
      <rect x="${x + w * 0.08}" y="${bodyTop + 6}" width="${w * 0.06}" height="${h * 0.6}" rx="${w * 0.03}" fill="#fff" opacity=".12"/>
    </g>`;
  };

  const pouch = (x, b, h, w, c) => `<g class="pack">
      <path d="M${x} ${b} L${x + w} ${b} L${x + w * 0.95} ${b - h * 0.86} L${x + w * 0.05} ${b - h * 0.86} Z" fill="${c.body}"/>
      <rect x="${x + w * 0.05}" y="${b - h}" width="${w * 0.9}" height="${h * 0.15}" fill="${c.body}"/>
      <line x1="${x + w * 0.07}" y1="${b - h * 0.9}" x2="${x + w * 0.93}" y2="${b - h * 0.9}" stroke="#000" stroke-opacity=".25" stroke-width="${Math.max(1, w * 0.01)}" stroke-dasharray="3 3"/>
      <circle cx="${x + w * 0.5}" cy="${b - h * 0.955}" r="${w * 0.025}" fill="#000" opacity=".3"/>
      ${label(x + w * 0.1, b - h * 0.62, w * 0.8, h * 0.38, c)}
      <path d="M${x} ${b} L${x + w} ${b} L${x + w * 0.97} ${b - h * 0.08} L${x + w * 0.03} ${b - h * 0.08} Z" fill="#000" opacity=".18"/>
    </g>`;

  const carton = (x, b, h, w, c) => {
    const d = w * 0.22;
    return `<g class="pack">
      <polygon points="${x + w},${b - h} ${x + w + d},${b - h - d * 0.6} ${x + w + d},${b - d * 0.6} ${x + w},${b}" fill="${c.body}" style="filter:brightness(.72)"/>
      <polygon points="${x},${b - h} ${x + d},${b - h - d * 0.6} ${x + w + d},${b - h - d * 0.6} ${x + w},${b - h}" fill="${c.body}" style="filter:brightness(1.18)"/>
      <rect x="${x}" y="${b - h}" width="${w}" height="${h}" fill="${c.body}"/>
      ${label(x + w * 0.1, b - h * 0.72, w * 0.8, h * 0.5, c)}
    </g>`;
  };

  const can = (x, b, h, w, c) => `<g class="pack">
      <rect x="${x}" y="${b - h * 0.93}" width="${w}" height="${h * 0.9}" fill="${c.body}"/>
      <ellipse cx="${x + w / 2}" cy="${b - h * 0.03}" rx="${w / 2}" ry="${w * 0.1}" fill="${c.body}" style="filter:brightness(.8)"/>
      <rect x="${x + w * 0.04}" y="${b - h}" width="${w * 0.92}" height="${h * 0.08}" fill="${c.cap}"/>
      <ellipse cx="${x + w / 2}" cy="${b - h}" rx="${w * 0.46}" ry="${w * 0.09}" fill="${c.cap}" style="filter:brightness(1.2)"/>
      <rect x="${x + w * 0.3}" y="${b - h * 1.05}" width="${w * 0.4}" height="${h * 0.06}" rx="${w * 0.03}" fill="${c.cap}"/>
      ${label(x, b - h * 0.68, w, h * 0.42, c)}
    </g>`;

  const sticker = (x, b, h, w, c) => `<g class="pack" transform="rotate(-6 ${x + w / 2} ${b - h / 2})">
      <rect x="${x}" y="${b - h}" width="${w}" height="${h}" rx="${w * 0.18}" fill="${c.code}"/>
      <rect x="${x + w * 0.08}" y="${b - h * 0.92}" width="${w * 0.84}" height="${h * 0.84}" rx="${w * 0.14}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-dasharray="4 3"/>
      <text x="${x + w / 2}" y="${b - h * 0.42}" text-anchor="middle" style="${F_SERIF};font-style:italic" font-size="${w * 0.26}" fill="#fff">Chipkoo</text>
      <text x="${x + w / 2}" y="${b - h * 0.22}" text-anchor="middle" style="${F_MONO}" font-size="${w * 0.09}" fill="#fff" opacity=".8">SPREADER</text>
    </g>`;

  const PACK = { bottle, pouch, carton, can, sticker };

  /* ---------- screen primitives ---------- */
  const lines = (x, y, widths, gap, color, t = 6, op = 1) =>
    widths.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="${t}" rx="${t / 2}" fill="${color}" opacity="${op}"/>`).join('');

  const browser = (x, y, w, h, t, inner) => `<g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${t.bg}"/>
      <rect x="${x}" y="${y}" width="${w}" height="34" rx="10" fill="${t.bar || t.fg}" opacity=".08"/>
      <circle cx="${x + 20}" cy="${y + 17}" r="5" fill="${t.fg}" opacity=".35"/>
      <circle cx="${x + 38}" cy="${y + 17}" r="5" fill="${t.fg}" opacity=".25"/>
      <circle cx="${x + 56}" cy="${y + 17}" r="5" fill="${t.fg}" opacity=".15"/>
      <rect x="${x + w * 0.32}" y="${y + 9}" width="${w * 0.36}" height="16" rx="8" fill="${t.fg}" opacity=".08"/>
      <svg x="${x}" y="${y + 34}" width="${w}" height="${h - 34}" overflow="hidden">${inner(w, h - 34)}</svg>
    </g>`;

  const phone = (x, y, w, h, t, inner) => `<g>
      <rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="${w * 0.16}" fill="#0b0b0c"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.13}" fill="${t.bg}"/>
      <svg x="${x}" y="${y}" width="${w}" height="${h}" overflow="hidden">${inner(w, h)}</svg>
      <rect x="${x + w * 0.36}" y="${y + 8}" width="${w * 0.28}" height="14" rx="7" fill="#0b0b0c"/>
    </g>`;

  const cropMarks = (w, h, m, color) => {
    const s = 26;
    const c = (x, y, dx, dy) => `<path d="M${x + dx * 8} ${y}h${dx * s}M${x} ${y + dy * 8}v${dy * s}" stroke="${color}" stroke-width="1.2" fill="none"/>`;
    return c(m, m, -1, -1) + c(w - m, m, 1, -1) + c(m, h - m, -1, 1) + c(w - m, h - m, 1, 1);
  };

  const regMark = (cx, cy, r, color, sw = 1.2) => `<g stroke="${color}" stroke-width="${sw}" fill="none">
      <circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.5}"/>
      <path d="M${cx - r * 1.5} ${cy}H${cx + r * 1.5}M${cx} ${cy - r * 1.5}V${cy + r * 1.5}"/></g>`;

  /* ---------- palettes ---------- */
  const RANGE = ['#3E8E5A', '#D7A23C', '#C2552F', '#2F8C8C', '#7A4A8C', '#3D7FC4'];
  const packColors = (i, light) => ({
    body: light ? '#EEEAE0' : '#1D3326',
    cap: RANGE[i % RANGE.length],
    code: RANGE[i % RANGE.length],
    label: light ? '#1D3326' : '#EEEAE0',
    ink: light ? '#EEEAE0' : '#1D3326'
  });

  /* ---------- covers (1200 × 800) ---------- */
  const covers = {
    nutripleks(bg = '#13261B') {
      const floor = 650;
      return svg(1200, 800, `
        <rect width="1200" height="800" fill="${bg}"/>
        <rect x="0" y="${floor}" width="1200" height="150" fill="#000" opacity=".22"/>
        <line x1="0" y1="${floor}" x2="1200" y2="${floor}" stroke="#EEEAE0" stroke-opacity=".25"/>
        ${bottle(150, floor, 360, 128, packColors(0))}
        ${pouch(318, floor, 290, 190, packColors(1, true))}
        ${carton(545, floor, 250, 150, packColors(2))}
        ${can(760, floor, 230, 120, packColors(3, true))}
        ${bottle(915, floor, 260, 96, packColors(4, true))}
        ${carton(1045, floor, 120, 80, packColors(5))}
        ${cropMarks(1200, 800, 40, 'rgba(238,234,224,.35)')}`);
    },
    globriddge(bg = '#2A2117') {
      const t = { bg: '#F2EBDD', fg: '#2A2117' };
      return svg(1200, 800, `
        <rect width="1200" height="800" fill="${bg}"/>
        ${browser(110, 90, 980, 640, t, (w, h) => `
          <rect width="${w}" height="${h}" fill="#F2EBDD"/>
          <text x="40" y="48" style="${F_DISPLAY};font-weight:800;letter-spacing:.04em" font-size="20" fill="#2A2117">GLOBRIDDGE</text>
          ${[0, 1, 2].map(i => `<rect x="${w - 400 + i * 80}" y="40" width="56" height="6" rx="3" fill="#2A2117" opacity=".35"/>`).join('')}
          <rect x="${w - 120}" y="28" width="90" height="30" rx="15" fill="#2A2117"/>
          <text x="40" y="170" style="${F_DISPLAY};font-weight:800" font-size="78" fill="#2A2117">AGRI COMMODITIES</text>
          <text x="40" y="240" style="${F_SERIF};font-style:italic" font-size="58" fill="#9C6B1E">sourced, verified, shipped.</text>
          ${lines(40, 290, [420, 380, 300], 20, '#2A2117', 7, .25)}
          <rect x="40" y="370" width="150" height="40" rx="20" fill="#D9A441"/>
          <g transform="translate(${w - 420} 150)">
            <rect width="370" height="300" rx="8" fill="#2A2117"/>
            ${Array.from({ length: 12 }, (_, r) => Array.from({ length: 16 }, (_, k) =>
              `<circle cx="${24 + k * 21.5}" cy="${24 + r * 23}" r="${(Math.sin(r * 1.7 + k * 0.9) + 1.6) * 2.4}" fill="#D9A441" opacity="${0.35 + ((r + k) % 4) * 0.15}"/>`).join('')).join('')}
          </g>
          ${[0, 1, 2].map(i => `<g transform="translate(${40 + i * 300} ${h - 120})"><rect width="270" height="90" rx="8" fill="#2A2117" opacity=".06"/>${lines(20, 24, [120, 200], 26, '#2A2117', 8, .4)}</g>`).join('')}
        `)}
        ${cropMarks(1200, 800, 40, 'rgba(242,235,221,.3)')}`);
    },
    'good-garden'(bg = '#12302A') {
      const t = { bg: '#F4F1E8', fg: '#12302A' };
      const leaf = (cx, cy, r, c) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" opacity=".25"/><path d="M${cx - r * .5} ${cy + r * .5} Q${cx - r * .6} ${cy - r * .6} ${cx + r * .5} ${cy - r * .5} Q${cx + r * .6} ${cy + r * .5} ${cx - r * .5} ${cy + r * .5}Z" fill="${c}"/>`;
      return svg(1200, 800, `
        <rect width="1200" height="800" fill="${bg}"/>
        ${browser(70, 110, 780, 580, t, (w, h) => `
          <rect width="${w}" height="${h}" fill="#F4F1E8"/>
          <text x="32" y="46" style="${F_SERIF};font-style:italic" font-size="26" fill="#12302A">Good Garden</text>
          <text x="32" y="120" style="${F_DISPLAY};font-weight:800" font-size="52" fill="#12302A">FEED THE SOIL</text>
          ${[0, 1, 2].map(i => `<g transform="translate(${32 + i * 240} 160)">
              <rect width="220" height="250" rx="10" fill="#fff"/>
              ${leaf(110, 100, 56, ['#3E8E5A', '#C66B3D', '#6FBF73'][i])}
              ${lines(20, 190, [140, 90], 20, '#12302A', 7, .35)}
            </g>`).join('')}
        `)}
        ${phone(900, 140, 230, 470, { bg: '#F4F1E8' }, (w, h) => `
          <rect width="${w}" height="${h}" fill="#F4F1E8"/>
          ${pouch(55, 280, 210, 120, { body: '#3E8E5A', cap: '#C66B3D', code: '#C66B3D', label: '#F4F1E8', ink: '#12302A' })}
          ${lines(24, 320, [150, 110, 160], 20, '#12302A', 7, .35)}
          <rect x="24" y="${h - 70}" width="${w - 48}" height="44" rx="22" fill="#12302A"/>
        `)}
        ${cropMarks(1200, 800, 40, 'rgba(244,241,232,.3)')}`);
    },
    'sapar-arts'(bg = '#2A1313') {
      const t = { bg: '#170C0C', fg: '#E9D9B8' };
      const u = 'sg' + (++uid);
      const arch = (x, y, w, h, i) => `<defs><linearGradient id="${u}${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9A35C"/><stop offset="1" stop-color="${['#6B1E1E', '#3B2A55', '#1E4A4A'][i]}"/></linearGradient></defs>
        <path d="M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z" fill="url(#${u}${i})"/>
        <path d="M${x + 14} ${y + h - 14} V${y + w / 2} A${w / 2 - 14} ${w / 2 - 14} 0 0 1 ${x + w - 14} ${y + w / 2} V${y + h - 14} Z" fill="none" stroke="#E9D9B8" stroke-opacity=".5"/>
        <circle cx="${x + w / 2}" cy="${y + w * 0.62}" r="${w * 0.14}" fill="#E9D9B8" opacity=".85"/>`;
      return svg(1200, 800, `
        <rect width="1200" height="800" fill="${bg}"/>
        ${browser(110, 90, 980, 640, t, (w, h) => `
          <rect width="${w}" height="${h}" fill="#170C0C"/>
          <text x="${w / 2}" y="70" text-anchor="middle" style="${F_SERIF};font-style:italic" font-size="40" fill="#E9D9B8">Sapar Arts</text>
          <line x1="${w / 2 - 60}" y1="92" x2="${w / 2 + 60}" y2="92" stroke="#C9A35C"/>
          ${arch(110, 130, 220, 400, 0)}${arch(380, 110, 220, 420, 1)}${arch(650, 130, 220, 400, 2)}
        `)}
        ${cropMarks(1200, 800, 40, 'rgba(233,217,184,.3)')}`);
    },
    automarc(bg = '#121A2A') {
      const t = { bg: '#E9ECF1', fg: '#121A2A' };
      return svg(1200, 800, `
        <rect width="1200" height="800" fill="${bg}"/>
        ${browser(110, 90, 980, 640, t, (w, h) => `
          <rect width="${w}" height="${h}" fill="#E9ECF1"/>
          <g transform="translate(${w - 300} ${h / 2})" fill="none" stroke="#121A2A" stroke-opacity=".5">
            ${[230, 180, 130, 80].map(r => `<circle r="${r}"/>`).join('')}
            ${Array.from({ length: 24 }, (_, i) => { const a = i * Math.PI / 12; return `<line x1="${Math.cos(a) * 80}" y1="${Math.sin(a) * 80}" x2="${Math.cos(a) * 230}" y2="${Math.sin(a) * 230}"/>`; }).join('')}
          </g>
          <circle cx="${w - 300}" cy="${h / 2}" r="30" fill="#E8743B"/>
          <text x="40" y="200" style="${F_DISPLAY};font-weight:900" font-size="128" fill="#121A2A">AUTOMARC</text>
          <rect x="40" y="226" width="120" height="8" fill="#E8743B"/>
          ${lines(40, 280, [380, 340, 260], 22, '#121A2A', 8, .3)}
          <rect x="40" y="380" width="170" height="44" rx="22" fill="#121A2A"/>
        `)}
        ${cropMarks(1200, 800, 40, 'rgba(233,236,241,.3)')}`);
    }
  };

  /* Generic covers for list-only work */
  const site = (name, pal) => svg(1200, 800, `
      <rect width="1200" height="800" fill="${pal[0]}"/>
      ${browser(120, 100, 960, 600, { bg: pal[1], fg: pal[0] }, (w, h) => `
        <rect width="${w}" height="${h}" fill="${pal[1]}"/>
        <text x="40" y="200" style="${F_DISPLAY};font-weight:900" font-size="${Math.min(120, 1500 / Math.max(6, name.length))}" fill="${pal[0]}">${name.toUpperCase()}</text>
        <rect x="40" y="232" width="110" height="8" fill="${pal[2]}"/>
        ${lines(40, 290, [420, 360, 300], 22, pal[0], 8, .3)}
        <rect x="${w - 380}" y="80" width="330" height="360" rx="10" fill="${pal[2]}" opacity=".9"/>
        <circle cx="${w - 215}" cy="260" r="90" fill="${pal[1]}" opacity=".35"/>
      `)}`);

  const feed = (name, pal) => svg(1200, 800, `
      <rect width="1200" height="800" fill="${pal[0]}"/>
      ${phone(450, 70, 300, 640, { bg: pal[1] }, (w, h) => `
        <rect width="${w}" height="${h}" fill="${pal[1]}"/>
        <text x="20" y="70" style="${F_DISPLAY};font-weight:800" font-size="20" fill="${pal[0]}">${name.toUpperCase()}</text>
        ${Array.from({ length: 9 }, (_, i) => { const x = 8 + (i % 3) * 96, y = 100 + Math.floor(i / 3) * 96;
          return `<rect x="${x}" y="${y}" width="92" height="92" fill="${i % 2 ? pal[2] : pal[0]}"/>${i % 3 === 1 ? `<circle cx="${x + 46}" cy="${y + 46}" r="26" fill="${pal[1]}" opacity=".7"/>` : `<text x="${x + 10}" y="${y + 56}" style="${F_SERIF};font-style:italic" font-size="34" fill="${pal[1]}">${'Aa'}</text>`}`; }).join('')}
      `)}`);

  /* Hero composition: screen half + shelf half (1600 × 900) */
  const hero = () => svg(1600, 900, `
      <rect width="800" height="900" fill="#111111"/>
      <rect x="800" width="800" height="900" fill="#E7E2D7"/>
      <g opacity=".14" stroke="#D9CDB6">${Array.from({ length: 13 }, (_, i) => `<line x1="${60 + i * 56}" y1="0" x2="${60 + i * 56}" y2="900"/>`).join('')}</g>
      ${phone(260, 160, 280, 580, { bg: '#D9CDB6' }, (w, h) => `
        <rect width="${w}" height="${h}" fill="#D9CDB6"/>
        <text x="22" y="80" style="${F_DISPLAY};font-weight:900" font-size="34" fill="#111111">GOOD</text>
        <text x="22" y="114" style="${F_SERIF};font-style:italic" font-size="30" fill="#111111">morning.</text>
        <rect x="22" y="140" width="${w - 44}" height="190" rx="12" fill="#111111"/>
        ${pouch(w / 2 - 50, 312, 150, 100, packColors(0, true))}
        ${lines(22, 360, [180, 130, 200], 22, '#111111', 8, .3)}
        <rect x="22" y="${h - 84}" width="${w - 44}" height="50" rx="25" fill="#E5322A"/>
      `)}
      <line x1="800" y1="140" x2="800" y2="760" stroke="#E5322A" stroke-width="2" stroke-dasharray="6 8"/>
      ${pouch(980, 760, 470, 300, packColors(0, true))}
      ${bottle(1330, 760, 330, 110, packColors(1))}
      <line x1="860" y1="760" x2="1540" y2="760" stroke="#111111" stroke-opacity=".3"/>
      ${regMark(1490, 150, 22, '#111111')}
      ${cropMarks(1600, 900, 50, 'rgba(120,120,120,.6)')}`, 'art-hero');

  /* Reel frames */
  const reel = {
    wire: () => svg(1200, 800, `
      <rect width="1200" height="800" fill="#D9CDB6"/>
      <g fill="none" stroke="#111111" stroke-width="2" class="draw">
        <rect x="160" y="120" width="880" height="560" rx="10"/>
        <line x1="160" y1="170" x2="1040" y2="170"/>
        <rect x="210" y="220" width="420" height="70" stroke-dasharray="8 6"/>
        <rect x="210" y="320" width="300" height="20"/><rect x="210" y="360" width="340" height="20"/>
        <rect x="210" y="430" width="160" height="50" rx="25"/>
        <rect x="680" y="220" width="310" height="400" stroke-dasharray="8 6"/>
        <path d="M680 220 L990 620 M990 220 L680 620" stroke-opacity=".4"/>
        <rect x="210" y="530" width="130" height="90"/><rect x="360" y="530" width="130" height="90"/><rect x="510" y="530" width="130" height="90"/>
      </g>
      <text x="160" y="90" style="${F_MONO}" font-size="20" fill="#111111">01 · WIREFRAME</text>`),
    dieline: () => svg(1200, 800, `
      <rect width="1200" height="800" fill="#D9CDB6"/>
      <g fill="none" stroke="#111111" stroke-width="2" class="draw">
        <rect x="300" y="250" width="200" height="300"/><rect x="500" y="250" width="120" height="300"/>
        <rect x="620" y="250" width="200" height="300"/><rect x="820" y="250" width="120" height="300"/>
        <path d="M940 260 L980 280 L980 520 L940 540"/>
        <path d="M300 250 L320 160 L480 160 L500 250 M620 250 L640 160 L800 160 L820 250"/>
        <path d="M300 550 L320 640 L480 640 L500 550 M620 550 L640 640 L800 640 L820 550"/>
      </g>
      <g stroke="#E5322A" stroke-width="2" stroke-dasharray="10 8"><line x1="500" y1="250" x2="500" y2="550"/><line x1="620" y1="250" x2="620" y2="550"/><line x1="820" y1="250" x2="820" y2="550"/><line x1="300" y1="250" x2="500" y2="250"/><line x1="620" y1="250" x2="820" y2="250"/></g>
      ${regMark(1060, 140, 24, '#111111')}
      <text x="160" y="90" style="${F_MONO}" font-size="20" fill="#111111">02 · DIELINE</text>`),
    screen: () => svg(1200, 800, `
      <rect width="1200" height="800" fill="#111111"/>
      ${phone(470, 110, 260, 560, { bg: '#D9CDB6' }, (w, h) => `
        <rect width="${w}" height="${h}" fill="#D9CDB6"/>
        <text x="20" y="80" style="${F_DISPLAY};font-weight:900" font-size="30" fill="#111111">NUTRIPLEKS</text>
        ${bottle(70, 360, 260, 110, packColors(2))}
        ${lines(20, 400, [190, 140, 170], 22, '#111111', 8, .3)}
        <rect x="20" y="${h - 80}" width="${w - 40}" height="48" rx="24" fill="#E5322A"/>`)}
      <text x="160" y="90" style="${F_MONO}" font-size="20" fill="#D9CDB6">03 · SCREEN</text>`),
    shelf: () => svg(1200, 800, `
      <rect width="1200" height="800" fill="#13261B"/>
      <line x1="0" y1="620" x2="1200" y2="620" stroke="#EEEAE0" stroke-opacity=".3"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const kind = ['bottle', 'pouch', 'carton', 'can'][i % 4]; const w = [90, 140, 110, 90][i % 4], h = [260, 220, 190, 170][i % 4];
        return PACK[kind](90 + i * 135, 620, h, w, packColors(i, i % 2 === 1)); }).join('')}
      <text x="160" y="90" style="${F_MONO}" font-size="20" fill="#EEEAE0">04 · SHELF</text>`)
  };

  const portrait = () => { const u = ++uid; return svg(900, 1100, `
      <defs><pattern id="ht${u}" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="3.2" fill="#D9CDB6"/></pattern>
      <mask id="vgm${u}"><rect width="900" height="1100" fill="#000"/><text x="450" y="720" text-anchor="middle" style="${F_SERIF};font-style:italic" font-size="640" fill="#fff">VG</text></mask></defs>
      <rect width="900" height="1100" fill="#141416"/>
      <rect width="900" height="1100" fill="url(#ht${u})" mask="url(#vgm${u})"/>
      ${cropMarks(900, 1100, 40, 'rgba(241,236,227,.35)')}`, 'art-portrait'); };

  /* Single pack for the shelf scene (fits a 200 × 340 box) */
  const single = (kind, i, light, scale = 1) => {
    const dims = { bottle: [100, 300], 'bottle-m': [84, 240], 'bottle-s': [68, 190], pouch: [150, 230], 'pouch-s': [120, 180], carton: [120, 200], 'carton-s': [86, 130], can: [100, 200], special: [100, 300], sticker: [110, 110] };
    const [w, h] = dims[kind];
    const base = kind.split('-')[0] === 'special' ? 'bottle' : kind.split('-')[0];
    const c = kind === 'special' ? { body: '#C9A35C', cap: '#1D3326', code: '#1D3326', label: '#1D3326', ink: '#C9A35C' } : packColors(i, light);
    const x = (200 - w * scale) / 2 - (base === 'carton' ? w * 0.11 : 0);
    return `<svg class="sku-art" viewBox="0 0 200 340" aria-hidden="true"><g transform="translate(${x} 0) scale(${scale})">${PACK[base](0, 330 / scale, h, w, c)}</g></svg>`;
  };

  /* ---------- before / after (fictional brand "Sunrise Agro", 1200 × 750) ---------- */
  const star = (cx, cy, r, n, fill) => {
    let d = '';
    for (let i = 0; i < n * 2; i++) { const a = (i * Math.PI) / n, rr = i % 2 ? r * 0.72 : r; d += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`; }
    return `<path d="${d}Z" fill="${fill}"/>`;
  };
  const FT = "font-family:'Times New Roman',Times,serif";
  const FC = "font-family:'Comic Sans MS','Trebuchet MS',sans-serif";
  const photo = (f, x, y, w, h, tint, op = 0, pos = 'xMidYMid') => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" overflow="hidden"><image href="assets/img/${f}" width="${w}" height="${h}" preserveAspectRatio="${pos} slice"/>${tint ? `<rect width="${w}" height="${h}" fill="${tint}" opacity="${op}"/>` : ''}</svg>`;
  const ba = {
    pack: {
      before() {
        const u = 'bg' + (++uid);
        return svg(1200, 750, `
          <defs><linearGradient id="${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E53935"/><stop offset=".5" stop-color="#FDD835"/><stop offset="1" stop-color="#43A047"/></linearGradient></defs>
          <rect width="1200" height="750" fill="#D9D4C4"/>
          <g transform="translate(470 80)">
            <rect x="70" y="0" width="120" height="40" rx="6" fill="#1565C0"/>
            <rect x="85" y="40" width="90" height="50" fill="#E0E0E0"/>
            <path d="M0 160 Q0 95 85 90 L175 90 Q260 95 260 160 Z" fill="#E0E0E0"/>
            <rect x="0" y="150" width="260" height="470" rx="26" fill="#E0E0E0"/>
            <rect x="0" y="230" width="260" height="290" fill="url(#${u})"/>
            <text x="130" y="290" text-anchor="middle" style="${FT};font-weight:700;font-style:italic" font-size="40" fill="#0D47A1">Sunrise</text>
            <text x="130" y="330" text-anchor="middle" style="${FC}" font-size="26" fill="#B71C1C">AGRO SUPER</text>
            <text x="130" y="368" text-anchor="middle" style="${FT};font-weight:700" font-size="34" fill="#1B5E20">GROW+++</text>
            <text x="130" y="400" text-anchor="middle" style="${FC}" font-size="15" fill="#4A148C">Best Quality ★ No.1 Product</text>
            <text x="130" y="425" text-anchor="middle" style="${FT}" font-size="14" fill="#000">Highly Effective Formula for All Crops</text>
            <text x="130" y="448" text-anchor="middle" style="${FT}" font-size="14" fill="#000">Use As Directed • 1 Litre</text>
            <circle cx="60" cy="480" r="22" fill="#FF6F00"/><circle cx="200" cy="480" r="22" fill="#00ACC1"/>
          </g>
          ${star(860, 210, 90, 14, '#FF1744')}
          <text x="860" y="205" text-anchor="middle" style="${FC};font-weight:700" font-size="40" fill="#FFEB3B">NEW!!</text>
          <text x="860" y="240" text-anchor="middle" style="${FC}" font-size="20" fill="#fff">Improved</text>
          <g transform="translate(120 330)"><path d="M0 310 L200 310 L190 20 L10 20 Z" fill="#1565C0"/><rect x="10" y="0" width="180" height="26" fill="#0D47A1"/><rect x="24" y="90" width="152" height="150" fill="#FFF176"/><text x="100" y="140" text-anchor="middle" style="${FC};font-weight:700" font-size="26" fill="#D50000">SUPER</text><text x="100" y="176" text-anchor="middle" style="${FT};font-style:italic" font-size="24" fill="#1B5E20">Sun-Rise</text><text x="100" y="212" text-anchor="middle" style="${FC}" font-size="14" fill="#000">Micro Nutrient</text></g>
          <g transform="translate(930 360)"><rect width="170" height="260" fill="#FF7043"/><rect x="12" y="40" width="146" height="150" fill="#fff"/><text x="85" y="96" text-anchor="middle" style="${FT};font-weight:700" font-size="24" fill="#6A1B9A">SUNRISE</text><text x="85" y="130" text-anchor="middle" style="${FC}" font-size="18" fill="#00897B">Agro Plus!!</text><text x="85" y="166" text-anchor="middle" style="${FT}" font-size="13" fill="#000">500 gm</text></g>
          <text x="120" y="700" style="${FC}" font-size="28" fill="#6A1B9A" transform="rotate(-6 120 700)">Buy 1 Get 1 *T&amp;C</text>`, 'art-ba');
      },
      after() {
        const u = 'pa' + (++uid);
        return svg(1200, 750, `
          <defs><linearGradient id="${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1F15" stop-opacity=".25"/><stop offset=".7" stop-color="#0E1F15" stop-opacity=".85"/><stop offset="1" stop-color="#0E1F15"/></linearGradient></defs>
          ${photo('mountains.jpg', 0, 0, 1200, 750, '#13261B', .35)}
          <rect width="1200" height="750" fill="url(#${u})"/>
          <rect x="0" y="640" width="1200" height="110" fill="#000" opacity=".35"/>
          <line x1="0" y1="640" x2="1200" y2="640" stroke="#EEEAE0" stroke-opacity=".3"/>
          ${pouch(130, 640, 330, 220, packColors(1, true))}
          ${carton(370, 640, 250, 150, packColors(2))}
          <g transform="translate(470 0)">
            <ellipse cx="130" cy="642" rx="150" ry="14" fill="#000" opacity=".45"/>
            <rect x="85" y="20" width="90" height="44" rx="8" fill="#D7A23C"/>
            <rect x="96" y="64" width="68" height="44" fill="#EEEAE0"/>
            <path d="M0 175 Q0 112 90 108 L170 108 Q260 112 260 175 Z" fill="#EEEAE0"/>
            <rect x="0" y="160" width="260" height="480" rx="22" fill="#EEEAE0"/>
            <rect x="0" y="300" width="260" height="210" fill="#1D3326"/>
            <rect x="0" y="300" width="16" height="210" fill="#D7A23C"/>
            <text x="138" y="380" text-anchor="middle" style="${F_DISPLAY};font-weight:900" font-size="62" fill="#EEEAE0">SUNRISE</text>
            <text x="138" y="420" text-anchor="middle" style="${F_SERIF};font-style:italic" font-size="30" fill="#D7A23C">plant tonic</text>
            <rect x="60" y="448" width="156" height="2" fill="#EEEAE0" opacity=".5"/>
            <text x="138" y="480" text-anchor="middle" style="${F_MONO}" font-size="15" fill="#EEEAE0" opacity=".8">1 L · ALL CROPS</text>
            <rect x="16" y="190" width="10" height="400" rx="5" fill="#fff" opacity=".18"/>
          </g>
          ${can(790, 640, 260, 140, packColors(3, true))}
          ${bottle(960, 640, 300, 110, packColors(4))}
          ${bottle(1090, 640, 200, 80, packColors(0, true))}
          <text x="80" y="110" style="${F_MONO}" font-size="18" fill="#EEEAE0" opacity=".75">ONE TYPEFACE · ONE ACCENT · ONE CLAIM</text>
          ${regMark(1100, 90, 20, 'rgba(238,234,224,.6)')}`, 'art-ba');
      }
    },
    web: {
      before() {
        return svg(1200, 750, `
          <rect width="1200" height="750" fill="#C9C9C9"/>
          ${browser(90, 50, 1020, 650, { bg: '#fff', fg: '#333' }, (w, h) => `
            <rect width="${w}" height="${h}" fill="#FFFDE7"/>
            <rect width="${w}" height="70" fill="#1A237E"/>
            <text x="20" y="45" style="${FT};font-weight:700;font-style:italic" font-size="30" fill="#FFEB3B">Sunrise Agro Pvt. Ltd.</text>
            ${['Home', 'About Us', 'Products', 'Gallery', 'Downloads', 'Career', 'Contact Us'].map((t, i) => `<text x="${450 + i * 78}" y="42" style="${FT}" font-size="15" fill="#fff">${t}</text>`).join('')}
            <rect x="0" y="70" width="${w}" height="26" fill="#FFEB3B"/>
            <text x="20" y="89" style="${FC}" font-size="15" fill="#D50000">*** Welcome To Our Website *** Best Agro Products In India *** Call Now ***</text>
            <rect x="30" y="120" width="${w - 60}" height="260" fill="#81C784"/>
            <circle cx="60" cy="250" r="22" fill="#fff" opacity=".8"/><path d="M66 238 L54 250 L66 262" stroke="#333" stroke-width="4" fill="none"/>
            <circle cx="${w - 60}" cy="250" r="22" fill="#fff" opacity=".8"/><path d="M${w - 66} 238 L${w - 54} 250 L${w - 66} 262" stroke="#333" stroke-width="4" fill="none"/>
            <text x="${w / 2}" y="240" text-anchor="middle" style="${FT};font-weight:700" font-size="44" fill="#fff">QUALITY PRODUCTS</text>
            <text x="${w / 2}" y="285" text-anchor="middle" style="${FC}" font-size="22" fill="#FFEB3B">For Better Yield!!!</text>
            ${[0, 1, 2, 3, 4].map(i => `<circle cx="${w / 2 - 40 + i * 20}" cy="360" r="5" fill="${i ? '#fff' : '#D50000'}"/>`).join('')}
            ${['#E53935', '#8E24AA', '#FB8C00'].map((c, i) => `<rect x="${30 + i * 320}" y="400" width="290" height="44" rx="4" fill="${c}"/><text x="${175 + i * 320}" y="428" text-anchor="middle" style="${FT};font-weight:700" font-size="18" fill="#fff">${['CLICK HERE', 'ENQUIRE NOW', 'DOWNLOAD PDF'][i]}</text>`).join('')}
            ${lines(30, 470, [700, 820, 760, 640], 16, '#555', 5, .5)}
            <rect x="${w - 200}" y="${h - 50}" width="170" height="30" fill="#000"/><text x="${w - 115}" y="${h - 30}" text-anchor="middle" style="${F_MONO}" font-size="13" fill="#0F0">Visitors: 004213</text>
          `)}`, 'art-ba');
      },
      after() {
        return svg(1200, 750, `
          <rect width="1200" height="750" fill="#111111"/>
          ${browser(90, 50, 1020, 650, { bg: '#D9CDB6', fg: '#111111' }, (w, h) => `
            <rect width="${w}" height="${h}" fill="#D9CDB6"/>
            <text x="40" y="52" style="${F_DISPLAY};font-weight:900" font-size="24" fill="#13261B">SUNRISE</text>
            ${['Products', 'For farmers', 'Contact'].map((t, i) => `<text x="${w - 420 + i * 120}" y="50" style="${F_DISPLAY};font-weight:600;letter-spacing:.12em" font-size="13" fill="#13261B">${t.toUpperCase()}</text>`).join('')}
            <text x="40" y="200" style="${F_DISPLAY};font-weight:900" font-size="112" fill="#13261B">GROW MORE.</text>
            <text x="40" y="268" style="${F_SERIF};font-style:italic" font-size="64" fill="#2E7D4F">Worry less.</text>
            ${lines(40, 310, [380, 320], 22, '#13261B', 8, .25)}
            <rect x="40" y="380" width="200" height="54" rx="27" fill="#13261B"/>
            <text x="140" y="413" text-anchor="middle" style="${F_DISPLAY};font-weight:700;letter-spacing:.14em" font-size="13" fill="#D9CDB6">FIND YOUR CROP</text>
            ${photo('mountains.jpg', w - 440, 80, 400, 470, '#13261B', .25)}
            ${bottle(w - 300, 520, 330, 130, packColors(1, true))}
            <rect x="40" y="470" width="${w - 520}" height="1" fill="#13261B" opacity=".2"/>
            ${['Cereals', 'Vegetables', 'Fruit', 'Cash crops'].map((t, i) => `${photo(['sacks.jpg', 'fog.jpg', 'flatlay-dark.jpg', 'map-tools.jpg'][i], 40 + i * 130, 490, 118, 70, '#13261B', .15)}<text x="${40 + i * 130}" y="582" style="${F_DISPLAY};font-weight:700;letter-spacing:.08em" font-size="12" fill="#13261B">${t.toUpperCase()}</text>`).join('')}
          `)}`, 'art-ba');
      }
    },
    post: {
      before() {
        const u = 'pg' + (++uid);
        return svg(1200, 750, `
          <defs><linearGradient id="${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7B1FA2"/><stop offset="1" stop-color="#FF4081"/></linearGradient></defs>
          <rect width="1200" height="750" fill="#BDBDBD"/>
          <rect x="300" y="35" width="600" height="680" fill="url(#${u})"/>
          <text x="600" y="120" text-anchor="middle" style="${FC};font-weight:700" font-size="44" fill="#FFEB3B">MEGA OFFER!!!</text>
          <text x="600" y="170" text-anchor="middle" style="${FT};font-weight:700" font-size="30" fill="#fff">Sunrise Agro Super Grow+++</text>
          ${star(780, 300, 80, 12, '#FFEB3B')}<text x="780" y="312" text-anchor="middle" style="${FC};font-weight:700" font-size="30" fill="#D50000">50% OFF</text>
          <rect x="360" y="230" width="160" height="240" rx="16" fill="#eee"/><rect x="360" y="300" width="160" height="110" fill="#43A047"/>
          ${['✓ Best Quality', '✓ Fast Result', '✓ All Crops', '✓ Trusted Brand', 'Call: 98XXXXXXXX'].map((t, i) => `<text x="600" y="${520 + i * 34}" text-anchor="middle" style="${FC}" font-size="24" fill="${['#fff', '#FFEB3B', '#B2FF59', '#fff', '#FFEB3B'][i]}">${t}</text>`).join('')}
        `, 'art-ba');
      },
      after() {
        return svg(1200, 750, `
          <rect width="1200" height="750" fill="#111111"/>
          <rect x="300" y="35" width="600" height="680" fill="#D9CDB6"/>
          ${photo('mountains.jpg', 300, 35, 600, 420, '#13261B', .3)}
          <rect x="300" y="395" width="600" height="60" fill="#13261B" opacity=".55"/>
          ${bottle(540, 440, 330, 120, packColors(1, true))}
          ${photo('sacks.jpg', 160, 140, 110, 140, '', 0)}${photo('fog.jpg', 160, 300, 110, 140, '#13261B', .2)}${photo('flatlay-dark.jpg', 930, 140, 110, 140, '', 0)}${photo('mountains.jpg', 930, 300, 110, 140, '#13261B', .25)}
          <text x="160" y="470" style="${F_MONO}" font-size="12" fill="#D9CDB6" opacity=".6">SAME GRID</text><text x="930" y="470" style="${F_MONO}" font-size="12" fill="#D9CDB6" opacity=".6">EVERY POST</text>
          <text x="340" y="530" style="${F_DISPLAY};font-weight:900" font-size="64" fill="#13261B">RISE EARLY.</text>
          <text x="340" y="590" style="${F_SERIF};font-style:italic" font-size="44" fill="#2E7D4F">Harvest proud.</text>
          <text x="340" y="680" style="${F_MONO}" font-size="16" fill="#13261B" opacity=".6">@sunrise · plant tonic, 1 L</text>
        `, 'art-ba');
      }
    }
  };

  window.art = { covers, site, feed, hero, reel, portrait, single, regMark, cropMarks, svg, ba };
})();

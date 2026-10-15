/* Varient Designs — full-length website previews for the case studies.
   Each project gets a desktop page (1200 wide) and a phone page (390 wide),
   drawn as SVG and scrolled inside a browser / phone frame. Replace a page
   with a real screenshot <img> when one is available. */
(function () {
  const D = "font-family:'Archivo','Arial Narrow',sans-serif;font-stretch:72%";
  const DW = "font-family:'Archivo',Arial,sans-serif;font-stretch:100%";
  const S = "font-family:'Gloock',Georgia,serif";
  const SI = "font-family:Georgia,'Times New Roman',serif;font-style:italic";
  const M = "font-family:'Space Mono',ui-monospace,monospace";
  let uid = 0;
  const page = (w, h, inner) => `<svg class="wp-svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMin meet" aria-hidden="true" focusable="false">${inner}</svg>`;
  const T = (x, y, s, size, fill, txt, extra = '') => `<text x="${x}" y="${y}" style="${s}" font-size="${size}" fill="${fill}" ${extra}>${txt}</text>`;
  const bars = (x, y, ws, gap, c, t = 7, op = .3) => ws.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="${t}" rx="${t / 2}" fill="${c}" opacity="${op}"/>`).join('');
  const pill = (x, y, w, h, fill, txt, tc, size = 14) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>${T(x + w / 2, y + h / 2 + size * .36, DW + ';font-weight:700;letter-spacing:.08em', size, tc, txt, 'text-anchor="middle"')}`;
  const ghostPill = (x, y, w, h, c, txt, size = 14) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="none" stroke="${c}" stroke-opacity=".5"/>${T(x + w / 2, y + h / 2 + size * .36, DW + ';font-weight:700;letter-spacing:.08em', size, c, txt, 'text-anchor="middle"')}`;
  const ph = (f, x, y, w, h, tint, op = 0, pos = 'xMidYMid') => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" overflow="hidden"><image href="assets/img/${f}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="${pos} slice"/>${tint ? `<rect width="${w}" height="${h}" fill="${tint}" opacity="${op}"/>` : ''}</svg>`;
  const packC = (i, light) => { const R = ['#3E8E5A', '#D7A23C', '#C2552F', '#2F8C8C', '#7A4A8C', '#3D7FC4']; return { body: light ? '#EEEAE0' : '#1D3326', cap: R[i % 6], code: R[i % 6], label: light ? '#1D3326' : '#EEEAE0', ink: light ? '#EEEAE0' : '#1D3326' }; };
  const packSvg = (kind, i, light, x, y, w, h) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 200 300" overflow="visible">${PK[kind](i, light)}</svg>`;
  // small pack primitives (200 × 300 box, baseline 290)
  const lab = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c.label}"/><rect x="${x}" y="${y}" width="${w * .08}" height="${h}" fill="${c.code}"/><circle cx="${x + w / 2}" cy="${y + h * .38}" r="${Math.min(w, h) * .14}" fill="none" stroke="${c.ink}" stroke-width="2"/><rect x="${x + w * .2}" y="${y + h * .68}" width="${w * .6}" height="5" fill="${c.ink}"/><rect x="${x + w * .28}" y="${y + h * .82}" width="${w * .44}" height="3" fill="${c.code}"/>`;
  const PK = {
    bottle: (i, l) => { const c = packC(i, l); return `<rect x="78" y="20" width="44" height="18" rx="4" fill="${c.cap}"/><rect x="84" y="36" width="32" height="24" fill="${c.body}"/><rect x="45" y="58" width="110" height="232" rx="16" fill="${c.body}"/>${lab(45, 130, 110, 100, c)}`; },
    pouch: (i, l) => { const c = packC(i, l); return `<path d="M40 290 L160 290 L154 60 L46 60 Z" fill="${c.body}"/><rect x="46" y="40" width="108" height="24" fill="${c.body}"/>${lab(58, 120, 84, 110, c)}`; },
    carton: (i, l) => { const c = packC(i, l); return `<polygon points="150,110 172,96 172,276 150,290" fill="${c.body}" style="filter:brightness(.72)"/><polygon points="50,110 72,96 172,96 150,110" fill="${c.body}" style="filter:brightness(1.2)"/><rect x="50" y="110" width="100" height="180" fill="${c.body}"/>${lab(60, 150, 80, 100, c)}`; },
    can: (i, l) => { const c = packC(i, l); return `<rect x="48" y="80" width="104" height="204" fill="${c.body}"/><ellipse cx="100" cy="284" rx="52" ry="10" fill="${c.body}" style="filter:brightness(.8)"/><rect x="50" y="66" width="100" height="20" fill="${c.cap}"/><ellipse cx="100" cy="66" rx="48" ry="9" fill="${c.cap}" style="filter:brightness(1.2)"/>${lab(48, 140, 104, 100, c)}`; }
  };
  const nav = (w, bg, fg, logo, items, cta, accent) => `<rect width="${w}" height="84" fill="${bg}"/>${logo}${items.map((t, i) => T(w - 560 + i * 104, 48, DW + ';font-weight:600;letter-spacing:.06em', 13, fg, t)).join('')}${pill(w - 170, 24, 130, 38, accent, cta, bg, 12)}<rect y="83" width="${w}" height="1" fill="${fg}" opacity=".12"/>`;
  const mnav = (bg, fg, logo) => `<rect width="390" height="64" fill="${bg}"/>${logo}<rect x="334" y="26" width="30" height="3" fill="${fg}"/><rect x="342" y="36" width="22" height="3" fill="${fg}"/><rect y="63" width="390" height="1" fill="${fg}" opacity=".12"/>`;
  const footer = (w, y, bg, fg, name, cols) => `<rect y="${y}" width="${w}" height="260" fill="${bg}"/>${T(60, y + 80, D + ';font-weight:900;letter-spacing:.02em', 34, fg, name.toUpperCase())}${cols.map((c, i) => T(w - 620 + i * 190, y + 70, DW + ';font-weight:700;letter-spacing:.14em', 11, fg, c, 'opacity=".6"') + bars(w - 620 + i * 190, y + 96, [110, 86, 98, 70], 24, fg, 6, .3)).join('')}<rect x="60" y="${y + 200}" width="${w - 120}" height="1" fill="${fg}" opacity=".15"/>${bars(60, y + 224, [180], 0, fg, 6, .3)}`;
  const mfooter = (y, bg, fg, name) => `<rect y="${y}" width="390" height="220" fill="${bg}"/>${T(24, y + 60, D + ';font-weight:900', 28, fg, name.toUpperCase())}${bars(24, y + 90, [120, 90, 140, 100, 80], 22, fg, 6, .3)}`;

  /* ---------------- GLOBRIDDGE ---------------- */
  const glob = {
    d() {
      const W = 1200, bg = '#F2EBDD', ink = '#2A2117', gold = '#D9A441', brown = '#9C6B1E';
      const dots = (x, y, cols, rows, gap, op = 1) => Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, k) => { const v = Math.sin(r * 1.3 + k * .7) + Math.cos(k * .4 - r * .9); return v > -.2 ? `<circle cx="${x + k * gap}" cy="${y + r * gap}" r="${(v + 1.4) * 1.9}" fill="${gold}" opacity="${(.35 + (v + 1) * .2) * op}"/>` : ''; }).join('')).join('');
      const items = ['Rice', 'Sugar', 'Pulses', 'Spices', 'Oilseeds', 'Grains'];
      return page(W, 3200, `
        <rect width="${W}" height="3200" fill="${bg}"/>
        ${nav(W, bg, ink, T(60, 52, D + ';font-weight:900;letter-spacing:.06em', 24, ink, 'GLOBRIDDGE'), ['About', 'Commodities', 'Process', 'Contact'], 'GET A QUOTE', ink)}
        ${T(60, 210, M, 13, brown, 'INTERNATIONAL AGRI-COMMODITY TRADE')}
        ${T(60, 310, D + ';font-weight:900', 104, ink, 'AGRI COMMODITIES')}
        ${T(60, 384, SI, 62, brown, 'sourced, verified, shipped.')}
        ${bars(60, 430, [470, 420, 330], 22, ink, 8, .25)}
        ${pill(60, 520, 190, 50, gold, 'REQUEST A QUOTE', ink, 13)}${ghostPill(266, 520, 170, 50, ink, 'OUR PROCESS', 13)}
        ${ph('sacks.jpg', 690, 150, 450, 440, ink, .2)}<rect x="690" y="470" width="450" height="120" fill="${ink}" opacity=".85"/>${dots(712, 492, 19, 4, 22.5)}
        <rect x="0" y="660" width="${W}" height="130" fill="${ink}"/>
        ${['Origins', 'Verified suppliers', 'Destinations', 'Compliance'].map((t, i) => T(60 + i * 280, 718, DW + ';font-weight:800', 26, bg, t) + bars(60 + i * 280, 744, [150], 0, gold, 6, .7)).join('')}
        ${T(60, 900, M, 13, brown, '( WHAT WE TRADE )')}
        ${T(60, 966, D + ';font-weight:900', 58, ink, 'COMMODITIES')}
        ${items.map((t, i) => { const x = 60 + (i % 3) * 366, y = 1010 + Math.floor(i / 3) * 300; return `<rect x="${x}" y="${y}" width="344" height="276" rx="10" fill="#fff" opacity=".7"/>${ph(['sacks.jpg', 'flatlay-dark.jpg', 'sacks.jpg', 'map-tools.jpg', 'mountains.jpg', 'fog.jpg'][i], x, y, 344, 150, i % 2 ? ink : '', .25, ['xMinYMid', 'xMidYMid', 'xMaxYMid', 'xMidYMid', 'xMidYMax', 'xMidYMid'][i])}${T(x + 24, y + 196, DW + ';font-weight:800', 26, ink, t)}${bars(x + 24, y + 216, [220, 160], 18, ink, 6, .25)}`; }).join('')}
        <rect y="1660" width="${W}" height="520" fill="${ink}"/>
        ${T(60, 1750, M, 13, gold, '( HOW IT WORKS )')}
        ${T(60, 1820, D + ';font-weight:900', 62, bg, 'SOURCE. VERIFY. SHIP.')}
        ${['Source', 'Verify', 'Ship'].map((t, i) => `<g transform="translate(${60 + i * 366} 1880)"><rect width="344" height="230" rx="10" fill="${bg}" opacity=".06"/><circle cx="44" cy="52" r="22" fill="${gold}"/>${T(44, 59, DW + ';font-weight:800', 18, ink, '0' + (i + 1), 'text-anchor="middle"')}${T(28, 124, DW + ';font-weight:800', 30, bg, t)}${bars(28, 150, [260, 230, 180], 18, bg, 6, .3)}</g>`).join('')}
        ${T(60, 2290, M, 13, brown, '( WHERE WE SHIP )')}
        ${T(60, 2350, D + ';font-weight:900', 58, ink, 'ONE DESK, MANY PORTS')}
        ${ph('map-tools.jpg', 60, 2390, W - 120, 300, ink, .55)}${dots(90, 2420, 48, 12, 22.5, .55)}
        <rect x="60" y="2730" width="${W - 120}" height="170" rx="10" fill="${gold}"/>
        ${T(100, 2810, D + ';font-weight:900', 46, ink, 'NEED A RELIABLE SUPPLY?')}${bars(100, 2836, [380], 0, ink, 7, .35)}
        ${pill(W - 320, 2790, 220, 54, ink, 'TALK TO OUR DESK', bg, 13)}
        ${footer(W, 2940, ink, bg, 'Globriddge', ['COMPANY', 'TRADE', 'CONTACT'])}`);
    },
    m() {
      const bg = '#F2EBDD', ink = '#2A2117', gold = '#D9A441', brown = '#9C6B1E';
      const dots = (x, y, cols, rows, gap) => Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, k) => { const v = Math.sin(r * 1.3 + k * .7) + Math.cos(k * .4 - r * .9); return v > -.2 ? `<circle cx="${x + k * gap}" cy="${y + r * gap}" r="${(v + 1.4) * 1.4}" fill="${gold}" opacity="${.35 + (v + 1) * .2}"/>` : ''; }).join('')).join('');
      return page(390, 2000, `<rect width="390" height="2000" fill="${bg}"/>
        ${mnav(bg, ink, T(24, 41, D + ';font-weight:900;letter-spacing:.06em', 20, ink, 'GLOBRIDDGE'))}
        ${T(24, 130, M, 10, brown, 'AGRI-COMMODITY TRADE')}
        ${T(24, 190, D + ';font-weight:900', 50, ink, 'AGRI')}${T(24, 240, D + ';font-weight:900', 50, ink, 'COMMODITIES')}
        ${T(24, 284, SI, 30, brown, 'sourced, verified,')}${T(24, 318, SI, 30, brown, 'shipped.')}
        ${bars(24, 346, [300, 260], 18, ink, 6, .25)}${pill(24, 396, 180, 46, gold, 'GET A QUOTE', ink, 12)}
        ${ph('sacks.jpg', 24, 470, 342, 260, ink, .15)}
        <rect y="770" width="390" height="250" fill="${ink}"/>${['Origins', 'Verified suppliers', 'Destinations', 'Compliance'].map((t, i) => T(24, 822 + i * 52, DW + ';font-weight:800', 20, bg, t) + bars(24, 834 + i * 52, [120], 0, gold, 5, .7)).join('')}
        ${T(24, 1080, D + ';font-weight:900', 36, ink, 'COMMODITIES')}
        ${['Rice', 'Sugar', 'Pulses', 'Spices'].map((t, i) => { const x = 24 + (i % 2) * 175, y = 1104 + Math.floor(i / 2) * 200; return `<rect x="${x}" y="${y}" width="167" height="186" rx="8" fill="#fff" opacity=".7"/>${ph(['sacks.jpg', 'flatlay-dark.jpg', 'map-tools.jpg', 'mountains.jpg'][i], x, y, 167, 100)}${T(x + 14, y + 136, DW + ';font-weight:800', 18, ink, t)}${bars(x + 14, y + 150, [110, 80], 14, ink, 5, .25)}`; }).join('')}
        <rect x="24" y="1530" width="342" height="190" rx="10" fill="${gold}"/>${T(44, 1590, D + ';font-weight:900', 28, ink, 'NEED A RELIABLE')}${T(44, 1624, D + ';font-weight:900', 28, ink, 'SUPPLY?')}${pill(44, 1650, 200, 44, ink, 'TALK TO OUR DESK', bg, 11)}
        ${mfooter(1780, ink, bg, 'Globriddge')}`);
    }
  };

  /* ---------------- GOOD GARDEN ---------------- */
  const leaf = (cx, cy, r, c) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" opacity=".2"/><path d="M${cx - r * .5} ${cy + r * .5} Q${cx - r * .6} ${cy - r * .6} ${cx + r * .5} ${cy - r * .5} Q${cx + r * .6} ${cy + r * .5} ${cx - r * .5} ${cy + r * .5} Z" fill="${c}"/>`;
  const gg = {
    d() {
      const W = 1200, bg = '#F4F1E8', ink = '#12302A', g1 = '#3E8E5A', or = '#C66B3D', g2 = '#6FBF73';
      const prod = (x, y, i) => { const kinds = ['pouch', 'bottle', 'can', 'carton']; return `<rect x="${x}" y="${y}" width="255" height="350" rx="12" fill="#fff"/><rect x="${x + 14}" y="${y + 14}" width="227" height="200" rx="8" fill="${[g1, or, g2, ink][i % 4]}" opacity=".1"/>${packSvg(kinds[i % 4], i, i % 2 === 1, x + 60, y + 20, 135, 200)}${T(x + 18, y + 248, DW + ';font-weight:700', 18, ink, ['Soil Booster', 'Bloom Feed', 'Root Starter', 'Leaf Tonic', 'Seaweed Mix', 'Micro Pack', 'Fruit Set', 'Calcium Plus'][i])}${bars(x + 18, y + 266, [150], 0, ink, 6, .25)}${T(x + 18, y + 318, DW + ';font-weight:800', 18, ink, '₹ ———')}<rect x="${x + 175}" y="${y + 296}" width="62" height="34" rx="17" fill="${ink}"/>${T(x + 206, y + 318, DW + ';font-weight:800', 18, bg, '+', 'text-anchor="middle"')}`; };
      return page(W, 3300, `<rect width="${W}" height="3300" fill="${bg}"/>
        <rect width="${W}" height="34" fill="${ink}"/>${T(W / 2, 22, M, 11, bg, 'FREE DELIVERY ON ORDERS ABOVE A SET AMOUNT', 'text-anchor="middle"')}
        <g transform="translate(0 34)">${nav(W, bg, ink, T(60, 54, SI, 30, ink, 'Good Garden'), ['Shop', 'By plant', 'Guides', 'About'], 'CART · 0', ink)}</g>
        ${ph('fog.jpg', 40, 150, W - 80, 560, ink, .62)}
        ${T(100, 270, M, 13, g2, 'PLANT NUTRITION, EXPLAINED')}
        ${T(100, 370, D + ';font-weight:900', 104, bg, 'FEED THE')}${T(100, 470, D + ';font-weight:900', 104, bg, 'SOIL.')}
        ${bars(100, 510, [400, 340], 22, bg, 8, .35)}${pill(100, 590, 180, 52, g2, 'SHOP NOW', ink, 13)}${ghostPill(296, 590, 220, 52, bg, 'FIND YOUR NUTRIENT', 13)}
        ${leaf(860, 400, 200, g1)}${packSvg('pouch', 0, true, 760, 230, 260, 400)}
        ${['All', 'Vegetables', 'Flowers', 'Fruit trees', 'Lawns', 'Indoor'].map((t, i) => (i ? ghostPill(60 + i * 150, 760, 136, 42, ink, t.toUpperCase(), 11) : pill(60, 760, 136, 42, ink, 'ALL', bg, 11))).join('')}
        ${T(60, 880, D + ';font-weight:900', 52, ink, 'BESTSELLERS')}
        ${[0, 1, 2, 3].map(i => prod(60 + i * 275, 910, i)).join('')}
        ${[4, 5, 6, 7].map(i => prod(60 + (i - 4) * 275, 1290, i)).join('')}
        <rect y="1710" width="${W}" height="520" fill="${g1}" opacity=".14"/>
        ${T(60, 1800, M, 13, g1, '( NOT SURE WHAT YOUR SOIL NEEDS? )')}
        ${T(60, 1870, D + ';font-weight:900', 62, ink, 'THREE QUESTIONS. ONE PLAN.')}
        ${['What are you growing?', 'How does it look?', 'Indoor or outdoor?'].map((t, i) => `<g transform="translate(${60 + i * 366} 1920)"><rect width="344" height="250" rx="14" fill="#fff"/>${leaf(60, 64, 30, [g1, or, g2][i])}${T(28, 150, DW + ';font-weight:800', 24, ink, t)}${bars(28, 176, [250, 190], 18, ink, 6, .25)}</g>`).join('')}
        ${T(60, 2190, D + ';font-weight:900', 52, ink, 'FROM THE GROWERS')}
        ${[0, 1, 2].map(i => `<g transform="translate(${60 + i * 366} 2390)"><rect width="344" height="230" rx="14" fill="#fff"/>${ph(['mountains.jpg', 'fog.jpg', 'notebook.jpg'][i], 0, -150, 344, 140)}${T(28, 64, DW, 26, or, '★★★★★')}${bars(28, 96, [280, 260, 220, 160], 20, ink, 6, .25)}<circle cx="44" cy="196" r="16" fill="${ink}" opacity=".15"/>${bars(70, 192, [110], 0, ink, 6, .35)}</g>`).join('')}
        <rect x="60" y="2660" width="${W - 120}" height="230" rx="18" fill="${ink}"/>
        ${T(110, 2750, D + ';font-weight:900', 46, bg, 'GROWING TIPS, MONTHLY')}${bars(110, 2780, [360], 0, bg, 7, .35)}
        <rect x="${W - 560}" y="2740" width="300" height="56" rx="28" fill="${bg}" opacity=".12"/>${pill(W - 248, 2740, 140, 56, g2, 'JOIN', ink, 13)}
        ${footer(W, 3000, ink, bg, 'Good Garden', ['SHOP', 'HELP', 'ABOUT'])}`);
    },
    m() {
      const bg = '#F4F1E8', ink = '#12302A', g1 = '#3E8E5A', or = '#C66B3D', g2 = '#6FBF73';
      return page(390, 2050, `<rect width="390" height="2050" fill="${bg}"/>
        ${mnav(bg, ink, T(24, 42, SI, 24, ink, 'Good Garden'))}
        ${ph('fog.jpg', 16, 80, 358, 520, ink, .6)}
        ${T(40, 140, M, 10, g2, 'PLANT NUTRITION')}${T(40, 200, D + ';font-weight:900', 54, bg, 'FEED THE')}${T(40, 252, D + ';font-weight:900', 54, bg, 'SOIL.')}
        ${leaf(250, 430, 110, g1)}${packSvg('pouch', 0, true, 150, 290, 190, 290)}${pill(40, 520, 150, 46, g2, 'SHOP NOW', ink, 12)}
        ${T(24, 660, D + ';font-weight:900', 32, ink, 'BESTSELLERS')}
        ${[0, 1, 2, 3].map(i => { const x = 16 + (i % 2) * 183, y = 684 + Math.floor(i / 2) * 290; const k = ['pouch', 'bottle', 'can', 'carton'][i]; return `<rect x="${x}" y="${y}" width="175" height="276" rx="12" fill="#fff"/><rect x="${x + 10}" y="${y + 10}" width="155" height="150" rx="8" fill="${[g1, or, g2, ink][i]}" opacity=".1"/>${packSvg(k, i, i % 2 === 1, x + 40, y + 14, 95, 142)}${T(x + 14, y + 190, DW + ';font-weight:700', 15, ink, ['Soil Booster', 'Bloom Feed', 'Root Starter', 'Leaf Tonic'][i])}${bars(x + 14, y + 204, [110], 0, ink, 5, .25)}<rect x="${x + 115}" y="${y + 228}" width="46" height="30" rx="15" fill="${ink}"/>`; }).join('')}
        <rect y="1290" width="390" height="430" fill="${g1}" opacity=".14"/>${T(24, 1350, D + ';font-weight:900', 30, ink, 'THREE QUESTIONS.')}${T(24, 1384, D + ';font-weight:900', 30, ink, 'ONE PLAN.')}
        ${[0, 1, 2].map(i => `<rect x="24" y="${1410 + i * 92}" width="342" height="80" rx="12" fill="#fff"/>${leaf(60, 1450 + i * 92, 18, [g1, or, g2][i])}${bars(96, 1442 + i * 92, [200, 140], 16, ink, 6, .3)}`).join('')}
        ${mfooter(1830, ink, bg, 'Good Garden')}`);
    }
  };

  /* ---------------- SAPAR ARTS ---------------- */
  const sap = {
    arch(x, y, w, h, i, u) {
      const c = ['#6B1E1E', '#3B2A55', '#1E4A4A', '#5A3A1A', '#2A3B55', '#4A1E3B'][i % 6];
      return `<defs><linearGradient id="${u}a${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9A35C"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><path d="M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z" fill="url(#${u}a${i})"/><path d="M${x + 12} ${y + h - 12} V${y + w / 2} A${w / 2 - 12} ${w / 2 - 12} 0 0 1 ${x + w - 12} ${y + w / 2} V${y + h - 12} Z" fill="none" stroke="#E9D9B8" stroke-opacity=".45"/><circle cx="${x + w / 2}" cy="${y + w * .62}" r="${w * .13}" fill="#E9D9B8" opacity=".85"/>`;
    },
    d() {
      const W = 1200, bg = '#170C0C', cr = '#E9D9B8', gold = '#C9A35C', u = 'sp' + (++uid);
      return page(W, 3200, `<rect width="${W}" height="3200" fill="${bg}"/>
        <rect width="${W}" height="84" fill="${bg}"/>${T(W / 2, 56, SI, 34, cr, 'Sapar Arts', 'text-anchor="middle"')}${['Collection', 'Artists'].map((t, i) => T(60 + i * 120, 50, DW + ';font-weight:600;letter-spacing:.12em', 12, cr, t.toUpperCase(), 'opacity=".7"')).join('')}${['Visit', 'Enquire'].map((t, i) => T(W - 200 + i * 90, 50, DW + ';font-weight:600;letter-spacing:.12em', 12, cr, t.toUpperCase(), 'opacity=".7"')).join('')}
        <line x1="${W / 2 - 60}" y1="96" x2="${W / 2 + 60}" y2="96" stroke="${gold}"/>
        ${T(W / 2, 200, M, 13, gold, 'A DEVOTIONAL ART GALLERY', 'text-anchor="middle"')}
        ${T(W / 2, 290, SI, 76, cr, 'Look slowly.', 'text-anchor="middle"')}
        ${bars(W / 2 - 220, 330, [440], 0, cr, 6, .25)}
        ${sap.arch(160, 400, 260, 480, 0, u)}${sap.arch(470, 370, 260, 510, 1, u)}${sap.arch(780, 400, 260, 480, 2, u)}
        ${ghostPill(W / 2 - 110, 940, 220, 50, cr, 'ENTER THE GALLERY', 12)}
        <line x1="60" y1="1080" x2="${W - 60}" y2="1080" stroke="${cr}" stroke-opacity=".15"/>
        ${T(60, 1170, M, 13, gold, '( THE COLLECTION )')}${T(60, 1240, SI, 58, cr, 'Works on view')}
        ${[0, 1, 2, 3, 4, 5].map(i => { const x = 60 + (i % 3) * 366, y = 1290 + Math.floor(i / 3) * 560; return `<rect x="${x}" y="${y}" width="344" height="440" fill="#0E0707"/>${sap.arch(x + 62, y + 40, 220, 380, i + 3, u)}${T(x, y + 480, SI, 24, cr, ['Morning Prayer', 'The Lamp', 'Still Water', 'Saffron', 'Evening Bell', 'The Gate'][i])}${bars(x, y + 500, [160], 0, cr, 5, .3)}`; }).join('')}
        ${ph('pencils.jpg', 0, 2440, W, 420, '#2A1313', .82)}
        ${T(W / 2, 2580, SI, 52, cr, 'The work is loud.', 'text-anchor="middle"')}${T(W / 2, 2644, SI, 52, gold, 'The gallery stays quiet.', 'text-anchor="middle"')}
        ${ghostPill(W / 2 - 100, 2710, 200, 50, cr, 'PLAN A VISIT', 12)}
        ${footer(W, 2940, '#0E0707', cr, 'Sapar Arts', ['GALLERY', 'VISIT', 'CONTACT'])}`);
    },
    m() {
      const bg = '#170C0C', cr = '#E9D9B8', gold = '#C9A35C', u = 'spm' + (++uid);
      return page(390, 2000, `<rect width="390" height="2000" fill="${bg}"/>
        <rect width="390" height="64" fill="${bg}"/>${T(195, 42, SI, 24, cr, 'Sapar Arts', 'text-anchor="middle"')}<rect x="334" y="28" width="30" height="2" fill="${cr}"/><rect x="334" y="36" width="30" height="2" fill="${cr}"/>
        ${T(195, 130, M, 10, gold, 'A DEVOTIONAL ART GALLERY', 'text-anchor="middle"')}${T(195, 190, SI, 46, cr, 'Look slowly.', 'text-anchor="middle"')}
        ${sap.arch(90, 230, 210, 390, 1, u)}${ghostPill(105, 660, 180, 44, cr, 'ENTER', 11)}
        ${T(24, 790, SI, 32, cr, 'Works on view')}
        ${[0, 1, 2, 3].map(i => { const x = 16 + (i % 2) * 183, y = 820 + Math.floor(i / 2) * 330; return `<rect x="${x}" y="${y}" width="175" height="260" fill="#0E0707"/>${sap.arch(x + 30, y + 20, 115, 220, i + 3, u)}${T(x, y + 290, SI, 16, cr, ['Morning Prayer', 'The Lamp', 'Still Water', 'Saffron'][i])}`; }).join('')}
        <rect y="1490" width="390" height="300" fill="#2A1313"/>${T(195, 1600, SI, 28, cr, 'The work is loud.', 'text-anchor="middle"')}${T(195, 1640, SI, 28, gold, 'The gallery stays quiet.', 'text-anchor="middle"')}
        ${mfooter(1790, '#0E0707', cr, 'Sapar Arts')}`);
    }
  };

  /* ---------------- AUTOMARC ---------------- */
  const am = {
    radar(cx, cy, s, ink, or) { return `<g transform="translate(${cx} ${cy}) scale(${s})" fill="none" stroke="${ink}" stroke-opacity=".45">${[230, 180, 130, 80].map(r => `<circle r="${r}"/>`).join('')}${Array.from({ length: 24 }, (_, i) => { const a = i * Math.PI / 12; return `<line x1="${Math.cos(a) * 80}" y1="${Math.sin(a) * 80}" x2="${Math.cos(a) * 230}" y2="${Math.sin(a) * 230}"/>`; }).join('')}</g><circle cx="${cx}" cy="${cy}" r="${30 * s}" fill="${or}"/>`; },
    d() {
      const W = 1200, bg = '#E9ECF1', ink = '#121A2A', or = '#E8743B';
      return page(W, 3100, `<rect width="${W}" height="3100" fill="${bg}"/>
        ${nav(W, bg, ink, T(60, 54, D + ';font-weight:900;letter-spacing:.02em', 30, ink, 'AUTOMARC'), ['Services', 'Process', 'Work', 'About'], 'CONTACT', or)}
        ${am.radar(900, 420, 1.05, ink, or)}
        ${T(60, 330, D + ';font-weight:900', 150, ink, 'AUTOMARC')}<rect x="60" y="360" width="140" height="10" fill="${or}"/>
        ${bars(60, 420, [430, 390, 300], 24, ink, 8, .28)}${pill(60, 530, 190, 52, ink, 'TALK TO US', bg, 13)}${ghostPill(266, 530, 170, 52, ink, 'SERVICES', 13)}
        ${T(60, 760, M, 13, or, '( WHAT WE DO )')}
        ${[0, 1, 2].map(i => `<g transform="translate(${60 + i * 366} 790)"><rect width="344" height="300" fill="#fff"/><rect x="28" y="30" width="44" height="44" fill="${i === 1 ? or : ink}"/>${T(28, 140, D + ';font-weight:900', 34, ink, ['ENGINEERING', 'AUTOMATION', 'SUPPORT'][i])}${bars(28, 168, [260, 240, 200, 150], 20, ink, 6, .25)}${T(28, 270, DW + ';font-weight:700;letter-spacing:.1em', 12, or, 'LEARN MORE →')}</g>`).join('')}
        ${ph('code.jpg', 0, 1170, W, 560, ink, .86)}
        ${T(60, 1270, M, 13, or, '( THE PROCESS )')}${T(60, 1350, D + ';font-weight:900', 70, bg, 'PRECISE. ENGINEERED. CALM.')}
        ${[0, 1, 2, 3].map(i => `<g transform="translate(${60 + i * 275} 1420)"><rect width="255" height="230" fill="${bg}" opacity=".05"/>${T(24, 60, D + ';font-weight:900', 54, i === 0 ? or : bg, '0' + (i + 1))}${bars(24, 110, [190, 170, 120], 20, bg, 6, .3)}</g>`).join('')}
        ${T(60, 1830, M, 13, or, '( SELECTED PROJECTS )')}${T(60, 1900, D + ';font-weight:900', 60, ink, 'BUILT TO SPEC')}
        ${[0, 1, 2, 3].map(i => { const x = 60 + (i % 2) * 550, y = 1940 + Math.floor(i / 2) * 400; return `${ph(['desk-dark.jpg', 'laptop-white.jpg', 'desk-white.jpg', 'code.jpg'][i], x, y, 530, 300, i % 3 ? '' : ink, .25)}<rect x="${x + 20}" y="${y + 20}" width="70" height="8" fill="${or}"/>${T(x, y + 340, DW + ';font-weight:800', 22, ink, 'Project ' + (i + 1))}${bars(x, y + 358, [220], 0, ink, 6, .25)}`; }).join('')}
        <rect x="60" y="2730" width="${W - 120}" height="120" fill="${or}"/>${T(100, 2805, D + ';font-weight:900', 44, ink, 'READY WHEN YOU ARE.')}${pill(W - 300, 2763, 200, 54, ink, 'TALK TO US', bg, 13)}
        ${footer(W, 2860, ink, bg, 'Automarc', ['SERVICES', 'COMPANY', 'CONTACT'])}`);
    },
    m() {
      const bg = '#E9ECF1', ink = '#121A2A', or = '#E8743B';
      return page(390, 1950, `<rect width="390" height="1950" fill="${bg}"/>
        ${mnav(bg, ink, T(24, 42, D + ';font-weight:900', 24, ink, 'AUTOMARC'))}
        ${am.radar(195, 260, .62, ink, or)}
        ${T(24, 480, D + ';font-weight:900', 66, ink, 'AUTOMARC')}<rect x="24" y="496" width="90" height="7" fill="${or}"/>
        ${bars(24, 530, [310, 270], 18, ink, 6, .28)}${pill(24, 580, 170, 46, ink, 'TALK TO US', bg, 12)}
        ${[0, 1, 2].map(i => `<rect x="24" y="${670 + i * 150}" width="342" height="134" fill="#fff"/><rect x="44" y="${690 + i * 150}" width="30" height="30" fill="${i === 1 ? or : ink}"/>${T(44, 760 + i * 150, D + ';font-weight:900', 24, ink, ['ENGINEERING', 'AUTOMATION', 'SUPPORT'][i])}${bars(44, 774 + i * 150, [220], 0, ink, 5, .25)}`).join('')}
        ${ph('code.jpg', 0, 1140, 390, 420, ink, .86)}${T(24, 1210, D + ';font-weight:900', 34, bg, 'PRECISE.')}${T(24, 1248, D + ';font-weight:900', 34, bg, 'ENGINEERED. CALM.')}
        ${[0, 1, 2, 3].map(i => T(24 + (i % 2) * 180, 1330 + Math.floor(i / 2) * 110, D + ';font-weight:900', 40, i === 0 ? or : bg, '0' + (i + 1)) + bars(24 + (i % 2) * 180, 1350 + Math.floor(i / 2) * 110, [130, 100], 16, bg, 5, .3)).join('')}
        <rect x="24" y="1590" width="342" height="110" fill="${or}"/>${T(44, 1658, D + ';font-weight:900', 28, ink, 'READY WHEN YOU ARE.')}
        ${mfooter(1730, ink, bg, 'Automarc')}`);
    }
  };

  /* ---------------- NUTRIPLEKS (pack range catalogue) ---------------- */
  const nx = {
    d() {
      const W = 1200, bg = '#EEEAE0', ink = '#13261B', R = ['#3E8E5A', '#D7A23C', '#C2552F', '#2F8C8C', '#7A4A8C', '#3D7FC4'];
      const row = (y, kind, title, n) => `${T(60, y, M, 13, '#3E8E5A', '( ' + title.toUpperCase() + ' )')}<rect x="60" y="${y + 20}" width="${W - 120}" height="330" fill="#fff"/>${Array.from({ length: n }, (_, i) => packSvg(kind, i + (kind.length), i % 2 === 1, 90 + i * (1020 / n), y + 40, 1020 / n - 30, 290)).join('')}<rect x="60" y="${y + 330}" width="${W - 120}" height="20" fill="${ink}" opacity=".08"/>`;
      return page(W, 3300, `<rect width="${W}" height="3300" fill="${bg}"/>
        ${nav(W, bg, ink, T(60, 54, D + ';font-weight:900;letter-spacing:.04em', 28, ink, 'NUTRIPLEKS'), ['Products', 'Crops', 'Dealers', 'About'], 'FIND A DEALER', ink)}
        ${ph('sacks.jpg', 0, 84, W, 620, ink, .82)}
        ${T(60, 210, M, 13, '#6FBF73', 'PLANT-GROWTH REGULATORS · MICRONUTRIENTS')}
        ${T(60, 310, D + ';font-weight:900', 96, bg, 'ONE FAMILY')}${T(60, 400, D + ';font-weight:900', 96, bg, 'ON EVERY SHELF.')}
        ${bars(60, 440, [420, 360], 22, bg, 8, .3)}${pill(60, 520, 210, 52, '#6FBF73', 'SEE THE RANGE', ink, 13)}
        ${packSvg('bottle', 0, false, 650, 260, 170, 400)}${packSvg('pouch', 1, true, 790, 300, 170, 360)}${packSvg('carton', 2, false, 950, 360, 150, 300)}
        <rect x="620" y="640" width="520" height="14" fill="#000" opacity=".25"/>
        ${T(60, 800, M, 13, ink, '( ONE COLOUR PER PRODUCT LINE )')}
        ${R.map((c, i) => `<rect x="${60 + i * 182}" y="830" width="164" height="90" fill="${c}"/>${T(70 + i * 182, 900, DW + ';font-weight:700', 14, '#fff', ['Growth', 'Bloom', 'Root', 'Micro', 'Protect', 'Special'][i])}`).join('')}
        ${row(1020, 'bottle', 'Bottles', 6)}${row(1440, 'pouch', 'Pouches', 6)}${row(1860, 'carton', 'Cartons', 6)}${row(2280, 'can', 'Cans', 6)}
        <rect x="60" y="2700" width="${W - 120}" height="190" fill="${ink}"/>${T(100, 2790, D + ';font-weight:900', 44, bg, 'FIND NUTRIPLEKS NEAR YOU')}${pill(W - 320, 2766, 220, 54, '#6FBF73', 'FIND A DEALER', ink, 13)}
        ${footer(W, 3040, ink, bg, 'Nutripleks', ['PRODUCTS', 'CROPS', 'CONTACT'])}`);
    },
    m() {
      const bg = '#EEEAE0', ink = '#13261B';
      return page(390, 2000, `<rect width="390" height="2000" fill="${bg}"/>
        ${mnav(bg, ink, T(24, 42, D + ';font-weight:900;letter-spacing:.04em', 22, ink, 'NUTRIPLEKS'))}
        ${ph('sacks.jpg', 0, 64, 390, 560, ink, .82)}${T(24, 140, D + ';font-weight:900', 46, bg, 'ONE FAMILY')}${T(24, 186, D + ';font-weight:900', 46, bg, 'ON EVERY SHELF.')}
        ${packSvg('bottle', 0, false, 30, 250, 120, 300)}${packSvg('pouch', 1, true, 140, 270, 120, 280)}${packSvg('carton', 2, false, 250, 320, 110, 230)}
        ${pill(24, 570, 170, 40, '#6FBF73', 'SEE THE RANGE', ink, 11)}
        ${['bottle', 'pouch', 'carton', 'can'].map((k, r) => `${T(24, 690 + r * 300, M, 10, '#3E8E5A', '( ' + ['BOTTLES', 'POUCHES', 'CARTONS', 'CANS'][r] + ' )')}<rect x="16" y="${702 + r * 300}" width="358" height="250" fill="#fff"/>${[0, 1, 2].map(i => packSvg(k, i + r, i === 1, 26 + i * 116, 716 + r * 300, 106, 220)).join('')}`).join('')}
        ${mfooter(1900, ink, bg, 'Nutripleks')}`);
    }
  };


  /* ---------------- GENERIC SITES (list-only projects) ---------------- */
  const IMGS = { 'urban-buddha': ['cafe.jpg', 'barista.jpg', 'fog.jpg'], 'sahil-chakali': ['phone-woman.jpg', 'notebook.jpg', 'desk-dark.jpg'], istaka: ['desk-white.jpg', 'map-tools.jpg', 'pencils.jpg'], twism: ['laptop-white.jpg', 'code.jpg', 'desk-white.jpg'], sitaram: ['sacks.jpg', 'mountains.jpg', 'flatlay-dark.jpg'], 'dank-tees': ['flatlay-dark.jpg', 'brand-kit.jpg', 'phone-woman.jpg'], 'talk-target': ['phone-woman.jpg', 'desk-dark.jpg', 'notebook.jpg'] };
  const generic = (name, pal, imgs) => {
    const [dk, lt, ac] = pal, up = name.toUpperCase(), fs = Math.min(130, 1180 / Math.max(6, up.length));
    return {
      d() {
        const W = 1200;
        return page(W, 2900, `<rect width="${W}" height="2900" fill="${lt}"/>
          ${nav(W, lt, dk, T(60, 54, D + ';font-weight:900;letter-spacing:.03em', 26, dk, up), ['About', 'Work', 'Services', 'Journal'], 'CONTACT', ac)}
          ${T(60, 200, M, 13, ac, '( ' + up + ' )')}
          ${T(60, 200 + fs, D + ';font-weight:900', fs, dk, up)}<rect x="60" y="${226 + fs}" width="130" height="9" fill="${ac}"/>
          ${bars(60, 280 + fs, [430, 380, 300], 22, dk, 8, .28)}${pill(60, 370 + fs, 180, 50, dk, 'GET STARTED', lt, 13)}${ghostPill(256, 370 + fs, 160, 50, dk, 'LEARN MORE', 13)}
          ${ph(imgs[0], 700, 130, 440, 520)}<rect x="660" y="580" width="180" height="110" fill="${ac}"/>${bars(680, 612, [120, 90], 22, lt, 7, .8)}
          <rect y="760" width="${W}" height="130" fill="${dk}"/>${['Strategy', 'Design', 'Build', 'Grow'].map((t, i) => T(60 + i * 280, 818, DW + ';font-weight:800', 26, lt, t) + bars(60 + i * 280, 844, [140], 0, ac, 6, .8)).join('')}
          ${T(60, 1000, M, 13, ac, '( WHAT WE OFFER )')}${T(60, 1066, D + ';font-weight:900', 58, dk, 'MADE WITH CARE')}
          ${[0, 1, 2].map(i => `<g transform="translate(${60 + i * 366} 1100)"><rect width="344" height="400" fill="#fff" opacity=".7"/>${ph(imgs[(i + 1) % 3], 0, 0, 344, 220, i === 1 ? dk : '', .2)}${T(24, 272, DW + ';font-weight:800', 26, dk, ['Our story', 'Signature range', 'Visit us'][i])}${bars(24, 298, [270, 230, 180], 18, dk, 6, .25)}${T(24, 372, DW + ';font-weight:700;letter-spacing:.1em', 12, ac, 'READ MORE →')}</g>`).join('')}
          ${ph(imgs[1], 0, 1580, W, 480, dk, .55)}${T(W / 2, 1800, D + ';font-weight:900', 66, lt, 'BUILT AROUND PEOPLE', 'text-anchor="middle"')}${bars(W / 2 - 200, 1840, [400], 0, lt, 8, .5)}
          ${[0, 1].map(i => `<g transform="translate(60 ${2120 + i * 260})">${ph(imgs[i ? 0 : 2], i ? 560 : 0, 0, 520, 230)}<g transform="translate(${i ? 0 : 580} 40)">${T(0, 40, D + ';font-weight:900', 40, dk, ['THE DETAILS', 'THE PEOPLE'][i])}${bars(0, 70, [420, 380, 300], 20, dk, 7, .25)}</g></g>`).join('')}
          <rect x="60" y="2660" width="${W - 120}" height="0" fill="${ac}"/>
          ${footer(W, 2640, dk, lt, name, ['COMPANY', 'WORK', 'CONTACT'])}`);
      },
      m() {
        const mfs = Math.min(60, 360 / Math.max(5, up.length) * 1.6);
        return page(390, 1900, `<rect width="390" height="1900" fill="${lt}"/>
          ${mnav(lt, dk, T(24, 42, D + ';font-weight:900', 20, dk, up))}
          ${ph(imgs[0], 0, 64, 390, 330)}
          ${T(24, 440 + mfs * .3, D + ';font-weight:900', mfs, dk, up)}<rect x="24" y="${460 + mfs * .3}" width="80" height="6" fill="${ac}"/>
          ${bars(24, 500, [300, 250], 18, dk, 6, .28)}${pill(24, 550, 170, 44, dk, 'GET STARTED', lt, 11)}
          ${[0, 1, 2].map(i => `<rect x="16" y="${630 + i * 250}" width="358" height="234" fill="#fff" opacity=".7"/>${ph(imgs[(i + 1) % 3], 16, 630 + i * 250, 358, 140)}${T(32, 800 + i * 250, DW + ';font-weight:800', 18, dk, ['Our story', 'Signature range', 'Visit us'][i])}${bars(32, 816 + i * 250, [220], 0, dk, 5, .25)}`).join('')}
          <rect x="16" y="1400" width="358" height="200" fill="${ac}"/>${T(36, 1470, D + ';font-weight:900', 28, dk, 'LET’S TALK')}${pill(36, 1510, 170, 44, dk, 'CONTACT', lt, 11)}
          ${mfooter(1680, dk, lt, name)}`);
      }
    };
  };

  const PAGES = { nutripleks: nx, globriddge: glob, 'good-garden': gg, 'sapar-arts': sap, automarc: am };
  const LABEL = { nutripleks: 'Nutripleks · Product range', globriddge: 'Globriddge · Home', 'good-garden': 'Good Garden · Shop', 'sapar-arts': 'Sapar Arts · Gallery', automarc: 'Automarc · Home' };
  /* ---------- draw each page once, reuse it everywhere via <use> ---------- */
  const SPR = {};
  let sprite = null;
  const work = () => (window.VD && window.VD.WORK) || [];
  const pagesFor = key => {
    if (PAGES[key]) return PAGES[key];
    const w = work().find(x => x.key === key && x.pal && x.kind !== 'feed');
    if (!w) return null;
    PAGES[key] = generic(w.name, w.pal, IMGS[key] || ['desk-white.jpg', 'notebook.jpg', 'laptop-white.jpg']);
    LABEL[key] = w.name + ' · Home';
    return PAGES[key];
  };
  const thumb = (key, mode) => {
    const id = 'wps-' + key + '-' + mode;
    if (!SPR[id]) {
      const str = pagesFor(key)[mode](); const m = str.match(/^<svg class="wp-svg" viewBox="0 0 (\d+) (\d+)"[^>]*>/);
      const inner = str.slice(m[0].length, str.lastIndexOf('</svg>'));
      if (!sprite) { document.body.insertAdjacentHTML('beforeend', '<svg id="wp-sprite" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden;pointer-events:none"></svg>'); sprite = document.getElementById('wp-sprite'); }
      sprite.insertAdjacentHTML('beforeend', `<symbol id="${id}" viewBox="0 0 ${m[1]} ${m[2]}">${inner}</symbol>`);
      SPR[id] = [m[1], m[2]];
    }
    const [w, h] = SPR[id];
    return `<svg class="wp-svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true" focusable="false"><use href="#${id}"/></svg>`;
  };
  /* ---------- real captures of the live sites ---------- */
  const LIVE = {
    nutripleks: { url: 'https://www.nutripleksbiotech.com/', d: 1, m: 1 },
    globriddge: { url: 'https://globriddge.com/', d: 1, m: 1 },
    'good-garden': { url: 'https://goodgarden.store/', d: 1, m: 1 },
    'sapar-arts': { url: 'https://saparparth.github.io/sapar_arts/', d: 1, m: 1 },
    'urban-buddha': { url: 'https://www.urbanbuddha.farm/', m: 1 },
    'sahil-chakali': { url: 'https://www.sahilchakali.com/', m: 1 },
    twism: { url: 'https://vallabhgulve.wixstudio.com/twism', m: 1 },
    sitaram: { url: 'https://sitaramsugars.framer.website/', m: 1 },
    'dank-tees': { url: 'https://www.dankattires.com/', d: 1, m: 1 },
    'talk-target': { url: 'https://talkandtarget.com/', m: 1 }
  };
  const host = key => LIVE[key] ? LIVE[key].url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : LABEL[key];
  const shot = (key, mode) => `<img class="wp-shot" src="assets/img/live/${key}-${mode}.jpg" alt="" loading="lazy" decoding="async" draggable="false">`;
  const view = (key, mode) => LIVE[key] && LIVE[key][mode] ? shot(key, mode) : thumb(key, mode);
  const bar = key => `<div class="wp-bar"><i></i><i></i><i></i><span class="wp-url">${host(key)}</span><span class="wp-live"><b></b>${LIVE[key] ? 'Live site' : 'Preview'}</span></div>`;
  const phone = (key, cls = '') => `<div class="wp-phone ${cls}"><div class="wp-pview"><div class="wp-page">${view(key, 'm')}</div></div><span class="wp-notch"></span></div>`;
  const has = key => !!(LIVE[key] || pagesFor(key));
  const monly = key => LIVE[key] && !LIVE[key].d;
  /* Browser + phone preview (or two phones when only the phone capture is real) */
  window.webPreview = (key, opts = {}) => {
    if (!has(key)) return '';
    if (monly(key)) return `<div class="wp wp-monly${opts.cls ? ' ' + opts.cls : ''}" data-wp>${phone(key, 'wp-p1')}${phone(key, 'wp-p2')}<span class="wp-tag">${host(key)} · phone view</span></div>`;
    return `<div class="wp${opts.cls ? ' ' + opts.cls : ''}" data-wp>
      <div class="wp-browser">${bar(key)}<div class="wp-view"><div class="wp-page">${view(key, 'd')}</div></div></div>
      ${phone(key)}
    </div>`;
  };
  /* Browser-only card (phone card when only the phone capture is real) */
  window.webPreview.mini = (key, cls = '') => {
    if (!has(key)) return '';
    if (monly(key)) return `<div class="wp wp-mini wp-mini-m ${cls}" data-wp>${phone(key)}</div>`;
    return `<div class="wp wp-mini ${cls}" data-wp><div class="wp-browser">${bar(key)}<div class="wp-view"><div class="wp-page">${view(key, 'd')}</div></div></div></div>`;
  };
  window.webPreview.has = has;
  window.webPreview.live = key => LIVE[key] ? LIVE[key].url : '';
})();

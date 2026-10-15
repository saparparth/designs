/* Varient Designs — site content.
   Facts come from the current varientdesigns.com. Case-study body copy is a
   draft written from those facts: have Vallabh review it before launch. */
window.VD = (function () {
  const CONTACT = { email: 'vallabh.gulve@varientdesigns.com', phone: '+91 96047 18137', site: 'https://vallabhgulve.com' };

  const CASES = [
    {
      slug: 'nutripleks', name: 'Nutripleks', client: 'Nutripleks Biotech', craft: 'Shelf', tint: '#13261B',
      tags: ['Packaging system', '3D mockups', 'Brand'],
      line: 'Twenty-six products that never looked related. Now they stand on the shelf as one family.',
      q: 'How do you make twenty-six products look like they came from one company?',
      a: 'Build the system first. Then the packs.',
      brief: [
        'Nutripleks Biotech makes plant-growth regulators and micronutrient products. The range had grown one pack at a time, and nothing tied the bottles, pouches, cartons and cans together.',
        'On a crowded agri-input shelf, that meant every product had to introduce the brand from scratch.'
      ],
      system: [
        'We rebuilt the packaging as one system: a fixed brand zone, a colour code for each product line, and the same order of information on every format.',
        'The same structure had to work on a large bottle, a stand-up pouch and a small 100 g micronutrient carton.'
      ],
      craftText: [
        'Before anything went to print, every pack was rendered as a 3D mockup to test shelf impact.',
        'The system then stretched to a special edition, the 100 g micronutrient cartons, and Chipkoo, a spreader-sticker product.'
      ],
      quote: 'A shelf is a crowd. The brand has to be recognised before anyone reads a word.',
      deliverables: ['Packaging system', '26 SKUs', 'Bottles', 'Pouches', 'Cartons', 'Cans', 'Special edition', 'Micronutrient cartons', 'Chipkoo spreader sticker', '3D mockups', 'Print-ready artwork'],
      gallery: [['covers', 'nutripleks', 'The range, one family'], ['reel', 'dieline', 'Carton dieline'], ['reel', 'shelf', 'Shelf test'], ['reel', 'screen', 'The pack, on screen']]
    },
    {
      slug: 'globriddge', name: 'Globriddge', client: 'Globriddge International', craft: 'Screen', tint: '#2A2117',
      tags: ['Website', 'UX/UI', 'Packaging'],
      line: 'An agri-commodity trader that needed to look as dependable online as it is on a contract.',
      q: 'What does trust look like for a commodity trader?',
      a: 'Clear products, clear origins, nothing improvised.',
      brief: [
        'Globriddge International trades agricultural commodities. Its buyers check a supplier’s website long before they ask for a quote.',
        'The site had to explain the range quickly and make the company feel established from the first screen.'
      ],
      system: [
        'We organised the site around what buyers look for first: the products, where they come from, and how to start a conversation.',
        'Type and colour borrow from the commodities themselves: grain golds and earth browns on a calm, paper-like ground.'
      ],
      craftText: [
        'Varient also designed packaging for Globriddge, so the brand looks the same on a sack as it does in a browser.'
      ],
      quote: 'A buyer decides in seconds whether a supplier is serious. The website gets those seconds.',
      deliverables: ['Website design', 'UX/UI', 'Information architecture', 'Web build', 'Packaging'],
      gallery: [['covers', 'globriddge', 'Home page'], ['reel', 'wire', 'Wireframes'], ['reel', 'dieline', 'Packaging dieline']]
    },
    {
      slug: 'good-garden', name: 'Good Garden', client: 'Good Garden', craft: 'Screen', tint: '#12302A',
      tags: ['E-commerce', 'UX/UI', 'Web'],
      line: 'A plant-nutrient store where the products are technical and the customers are gardeners.',
      q: 'How do you sell soil science to someone who just wants their plants to grow?',
      a: 'Lead with the plant. Then explain the product.',
      brief: [
        'Good Garden sells plant nutrients online. The products are technical, but most customers want healthy plants, not a chemistry lesson.'
      ],
      system: [
        'Product pages open with the problem a gardener recognises, then show how to use the product.',
        'Clear product cards and a short path to checkout keep the store easy to browse on a phone.'
      ],
      craftText: [
        'Colour and illustration keep it friendly. The technical details stay one tap away for anyone who wants them.'
      ],
      quote: 'Nobody buys fertiliser. They buy the tomato plant it grows.',
      deliverables: ['E-commerce design', 'UX/UI', 'Product pages', 'Mobile checkout flow'],
      gallery: [['covers', 'good-garden', 'Store and product page'], ['reel', 'wire', 'Wireframes'], ['reel', 'screen', 'Mobile']]
    },
    {
      slug: 'sapar-arts', name: 'Sapar Arts', client: 'Sapar Arts', craft: 'Screen', tint: '#2A1313',
      tags: ['Website', 'Gallery', 'Art direction'],
      line: 'A devotional art gallery online, designed to slow people down.',
      q: 'How do you show sacred art on a screen without it feeling like a catalogue?',
      a: 'Give every piece room. Let the frame do the talking.',
      brief: [
        'Sapar Arts presents devotional art. Its visitors come to look and feel before they think about buying.'
      ],
      system: [
        'Arched frames echo temple architecture, and a dark, warm palette lets gold and colour glow.',
        'Each piece gets space before any price or button appears.'
      ],
      craftText: ['The gallery grid stays quiet so the work can be loud.'],
      quote: 'Some websites should hurry you. A gallery should not.',
      deliverables: ['Website design', 'Gallery UX', 'Art direction'],
      gallery: [['covers', 'sapar-arts', 'The gallery'], ['reel', 'wire', 'Layout system']]
    }
  ];

  /* Everything that appears on the Work canvas */
  const WORK = [
    ...CASES.map(c => ({ key: c.slug, name: c.name, craft: c.craft, type: c.tags[0], kind: 'case' })),
    { key: 'urban-buddha', name: 'Urban Buddha', craft: 'Screen', type: 'Website', pal: ['#1E1A2E', '#F1ECE4', '#B9893C'] },
    { key: 'sahil-chakali', name: 'Sahil Chakali', craft: 'Screen', type: 'Portfolio site', pal: ['#111113', '#EDEDED', '#E5322A'] },
    { key: 'twism', name: 'Twism', craft: 'Screen', type: 'Website', pal: ['#0F1F2E', '#EAF0F5', '#3D7FC4'] },
    { key: 'sitaram', name: 'Sitaram Sugars', craft: 'Screen', type: 'Website and packaging', pal: ['#2C2410', '#F7F1DF', '#D7A23C'] },
    { key: 'dank-tees', name: 'Dank Tees', craft: 'Screen', type: 'Website', pal: ['#141414', '#F2F2F2', '#C2552F'] },
    { key: 'talk-target', name: 'Talk and Target', craft: 'Screen', type: 'Website', pal: ['#1A1F14', '#EEF1E6', '#8DB33B'] },
    { key: 'only-apna', name: 'Only Apna', craft: 'Shelf', type: 'Packaging: jaggery powder pouch and cold-pressed oil labels', kind: 'dieline' },
    { key: 'unitech', name: 'Uni-Tech Automation', craft: 'Social', type: 'Event creatives for Bharari 2025 “Srujan”', kind: 'feed', pal: ['#0B1E3A', '#D9CDB6', '#2C6FA3'] },
    { key: 'art', name: 'Illustration & art', craft: 'Social', type: 'Digital paintings, posters and personal artwork', kind: 'feed', pal: ['#0A0A0A', '#D9CDB6', '#C4161C'] },
    { key: 'social', name: 'Social & digital', craft: 'Social', type: 'Social posts, brochures and websites for Globriddge, Sitaram Sugars and Good Garden', pal: ['#111111', '#D9CDB6', '#E5322A'], kind: 'feed' }
  ];

  const CLIENTS = ['Kia', 'Burger King', 'Nutripleks Biotech', 'Globriddge International', 'Only Apna', 'Sitaram Sugars', 'Hatch Interiors', 'Prettypls', 'Twism', 'Sahil Chakali', 'Maharashtra Sugar Cricket League', 'Uni-Tech Automation', 'W3C', 'Index Living Mall', 'Surya Shibir Resort', 'Meri Property', 'CR Properties', 'Urban Buddha', 'Dank Tees', 'Talk and Target', 'Good Garden', 'Sapar Arts'];

  const SKUS = [
    ['bottle', 0, 0], ['bottle-m', 0, 0], ['bottle-s', 0, 0], ['bottle', 1, 1], ['bottle-m', 1, 1], ['pouch', 2, 0], ['pouch-s', 2, 0],
    ['carton', 3, 1], ['can', 3, 0], ['bottle', 4, 0], ['bottle-m', 4, 0], ['bottle-s', 4, 0], ['pouch', 5, 1], ['pouch-s', 5, 1],
    ['carton', 0, 1], ['carton-s', 1, 0], ['carton-s', 2, 0], ['carton-s', 3, 0], ['carton-s', 4, 0], ['can', 5, 1], ['bottle', 2, 1],
    ['bottle-m', 3, 1], ['special', 0, 0], ['pouch', 4, 0], ['sticker', 1, 0], ['sticker', 3, 0]
  ].map(([kind, i, light]) => ({
    kind, i, light: !!light,
    tag: { bottle: 'Bottle', 'bottle-m': 'Bottle', 'bottle-s': 'Bottle', pouch: 'Stand-up pouch', 'pouch-s': 'Stand-up pouch', carton: 'Carton', 'carton-s': 'Micronutrient carton · 100 g', can: 'Can', special: 'Special edition', sticker: 'Chipkoo · spreader sticker' }[kind]
  }));

  const TIMELINE = [
    ['2024', 'B.Des, UX', 'MIT Institute of Design'],
    ['2024', 'UI/UX Designer', 'Userology'],
    ['2023', 'UX Design Intern', 'Design Asylum'],
    ['2022', 'UX Design Intern', 'Verzeo'],
    ['2022', 'UI/UX Designer', 'Webworx India'],
    ['2020–21', 'UI/UX Designer', 'Shubhu.ai'],
    ['2018–19', 'UI/UX & Graphic Designer', 'Bulb and Key Co.']
  ];

  const SERVICES = [
    { id: 'screen', n: '01', name: 'Screen', plain: 'Websites and product interfaces that are easy to use and easy to trust.',
      text: 'We research, map the information, wireframe, and design high-fidelity screens and prototypes. Then we build on WordPress or a custom CMS, with SEO set up from day one.',
      items: ['UX research', 'Information architecture', 'Wireframes', 'UI design', 'Prototypes', 'Design systems', 'WordPress', 'Shopify', 'Headless CMS', 'On-page SEO', 'Technical SEO', 'Accessibility'],
      related: ['globriddge', 'good-garden'], art: ['reel', 'wire'] },
    { id: 'shelf', n: '02', name: 'Shelf', plain: 'Packaging that works at arm’s length and across a whole range.',
      text: 'Bottles, pouches, cans, cartons and labels, designed as one system. We test with 3D mockups before anything goes to print, and hand over print-ready artwork.',
      items: ['Packaging systems', 'Label design', 'Dielines', '3D mockups', 'Brand identity', 'Logo design', 'Brand guidelines', 'Print-ready files'],
      related: ['nutripleks'], art: ['reel', 'dieline'] },
    { id: 'systems', n: '03', name: 'Systems', plain: 'The pipes behind the brand: content, data and social.',
      text: 'Custom and headless CMS builds so your team can edit without breaking the design. ETL pipelines that pull, clean and load the data your site runs on. Social content that keeps the identity consistent from package to post.',
      items: ['CMS development', 'Headless CMS', 'E-commerce builds', 'API and CRM integrations', 'Payment gateways', 'ETL pipelines', 'Data cleaning', 'Dashboards and reporting', 'Workflow automation', 'Hosting, SSL and backups', 'Analytics and GA4', 'Speed and Core Web Vitals', 'Support and maintenance', 'Social media content', 'Campaign creative'],
      related: ['globriddge'], art: ['reel', 'screen'] }
  ];

  /* ---------- the visitor's side: problems, plan modules, journey ---------- */
  const MODULES = {
    web: { name: 'Website design and build', track: 'presence' },
    ecom: { name: 'E-commerce store', track: 'presence' },
    seo: { name: 'SEO, on-page and technical', track: 'growth' },
    social: { name: 'Social media content', track: 'growth' },
    campaign: { name: 'Campaign creative', track: 'growth' },
    brand: { name: 'Brand identity and guidelines', track: 'premium' },
    pack: { name: 'Packaging system', track: 'premium' },
    mockups: { name: '3D mockups and shelf test', track: 'premium' },
    uxui: { name: 'UX/UI for an app or product', track: 'tech' },
    cms: { name: 'Easy-edit CMS', track: 'tech' },
    etl: { name: 'Data pipelines (ETL)', track: 'tech' },
    dash: { name: 'Reporting dashboard', track: 'tech' }
  };

  const PERSONAS = [
    { id: 'presence', n: '01', axis: 'Presence', short: 'Online presence', problem: 'We’re hard to find online.',
      who: 'Founders and local businesses going digital',
      symptoms: ['Customers ask for our website and we hesitate', 'We don’t show up when people search for what we do', 'Our site was built years ago, and it shows', 'Enquiries still come only through word of mouth'],
      outcome: 'A website you’re proud to send, that people can find on Google, and that turns visits into enquiries.',
      steps: ['Map what your customers search for and what they need to see', 'Design a fast, clear site around one obvious next step', 'Build it on a CMS you can edit, with SEO set up from day one'],
      modules: ['web', 'seo', 'cms', 'ecom'], cases: ['globriddge', 'good-garden'], tint: '#2C6FA3' },
    { id: 'premium', n: '02', axis: 'Premium', short: 'Premium brand', problem: 'We look cheaper than we are.',
      who: 'Product brands, manufacturers and D2C labels',
      symptoms: ['Our product beats the competition, but the shelf says otherwise', 'Every pack and post looks like a different company', 'We compete on price because the brand can’t carry a higher one', 'We’re a little embarrassed by our own brochure'],
      outcome: 'One brand system across pack, site and post, so you can charge what you’re worth.',
      steps: ['Audit every touchpoint side by side, next to your competitors', 'Build one identity system: type, colour, layout, voice', 'Roll it across packs, site and social, tested in 3D first'],
      modules: ['brand', 'pack', 'mockups', 'web'], cases: ['nutripleks', 'sapar-arts'], tint: '#E5322A' },
    { id: 'growth', n: '03', axis: 'Growth', short: 'Digital marketing', problem: 'We post, but nothing happens.',
      who: 'Owners and small teams doing marketing themselves',
      symptoms: ['We get likes, not leads', 'Every campaign starts from a blank page', 'Our posts and ads don’t look like our brand', 'We can’t tell what’s actually working'],
      outcome: 'Search and social that look like you and bring in people who buy.',
      steps: ['Find the searches and channels your buyers actually use', 'Design a content system: templates, voice, a calendar', 'Measure it, report it in plain words, and improve it monthly'],
      modules: ['seo', 'social', 'campaign', 'dash'], cases: ['good-garden', 'sapar-arts'], tint: '#FFC629' },
    { id: 'tech', n: '04', axis: 'Tech', short: 'Tech and automation', problem: 'Our tools are holding us back.',
      who: 'Operators running the business on spreadsheets',
      symptoms: ['Changing one line on the website needs a developer', 'Our data lives in ten spreadsheets that don’t agree', 'Reports take a day to put together', 'Our systems don’t talk to each other'],
      outcome: 'Systems your team can run: an editable site, clean data, and reports that build themselves.',
      steps: ['Map where your data comes from and where it needs to go', 'Design the screens your team will use every day', 'Build the CMS and pipelines, then hand over with training'],
      modules: ['cms', 'etl', 'dash', 'uxui'], cases: ['globriddge', 'good-garden'], tint: '#111111' }
  ];

  const JOURNEY = [
    ['Hello', 'A 30-minute call. You talk, we listen and ask the awkward questions.', 'A clear read on the real problem'],
    ['Diagnose', 'We audit what exists: site, shelf, socials, analytics and data.', 'A short audit with what to fix first'],
    ['Design', 'Strategy first, then the system: type, colour, layout and voice.', 'Designs you can click through or hold'],
    ['Build', 'Websites, print-ready packs, the CMS and the data pipelines.', 'Production-ready files and code'],
    ['Launch', 'Go live, go to print, go on air, with a checklist so nothing slips.', 'A launch that happens on the day'],
    ['Grow', 'SEO, content and data that keep getting better after launch.', 'Plain-language reports, and the next move']
  ];

  /* Health check: each answer scores 0–3 on one axis */
  const QUESTIONS = [
    { axis: 'presence', q: 'If a customer Googles your business today, what do they find?', a: ['Nothing useful', 'A basic listing or an old site', 'A decent website', 'A great site, near the top'] },
    { axis: 'presence', q: 'How does your website feel on a phone?', a: ['We don’t have one', 'Slow or clumsy', 'It’s fine', 'Fast and a pleasure to use'] },
    { axis: 'premium', q: 'Put your product next to your best competitor’s. Yours looks…', a: ['Cheaper', 'About the same', 'Slightly better', 'Clearly premium'] },
    { axis: 'premium', q: 'Do your pack, website and posts look like one brand?', a: ['Not at all', 'A little', 'Mostly', 'Completely'] },
    { axis: 'growth', q: 'Where do new customers come from?', a: ['Only word of mouth', 'Some from social media', 'Search and social', 'A system we measure'] },
    { axis: 'growth', q: 'After a campaign, do you know what worked?', a: ['Never', 'Sometimes', 'Usually', 'Always, with numbers'] },
    { axis: 'tech', q: 'Updating your website means…', a: ['Calling a developer', 'Fighting a plugin', 'Someone in-house does it', 'Anyone can, in minutes'] },
    { axis: 'tech', q: 'Your orders, leads and stock live in…', a: ['Notebooks and WhatsApp', 'Lots of spreadsheets', 'A few connected tools', 'One clean system with reports'] }
  ];

  return { CONTACT, CASES, WORK, CLIENTS, SKUS, TIMELINE, SERVICES, MODULES, PERSONAS, JOURNEY, QUESTIONS };
})();

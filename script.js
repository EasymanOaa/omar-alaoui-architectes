/* ============================================================
   Omar Alaoui Architectes — shared behavior (vanilla JS)
   ============================================================ */
(function () {
  'use strict';

  var body    = document.body;
  var page    = body.getAttribute('data-page') || 'home';
  var reduce  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var TBC = 'À confirmer par le cabinet.';

  /* ---------- PROJECTS DATA ----------
     Categories: RÉSIDENTIEL, COMMERCIAL, CULTUREL, URBAIN, INTÉRIEUR

     HOW TO ADD IMAGES:
     Put your image links inside the  imgs: [ ... ]  list of each project.
     Example:
       imgs: [
         'images/cfc-1.png'
       ],
     - One image per project is displayed.
     - The 1st image is used for the card on the Réalisations page
       and for the big header on the project page.
     - Empty list [] = a grey placeholder is shown instead.
     ------------------------------------- */
  var PROJECTS = [
    { id: 'cfc-tower', name: 'CFC Tower', loc: 'Casablanca', cat: 'COMMERCIAL', year: '2019',
      ph: 'ph-2',
      imgs: [
        'images/cfc-1.png'
      ],
      desc: 'Tour de bureaux de 28 étages et 136 mètres, conçue par Morphosis, qui se distingue par sa façade articulée, ses ailettes solaires verticales et son couronnement sculpté. Achevée en 2019, elle est le point de repère du quartier de Casablanca Finance City.',
      concept: 'Une interprétation contemporaine du moucharabieh marocain : des ailettes verticales assurent le contrôle solaire tout en cadrant les vues sur les hauteurs d’Anfa.',
      approach: 'Noyau en béton armé entouré d’un exosquelette en acier, façade en double peau de verre et toit-terrasse à double couronne effilée.' },

    { id: 'quintessence-villas', name: 'Quintessence Villas', loc: 'Dar Bouazza', cat: 'RÉSIDENTIEL', year: '2020',
      ph: 'ph-1',
      imgs: [
        'images/quintessence-1.png'
      ],
      desc: 'Un ensemble de 79 villas de luxe à Dar Bouazza, au sud de Casablanca, conçu par Omar Alaoui. L’architecture affirme un style néo-Art déco à la lecture luxueuse, alliant matériaux nobles, piscines à débordement et vues sur l’océan.',
      concept: 'Des lignes douces et contemporaines inspirées de la lumière atlantique et du contexte balnéaire, avec jardins privatifs et vues cadrées sur la mer.',
      approach: 'Construction parasismique, isolation acoustique et thermique, domotique, double vitrage et matériaux nobles dans l’ensemble du projet.' },

    { id: 'casanearshore', name: 'CasaNearShore', loc: 'Casablanca', cat: 'COMMERCIAL', year: '2018',
      ph: 'ph-4',
      imgs: [
        'images/casanearshore-1.png'
      ],
      desc: 'Première phase de l’opération Casa Shore Park, située sur les lots B et C, sur environ 2 hectares. Le projet a été conçu par Groupe3 Architectes avec Omar Alaoui et Taoufik El Oufir, et photographié par Stefano Berca.',
      concept: 'Un parc tertiaire dédié aux entreprises offshore (ITO et BPO), organisé autour de cours paysagères et de cheminements ombragés.',
      approach: 'Plateaux de bureaux modulables, double orientation et plan-masse de type campus qui privilégie les déplacements piétons et les espaces extérieurs.' },

    { id: 'technopolis', name: 'Technopolis', loc: 'Rabat-Salé', cat: 'COMMERCIAL', year: '2010',
      ph: 'ph-3',
      imgs: [
        'images/technopolis-1.png'
      ],
      desc: 'Le technopôle de la région Rabat-Salé-Kénitra, situé dans le quartier Hssaine à Salé. Il réunit centres de recherche, laboratoires, salles de cours et espaces de travail dédiés à l’innovation et à la technologie.',
      concept: 'Un pôle scientifique et technologique conçu comme un campus, avec des bâtiments complémentaires tous dédiés à la recherche et à l’enseignement supérieur.',
      approach: 'Une architecture bioclimatique qui tire parti du potentiel du site, avec circulations ombragées et stratégies de rafraîchissement passif.' },

    { id: 'marina-mall-casa', name: 'Marina Casablanca', loc: 'Casablanca', cat: 'COMMERCIAL', year: '2019',
      ph: 'ph-5',
      imgs: [
        'images/marina-mall-1.png'
      ],
      desc: 'Un centre commercial de 43 000 m² situé entre la médina et la mosquée Hassan II, avec 147 boutiques, un hypermarché Marjane et un spa de 4 000 m². Ouvert le 17 avril 2019 après trois ans de travaux et un investissement de 1,3 milliard de dirhams.',
      concept: 'Un poumon commercial conçu comme une articulation entre le quartier de la Marina et le reste de Casablanca, avec une terrasse panoramique donnant sur l’Atlantique.',
      approach: 'Programme mixte : commerces, restauration, bien-être et loisirs sur trois niveaux, intégré au projet urbain plus large de Casablanca Marina.' },

    { id: 'morocco-mall-marrakech', name: 'Morocco Mall Marrakech', loc: 'Marrakech', cat: 'COMMERCIAL', year: '2025',
      ph: 'ph-2',
      imgs: [
        'images/morocco-mall-1.png'
      ],
      desc: 'Un projet de 135 000 m² (dont 50 000 m² de commerces), développé par Aksal Group et conçu par Design International / DP Architects. Son dessin s’inspire des paysages géologiques et naturels qui entourent le site, avec jardins en toiture, fontaines et cascades.',
      concept: 'Une expérience client centrée sur les loisirs et la flânerie, qui brouille la frontière entre intérieur et extérieur, inspirée de l’Atlas et des villages en terrasses.',
      approach: '190 boutiques prévues, avec une forte orientation vers le divertissement, le luxe et des terrasses paysagères en toiture.' },

    { id: 'hotel-moulay-yacoub', name: 'Hôtel Moulay Yacoub', loc: 'Fès', cat: 'COMMERCIAL', year: '2018',
      ph: 'ph-6',
      imgs: [
        'images/moulay-yacoub-1.png'
      ],
      desc: 'Un hôtel de 100 chambres intégré au complexe thermal de Moulay Yacoub, à une vingtaine de kilomètres de Fès. Officiellement inauguré après le Ramadan 2018, dans le cadre d’un plan de modernisation de 400 millions de dirhams mené avec Vichy Spa International.',
      concept: 'Un établissement de bien-être bâti sur la station thermale historique, avec piscine extérieure chauffée, spa et salles de réunion.',
      approach: 'Programme hôtelier et thermal : 58 chambres standard, 35 chambres supérieures et 7 suites, plus 3 points de restauration.' },

    { id: 'grand-theatre-rabat', name: 'Grand Théâtre de Rabat', loc: 'Rabat', cat: 'CULTUREL', year: '2024',
      ph: 'ph-3',
      imgs: [
        'images/grand-theatre-1.png'
      ],
      desc: 'Une œuvre de Zaha Hadid inaugurée le 29 octobre 2024 sur les rives du Bouregreg. Avec 47 000 m², c’est le plus grand théâtre d’Afrique et du monde arabe : un amphithéâtre en plein air de 7 000 places et une salle intérieure de 1 800 à 1 900 places.',
      concept: 'Une sculpture organique dont les courbes épousent le paysage de la vallée du Bouregreg, en dialogue avec la tour Hassan.',
      approach: 'Acoustique naturelle, sans amplification, pour l’opéra et le ballet, intégration de l’artisanat marocain, sur un site de 7,1 hectares.' },

    { id: 'bank-al-maghrib-marrakech', name: 'Bank Al-Maghrib Marrakech', loc: 'Marrakech', cat: 'CULTUREL', year: '1922 / 2023',
      ph: 'ph-1',
      imgs: [
        'images/bank-al-maghrib-1.png'
      ],
      desc: 'La première succursale de la banque centrale du Royaume, construite en 1922 sur la place Jemaa el-Fna par les architectes Auguste Cadet et Edmond Brion. Après restauration, elle est devenue en février 2023 le musée du patrimoine immatériel de Jemaa el-Fna.',
      concept: 'Une insertion discrète parmi les bâtiments de la place, au service d’un patrimoine vivant classé par l’UNESCO depuis 2008.',
      approach: 'Réhabilitation muséale : un parcours dédié à la halqa, une section numismatique en hommage à la banque, et des œuvres de Jacques Majorelle.' },

    { id: 'parc-exposition-mohammed-vi', name: 'Parc d’Exposition Mohammed VI – El Jadida', loc: 'El Jadida', cat: 'CULTUREL', year: '2015',
      ph: 'ph-4',
      imgs: [
        'images/parc-exposition-mohammed-vi.png'
      ],
      desc: 'Inauguré en 2015 sur la route d’Azemmour, ce parc d’exposition réalisé par la SOREC est une référence nationale. Il accueille chaque année en octobre le Salon du Cheval d’El Jadida, ainsi que de nombreux salons professionnels, sur environ 70 000 m² de surface d’exposition.',
      concept: 'Une succession de halls d’exposition reliés par une promenade centrale, avec un parvis en zellige qui apporte une touche marocaine à un équipement aux standards internationaux.',
      approach: 'Un site conçu pour être autonome : groupe électrogène et réseau d’approvisionnement en eau propre, avec des halls modulables adaptés à des événements de toute nature.' }
  ];

  /* ---------- One image per project ---------- */
  var MAX_IMGS = 1;
  function getImgs(p) {
    return (p.imgs || []).filter(function (s) { return s && String(s).trim(); }).slice(0, MAX_IMGS);
  }

  /* ---------- Placeholder / real-image helper ---------- */
  function vis(p, k, extra) {
    var list = getImgs(p);
    var im   = list.length ? list[k % list.length] : '';
    var img  = im
      ? '<img src="' + im + '" alt="' + p.name + '" loading="lazy" onerror="this.remove()">'
      : '';
    return '<div class="ph ' + p.ph + '" style="' + (extra || '') + '" role="img" aria-label="' + p.name + '">' + img + '</div>';
  }

  /* ---------- Header / Footer injection ---------- */
  var links  = [['index.html','ACCUEIL','home'],['work.html','RÉALISATIONS','work']];
  var navKey = page === 'project' ? 'work' : page;
  var nav = links.map(function (l) {
    return '<li><a href="' + l[0] + '"' + (l[2] === navKey ? ' aria-current="page"' : '') + '>' + l[1] + '</a></li>';
  }).join('');

  var h = document.getElementById('site-header');
  if (h) {
    h.outerHTML =
      '<header class="site" id="hd">' +
        '<a class="logo" href="index.html" aria-label="Omar Alaoui Architectes — accueil">Omar Alaoui<small>ARCHITECTES</small></a>' +
        '<button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="mainnav"><span></span><span></span></button>' +
        '<nav class="main" id="mainnav" aria-label="Navigation principale"><ul>' + nav + '</ul></nav>' +
      '</header>';
  }

  var f = document.getElementById('site-footer');
  if (f) {
    f.outerHTML =
      '<footer class="site">' +
        '<p class="big">Une architecture façonnée par la lumière, la matière et le lieu.</p>' +
        '<div class="cols">' +
          '<span>© ' + new Date().getFullYear() + ' Omar Alaoui Architectes — Casablanca</span>' +
          '<span><a href="work.html">Réalisations</a></span>' +
        '</div>' +
      '</footer>';
  }

  var hd     = document.getElementById('hd');
  var burger = hd && hd.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var o = body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(o));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) burger.click();
    });
  }

  /* ---------- Loader + page transitions ---------- */
  var loader  = document.createElement('div');
  loader.className = 'loader'; loader.setAttribute('aria-hidden','true');
  loader.innerHTML = '<b>OAA</b><i></i>';

  var curtain = document.createElement('div');
  curtain.className = 'curtain'; curtain.setAttribute('aria-hidden','true');

  body.appendChild(loader);
  body.appendChild(curtain);

  /* Loader label: project name on project pages, "OAA" elsewhere */
  var loaderLabel = 'OAA';
  var currentProjectId = null;
  if (page === 'project') {
    currentProjectId = new URLSearchParams(location.search).get('id');
    PROJECTS.forEach(function (p) { if (p.id === currentProjectId) loaderLabel = p.name; });
  }
  loader.querySelector('b').textContent = loaderLabel;

  /* Expose project context for the 3D loader */
  window.OAA_LOADER = { projectId: currentProjectId, label: loaderLabel };

  var seen = false;
  try { seen = sessionStorage.getItem('oaa') === '1'; } catch (e) {}

  function start() {
    loader.classList.add('done');
    setTimeout(function () { body.classList.add('ready'); }, seen ? 50 : 350);
    try { sessionStorage.setItem('oaa','1'); } catch (e) {}
  }
  window.addEventListener('load', function () { setTimeout(start, (reduce || seen) ? 0 : 900); });
  window.addEventListener('pageshow', function (e) { if (e.persisted) curtain.classList.remove('on'); });

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https?:)/.test(href)) return;
    e.preventDefault();
    if (reduce) { location.href = href; return; }
    curtain.classList.add('on');
    setTimeout(function () { location.href = href; }, 650);
  });

  /* ---------- Header solid + parallax ---------- */
  var par = [].slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;

  function onScroll() {
    if (hd) hd.classList.toggle('solid', window.scrollY > 60);
    if (!reduce) par.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > innerHeight + 100) return;
      var s = parseFloat(el.getAttribute('data-parallax')) || 0.12;
      el.style.transform = 'translate3d(0,' + (r.top * -s).toFixed(1) + 'px,0)';
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  function observe() {
    var els = document.querySelectorAll('.rv:not(.in),.img-reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Custom cursor ---------- */
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
    var cur = document.createElement('div');
    cur.className = 'cursor'; cur.setAttribute('aria-hidden','true');
    body.appendChild(cur);

    var x = 0, y = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; });
    (function loop() {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      cur.style.left = cx + 'px';
      cur.style.top  = cy + 'px';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      cur.classList.toggle('big', !!(e.target.closest && e.target.closest('a,button,.card')));
    });
  }

  /* ============================================================
     WORK PAGE — filtering with re-ordering
     ============================================================ */
  function plural(n) { return n + (n > 1 ? ' projets' : ' projet'); }

  var grid = document.getElementById('grid');
  if (grid) {
    function renderCards(list) {
      grid.innerHTML = list.map(function (p) {
        return '<a class="card rv" data-cat="' + p.cat + '" href="project.html?id=' + p.id + '">' +
          '<div class="frame">' + vis(p, 0) + '</div>' +
          '<div class="meta">' +
            '<div>' +
              '<h3>' + p.name + '</h3>' +
              '<span>' + p.loc + ' · ' + p.cat + (p.year ? ' · ' + p.year : '') + '</span>' +
            '</div>' +
            '<span>' + (p.year || '') + '</span>' +
          '</div>' +
        '</a>';
      }).join('');
      observe();
    }

    renderCards(PROJECTS);

    var cnt = document.getElementById('count');
    if (cnt) cnt.textContent = plural(PROJECTS.length);

    var btns = [].slice.call(document.querySelectorAll('.filters button'));
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        var c = b.getAttribute('data-f');

        var sorted = PROJECTS.slice().sort(function (a, b2) {
          if (c === 'ALL') return 0;
          var am = a.cat === c ? 0 : 1;
          var bm = b2.cat === c ? 0 : 1;
          return am - bm;
        });

        renderCards(sorted);

        [].forEach.call(grid.children, function (card, idx) {
          var show = c === 'ALL' || card.getAttribute('data-cat') === c;
          if (!show) {
            setTimeout(function () { card.classList.add('hide'); }, 50 + idx * 30);
          }
        });

        var n = c === 'ALL'
          ? PROJECTS.length
          : PROJECTS.filter(function (p) { return p.cat === c; }).length;
        var s = document.getElementById('count');
        if (s) s.textContent = plural(n);
      });
    });
  }

  /* ---------- PROJECT DETAIL PAGE ---------- */
  var pd = document.getElementById('project');
  if (pd) {
    var id = new URLSearchParams(location.search).get('id');
    var i  = 0;
    PROJECTS.forEach(function (p, k) { if (p.id === id) i = k; });
    var p  = PROJECTS[i];

    /* Other projects, starting right after the current one */
    var others = PROJECTS.slice(i + 1).concat(PROJECTS.slice(0, i));

    function mqCard(o, hidden) {
      return '<a class="mq-card" href="project.html?id=' + o.id + '"' +
        (hidden ? ' aria-hidden="true" tabindex="-1"' : '') + '>' +
        '<div class="frame">' + vis(o, 0) + '</div>' +
        '<div class="meta"><div><h3>' + o.name + '</h3>' +
        '<span>' + o.loc + ' · ' + o.cat + (o.year ? ' · ' + o.year : '') + '</span></div></div>' +
      '</a>';
    }
    /* the list is rendered twice so the loop never shows a gap */
    var mqHTML = others.map(function (o) { return mqCard(o, false); }).join('') +
                 others.map(function (o) { return mqCard(o, true); }).join('');

    document.title = p.name + ' — Omar Alaoui Architectes';

    pd.innerHTML =
      '<section class="pd-hero">' +
        vis(p, 0).replace('class="ph', 'data-parallax=".15" class="ph') +
        '<div class="t"><span class="eyebrow" style="color:#ddd">' + p.cat + '</span><h1>' + p.name + '</h1></div>' +
      '</section>' +
      '<section><div class="wrap">' +
        '<dl class="info">' +
          '<div><dt>Lieu</dt><dd>' + p.loc + '</dd></div>' +
          '<div><dt>Catégorie</dt><dd>' + p.cat + '</dd></div>' +
          '<div><dt>Année</dt><dd>' + (p.year || 'À vérifier') + '</dd></div>' +
          '<div><dt>Photos</dt><dd>' + (getImgs(p).length ? 'Disponibles' : 'À venir') + '</dd></div>' +
        '</dl>' +
        '<div class="split">' +
          '<div><span class="eyebrow">Description</span><p class="lead">' + p.desc + '</p></div>' +
          '<div>' +
            '<span class="eyebrow">Concept architectural</span><p>' + p.concept + '</p><br>' +
            '<span class="eyebrow">Approche de conception</span><p>' + p.approach + '</p>' +
            '<p class="note">Descriptions, concept et année : textes provisoires en attendant la confirmation du cabinet.</p>' +
          '</div>' +
        '</div>' +
      '</div></section>' +
      '<section class="more" aria-label="Autres réalisations">' +
        '<div class="wrap"><span class="eyebrow">Découvrir aussi</span><h2>Autres réalisations</h2></div>' +
        '<div class="mq"><div class="mq-track" id="mq-track">' + mqHTML + '</div></div>' +
      '</section>';

    /* rotation speed: about 6 seconds per project */
    var mqTrack = document.getElementById('mq-track');
    if (mqTrack) mqTrack.style.animationDuration = Math.max(20, others.length * 6) + 's';

    par = [].slice.call(document.querySelectorAll('[data-parallax]'));
  }

  /* ---------- CONTACT FORM ---------- */
  var form = document.getElementById('cform');
  if (form) {
    var rules = {
      name:    function (v) { return v.trim().length >= 2 ? '' : 'Veuillez saisir votre nom.'; },
      email:   function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Veuillez saisir une adresse e-mail valide.'; },
      subject: function (v) { return v ? '' : 'Veuillez choisir un sujet.'; },
      message: function (v) { return v.trim().length >= 10 ? '' : 'Votre message doit contenir au moins 10 caractères.'; }
    };
    function check(el) {
      var m = rules[el.name](el.value);
      var s = el.parentElement.querySelector('.err');
      s.textContent = m;
      el.setAttribute('aria-invalid', m ? 'true' : 'false');
      return !m;
    }
    [].forEach.call(form.querySelectorAll('input,select,textarea'), function (el) {
      el.addEventListener('blur',  function () { check(el); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') check(el); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      [].forEach.call(form.querySelectorAll('input,select,textarea'), function (el) {
        if (!check(el)) { ok = false; first = first || el; }
      });
      var box = document.getElementById('ok');
      if (!ok) { first.focus(); box.classList.remove('show'); return; }
      box.classList.add('show'); box.focus(); form.reset();
    });
  }

  observe();
})();
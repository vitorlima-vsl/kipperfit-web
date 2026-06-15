/* =========================================================================
   KipperFit Personal — Landing Page (standalone vanilla JS)
   Ported from the React/Expo web landing. No framework, no build step.
   ========================================================================= */
(function () {
  'use strict';

  // ----- config -----
  var PLAY_STORE_URL = 'https://play.google.com/store/apps';
  var APP_STORE_URL = 'https://www.apple.com/app-store/';
  var LOGO = 'assets/logo.png';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  /* ======================================================================
     ICONS (inline SVG — Feather-style stroke + duotone feature icons)
     ====================================================================== */
  function stroke(inner, sw) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) +
      '" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }
  var ICONS = {
    users: stroke('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    userPlus: stroke('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>'),
    arrow: stroke('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'),
    chevron: stroke('<polyline points="9 18 15 12 9 6"/>'),
    bell: stroke('<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'),
    trophy: stroke('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>'),
    book: stroke('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'),
    chart: stroke('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),
    clipboard: stroke('<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/>'),
    activity: stroke('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
    dumbbell: stroke('<path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/>'),
    dumbbellChip: stroke('<path d="m6.5 6.5 11 11M21 21l-1-1M3 3l1 1m14 17 4-4M2 6l4-4m-3 8 7-7m4 18 7-7"/>'),
    check: stroke('<polyline points="20 6 9 17 4 12"/>'),
    home: stroke('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),
    menu: stroke('<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>'),
    link: stroke('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
    heart: stroke('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'),
    target: stroke('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.044zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',
    checkMini: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor" fill-opacity="0.14"/><path d="m8 12 2.5 2.5L16 9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  // duotone feature icons
  function duo(inner) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }
  var FEAT_ICONS = {
    students: duo('<rect x="2.5" y="5" width="19" height="14" rx="3" fill="currentColor" fill-opacity="0.12"/><circle cx="8.5" cy="11" r="2.4"/><path d="M5 16.2c.5-1.7 2-2.6 3.5-2.6s3 .9 3.5 2.6"/><path d="M15 10h4M15 13.5h3"/>'),
    library: duo('<path d="M12 6.5C10.5 5.3 8.5 5 6.5 5S3 5.4 3 5.4V18s2-.6 3.5-.6 3.5.6 5.5 1.6c2-1 4-1.6 5.5-1.6s3.5.6 3.5.6V5.4S19.5 5 18 5s-3.5.3-5 1.5z" fill="currentColor" fill-opacity="0.12"/><path d="M12 6.5v12.5"/><path d="M8 11.5h0M8.8 10.3v2.4M7.2 10.3v2.4"/>'),
    assessment: duo('<rect x="4.5" y="4" width="15" height="17" rx="3" fill="currentColor" fill-opacity="0.12"/><path d="M9 4.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4.5V6H9z" fill="currentColor" fill-opacity="0.25"/><path d="M8.5 12.5l1.6 1.6 3.4-3.6"/><path d="M8.5 17.5h7"/>'),
    progress: duo('<rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" fill-opacity="0.12"/><path d="M7 15l3-3 2.2 2.2L17 9"/><circle cx="17" cy="9" r="1.3" fill="currentColor"/>')
  };

  /* ======================================================================
     STORE BADGES
     ====================================================================== */
  var GOOGLE_SVG = '<svg viewBox="0 0 512 512" aria-hidden="true"><path fill="#00d4ff" d="M48 59.5v393c0 5 2.6 9.6 6.9 12.2L278 256 54.9 47.3A14.2 14.2 0 0 0 48 59.5z"/><path fill="#00f076" d="M54.9 47.3 278 256l60.7-60.7L92.7 56.9c-13-7.2-27.5-7.5-37.8-9.6z"/><path fill="#ffd900" d="M428.3 230.2 348.9 185 278 256l70.9 71 79.4-45.2c18.3-10.4 18.3-41.2 0-51.6z"/><path fill="#ff3a44" d="M54.9 464.7c10.3-2.1 24.8-2.4 37.8-9.6l246-138.4L278 256 54.9 464.7z"/></svg>';
  var APPLE_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.23 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.29-1.27 3.15-2.53.99-1.45 1.4-2.85 1.42-2.93-.03-.01-2.72-1.04-2.75-4.13zM14.53 4.4c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.58 3.04-1.45z"/></svg>';
  function storesHTML() {
    return (
      '<a class="lp-store-btn" href="' + PLAY_STORE_URL + '" target="_blank" rel="noreferrer">' +
        GOOGLE_SVG +
        '<span class="lp-store-txt"><span class="lp-store-small">DISPONÍVEL NO</span><span class="lp-store-big">Google Play</span></span>' +
      '</a>' +
      '<a class="lp-store-btn" href="' + APP_STORE_URL + '" target="_blank" rel="noreferrer">' +
        APPLE_SVG +
        '<span class="lp-store-txt"><span class="lp-store-small">BAIXE NA</span><span class="lp-store-big">App Store</span></span>' +
      '</a>'
    );
  }

  /* ======================================================================
     APP SCREENS (recreated KipperFit UI inside the phone) — return HTML
     ====================================================================== */
  function header() {
    return '<div class="appui-header"><div class="appui-brand"><img src="' + LOGO + '" alt="" />' +
      '<span>KIPPERFIT<span class="thin">PERSONAL</span></span></div>' +
      '<div class="appui-bell">' + ICONS.bell + '<span class="bdot"></span></div></div>';
  }
  function bottomNav(active) {
    active = active == null ? 1 : active;
    var tabs = [ICONS.link, ICONS.home, ICONS.menu];
    var items = tabs.map(function (ic, i) {
      return '<div class="appui-navitem' + (i === active ? ' active' : '') + '">' + ic + '</div>';
    }).join('');
    var left = (active + 0.5) * (100 / 3);
    return '<div class="appui-nav"><span class="appui-nav-ind" style="left:' + left + '%"></span>' + items + '</div>';
  }
  function card(ic, t, s, go, solid) {
    return '<div class="appui-card' + (solid ? ' solid' : '') + '"><div class="ci">' + ic + '</div>' +
      '<div><div class="ct">' + t + '</div><div class="cs">' + s + '</div></div>' +
      (go ? '<div class="cgo">' + go + '</div>' : '') + '</div>';
  }

  var STUDENTS = [
    { i: 'AC', n: 'Ana Carolina', g: 'Hipertrofia', c: '#10b981' },
    { i: 'BM', n: 'Bruno Martins', g: 'Emagrecimento', c: '#10b981' },
    { i: 'CF', n: 'Carla Ferreira', g: 'Condicionamento', c: '#10b981' },
    { i: 'DR', n: 'Diego Ramos', g: 'Força', c: '#f97316' },
    { i: 'ES', n: 'Elaine Souza', g: 'Hipertrofia', c: '#10b981' }
  ];
  var BARS = [42, 58, 50, 72, 64, 88, 80];
  var DAYS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  var EXERCISES = [
    { n: 'Supino reto', m: 'Peito · Barra', s: '4 x 10' },
    { n: 'Crucifixo inclinado', m: 'Peito · Halteres', s: '3 x 12' },
    { n: 'Desenvolvimento', m: 'Ombro · Halteres', s: '4 x 10' },
    { n: 'Tríceps corda', m: 'Tríceps · Polia', s: '3 x 15' }
  ];
  var ASSESSMENTS = [
    { n: 'Avaliação física', m: 'Dobras · circunferências', ic: ICONS.clipboard, tag: 'Pronto' },
    { n: 'Anamnese', m: 'Histórico e objetivos', ic: ICONS.check, tag: 'Pronto' },
    { n: 'Postural', m: 'Análise de desvios', ic: ICONS.activity, tag: 'Novo' },
    { n: 'Neuromotora', m: 'Força e mobilidade', ic: ICONS.heart, tag: 'Novo' }
  ];
  var CHALLENGES = [
    { n: 'Desafio 30 dias', m: '48 participantes' },
    { n: 'Verão em forma', m: '32 participantes' },
    { n: 'Bora treinar', m: '21 participantes' }
  ];

  function metricsBlock(third) {
    return '<div class="appui-metrics">' +
      '<div class="appui-metric"><span class="mdot" style="background:#10b981"></span><span class="mn">245</span><span class="ml">Ativos</span></div>' +
      '<div class="appui-mdiv"></div>' +
      '<div class="appui-metric"><span class="mdot" style="background:#f97316"></span><span class="mn">5</span><span class="ml">Inativos</span></div>' +
      '<div class="appui-mdiv"></div>' +
      third +
      '</div>';
  }

  var SCREENS = {
    home: function () {
      return '<div class="appui">' + header() + '<div class="appui-body">' +
        '<div class="appui-greet"><div class="appui-avatar">P</div><div><div class="hi">Bem-vindo de volta</div><div class="nm">Professor</div></div></div>' +
        metricsBlock('<div class="appui-metric"><span class="mdot" style="background:#081095"></span><span class="mn">3</span><span class="ml">Pendentes</span></div>') +
        '<div class="appui-pills"><span class="appui-pill">' + ICONS.userPlus + ' Novo Aluno</span><span class="appui-pill">' + ICONS.chart + ' Relatórios</span></div>' +
        card(ICONS.users, 'Seus Alunos', 'Gerencie alunos, rotinas e avaliações', ICONS.arrow) +
        '<div class="appui-label">Desafios</div>' +
        card(ICONS.trophy, 'Grupos de Desafio', 'Crie desafios e convide participantes', ICONS.chevron) +
        card(ICONS.book, 'Biblioteca de Treinos', 'Modelos, pastas e exercícios', ICONS.chevron, true) +
        '</div></div>';
    },
    students: function () {
      var rows = STUDENTS.map(function (s) {
        return '<div class="appui-srow"><div class="appui-sav">' + s.i + '<span class="sdot" style="background:' + s.c + '"></span></div>' +
          '<div class="appui-sinfo"><div class="appui-sname">' + s.n + '</div><span class="appui-sbadge">' + s.g + '</span></div>' +
          '<div class="appui-wa">' + ICONS.whatsapp + '</div></div>';
      }).join('');
      return '<div class="appui">' + header() + '<div class="appui-body">' +
        '<div class="appui-label">Seus Alunos</div>' +
        metricsBlock('<div class="appui-metric"><span class="mdot" style="background:#ef4444"></span><span class="mn">2</span><span class="ml">Excluídos</span></div>') +
        '<div class="appui-list">' + rows + '</div></div></div>';
    },
    progress: function () {
      var bars = BARS.map(function (h, i) {
        var cls = i === 5 ? '' : (i % 3 === 0 ? ' muted' : '');
        return '<div class="appui-bar' + cls + '" style="height:' + h + '%"></div>';
      }).join('');
      var xs = DAYS.map(function (d) { return '<span>' + d + '</span>'; }).join('');
      return '<div class="appui">' + header() + '<div class="appui-body">' +
        '<div class="appui-label">Progresso</div>' +
        '<div class="appui-chartcard"><div class="cct">Frequência semanal</div><div class="ccs">Presenças nos últimos 7 dias</div>' +
        '<div class="appui-bars">' + bars + '</div><div class="appui-bars-x">' + xs + '</div></div>' +
        card(ICONS.chart, 'Carga total +18%', 'Comparado ao mês anterior') +
        '<div class="appui-card"><div class="ci" style="background:#eafaf0;color:#10b981">' + ICONS.check + '</div>' +
        '<div><div class="ct">92% de adesão</div><div class="cs">Treinos concluídos no período</div></div></div>' +
        '</div></div>';
    },
    workout: function () {
      var rows = EXERCISES.map(function (e, i) {
        return '<div class="appui-exrow"><div class="appui-exidx">' + (i + 1) + '</div>' +
          '<div class="appui-exinfo"><div class="appui-exname">' + e.n + '</div><div class="appui-exmeta">' + e.m + '</div></div>' +
          '<div class="appui-exsets">' + e.s + '</div></div>';
      }).join('');
      return '<div class="appui">' + header() + '<div class="appui-body">' +
        '<div class="appui-label">Treino A · Superiores</div>' +
        card(ICONS.dumbbell, 'Hipertrofia · Semana 3', '4 exercícios · ~52 min', ICONS.clipboard, true) +
        rows + '</div></div>';
    },
    assessments: function () {
      var rows = ASSESSMENTS.map(function (a) {
        return '<div class="appui-card"><div class="ci">' + a.ic + '</div>' +
          '<div><div class="ct">' + a.n + '</div><div class="cs">' + a.m + '</div></div>' +
          '<div class="appui-pilltag">' + a.tag + '</div></div>';
      }).join('');
      return '<div class="appui">' + header() + '<div class="appui-body">' +
        '<div class="appui-label">Avaliações</div>' +
        card(ICONS.clipboard, 'Nova avaliação', 'Física, postural ou neuromotora', ICONS.chevron, true) +
        rows + '</div></div>';
    },
    challenges: function () {
      var rows = CHALLENGES.map(function (c) {
        return '<div class="appui-card"><div class="ci">' + ICONS.trophy + '</div>' +
          '<div><div class="ct">' + c.n + '</div><div class="cs">' + c.m + '</div></div>' +
          '<div class="appui-pilltag">Ativo</div></div>';
      }).join('');
      return '<div class="appui">' + header() + '<div class="appui-body">' +
        '<div class="appui-label">Desafios & Grupos</div>' +
        card(ICONS.trophy, 'Criar desafio', 'Convide alunos e defina metas', ICONS.chevron, true) +
        rows + '</div></div>';
    }
  };

  var PHONE_SCREENS = ['home', 'students', 'workout', 'progress', 'assessments', 'challenges'];

  var CASES = [
    { name: 'Treinos & Rotinas', desc: 'Monte planilhas e reutilize modelos em minutos', tags: ['Treinos', 'Biblioteca'], screen: 'workout' },
    { name: 'Gestão de Alunos', desc: 'Cadastro, grupos e acompanhamento individual', tags: ['Alunos', 'CRM'], screen: 'students' },
    { name: 'Avaliações', desc: 'Física, postural, neuromotora e anamnese', tags: ['Avaliação', 'Saúde'], screen: 'assessments' },
    { name: 'Progresso Real', desc: 'Cargas, evolução e resultados em gráficos', tags: ['Progresso', 'Dados'], screen: 'progress' },
    { name: 'Desafios', desc: 'Engaje seus alunos com metas em grupo', tags: ['Desafios', 'Social'], screen: 'challenges' },
    { name: 'Painel inicial', desc: 'Tudo que importa do seu dia, num só lugar', tags: ['Início', 'Resumo'], screen: 'home' }
  ];

  var FEATURES = [
    { ic: FEAT_ICONS.students, cls: '', t: 'Gestão completa de alunos', b: 'Cadastre alunos, organize em grupos e acompanhe cada evolução em um só painel.' },
    { ic: FEAT_ICONS.library, cls: 'alt', t: 'Biblioteca de treinos', b: 'Monte planilhas e reutilize modelos em segundos. Sua metodologia pronta para escalar.' },
    { ic: FEAT_ICONS.assessment, cls: 'alt2', t: 'Avaliações & anamneses', b: 'Físicas, posturais e neuromotoras com resultados estruturados e fáceis de comparar.' },
    { ic: FEAT_ICONS.progress, cls: '', t: 'Progresso e frequência', b: 'Cargas, presença e adesão em gráficos claros. Mostre ao aluno o quanto ele evoluiu.' }
  ];

  var HERO_POINTS = [
    'Rotinas e biblioteca de treinos',
    'Avaliações físicas e posturais',
    'Progresso e frequência em gráficos',
    'Desafios em grupo para engajar'
  ];

  /* ======================================================================
     BUILD STATIC CONTENT
     ====================================================================== */
  function buildHeadline() {
    var lines = ['Tudo que você', 'precisa para treinar', 'seus alunos com', 'excelência.'];
    var html = '';
    var charIndex = 0;
    lines.forEach(function (line, li) {
      line.split(' ').forEach(function (word) {
        var accent = (li === 3); // "excelência."
        html += '<span class="lp-reveal-word">';
        word.split('').forEach(function (ch) {
          var delay = (charIndex * 0.03).toFixed(2);
          charIndex += 1;
          html += '<span class="lp-reveal-char' + (accent ? ' accent' : '') + '" style="animation-delay:' + delay + 's">' + ch + '</span>';
        });
        charIndex += 1;
        html += '</span><span style="display:inline-block;width:0.28em"> </span>';
      });
    });
    $('#heroHeadline').innerHTML = html;
  }

  function buildHeroPoints() {
    $('#heroPoints').innerHTML = HERO_POINTS.map(function (p) {
      return '<li>' + ICONS.checkMini + ' ' + p + '</li>';
    }).join('');
  }

  function buildStores() {
    var slots = document.querySelectorAll('[data-stores], #download');
    slots.forEach(function (s) { s.innerHTML = storesHTML(); });
  }

  function buildFeatures() {
    $('#featList').innerHTML = FEATURES.map(function (f, i) {
      return '<div class="lp-feat-item lp-fade d' + ((i % 3) + 1) + '">' +
        '<div class="lp-feat-ico ' + f.cls + '">' + f.ic + '</div>' +
        '<div class="lp-feat-body"><h3>' + f.t + '</h3><p>' + f.b + '</p></div></div>';
    }).join('');
  }

  function buildPhoneStage() {
    var stage = $('#phoneStage');
    var chips = '<span class="lp-blob b1"></span><span class="lp-blob b2"></span><span class="lp-blob b3"></span>' +
      '<div class="lp-chip c1">' + FEAT_ICONS.students + '</div>' +
      '<div class="lp-chip c2">' + ICONS.dumbbellChip + '</div>' +
      '<div class="lp-chip c3">' + FEAT_ICONS.progress + '</div>' +
      '<div class="lp-chip c4">' + ICONS.trophy + '</div>' +
      '<div class="lp-chip c5">' + FEAT_ICONS.assessment + '</div>';
    var slides = PHONE_SCREENS.map(function (key, i) {
      return '<div class="lp-screen-slide' + (i === 0 ? ' active' : '') + '">' + SCREENS[key]() + '</div>';
    }).join('');
    stage.innerHTML = chips +
      '<div class="lp-phone"><div class="lp-phone-notch"></div>' +
      '<div class="lp-phone-screen"><div class="lp-screen-cycle">' + slides + '</div>' +
      bottomNav(1) + '</div></div>';
  }

  function buildCases() {
    $('#casesRow').innerHTML = CASES.map(function (c) {
      var tags = c.tags.map(function (t) { return '<span class="lp-case-tag">' + t + '</span>'; }).join('');
      return '<article class="lp-case-card"><div class="lp-case-media">' +
        '<div class="lp-case-tags">' + tags + '</div>' +
        '<div class="lp-case-phone"><div class="lp-case-phone-screen">' + SCREENS[c.screen]() + bottomNav(1) + '</div></div>' +
        '</div><div class="lp-case-name">' + c.name + '</div><div class="lp-case-desc">' + c.desc + '</div></article>';
    }).join('');
  }

  function fillStaticIcons() {
    document.querySelectorAll('[data-icon]').forEach(function (n) {
      var k = n.getAttribute('data-icon');
      if (k === 'arrow') n.outerHTML = ICONS.arrow;
      else if (k === 'target') n.outerHTML = ICONS.target;
    });
  }

  /* ======================================================================
     BEHAVIOUR
     ====================================================================== */
  function initPhoneCycle() {
    var slides = document.querySelectorAll('#phoneStage .lp-screen-slide');
    if (!slides.length) return;
    var active = 0;
    setInterval(function () {
      slides[active].classList.remove('active');
      active = (active + 1) % slides.length;
      slides[active].classList.add('active');
    }, 2800);
  }

  function initScrollReveal() {
    var els = document.querySelectorAll('.lp-fade');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(function (e) { io.observe(e); });
  }

  function initMenu() {
    var burger = $('#burger');
    var menu = $('#mobileMenu');
    if (!burger || !menu) return;
    function close() { burger.classList.remove('open'); menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('open');
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  }

  /* pinned horizontal carousel + section zoom — driven by window scroll */
  function initCarousel() {
    var wrap = $('#casesWrap');
    var row = $('#casesRow');
    var sticky = $('#casesSticky');
    if (!wrap || !row) return;

    var PAN_END = 0.72;
    var ZOOM_START = 0.9;
    function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    var raf = 0, targetX = 0, currentX = 0, running = false;

    function compute() {
      var viewH = window.innerHeight;
      var rect = wrap.getBoundingClientRect();
      var total = wrap.offsetHeight - viewH;
      var progress = Math.min(1, Math.max(0, -rect.top / total));
      var maxX = Math.max(0, row.scrollWidth - row.clientWidth);
      var panT = Math.min(1, progress / PAN_END);
      targetX = -easeInOut(panT) * maxX;
      var z = Math.max(0, (progress - ZOOM_START) / (1 - ZOOM_START));
      if (sticky) {
        sticky.style.transform = 'scale(' + (1 - z * 0.07) + ')';
        sticky.style.filter = z > 0 ? 'blur(' + (z * 4) + 'px)' : '';
        sticky.style.opacity = String(1 - z * 0.22);
      }
    }
    function tick() {
      currentX += (targetX - currentX) * 0.14;
      if (Math.abs(targetX - currentX) < 0.4) currentX = targetX;
      row.style.transform = 'translate3d(' + currentX + 'px,0,0)';
      if (Math.abs(targetX - currentX) > 0.4) { raf = requestAnimationFrame(tick); }
      else { running = false; }
    }
    function kick() { if (!running) { running = true; raf = requestAnimationFrame(tick); } }
    function onScroll() {
      if (window.innerWidth <= 920) {
        row.style.transform = '';
        if (sticky) { sticky.style.transform = ''; sticky.style.filter = ''; sticky.style.opacity = ''; }
        return;
      }
      compute(); kick();
    }
    onScroll();
    currentX = targetX;
    row.style.transform = 'translate3d(' + currentX + 'px,0,0)';
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ======================================================================
     INIT
     ====================================================================== */
  function init() {
    $('#copyright').textContent = '© ' + new Date().getFullYear() + ' KipperFit Personal. Todos os direitos reservados.';
    fillStaticIcons();
    buildHeadline();
    buildHeroPoints();
    buildStores();
    buildFeatures();
    buildPhoneStage();
    buildCases();
    initPhoneCycle();
    initScrollReveal();
    initMenu();
    initCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

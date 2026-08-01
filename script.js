document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('year').textContent = new Date().getFullYear();

  /* Header sólido al hacer scroll */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* Menú móvil */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  navToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- TRAS LA RUTA ---------- */
  const rutaPhotos = document.getElementById('rutaPhotos');
  if (rutaPhotos && typeof RUTA_DATA !== 'undefined') {
    RUTA_DATA.forEach(r => {
      const img = document.createElement('img');
      img.src = r.img; img.alt = r.alt; img.loading = 'lazy';
      rutaPhotos.appendChild(img);
    });
  }

  /* ---------- LA OTRA COLOMBIA (masonry + filtros + lightbox) ---------- */
  const grid = document.getElementById('museumGrid');
  const filtersEl = document.getElementById('filters');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCat = document.getElementById('lightboxCat');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbStory = document.getElementById('lightboxStory');

  if (grid && typeof PORTFOLIO_DATA !== 'undefined') {
    const categories = ['Todas', ...new Set(PORTFOLIO_DATA.map(p => p.category))];

    function renderGrid(filter) {
      grid.innerHTML = '';
      const items = filter === 'Todas' ? PORTFOLIO_DATA : PORTFOLIO_DATA.filter(p => p.category === filter);
      items.forEach(p => {
        const art = document.createElement('article');
        art.className = 'museum-item';
        art.innerHTML = `
          <div class="frame">
            <img src="${p.img}" alt="${p.title} — ${p.category}" loading="lazy">
          </div>
          <div class="meta">
            <div class="cat">${p.category}</div>
            <h3>${p.title}</h3>
            <p class="story">${p.story}</p>
          </div>`;
        art.querySelector('.frame').addEventListener('click', () => openLightbox(p));
        grid.appendChild(art);
      });
    }

    function openLightbox(p) {
      lbImg.src = p.img; lbImg.alt = p.title;
      lbCat.textContent = p.category;
      lbTitle.textContent = p.title;
      lbStory.textContent = p.story;
      lightbox.classList.add('open');
    }
    document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });

    if (filtersEl) {
      categories.forEach((c, i) => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (i === 0 ? ' active' : '');
        btn.textContent = c;
        btn.addEventListener('click', () => {
          filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderGrid(c);
        });
        filtersEl.appendChild(btn);
      });
    }
    renderGrid('Todas');
  }

  /* ---------- EPISODIOS / VIDEO MODAL (sin iframe hasta hacer clic) ---------- */
  const episodesGrid = document.getElementById('episodesGrid');
  const videoModal = document.getElementById('videoModal');
  const videoModalInner = document.getElementById('videoModalInner');

  function openVideoModal(id) {
    videoModalInner.innerHTML = `
      <button class="video-modal-close" id="videoModalClose" aria-label="Cerrar">×</button>
      <iframe src="https://www.youtube.com/embed/${id}?autoplay=1"
        title="Video de El Rollo de Fili"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen loading="lazy"></iframe>`;
    videoModal.classList.add('open');
    document.getElementById('videoModalClose').addEventListener('click', closeVideoModal);
  }
  function closeVideoModal() {
    videoModal.classList.remove('open');
    videoModalInner.innerHTML = '<button class="video-modal-close" id="videoModalClose" aria-label="Cerrar">×</button>';
  }
  videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeVideoModal(); });

  if (episodesGrid && typeof VIDEOS_DATA !== 'undefined') {
    VIDEOS_DATA.forEach(v => {
      const card = document.createElement('div');
      card.className = 'episode-card';
      card.innerHTML = `
        <div class="thumb-wrap">
          <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy">
          <div class="play-mini"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7Z"/></svg></div>
        </div>`;
      card.addEventListener('click', () => openVideoModal(v.id));
      episodesGrid.appendChild(card);
    });
  }

  /* ---------- LIBROS ---------- */
  const booksGrid = document.getElementById('booksGrid');
  if (booksGrid && typeof BOOKS_DATA !== 'undefined') {
    BOOKS_DATA.forEach(b => {
      const item = document.createElement('div');
      item.className = 'book-item';
      item.innerHTML = `
        <div class="cover"><img src="${b.img}" alt="Portada de ${b.title}" loading="lazy"></div>
        <div class="byear">${b.year}</div>
        <h4>${b.title}</h4>
        <p class="bdesc">${b.desc}</p>`;
      booksGrid.appendChild(item);
    });
  }

  /* ---------- PRENSA ---------- */
  function renderPress(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el || !items) return;
    items.forEach(p => {
      const card = document.createElement('div');
      card.className = 'press-card';
      card.innerHTML = `
        <span class="src-tag"></span>
        <div class="source">${p.source}</div>
        <p>${p.text}</p>
        <a href="${p.url}" target="_blank" rel="noopener">Leer más →</a>`;
      el.appendChild(card);
    });
  }
  if (typeof PRESS_DATA !== 'undefined') {
    renderPress('pressN1', PRESS_DATA.nivel1);
    renderPress('pressN2', PRESS_DATA.nivel2);
    renderPress('pressN3', PRESS_DATA.nivel3);
  }

  /* ---------- ALIANZAS ---------- */
  const alliancesGrid = document.getElementById('alliancesGrid');
  if (alliancesGrid && typeof ALLIANCES_DATA !== 'undefined') {
    ALLIANCES_DATA.forEach(a => {
      const card = document.createElement('div');
      card.className = 'alliance-card';
      const initial = a.name.trim().charAt(0).toUpperCase();
      card.innerHTML = `
        <div class="badge">${a.img ? `<img src="${a.img}" alt="${a.name}">` : initial}</div>
        <div class="name">${a.name}</div>`;
      alliancesGrid.appendChild(card);
    });
  }

  /* Cerrar overlays con Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox && lightbox.classList.remove('open');
      closeVideoModal();
      mobileNav.classList.remove('open');
    }
  });
});

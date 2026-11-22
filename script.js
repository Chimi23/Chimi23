(() => {
  const $ = (sel) => document.querySelector(sel);
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Navigation ---------- */
  const nav = $("#nav");
  const toggle = $(".nav-toggle");
  const links = $("#nav-links");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") setMenu(false); });

  /* ---------- Hero slideshow ---------- */
  const featured = PHOTOS.filter((p) => p.featured);
  const slides = featured.length ? featured : PHOTOS.slice(0, 3);
  const slideBox = $("#hero-slides");
  const dotBox = $("#hero-dots");
  let current = 0;
  let timer;

  slides.forEach((p, i) => {
    const img = document.createElement("img");
    img.src = p.src;
    img.alt = p.title;
    if (i > 0) img.loading = "lazy";
    slideBox.appendChild(img);

    const dot = document.createElement("button");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Show “${p.title}”`);
    dot.addEventListener("click", () => { showSlide(i); restart(); });
    dotBox.appendChild(dot);
  });

  function showSlide(i) {
    current = (i + slides.length) % slides.length;
    [...slideBox.children].forEach((el, j) => el.classList.toggle("active", j === current));
    [...dotBox.children].forEach((el, j) => el.setAttribute("aria-selected", String(j === current)));
  }
  function restart() {
    clearInterval(timer);
    if (slides.length > 1) timer = setInterval(() => showSlide(current + 1), 6000);
  }
  showSlide(0);
  restart();

  /* ---------- Gallery ---------- */
  const gallery = $("#gallery");
  const filterBox = $("#filters");
  const categories = ["All", ...new Set(PHOTOS.map((p) => p.category))];
  let activeFilter = "All";

  const reveal = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("visible"); reveal.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px" })
    : null;

  const tiles = PHOTOS.map((p, index) => {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.type = "button";
    btn.setAttribute("aria-label", `Open “${p.title}”, ${p.location}`);
    btn.innerHTML = `
      <img src="${p.src}" alt="${p.title}" width="${p.w * 100}" height="${p.h * 100}" loading="lazy" decoding="async">
      <span class="tile-info"><strong>${p.title}</strong><span>${p.category} · ${p.location}</span></span>`;
    btn.addEventListener("click", () => openLightbox(index));
    gallery.appendChild(btn);
    reveal ? reveal.observe(btn) : btn.classList.add("visible");
    return btn;
  });

  categories.forEach((cat) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = cat;
    b.setAttribute("aria-pressed", String(cat === activeFilter));
    b.addEventListener("click", () => applyFilter(cat));
    filterBox.appendChild(b);
  });

  function applyFilter(cat) {
    activeFilter = cat;
    [...filterBox.children].forEach((b) => b.setAttribute("aria-pressed", String(b.textContent === cat)));
    PHOTOS.forEach((p, i) => tiles[i].classList.toggle("hidden", cat !== "All" && p.category !== cat));
  }

  const visibleIndexes = () =>
    PHOTOS.map((p, i) => i).filter((i) => activeFilter === "All" || PHOTOS[i].category === activeFilter);

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const lbImg = $("#lb-img");
  let lbIndex = 0;
  let lastFocus = null;

  function renderLightbox() {
    const p = PHOTOS[lbIndex];
    const order = visibleIndexes();
    lbImg.classList.add("loading");
    lbImg.onload = () => lbImg.classList.remove("loading");
    lbImg.src = p.src;
    lbImg.alt = p.title;
    $("#lb-title").textContent = p.title;
    $("#lb-meta").textContent = `${p.category} · ${p.location}`;
    $("#lb-count").textContent = `${order.indexOf(lbIndex) + 1} / ${order.length}`;
  }
  function openLightbox(i) {
    lastFocus = document.activeElement;
    lbIndex = i;
    renderLightbox();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $(".lb-close").focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function step(dir) {
    const order = visibleIndexes();
    lbIndex = order[(order.indexOf(lbIndex) + dir + order.length) % order.length];
    renderLightbox();
  }

  $(".lb-close").addEventListener("click", closeLightbox);
  $(".lb-prev").addEventListener("click", () => step(-1));
  $(".lb-next").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) {
      if (e.key === "Escape" && links.classList.contains("open")) setMenu(false);
      return;
    }
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "Tab") {
      // keep focus inside the lightbox
      const f = [...lb.querySelectorAll("button")];
      const idx = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  // swipe on touch screens
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX = null;
  });

  /* ---------- Contact form ---------- */
  // No backend: opens the visitor's email app with the message filled in.
  // Change CONTACT_EMAIL to your address, or point the form at a service like Formspree.
  const CONTACT_EMAIL = "hello@example.com";
  $("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent(`Photography enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    $("#form-note").textContent = "Opening your email app…";
  });
})();

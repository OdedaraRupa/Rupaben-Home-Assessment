(async function () {
  // import Swiper Js and  CSS
  const swiperCss = document.createElement("link");
  swiperCss.rel = "stylesheet";
  swiperCss.href =
    "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
  document.head.appendChild(swiperCss);

  // Inject Swiper JS
  const swiperJs = document.createElement("script");
  swiperJs.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
  swiperJs.onload = () => {
    initSwiper(); // call after script loads
  };
  document.head.appendChild(swiperJs);

  // --- Create overlay ---
  const overlay = document.createElement("div");
  overlay.id = "drawer-overlay";
  document.body.appendChild(overlay);

  // --- Create drawer ---
  const drawer = document.createElement("div");
  drawer.id = "sticky-drawer";
  drawer.innerHTML = `
    <div id="drawer-tab">
       <div class="drawer-name"> Sticky drawer </div>
       <div class="controls">
          <button class="nav-btn" id="drawer-prev" aria-label="Previous">&lt;</button>
          <div class="pages" id="drawer-pages">0 / 0</div>
          <button class="nav-btn" id="drawer-next" aria-label="Next">&gt;</button>
        </div>
      <div class="upcontrol"><span class="chevron"></span></div>
    </div>
     <div class="swiper" id="swiper">
        <div class="swiper-wrapper" id="swiper-wrapper"></div>
      </div>
  `;
  document.body.appendChild(drawer);

  const tab = document.getElementById("drawer-tab");
  const upcontrol = document.querySelector(".upcontrol");
  const slider = document.getElementById("swiper");
  const drawername = document.querySelector(".drawer-name");

  // --- Toggle drawer ---
  function toggleDrawer() {
    drawer.classList.toggle("open");
    slider.classList.toggle("open");
    overlay.classList.toggle("open");
    tab.classList.toggle("open");
  }

  upcontrol.addEventListener("click", toggleDrawer);
  overlay.addEventListener("click", toggleDrawer);
  drawername.addEventListener("click", toggleDrawer);

  // ---------- fetch Pokémon data ----------
  const res = await fetch("https://ghibliapi.vercel.app/films");
  const films = await res.json();

  // ---------- build slides ----------
  const wrapper = document.getElementById("swiper-wrapper");
  wrapper.innerHTML = ""; // clear
  films.forEach((film, idx) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.style.boxSizing = "border-box";
    slide.innerHTML = `
    <div class="slide-card">
      <div class="flip-wrap" id="flip-${idx}">
        <!-- FRONT -->
        <div class="flip-face flip-front">
          <div class="slide-header">
           
          <div style="display:flex; align-items:center;">
              <div class="slide-image">
                <img src="${film.image}" alt="${film.title}"
                  style="max-width:72px; max-height:72px; display:block;">
              </div>
              <div>
                <div class="slide-title">${film.title}</div>
                <div style="font-size:12px; color:#777;">
                  Director: ${film.director} (${film.release_date})
                </div>
              </div>
               <div style="display:flex; flex-direction:column;">
              <div class="tooltip-wrapper" title="More info">
                <div class="tooltip-icon">i</div>
                <div class="tooltip-bubble">Produced by: ${film.producer}</div>
              </div>
           </div>
            </div>
            
          </div>
          <div class="slide-desc">${film.description}</div>
          <div class="slide-footer">
            <button class="slide-btn flip-btn" data-flip-id="flip-${idx}">Flip</button>
            <div style="font-size:12px;color:#666">
              Slide ${idx + 1} of ${films.length}
            </div>
          </div>
        </div>

        <!-- BACK -->
        <div class="flip-face flip-back">
          <div style="display:flex; flex-direction:column; gap:8px; height:100%;">
            <div style="font-weight:700; font-size:16px;">${
              film.title
            } — details</div>
            <div style="font-size:13px; color:#444; flex:1; overflow:auto;">
              <p><strong>Director:</strong> ${film.director}</p>
              <p><strong>Producer:</strong> ${film.producer}</p>
              <p><strong>Release:</strong> ${film.release_date}</p>
              <p><strong>Rotten Tomatoes:</strong> ${film.rt_score}%</p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <button class="slide-btn flip-back-btn" data-flip-id="flip-${idx}">Back</button>
              <a class="slide-btn" href="https://ghibliapi.vercel.app" target="_blank" rel="noreferrer">API</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    wrapper.appendChild(slide);
  });

  //-----------Swiper Intialize---------

  function initSwiper() {
    new Swiper("#swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      navigation: {
        nextEl: "#drawer-next",
        prevEl: "#drawer-prev",
      },
      pagination: {
        el: "#drawer-pages",
        type: "fraction",
      },
      // Responsive breakpoints
      breakpoints: {
        640: { slidesPerView: 2 }, // tablets
        1024: { slidesPerView: 4 }, // desktop
      },
      effect: "slide", // can change to "fade" or "coverflow"
      grabCursor: true,
    });
  }

  // Flip button behavior
  document.querySelectorAll(".flip-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-flip-id");
      const el = document.getElementById(id);
      if (el) el.classList.toggle("flipped");
    });
  });
  document.querySelectorAll(".flip-back-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-flip-id");
      const el = document.getElementById(id);
      if (el) el.classList.remove("flipped");
    });
  });

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    slider.classList.remove("open");
    tab.classList.remove("open");
    overlay.classList.remove("open");
  }

  // close when hitting bottom of page
  function onScrollClose() {
    const scrolledToBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10;
    if (scrolledToBottom && drawer.classList.contains("open")) {
      closeDrawer();
    }
  }
  window.addEventListener("scroll", onScrollClose, { passive: true });
})();

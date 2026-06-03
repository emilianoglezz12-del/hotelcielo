/* =============================================================================
   HOTEL CIELO — main.js
   Vanilla JS · IIFE · sin módulos. El JS solo enriquece: el contenido
   crítico ya está en el HTML.
   ============================================================================= */
(function () {
  "use strict";

  var data = window.__CIELO__ || {};
  var brand = data.brand || {};

  /* ---------- helpers ---------- */
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  function escHTML(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---------- iconos SVG de servicios ---------- */
  var ICONS = {
    waves: '<svg viewBox="0 0 24 24"><path d="M2 8c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/></svg>',
    flame: '<svg viewBox="0 0 24 24"><path d="M12 2c1 3 4 4 4 8a4 4 0 1 1-8 0c0-1 .5-2 1-2.5C9 9 8 11 8 13a4 4 0 0 0 8 0"/><path d="M12 2C9 5 6 7 6 12a6 6 0 0 0 12 0c0-3-2-5-3-7"/></svg>',
    umbrella: '<svg viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M12 21a2 2 0 0 0 4 0"/><path d="M3 12a9 9 0 0 1 18 0c-2-1.2-3.5-1.2-4.5 0-1-1.2-2.5-1.2-3 0-.5-1.2-2-1.2-3 0C9 10.8 5 10.8 3 12Z"/></svg>',
    key: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="4"/><path d="M11 11l9 9"/><path d="M17 17l2-2"/><path d="M19 19l2-2"/></svg>'
  };

  /* =========================================================================
     MOUNTS — idempotentes (no duplican si ya hay contenido)
     ========================================================================= */
  function mountRooms() {
    var track = $("[data-rooms-track]");
    if (!track || !data.rooms || track.querySelector(".room-card")) return;
    var total = data.rooms.length;
    track.innerHTML = data.rooms.map(function (r, i) {
      var n = String(i + 1).padStart(2, "0");
      var tot = String(total).padStart(2, "0");
      return '' +
        '<article class="room-card" data-room style="--accent:' + escHTML(r.accent || "#3DD6C8") + '">' +
          '<span class="room-card-rule"></span>' +
          '<div class="room-card-bg" style="background-image:url(\'' + escHTML(r.photo) + '\')"></div>' +
          '<div class="room-card-veil"></div>' +
          '<div class="room-card-body">' +
            '<p class="room-card-index">' + n + ' / ' + tot + '</p>' +
            '<h3>' + escHTML(r.name) + '</h3>' +
            '<div class="room-card-specs">' +
              '<span>👤 ' + escHTML(r.capacity) + '</span>' +
              '<span>🛏 ' + escHTML(r.beds) + '</span>' +
            '</div>' +
            '<p class="room-card-desc">' + escHTML(r.desc) + '</p>' +
            '<a class="btn" data-cursor-label="reservar" data-room-cta="' + escHTML(r.name) + '" href="#reserva">Consultar precio <span class="btn-arrow">→</span></a>' +
          '</div>' +
        '</article>';
    }).join("");
    var totalEl = $("[data-room-total]");
    if (totalEl) totalEl.textContent = String(total).padStart(2, "0");
  }

  function mountServices() {
    var grid = $("[data-services]");
    if (!grid || !data.services || grid.children.length > 0) return;
    grid.innerHTML = data.services.map(function (s, i) {
      var icon = ICONS[s.icon] || ICONS.waves;
      return '' +
        '<article class="service-card reveal" data-reveal style="--accent:' + escHTML(s.accent || "#3DD6C8") + '">' +
          '<span class="service-num">0' + (i + 1) + '</span>' +
          '<div class="service-icon">' + icon + '</div>' +
          '<h3>' + escHTML(s.name) + '</h3>' +
          '<p>' + escHTML(s.line) + '</p>' +
        '</article>';
    }).join("");
  }

  function mountGallery() {
    var wrap = $("[data-gallery]");
    if (!wrap || !data.gallery || wrap.children.length > 0) return;
    var imgs = data.gallery.slice();
    // 3 carriles repartidos
    var lanes = [[], [], []];
    imgs.forEach(function (src, i) { lanes[i % 3].push(src); });
    var speeds = ["lane-fast", "lane-slow", "lane-rev"];
    wrap.innerHTML = lanes.map(function (lane, idx) {
      // duplicamos para loop infinito
      var doubled = lane.concat(lane);
      var figs = doubled.map(function (src) {
        return '<figure><img src="' + escHTML(src) + '" alt="Ambiente de Hotel Cielo" loading="lazy" decoding="async"></figure>';
      }).join("");
      return '<div class="gallery-lane ' + speeds[idx] + '" data-lane="' + idx + '">' + figs + '</div>';
    }).join("");
  }

  /* =========================================================================
     ENRIQUECER ENLACES (WhatsApp / Maps / Facebook / teléfono)
     ========================================================================= */
  function waLink(text) {
    var num = (brand.whatsapp || "").replace(/[^0-9]/g, "");
    var base = "https://wa.me/" + num;
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }
  function enrichLinks() {
    var directMsg = "Hola Hotel Cielo 👋, me gustaría consultar disponibilidad y precio.";
    $$("[data-wa-direct]").forEach(function (a) { a.href = waLink(directMsg); });
    $$("[data-maps]").forEach(function (a) { if (brand.maps) a.href = brand.maps; });
    $$("[data-fb]").forEach(function (a) { if (brand.facebook) a.href = brand.facebook; });
    if (brand.whatsappPretty) $$("[data-wa-pretty]").forEach(function (e) { e.textContent = brand.whatsappPretty; });
  }

  /* =========================================================================
     FORMULARIO → WhatsApp
     ========================================================================= */
  function initForm() {
    var form = $("[data-reserve-form]");
    if (!form) return;
    // si pulsan "Consultar precio" de una habitación, lo recordamos
    var chosenRoom = "";
    $$("[data-room-cta]").forEach(function (a) {
      a.addEventListener("click", function () { chosenRoom = a.getAttribute("data-room-cta") || ""; });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var f = form.elements;
      var msg =
        "Hola Hotel Cielo 👋, quiero reservar.%0A%0A" +
        "• Nombre: " + (f.nombre.value || "—") + "%0A" +
        "• Teléfono: " + (f.telefono.value || "—") + "%0A" +
        "• Llegada: " + (f.llegada.value || "—") + "%0A" +
        "• Salida: " + (f.salida.value || "—") + "%0A" +
        "• Personas: " + (f.personas.value || "—") + "%0A" +
        (chosenRoom ? "• Habitación: " + chosenRoom + "%0A" : "") +
        (f.nota.value ? "• Nota: " + f.nota.value + "%0A" : "") +
        "%0A¿Me confirman disponibilidad y precio? ¡Gracias!";
      var num = (brand.whatsapp || "").replace(/[^0-9]/g, "");
      window.open("https://wa.me/" + num + "?text=" + msg, "_blank");
    });
  }

  /* =========================================================================
     SPLASH — doble red de seguridad (CSS 4.5s + JS)
     ========================================================================= */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    var hide = function () { splash.classList.add("is-out"); };
    if (document.readyState === "complete") setTimeout(hide, 700);
    else window.addEventListener("load", function () { setTimeout(hide, 500); });
    setTimeout(hide, 4000); // red de seguridad adicional
  }

  /* =========================================================================
     NAV + menú móvil
     ========================================================================= */
  function initNav() {
    var nav = $("[data-nav]");
    if (nav) {
      var onScroll = function () { nav.classList.toggle("is-stuck", window.scrollY > 40); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    var burger = $("[data-burger]");
    var menu = $("[data-mobile-menu]");
    if (burger && menu) {
      var toggle = function (open) {
        burger.classList.toggle("is-open", open);
        menu.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        menu.setAttribute("aria-hidden", open ? "false" : "true");
        document.body.style.overflow = open ? "hidden" : "";
      };
      burger.addEventListener("click", function () { toggle(!menu.classList.contains("is-open")); });
      $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { toggle(false); }); });
    }
  }

  /* =========================================================================
     SMOOTH SCROLL (nativo) para anclas
     ========================================================================= */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#" || id === "#top") {
        if (id === "#top") { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); }
        return;
      }
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* =========================================================================
     CURSOR PERSONALIZADO
     ========================================================================= */
  function initCursor() {
    if (!fineHover) return;
    var cursor = $("[data-cursor]");
    if (!cursor) return;
    var ring = $(".cursor-ring", cursor);
    var dot = $(".cursor-dot", cursor);
    var label = $(".cursor-label", cursor);
    var mx = 0, my = 0, rx = 0, ry = 0, first = false;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      if (!first) { first = true; rx = mx; ry = my; cursor.classList.add("is-ready"); }
    });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      requestAnimationFrame(loop);
    })();
    var HOVER = "a, button, [data-cursor-label], input, textarea, label";
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest(HOVER);
      if (t) {
        cursor.classList.add("is-hover");
        var lbl = t.getAttribute("data-cursor-label");
        if (lbl) label.textContent = lbl; else label.textContent = "";
      }
    });
    document.addEventListener("mouseout", function (e) {
      var t = e.target.closest(HOVER);
      if (t && !t.contains(e.relatedTarget)) cursor.classList.remove("is-hover");
    });
  }

  /* =========================================================================
     REVEALS — IntersectionObserver (threshold bajo) + red de seguridad 6s
     ========================================================================= */
  function initReveals() {
    var els = $$("[data-reveal]:not([data-split])");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
        });
      }, { threshold: 0.05, rootMargin: "0px 0px -4% 0px" });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("is-visible"); });
    }
    // red de seguridad: a los 6s, revela cualquier cosa visible aún oculta
    setTimeout(function () {
      $$("[data-reveal]:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight + 200) el.classList.add("is-visible");
      });
    }, 6000);
  }

  /* =========================================================================
     SPLIT TEXT por líneas (preserva <em>, <br>)
     ========================================================================= */
  function splitLines(el) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = "1";
    // envolvemos cada palabra para medir líneas, luego agrupamos por top
    var html = el.innerHTML;
    var temp = document.createElement("div");
    temp.innerHTML = html;
    var words = [];
    (function walk(node, em) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (/^\s+$/.test(w)) words.push({ space: true });
            else if (w.length) words.push({ text: w, em: em });
          });
        } else if (n.nodeName === "EM") {
          walk(n, true);
        } else if (n.nodeName === "BR") {
          words.push({ br: true });
        } else { walk(n, em); }
      });
    })(temp, false);

    el.innerHTML = words.map(function (w) {
      if (w.space) return " ";
      if (w.br) return "<br>";
      var open = w.em ? "<em>" : "", close = w.em ? "</em>" : "";
      return '<span class="sw" style="display:inline-block">' + open + escHTML(w.text) + close + "</span>";
    }).join("");

    // agrupar por línea según offsetTop
    var sws = $$(".sw", el);
    var lines = [], curTop = null, cur = null;
    sws.forEach(function (sw) {
      var top = sw.offsetTop;
      if (curTop === null || Math.abs(top - curTop) > 4) { cur = []; lines.push(cur); curTop = top; }
      cur.push(sw);
    });
    // reconstruir con wrappers de línea
    var lineHTML = lines.map(function (line) {
      var inner = line.map(function (sw) { return sw.outerHTML; }).join(" ");
      return '<span class="split-line"><span>' + inner + "</span></span>";
    }).join("");
    el.innerHTML = lineHTML;
    return $$(".split-line", el);
  }

  function initSplit() {
    $$("[data-split]").forEach(function (el) {
      if (el.classList.contains("reveal")) el.classList.remove("reveal");
      var lines;
      try { lines = splitLines(el); } catch (e) { return; }
      if (!lines || !lines.length) return;
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              lines.forEach(function (ln, i) { setTimeout(function () { ln.classList.add("is-in"); }, i * 90); });
              io.unobserve(en.target);
            }
          });
        }, { threshold: 0.05 });
        io.observe(el);
      } else {
        lines.forEach(function (ln) { ln.classList.add("is-in"); });
      }
    });
    // red de seguridad
    setTimeout(function () { $$(".split-line:not(.is-in)").forEach(function (l) { l.classList.add("is-in"); }); }, 6000);
  }

  /* =========================================================================
     MARQUEES (hero + footer) — animación JS continua
     ========================================================================= */
  function loopMarquee(track, speed) {
    if (!track) return;
    // duplicar contenido para loop sin huecos
    track.innerHTML += track.innerHTML;
    var x = 0;
    var half = track.scrollWidth / 2;
    function tick() {
      x -= speed;
      if (-x >= half) x += half;
      track.style.transform = "translate3d(" + x + "px,0,0)";
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function initMarquees() {
    loopMarquee($("[data-marquee]"), 0.6);
    loopMarquee($("[data-footer-banner]"), 0.4);
  }

  /* =========================================================================
     GALERÍA — 3 carriles a velocidades distintas
     ========================================================================= */
  function initGalleryLanes() {
    var lanes = $$("[data-lane]");
    lanes.forEach(function (lane) {
      var idx = parseInt(lane.getAttribute("data-lane"), 10);
      var speeds = [0.7, 0.35, -0.5];
      var speed = speeds[idx] || 0.5;
      var half = lane.scrollWidth / 2;
      var x = speed < 0 ? -half : 0;
      function tick() {
        x -= speed;
        if (speed > 0 && -x >= half) x += half;
        if (speed < 0 && x >= 0) x -= half;
        lane.style.transform = "translate3d(" + x + "px,0,0)";
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* =========================================================================
     HABITACIONES — pin horizontal (desktop, GSAP) / swipe (móvil)
     ========================================================================= */
  function initRoomsScroll() {
    var section = $("[data-rooms-section]");
    var pin = $("[data-rooms-pin]");
    var track = $("[data-rooms-track]");
    if (!section || !pin || !track) return;
    var cards = $$(".room-card", track);
    var progCurrent = $("[data-room-current]");
    var progBarHost = $(".rooms-progress i");

    function setProgress(p) {
      if (progBarHost) progBarHost.style.setProperty("--room-prog", (p * 100).toFixed(0) + "%");
      if (progCurrent && cards.length) {
        var idx = Math.min(cards.length, Math.max(1, Math.round(p * (cards.length - 1)) + 1));
        progCurrent.textContent = String(idx).padStart(2, "0");
      }
    }

    var isDesktop = matchMedia("(min-width: 960px)").matches;
    if (isDesktop && window.gsap && window.ScrollTrigger) {
      // pin + scroll horizontal
      var getDistance = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 32); };
      gsap.to(track, {
        x: function () { return -getDistance(); },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: function () { return "+=" + getDistance(); },
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: function (self) { setProgress(self.progress); }
        }
      });
    } else {
      // móvil: swipe nativo
      pin.style.overflowX = "auto";
      pin.style.scrollSnapType = "x mandatory";
      track.style.transform = "none";
      cards.forEach(function (c) { c.style.scrollSnapAlign = "center"; });
      pin.addEventListener("scroll", function () {
        var max = track.scrollWidth - pin.clientWidth;
        setProgress(max > 0 ? pin.scrollLeft / max : 0);
      }, { passive: true });
    }
    setProgress(0);
  }

  /* =========================================================================
     HERO parallax suave
     ========================================================================= */
  function initHeroParallax() {
    var bg = $(".hero-bg");
    if (!bg || !window.gsap || !window.ScrollTrigger) return;
    gsap.to(bg, {
      yPercent: 18, scale: 1.18, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  }

  /* =========================================================================
     BOOT
     ========================================================================= */
  function boot() {
    // evita que el navegador restaure el scroll y descuadre los ScrollTrigger
    try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (_) {}
    // 1. mounts primero
    safe(mountRooms, "mountRooms");
    safe(mountServices, "mountServices");
    safe(mountGallery, "mountGallery");
    // 2. enriquecer
    safe(enrichLinks, "enrichLinks");
    // 3. inits sin GSAP
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initForm, "initForm");
    safe(initCursor, "initCursor");
    safe(initReveals, "initReveals");
    safe(initSplit, "initSplit");
    safe(initMarquees, "initMarquees");
    safe(initGalleryLanes, "initGalleryLanes");
    // 4. GSAP
    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initHeroParallax, "initHeroParallax");
      safe(initRoomsScroll, "initRoomsScroll");
      // recalcula posiciones cuando todo (imágenes/fuentes) ha cargado
      window.addEventListener("load", function () { try { ScrollTrigger.refresh(); } catch (_) {} });
      setTimeout(function () { try { ScrollTrigger.refresh(); } catch (_) {} }, 1600);
    } else {
      safe(initRoomsScroll, "initRoomsScroll"); // cae a modo swipe
    }
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

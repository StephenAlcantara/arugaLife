/* ============================================================
   ARUGALIFE - interactions
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- sticky nav shadow ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          // small stagger for grouped items
          var delay = e.target.parentElement &&
            e.target.parentElement.children.length > 1
            ? (Array.prototype.indexOf.call(e.target.parentElement.children, e.target) % 4) * 90
            : 0;
          setTimeout(function () { e.target.classList.add("in"); }, delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- drifting leaves ---------- */
  var field = document.getElementById("leafField");
  if (field && !reduceMotion) {
    var COUNT = window.innerWidth < 680 ? 7 : 14;
    for (var i = 0; i < COUNT; i++) {
      var leaf = document.createElement("span");
      leaf.className = "leaf";
      var size = 14 + Math.random() * 20;
      leaf.style.left = Math.random() * 100 + "vw";
      leaf.style.width = size + "px";
      leaf.style.height = size + "px";
      leaf.style.animationDuration = 12 + Math.random() * 16 + "s";
      leaf.style.animationDelay = -Math.random() * 18 + "s";
      leaf.style.background =
        ["#5E8062", "#6E9466", "#A9C29D", "#E8A53C"][Math.floor(Math.random() * 4)];
      field.appendChild(leaf);
    }
  }

  /* ---------- CTA feedback ---------- */
  var ctaBtn = document.getElementById("ctaBtn");
  var ctaNote = document.getElementById("ctaNote");
  if (ctaBtn && ctaNote) {
    ctaBtn.addEventListener("click", function () {
      var input = ctaBtn.closest(".cta__form").querySelector("input");
      var val = (input.value || "").trim();
      if (val && /\S+@\S+\.\S+/.test(val)) {
        ctaNote.textContent = "Salamat! We'll send your free kumustahan invite to " + val + ".";
        input.value = "";
      } else {
        ctaNote.textContent = "Pakilagay ang valid email address para makapagsimula tayo.";
        input.focus();
      }
    });
  }
  /* ---------- custom cursor (fine pointer only) ---------- */
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (finePointer && !reduceMotion) {
    var dot = document.createElement("div");
    var ring = document.createElement("div");
    dot.className = "cursor-dot cursor-hidden";
    ring.className = "cursor-ring cursor-hidden";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add("has-cursor");

    var HOVER_SEL = "a, button, input, textarea, select, label, .card, .founder, .value, [role='button'], [tabindex]";
    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my;            // ring trails
    var scale = 1, scaleTarget = 1;
    var hovering = false, pressing = false, seen = false;

    document.addEventListener("pointermove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (!seen) {
        seen = true;
        dot.classList.remove("cursor-hidden");
        ring.classList.remove("cursor-hidden");
      }
    }, { passive: true });

    document.addEventListener("pointerdown", function (e) {
      pressing = true;
      var ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", function () { ripple.remove(); });
    }, { passive: true });

    document.addEventListener("pointerup", function () { pressing = false; }, { passive: true });
    document.addEventListener("mouseleave", function () {
      dot.classList.add("cursor-hidden"); ring.classList.add("cursor-hidden");
    });
    document.addEventListener("mouseenter", function () {
      if (seen) { dot.classList.remove("cursor-hidden"); ring.classList.remove("cursor-hidden"); }
    });

    var frame = 0;
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if ((frame++ & 1) === 0) {           // check hover every other frame
        var el = document.elementFromPoint(mx, my);
        var h = !!(el && el.closest && el.closest(HOVER_SEL));
        if (h !== hovering) {
          hovering = h;
          ring.classList.toggle("is-hover", hovering);
        }
      }
      scaleTarget = (hovering ? 1.7 : 1) * (pressing ? 0.7 : 1);
      scale += (scaleTarget - scale) * 0.2;
      dot.style.transform = "translate(" + (mx - 3.5) + "px," + (my - 3.5) + "px)";
      ring.style.transform = "translate(" + (rx - 17) + "px," + (ry - 17) + "px) scale(" + scale.toFixed(3) + ")";
      requestAnimationFrame(loop);
    })();
  }
})();

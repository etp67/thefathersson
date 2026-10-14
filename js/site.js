(function () {
  "use strict";

  var SITE = window.SITE || {};
  var links = SITE.links || {};
  var phoneHref = "tel:" + (SITE.phoneLink || "+17692080337");

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function openInNewTab(a, url) {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
  }

  /* ---------- Links from config ---------- */
  document.querySelectorAll(".js-link").forEach(function (a) {
    var url = links[a.dataset.link] || links[a.dataset.fallback];
    if (url) openInNewTab(a, url);
    else a.hidden = true;
  });

  document.querySelectorAll(".js-book").forEach(function (a) {
    if (links.booking) openInNewTab(a, links.booking);
    else a.href = phoneHref;
  });

  document.querySelectorAll(".footer-social").forEach(function (p) {
    if (!p.querySelector("a:not([hidden])")) p.hidden = true;
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("nav-list");
  if (toggle && navList) {
    toggle.addEventListener("click", function () {
      var open = navList.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    navList.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navList.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Reviews ---------- */
  var GOOGLE_ICON =
    '<svg class="review-source" viewBox="0 0 24 24" aria-label="Google review" role="img"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c1-2.9 3.6-4.9 6.7-4.9z"/></svg>';
  var FACEBOOK_ICON =
    '<svg class="review-source" viewBox="0 0 24 24" aria-label="Facebook review" role="img"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>';

  var reviews = SITE.reviews || [];
  var reviewList = document.getElementById("reviews-list");
  if (reviews.length) {
    reviews.forEach(function (r) {
      var fig = el("figure", "review");
      var top = el("div", "review-top");
      var rating = Math.max(0, Math.min(5, Math.round(r.rating || 5)));
      var stars = el("span", "stars", "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating));
      stars.setAttribute("aria-label", rating + " out of 5 stars");
      top.appendChild(stars);
      top.insertAdjacentHTML("beforeend", r.source === "facebook" ? FACEBOOK_ICON : GOOGLE_ICON);
      fig.appendChild(top);
      fig.appendChild(el("blockquote", null, "“" + r.text + "”"));
      var cap = el("figcaption", null, r.name || "Customer");
      if (r.date) cap.appendChild(el("span", null, " · " + r.date));
      fig.appendChild(cap);
      reviewList.appendChild(fig);
    });
  } else {
    document.getElementById("reviews-empty").hidden = false;
  }

  /* ---------- Gallery ---------- */
  var photos = SITE.gallery || [];
  var gallery = document.getElementById("gallery");
  var visible = [];

  function renderGallery(filter) {
    gallery.innerHTML = "";
    visible = photos.filter(function (p) {
      return filter === "all" || p.category === filter;
    });
    visible.forEach(function (p, i) {
      var tile = el("button", "tile");
      tile.type = "button";
      tile.setAttribute("aria-label", "View photo: " + (p.caption || "project photo"));
      var img = el("img");
      img.src = p.src;
      img.alt = p.caption || "";
      img.loading = "lazy";
      tile.appendChild(img);
      if (p.before) tile.appendChild(el("span", "tile-badge", "Before & After"));
      if (p.caption) tile.appendChild(el("span", "tile-caption", p.caption));
      tile.addEventListener("click", function () { openLightbox(i); });
      gallery.appendChild(tile);
    });
  }

  if (photos.length) {
    var cats = {};
    photos.forEach(function (p) { if (p.category) cats[p.category] = true; });
    var filters = document.querySelector(".filters");
    if (Object.keys(cats).length > 1) {
      filters.hidden = false;
      filters.querySelectorAll(".chip").forEach(function (chip) {
        var f = chip.dataset.filter;
        if (f !== "all" && !cats[f]) chip.hidden = true;
        chip.addEventListener("click", function () {
          filters.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
          chip.classList.add("is-active");
          renderGallery(f);
        });
      });
    }
    renderGallery("all");
  } else {
    document.getElementById("gallery-empty").hidden = false;
  }

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImages = lb.querySelector(".lb-images");
  var lbCaption = lb.querySelector("figcaption");
  var current = 0;
  var lastFocus = null;

  function addLbImage(src, label) {
    var wrap = el("div");
    var img = el("img");
    img.src = src;
    img.alt = label ? label : "";
    wrap.appendChild(img);
    if (label) wrap.appendChild(el("span", "tile-badge", label));
    lbImages.appendChild(wrap);
  }

  function showPhoto(i) {
    current = (i + visible.length) % visible.length;
    var p = visible[current];
    lbImages.innerHTML = "";
    if (p.before) {
      addLbImage(p.before, "Before");
      addLbImage(p.src, "After");
    } else {
      addLbImage(p.src);
    }
    lbCaption.textContent = p.caption || "";
    var multi = visible.length > 1;
    lb.querySelector(".lb-prev").hidden = !multi;
    lb.querySelector(".lb-next").hidden = !multi;
  }

  function openLightbox(i) {
    lastFocus = document.activeElement;
    showPhoto(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }

  function closeLightbox() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
  lb.querySelector(".lb-prev").addEventListener("click", function () { showPhoto(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { showPhoto(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft" && visible.length > 1) showPhoto(current - 1);
    else if (e.key === "ArrowRight" && visible.length > 1) showPhoto(current + 1);
  });
})();

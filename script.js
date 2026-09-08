/* ============================================================
   VENRA — Digital Atelier · interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- navbar scroll state ---------- */
  var navbar = document.getElementById("navbar");
  function onScrollNav() {
    if (window.scrollY > 24) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("navBurger");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    burger.classList.remove("open");
    mobileMenu.classList.remove("open");
  }
  burger.addEventListener("click", function () {
    burger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });
  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- scrollspy ---------- */
  var sections = ["home", "about", "services", "pricing", "contact"];
  var navLinks = document.querySelectorAll(".nav-link");

  function onScrollSpy() {
    var pos = window.scrollY + 140;
    var current = "home";
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= pos) current = id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", onScrollSpy, { passive: true });
  onScrollSpy();

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- animated counters ---------- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-target"), 10);
    if (isNaN(target)) return;
    var duration = 1300;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll(".stat-num[data-target]");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------- contact form -> WhatsApp ---------- */
  var form = document.getElementById("contactForm");
  var toast = document.getElementById("toast");
  var toastTimer = null;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 3600);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("cname").value.trim();
    var email = document.getElementById("cemail").value.trim();
    var service = document.getElementById("cservice").value;
    var message = document.getElementById("cmsg").value.trim();

    if (!name || !email || !message) {
      showToast("Please fill your name, email and message first.");
      return;
    }

    var text =
      "Hi VENRA! I'm " + name + ".\n" +
      "Email: " + email + "\n" +
      "Service needed: " + service + "\n" +
      "Project: " + message;

    var url =
      "https://wa.me/917020261668?text=" +
      encodeURIComponent(text);

    showToast("Opening WhatsApp with your message…");
    window.open(url, "_blank");
    form.reset();
  });

  /* ---------- hero typewriter ---------- */
  var twWords = [
    "Websites That Convert",
    "Portfolios That Impress",
    "Instagram That Grows",
    "E-Books That Sell",
    "Videos That Go Viral"
  ];
  var twEl = document.getElementById("twText");
  var doneTyping = false;
  if (twEl) {
    var twI = 0, twC = 0, twDel = false;
    function twTick() {
      var word = twWords[twI];
      twEl.textContent = word.slice(0, twC);
      var delay = twDel ? 45 : 85;
      if (!twDel && twC === word.length) {
        delay = 2000;
        twDel = true;
      } else if (twDel && twC === 0) {
        twDel = false;
        twI = (twI + 1) % twWords.length;
        delay = 420;
      } else {
        twC += twDel ? -1 : 1;
      }
      setTimeout(twTick, delay);
    }
    setTimeout(twTick, 900);
  }

  /* ---------- our work modal ---------- */
  var workModal = document.getElementById("workModal");
  var workClose = document.getElementById("workClose");
  var wmTitle = document.getElementById("wmTitle");
  var wmTagline = document.getElementById("wmTagline");
  var wmDetails = document.getElementById("wmDetails");
  var wmTags = document.getElementById("wmTags");
  var wmIcon = document.getElementById("wmIcon");
  var wmBanner = document.getElementById("wmBanner");

  var workIcons = {
    bag: '<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    user: '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    ig: '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    video: '<svg viewBox="0 0 24 24"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
    brief: '<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>'
  };

  var workData = [
    { icon: "bag", banner: "b1", title: "E-Commerce Store Website", tagline: "Online store for a fashion label — catalog, cart & secure payments.", details: "A complete online store with 40+ products, category filters, a smart cart and Razorpay payment integration — all loading in roughly 1.2 seconds. The store doubled its monthly orders within 8 weeks of launch.", tags: ["Web Dev", "UI/UX", "Payments"] },
    { icon: "user", banner: "b2", title: "Creator Portfolio", tagline: "A bold one-page portfolio for a content creator that started winning clients in days.", details: "Personal brand site with a custom monogram identity, animated hero, showcase grid and a contact form wired straight to WhatsApp. Enquiries began arriving within the first week of launch.", tags: ["Portfolio", "Branding", "SEO"] },
    { icon: "ig", banner: "b3", title: "Instagram Growth Campaign", tagline: "Full-feed takeover for a boutique — reels, stories & strategy.", details: "90 days of end-to-end Instagram management: 30+ reels, daily stories, DM handling and monthly analytics reports. Followers grew 128% and enquiries tripled during the period.", tags: ["Instagram", "Reels", "Strategy"] },
    { icon: "book", banner: "b4", title: "Coaching E-Book", tagline: "A 60-page e-book designed, laid out and ready to publish.", details: "Complete e-book production: custom cover art, professional interior layout, a clear typography system and PDF + Kindle exports. Delivered in 12 days with 3 revision rounds included.", tags: ["E-Book", "Cover Art", "Layout"] },
    { icon: "video", banner: "b5", title: "Brand Launch Promo", tagline: "A cinematic 60-second promo that hooks viewers in the first 3 seconds.", details: "Scripted, edited and colour-graded launch promo with licensed music and kinetic captions, exported in 4K. Cross-posted to Instagram and YouTube, it crossed 50,000 views in its first month.", tags: ["Video", "Editing", "Ads"] },
    { icon: "brief", banner: "b6", title: "Local Business Website", tagline: "A fast, reliable website and running service for a growing café chain.", details: "A 5-page business site with menu, online ordering and Google Maps integration — kept in perfect shape by our monthly Running Service: updates, backups and performance reports every month.", tags: ["Web Dev", "Local SEO", "Support"] }
  ];

  function openWork(idx) {
    var d = workData[idx];
    wmTitle.textContent = d.title;
    wmTagline.textContent = d.tagline;
    wmDetails.textContent = d.details;
    wmTags.innerHTML = d.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("");
    wmIcon.innerHTML = workIcons[d.icon];
    wmBanner.className = "wm-banner " + d.banner;
    workModal.classList.add("open");
    workModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }
  function closeWork() {
    workModal.classList.remove("open");
    workModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }
  document.querySelectorAll(".work-card").forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (e.target.closest(".work-btn")) {
        var idx = parseInt(card.getAttribute("data-work"), 10);
        if (!isNaN(idx)) openWork(idx);
      }
    });
  });
  if (workClose) workClose.addEventListener("click", closeWork);
  if (workModal) {
    workModal.addEventListener("click", function (e) {
      if (e.target === workModal) closeWork();
    });
  }
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeWork();
  });

  /* ---------- dynamic footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

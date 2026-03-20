// ============================================================
// SAMPADA AWAL — PORTFOLIO SCRIPT
// ============================================================

// ─── TYPED TEXT ANIMATION ────────────────────────────────
const phrases = [
  "CSIT Student & Security Enthusiast",
  "Exploring Ethical Hacking",
  "Building with Python & Linux",
  "Breaking Things to Secure Them",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function type() {
  const el = document.getElementById("typedText");
  if (!el) return;

  const current = phrases[phraseIndex];

  if (!isDeleting) {
    el.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      typingTimeout = setTimeout(type, 2000);
      return;
    }
  } else {
    el.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  typingTimeout = setTimeout(type, isDeleting ? 45 : 75);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 800);
});


// ─── NAV SCROLL STYLE ───────────────────────────────────
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});


// ─── MOBILE NAV TOGGLE ──────────────────────────────────
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navLinks.classList.toggle("open");
  document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
});

// Close menu on link click
navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
  });
});


// ─── SCROLL REVEAL ──────────────────────────────────────
const revealElements = document.querySelectorAll(
  ".section-label, .section-title, .about-text, .about-highlights, " +
  ".skills-group, .project-card, .timeline-item, " +
  ".cert-card, .contact-left, .contact-right, .highlight-card"
);

revealElements.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));


// ─── ACTIVE NAV LINK ON SCROLL ──────────────────────────
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove("active"));
        const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        match?.classList.add("active");
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
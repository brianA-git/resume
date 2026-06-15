/* ===========================
   TYPED ROLE ANIMATION
   =========================== */
const roles = [
  'Senior Analyst - Information and Cyber Security',
  'PAM / IAM Engineer',
  'CyberArk Specialist',
  'Identity & Access Pro',
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-role');

function typeRole() {
  const current = roles[roleIdx];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDeleting ? 40 : 70);
}
typeRole();

/* ===========================
   TERMINAL ANIMATION
   =========================== */
const lines = [
  { type: 'cmd', text: '$ whoami' },
  { type: 'out', text: 'brian.aaron — infosec' },
  { type: 'cmd', text: '$ cat skills.txt' },
  { type: 'hi', text: '> CyberArk PAM ✓' },
  { type: 'hi', text: '> SAML / SSO / MFA ✓' },
  { type: 'hi', text: '> Active Directory ✓' },
  { type: 'hi', text: '> PowerShell + SQL ✓' },
  { type: 'cmd', text: '$ uptime' },
  { type: 'out', text: '7+ years, no downtime' },
  { type: 'cmd', text: '$ ping wts.com' },
  { type: 'warn', text: 'PONG — 0ms latency' },
  { type: 'cmd', text: '$ status' },
  { type: 'hi', text: 'AVAILABLE FOR HIRE ✓' },
];

const termBody = document.getElementById('terminal-body');
let lineIdx = 0;

function printLine() {
  if (lineIdx >= lines.length) {
    setTimeout(() => {
      termBody.innerHTML = '';
      lineIdx = 0;
      printLine();
    }, 3000);
    return;
  }
  const { type, text } = lines[lineIdx++];
  const el = document.createElement('div');
  el.className = type;
  el.textContent = text;
  el.style.opacity = '0';
  termBody.appendChild(el);
  requestAnimationFrame(() => {
    el.style.transition = 'opacity 0.3s';
    el.style.opacity = '1';
  });
  termBody.scrollTop = termBody.scrollHeight;
  setTimeout(printLine, 350 + Math.random() * 200);
}
printLine();

/* ===========================
   COUNTER ANIMATION
   =========================== */
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count;
    if (count >= target) clearInterval(timer);
  }, 40);
}

const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statsObserver.observe(el));

/* ===========================
   FADE-IN ON SCROLL
   =========================== */
const fadeEls = document.querySelectorAll(
  '.timeline-item, .about-card, .stack-group, .cert-card, .contact-item, .certs-block, .about-text p'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObserver.observe(el));

/* ===========================
   NAV SCROLL EFFECT
   =========================== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 50 ? 'rgba(0,212,255,0.15)' : 'var(--border)';
});

/* ===========================
   MOBILE HAMBURGER
   =========================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '100%';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'var(--bg2)';
  navLinks.style.padding = '1rem 2rem';
  navLinks.style.borderBottom = '1px solid var(--border)';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth < 600) navLinks.style.display = 'none';
  });
});

/* ===========================
   TICKER DUPLICATE (no JS needed, fallback)
   =========================== */
// CSS handles the animation; this just ensures the clone is in sync

/* ═══════════════════════════════════════════════════════════════
   ANKIT ADDYA — PORTFOLIO  |  main.js
   ═══════════════════════════════════════════════════════════════ */

/* ── Resume modal ───────────────────────────────────────────── */
(function () {
  const modal    = document.getElementById('resume-modal');
  const openBtn  = document.getElementById('resume-btn');
  const closeBtn = document.getElementById('modal-close');
  const iframe   = document.getElementById('resume-iframe');
  const PDF      = 'assets/Ankit_Addya_Resume.pdf';

  function openModal() {
    iframe.src = PDF;                          // load only when modal opens
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.setAttribute('hidden', '');
      iframe.src = '';                         // unload PDF on close
    }, 220);
    document.body.style.overflow = '';
  }

  if (openBtn)  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });
})();


/* ── Role subtitle cycling ───────────────────────────────────── */
(function () {
  const roles = [
    'Data Analyst',
    'Business Analyst',
    'Data Scientist',
    'ML Engineer',
    'Analytics Engineer',
  ];

  const el = document.getElementById('hero-role');
  if (!el) return;

  let index = 0;

  function nextRole() {
    el.classList.add('fade-out');
    setTimeout(() => {
      index = (index + 1) % roles.length;
      el.textContent = roles[index];
      el.classList.remove('fade-out');
      el.classList.add('fade-in');
      setTimeout(() => el.classList.remove('fade-in'), 400);
    }, 400);
  }

  setInterval(nextRole, 2400);
})();


/* ── Active nav link on scroll ──────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const navbar   = document.getElementById('navbar');

  function onScroll() {
    const scrollY = window.scrollY;

    /* Scroll shadow */
    if (scrollY > 60) {
      navbar.style.top = '10px';
    } else {
      navbar.style.top = '20px';
    }

    /* Active section highlight */
    let current = '';
    sections.forEach(section => {
      const offset = section.offsetTop - 120;
      if (scrollY >= offset) current = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ── Smooth scroll for nav links ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── Subtle parallax on hero bg name ───────────────────────── */
(function () {
  const bgName = document.querySelector('.hero-bg-name');
  if (!bgName) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bgName.style.transform = `translate(-50%, calc(-50% + ${y * 0.25}px))`;
  }, { passive: true });
})();


/* ── Entrance animations (Intersection Observer) ────────────── */
(function () {
  const targets = document.querySelectorAll(
    '.about-grid, .stack-category, .project-card, .stat-card, .contact-btn'
  );

  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.55s ease, transform 0.55s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
})();

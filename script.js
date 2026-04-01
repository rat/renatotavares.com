/**
 * Renato Tavares — Personal Site Scripts
 * Funcionalidades: tema claro/escuro, scroll reveal, barras de skill,
 *                  navbar scroll, menu mobile, ano no footer.
 */

/* ============================================================
   1. TEMA CLARO / ESCURO
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

/**
 * Aplica o tema e salva a preferência no localStorage.
 * @param {'light'|'dark'} theme
 */
function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

/** Alterna entre claro e escuro. */
function toggleTheme() {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// O tema inicial já foi aplicado pelo script inline no <head>.
// Aqui apenas conectamos o botão.
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Sincroniza quando a preferência do sistema muda (ex: modo auto no OS).
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Só aplica se o usuário não tiver salvo uma preferência manual.
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

/* ============================================================
   2. NAVBAR — SOMBRA AO ROLAR
   ============================================================ */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

/* ============================================================
   3. MENU HAMBURGER (MOBILE)
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

function toggleMenu() {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
}

if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}

// Fecha o menu ao clicar em um link.
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Fecha ao clicar fora do menu.
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* ============================================================
   4. SCROLL REVEAL — IntersectionObserver
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Desconecta após revelar (sem repetição).
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,       // 12% visível para disparar
    rootMargin: '0px 0px -40px 0px', // margem inferior para revelar um pouco antes
  }
);

// Observa todos os elementos com classe .reveal
document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

/* ============================================================
   5. BARRAS DE HABILIDADE — Animação ao entrar na viewport
   ============================================================ */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Pequeno atraso para aguardar o reveal da seção.
        setTimeout(() => {
          entry.target.querySelectorAll('.skill-fill').forEach((bar) => {
            const target = bar.dataset.width || '0';
            bar.style.width = target + '%';
          });
        }, 250);
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.tech-cat').forEach((cat) => {
  skillObserver.observe(cat);
});

/* ============================================================
   6. LINK ATIVO NA NAVBAR — Destaque pela seção visível
   ============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle(
            'active',
            a.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  },
  {
    rootMargin: `-${Math.floor(window.innerHeight * 0.4)}px 0px -${Math.floor(window.innerHeight * 0.4)}px 0px`,
    threshold: 0,
  }
);

sections.forEach((s) => sectionObserver.observe(s));

/* ============================================================
   7. ANO DINÂMICO NO FOOTER
   ============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   8. SMOOTH SCROLL — Garante compatibilidade em browsers antigos
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY
                  - parseInt(getComputedStyle(document.documentElement)
                      .getPropertyValue('--nav-h'), 10);
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

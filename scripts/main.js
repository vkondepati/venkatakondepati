(function () {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = window.localStorage.getItem('vk-theme');
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  const navLinks = nav ? Array.from(nav.querySelectorAll('a')) : [];
  const header = document.querySelector('.site-header');
  const yearEl = document.getElementById('current-year');

  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem('vk-theme', theme);
    if (themeToggle) {
      themeToggle.querySelector('.theme-icon').textContent = theme === 'light' ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Activate dark mode' : 'Activate light mode');
    }
  };

  const initialTheme = storedTheme || (prefersDark.matches ? 'dark' : 'light');
  setTheme(initialTheme);

  prefersDark.addEventListener('change', (event) => {
    if (!storedTheme) {
      setTheme(event.matches ? 'dark' : 'light');
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) =>
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      })
    );
  }

  const revealElements = Array.from(
    document.querySelectorAll(
      '.section-header, .about-card, .timeline-item, .spotlight-card, .expertise-card, .insight-card, .testimonial-card, .contact-form'
    )
  );
  revealElements.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  const sections = Array.from(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { target, isIntersecting } = entry;
          if (isIntersecting) {
            const id = target.getAttribute('id');
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('is-active');
              } else {
                link.classList.remove('is-active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0.2,
      }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const handleScroll = () => {
    const offset = window.scrollY;
    if (!header) return;
    header.classList.toggle('is-scrolled', offset > 40);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();

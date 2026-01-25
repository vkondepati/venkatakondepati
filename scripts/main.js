// Auto-scroll to Google Form confirmation after submission
window.addEventListener('message', function (event) {
  if (typeof event.data === 'string' && event.data.indexOf('Thank you') !== -1) {
    var contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});
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

  /* 
    Robust Navigation Highlighting (Focus-Line Strategy)
    - Determines active section based on a virtual "focus line" at ~35% of the viewport.
    - Handles Top-of-Page (Hero -> About) and Bottom-of-Page (Footer -> Connect) edge cases.
  */
  const updateNavHighlight = () => {
    if (!sections.length || !navLinks.length) return;

    // Focus Line: The point the user is likely reading (35% down the screen)
    const focusLine = window.innerHeight * 0.35;
    const docHeight = document.body.offsetHeight;
    let currentSectionId = '';

    // 1. Force "Connect" if we are at the very bottom
    if ((window.innerHeight + window.scrollY) >= docHeight - 50) {
      currentSectionId = 'contact';
    }
    // 2. Force "About" if we are at the very top (Hero section)
    else if (window.scrollY < 100) {
      currentSectionId = 'about';
    }
    else {
      // 3. Focus Line Strategy
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= focusLine && rect.bottom > focusLine) {
          currentSectionId = section.getAttribute('id');
        }
      });

      // 4. Fallback: If no section covers the line, find the closest one above
      if (!currentSectionId) {
        let maxTop = -Infinity;
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= focusLine && rect.top > maxTop) {
            maxTop = rect.top;
            currentSectionId = section.getAttribute('id');
          }
        });
      }
    }

    // Special handling: 'hero' maps to 'about' navigation
    if (currentSectionId === 'hero') currentSectionId = 'about';

    if (currentSectionId) {
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }
  };

  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavHighlight();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateNavHighlight();

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

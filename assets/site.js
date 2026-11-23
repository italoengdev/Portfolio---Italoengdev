(() => {
    const prefersReducedMotion = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const REVEAL_SELECTORS = [
        '.hero-left > *',
        '.project-hero > div',
        '.project-copy > section',
        '.hero-image-wrap',
        '.capabilities-heading',
        '.capability-card',
        '.stat-item',
        '.section-label',
        '.section-title',
        '.section-desc',
        '.project-card',
        '.cv-section',
        '.experience-item',
        '.skill-category',
        '.education-item',
        '.language-item',
        '.contact-method-card',
        '.social-link',
        '.quick-contact',
        '.map-section',
        '.project-hero-card',
        '.project-next'
    ].join(',');

    const initNav = () => {
        document.querySelectorAll('.nav-toggle').forEach((toggle) => {
            const menu = document.getElementById(toggle.getAttribute('aria-controls'));

            if (!menu) return;

            const setOpen = (isOpen) => {
                toggle.setAttribute('aria-expanded', String(isOpen));
                menu.classList.toggle('is-open', isOpen);
            };

            toggle.addEventListener('click', () => {
                setOpen(toggle.getAttribute('aria-expanded') !== 'true');
            });

            menu.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', () => setOpen(false));
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') setOpen(false);
            });
        });

        document.querySelectorAll('[data-current-year]').forEach((element) => {
            element.textContent = new Date().getFullYear();
        });
    };

    const animateCount = (element) => {
        const target = Number(element.dataset.countTarget);
        const suffix = element.dataset.countSuffix || '';

        if (!Number.isFinite(target)) return;

        if (prefersReducedMotion()) {
            element.textContent = target + suffix;
            return;
        }

        const duration = 1100;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.round(target * eased) + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target + suffix;
            }
        };

        requestAnimationFrame(step);
    };

    const initCounters = () => {
        const counters = Array.from(document.querySelectorAll('.stat-number'));
        const parsed = [];

        counters.forEach((element) => {
            const match = element.textContent.trim().match(/^(\d[\d,]*)(.*)$/);
            if (!match) return;
            element.dataset.countTarget = match[1].replace(/,/g, '');
            element.dataset.countSuffix = match[2] || '';
            parsed.push(element);
        });

        if (!parsed.length) return;

        if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
            parsed.forEach((element) => {
                element.textContent = element.dataset.countTarget + (element.dataset.countSuffix || '');
            });
            return;
        }

        parsed.forEach((element) => {
            element.textContent = '0' + (element.dataset.countSuffix || '');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCount(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.4 });

        parsed.forEach((element) => observer.observe(element));
    };

    const initReveal = () => {
        const targets = Array.from(document.querySelectorAll(REVEAL_SELECTORS));
        if (!targets.length) return;

        if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
            targets.forEach((element) => element.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            const batch = entries.filter((entry) => entry.isIntersecting);

            batch.forEach((entry, index) => {
                entry.target.style.setProperty('--reveal-delay', Math.min(index * 70, 420) + 'ms');
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        targets.forEach((element) => observer.observe(element));

        // Safety net: reveal anything already on screen if the observer misses it.
        window.setTimeout(() => {
            targets.forEach((element) => {
                if (element.classList.contains('is-visible')) return;
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    element.classList.add('is-visible');
                }
            });
        }, 1800);
    };

    const initScrollUI = () => {
        const progress = document.createElement('div');
        progress.id = 'scroll-progress';
        progress.setAttribute('aria-hidden', 'true');
        document.body.appendChild(progress);

        const toTop = document.createElement('button');
        toTop.id = 'back-to-top';
        toTop.type = 'button';
        toTop.setAttribute('aria-label', 'Back to top');
        toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
        toTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        });
        document.body.appendChild(toTop);

        const headers = Array.from(document.querySelectorAll('.site-nav, .project-site-header'));
        let ticking = false;

        const update = () => {
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            const y = window.scrollY || doc.scrollTop || 0;

            progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
            toTop.classList.toggle('is-visible', y > 620);
            headers.forEach((header) => header.classList.toggle('is-scrolled', y > 24));

            ticking = false;
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        update();
    };

    const init = () => {
        initNav();
        initScrollUI();
        initReveal();
        initCounters();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

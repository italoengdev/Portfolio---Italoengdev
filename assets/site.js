(() => {
    const init = () => {
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

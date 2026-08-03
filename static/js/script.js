(function() {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    let lockedScrollY = 0;

    function setMenuOpen(open) {
        const icon = hamburger.querySelector('i');
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-times', open);

        if (open) {
            // Capture scroll BEFORE position:fixed — otherwise scrollY becomes 0
            // and closing the menu always jumps back to the top.
            lockedScrollY = window.scrollY;
            document.body.style.top = '-' + lockedScrollY + 'px';
            document.body.classList.add('nav-active');
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
            document.body.classList.remove('nav-active');
            document.body.style.top = '';
            window.scrollTo(0, lockedScrollY);
        }
    }

    hamburger.addEventListener('click', () => {
        setMenuOpen(!nav.classList.contains('active'));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (!nav.classList.contains('active')) {
                return;
            }

            const href = link.getAttribute('href');
            const target = href && href.startsWith('#') ? document.querySelector(href) : null;
            // Measure while the body is still scroll-locked (visual offset intact)
            const targetY = target
                ? lockedScrollY + target.getBoundingClientRect().top
                : lockedScrollY;

            nav.classList.remove('active');
            document.body.classList.remove('nav-active');
            document.body.style.top = '';
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Menu');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');

            if (target) {
                event.preventDefault();
                window.scrollTo(0, targetY);
                history.pushState(null, '', href);
            } else {
                window.scrollTo(0, lockedScrollY);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('active')) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        // On narrow viewports, AOS fade-left starts off-screen and causes sideways scroll
        if (window.matchMedia('(max-width: 768px)').matches) {
            document.querySelectorAll('[data-aos="fade-left"]').forEach(function(el) {
                el.setAttribute('data-aos', 'fade-up');
            });
        }

        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 60,
                disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            });
        }
    });
})();

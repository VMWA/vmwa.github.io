(function() {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    let lockedScrollY = 0;

    function setMenuOpen(open) {
        nav.classList.toggle('active', open);
        document.body.classList.toggle('nav-active', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Menu');

        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-times', open);

        if (open) {
            lockedScrollY = window.scrollY;
            document.body.style.top = '-' + lockedScrollY + 'px';
        } else {
            document.body.style.top = '';
            window.scrollTo(0, lockedScrollY);
        }
    }

    hamburger.addEventListener('click', () => {
        setMenuOpen(!nav.classList.contains('active'));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                setMenuOpen(false);
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

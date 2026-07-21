(function() {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        document.body.classList.toggle('nav-active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            document.body.classList.remove('nav-active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
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
                offset: 60
            });
        }
    });
})();

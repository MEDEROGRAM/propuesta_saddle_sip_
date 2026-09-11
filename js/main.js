/* =============================================
   Saddle & Sip - JavaScript Principal
   Intersection Observer para animaciones y
   carga eficiente de contenido
   ============================================= */

(function () {
    'use strict';

    // --- Intersection Observer para fade-in al scroll ---
    function initFadeAnimations() {
        var targets = document.querySelectorAll('.fade-in-ready');
        if (!targets.length) return;

        if (!('IntersectionObserver' in window)) {
            // Fallback: no animar
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -20px 0px'
        });

        // Primero agregar la clase que oculta, luego observar
        targets.forEach(function (el) {
            el.classList.add('will-animate');
            observer.observe(el);
        });
    }

    // --- Smooth scroll para anchors ---
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    var headerH = document.querySelector('header')
                        ? document.querySelector('header').offsetHeight
                        : 60;
                    var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });
    }

    // --- Init on DOM ready ---
    function init() {
        initFadeAnimations();
        initSmoothScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

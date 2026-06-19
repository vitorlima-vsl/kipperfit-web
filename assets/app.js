/* =========================================================================
   KipperFit landing — static behaviors (no framework).
   Ports the three browser-only effects the React version had:
     1. burger → mobile menu toggle
     2. scroll-reveal: add .in to .lp-fade elements as they enter the viewport
     3. hero phone: auto-cycle the stacked app screens (landing only)
   The scroll container is .lp-root (see the CSS note in styles.css), so the
   IntersectionObserver observes against it.
   ========================================================================= */
(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    var root = document.querySelector('.lp-root');

    /* ---- 1. burger / mobile menu ---- */
    var burger = document.querySelector('.lp-burger');
    var menu = document.querySelector('.lp-mobile-menu');
    if (burger && menu) {
      var setOpen = function (open) {
        burger.classList.toggle('open', open);
        menu.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      };
      burger.addEventListener('click', function () {
        setOpen(!menu.classList.contains('open'));
      });
      // tapping any link (or the backdrop) closes the menu
      menu.addEventListener('click', function () { setOpen(false); });
    }

    /* ---- 2. scroll reveal (.lp-fade → .in) ---- */
    var fades = Array.prototype.slice.call(document.querySelectorAll('.lp-fade'));
    if ('IntersectionObserver' in window && fades.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          });
        },
        { root: root || null, threshold: 0.12 }
      );
      fades.forEach(function (el) { io.observe(el); });
    } else {
      // no IO support → just show everything
      fades.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---- 3. hero phone auto-cycle (landing only) ---- */
    var slides = Array.prototype.slice.call(
      document.querySelectorAll('.lp-screen-cycle .lp-screen-slide')
    );
    if (slides.length > 1) {
      var active = 0;
      setInterval(function () {
        slides[active].classList.remove('active');
        active = (active + 1) % slides.length;
        slides[active].classList.add('active');
      }, 2800);
    }
  });
})();

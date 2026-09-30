/* ==========================================================================
   MENUISERIE DUBOIS — Interactions front-end
   Vanilla JS, aucune dépendance.
   --------------------------------------------------------------------------
   SOMMAIRE
   0. Configuration
   1. En-tête (fond au scroll)
   2. Menu mobile
   3. Hero (parallaxe + recouvrement)
   4. Apparition au scroll
   5. Lightbox galerie
   6. Formulaire de contact
   7. Carrousel d'avis Google
   8. Barre d'action mobile (CSS seul)
   9. Carte Google Maps au clic (RGPD)
   10. Avant / après (galerie)
   11. FAQ (ouverture animée)
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     0. CONFIGURATION
     ------------------------------------------------------------------------ */
  // Service d'envoi du formulaire : Web3Forms. Ne pas modifier.
  // La clé propre à chaque client se renseigne dans contact.html
  // (champ caché access_key), et nulle part ailleurs.
  var FORM_ENDPOINT = 'https://api.web3forms.com/submit';

  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Signale que le JS est actif : les animations d'apparition ne masquent
  // le contenu que dans ce cas (sinon la page reste lisible sans JS).
  document.documentElement.classList.add('js');

  /* ------------------------------------------------------------------------
     1. EN-TÊTE — transparent en haut, fond sombre flouté après quelques px
     ------------------------------------------------------------------------ */
  var header = document.querySelector('[data-header]');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  updateHeader();

  /* ------------------------------------------------------------------------
     2. MENU MOBILE
     ------------------------------------------------------------------------ */
  var menuToggle = document.querySelector('[data-menu-toggle]');

  if (menuToggle && header) {
    // Voile sombre derrière le menu (voir CSS .menu-veil)
    var menuVeil = document.createElement('div');
    menuVeil.className = 'menu-veil';
    menuVeil.setAttribute('aria-hidden', 'true');
    document.body.appendChild(menuVeil);

    // Ouvre / ferme le menu. Tant qu'il est ouvert, la page derrière ne
    // défile plus (même mécanisme que la lightbox) et le voile la recouvre.
    var setMenu = function (open) {
      header.classList.toggle('is-open', open);
      menuVeil.classList.toggle('is-visible', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? 'Fermer' : 'Menu';
      document.body.style.overflow = open ? 'hidden' : '';
    };
    var isMenuOpen = function () { return header.classList.contains('is-open'); };

    menuToggle.addEventListener('click', function () { setMenu(!isMenuOpen()); });

    // Referme le menu quand on choisit une page
    header.querySelectorAll('.nav-mobile a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    // Toucher le voile (en dehors du menu) referme le menu
    menuVeil.addEventListener('click', function () { setMenu(false); });

    // Touche Échap : referme et rend le focus au bouton
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen()) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    // Passage en affichage ordinateur (rotation de tablette…) : le menu
    // mobile disparaît, on libère aussi le défilement.
    var desktopQuery = window.matchMedia('(min-width: 961px)');
    var onDesktop = function (mq) { if (mq.matches && isMenuOpen()) setMenu(false); };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', onDesktop);
    else if (desktopQuery.addListener) desktopQuery.addListener(onDesktop);
  }

  /* ------------------------------------------------------------------------
     3. HERO — parallaxe discret pendant que la section suivante recouvre
     Le hero est en position:sticky derrière la page (voir CSS). Ici on
     anime légèrement la vidéo et le texte pour que rien ne paraisse figé,
     puis on coupe la vidéo une fois le hero entièrement recouvert.
     ------------------------------------------------------------------------ */
  var hero = document.querySelector('[data-hero]');
  var heroMedia = document.querySelector('[data-hero-media]');
  var heroInner = document.querySelector('[data-hero-inner]');
  var heroVideo = document.querySelector('[data-hero-video]');
  var heroHidden = false;

  // L'autoplay peut être bloqué : on force la lecture en silencieux.
  if (heroVideo) {
    heroVideo.muted = true;
    var playPromise = heroVideo.play();
    if (playPromise && playPromise.catch) playPromise.catch(function () {});
  }

  function updateHero() {
    if (!hero || prefersReducedMotion) return;
    var heroHeight = hero.offsetHeight || 1;
    var progress = Math.min(window.scrollY / heroHeight, 1);

    if (heroInner) {
      // Le contenu défile un peu plus vite que le recouvrement : sensation
      // de défilement naturel + profondeur.
      heroInner.style.transform = 'translateY(' + (-progress * 22) + 'vh)';
      heroInner.style.opacity = String(1 - progress * 0.85);
    }
    if (heroMedia) {
      heroMedia.style.transform = 'translateY(' + (-progress * 9) + '%)';
    }

    // Vidéo entièrement recouverte : on la met en pause (perf + batterie).
    if (heroVideo) {
      if (progress >= 1 && !heroHidden) {
        heroHidden = true;
        heroVideo.pause();
      } else if (progress < 1 && heroHidden) {
        heroHidden = false;
        var p = heroVideo.play();
        if (p && p.catch) p.catch(function () {});
      }
    }
  }

  /* ------------------------------------------------------------------------
     Boucle de scroll unique (rAF) pour l'en-tête, le hero et le bouton
     d'appel — propriétés transform/opacity uniquement, navigation fluide.
     ------------------------------------------------------------------------ */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateHeader();
      updateHero();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ------------------------------------------------------------------------
     4. APPARITION AU SCROLL — fade-in + translation (IntersectionObserver)
     ------------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------------------------
     5. LIGHTBOX — ouverture des photos de la galerie en plein écran
     S'applique à toute image marquée data-lightbox.
     ------------------------------------------------------------------------ */
  var lightboxImages = document.querySelectorAll('[data-lightbox]');

  if (lightboxImages.length) {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Photo en plein écran');
    lightbox.innerHTML =
      '<button type="button" class="lightbox__close">Fermer ✕</button>' +
      '<img alt="">' +
      '<p class="lightbox__caption"></p>';
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector('img');
    var lightboxCaption = lightbox.querySelector('.lightbox__caption');
    var lightboxClose = lightbox.querySelector('.lightbox__close');
    var lastFocused = null;

    function openLightbox(img) {
      lastFocused = document.activeElement;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      lightboxCaption.textContent = img.dataset.caption || img.alt || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    lightboxImages.forEach(function (img) {
      img.addEventListener('click', function () { openLightbox(img); });
      // Accessible au clavier
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(img);
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      // Piège de focus : « Fermer » est le seul élément actif de la
      // lightbox, la touche Tab y reste (sinon elle part dans la page).
      if (e.key === 'Tab') {
        e.preventDefault();
        lightboxClose.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     6. FORMULAIRE DE CONTACT — envoi via Web3Forms
     Règle d'or : le message de succès ne s'affiche QUE si Web3Forms confirme
     la réception (success: true). Clé absente, piège à robots déclenché,
     erreur réseau ou refus du service → message d'erreur, jamais de succès.
     ------------------------------------------------------------------------ */
  var form = document.querySelector('[data-contact-form]');

  if (form) {
    var successMessage = form.querySelector('.form-message--success');
    var errorMessage = form.querySelector('.form-message--error');
    var submitButton = form.querySelector('[type="submit"]');
    var keyField = form.querySelector('[name="access_key"]');

    var showError = function (reason) {
      if (window.console) console.error('[Formulaire] Demande NON envoyée : ' + reason);
      if (errorMessage) errorMessage.classList.add('is-visible');
    };

    // --- Choix « Autre » : affiche le champ « précisez » associé ----------
    var otherFields = Array.prototype.slice.call(
      form.querySelectorAll('[data-other-for]')
    );
    var syncOtherFields = function () {
      otherFields.forEach(function (wrap) {
        var select = form.querySelector('[name="' + wrap.getAttribute('data-other-for') + '"]');
        wrap.hidden = !select || select.value !== 'Autre';
      });
    };
    otherFields.forEach(function (wrap) {
      var select = form.querySelector('[name="' + wrap.getAttribute('data-other-for') + '"]');
      if (select) select.addEventListener('change', syncOtherFields);
    });
    // form.reset() remet les listes à zéro après l'événement : on attend
    form.addEventListener('reset', function () { setTimeout(syncOtherFields, 0); });
    syncOtherFields();

    // --- Deux étapes : coordonnées, puis précisions sur le projet ---------
    // Purement visuel : un seul formulaire, un seul envoi à la fin.
    var step2 = form.querySelector('[data-form-step2]');
    var nextButton = form.querySelector('[data-form-next]');
    var progress = form.querySelector('[data-form-progress]');

    if (step2 && nextButton) {
      var step1Fields = Array.prototype.filter.call(
        form.querySelectorAll('input, textarea, select'),
        function (el) {
          return el.type !== 'hidden' && !step2.contains(el) &&
            !el.closest('.form-trap');
        }
      );

      var setStep = function (n) {
        step2.hidden = n !== 2;
        nextButton.hidden = n === 2;
        if (progress) {
          progress.hidden = false;
          progress.textContent = n === 2
            ? 'Étape 2 sur 2 · Votre projet'
            : 'Étape 1 sur 2 · Vos coordonnées';
        }
      };

      var goToStep2 = function () {
        // Vérifie les champs de l'étape 1 avant d'avancer
        for (var i = 0; i < step1Fields.length; i++) {
          if (!step1Fields[i].checkValidity()) {
            step1Fields[i].reportValidity();
            return;
          }
        }
        setStep(2);
        var fields = step2.querySelector('.form-step__fields');
        if (fields) fields.focus({ preventScroll: true });
        step2.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'nearest'
        });
      };

      setStep(1);
      nextButton.addEventListener('click', goToStep2);

      // Entrée dans un champ de l'étape 1 = « Continuer », pas « Envoyer »
      form.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && step2.hidden &&
            e.target.tagName === 'INPUT') {
          e.preventDefault();
          goToStep2();
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (successMessage) successMessage.classList.remove('is-visible');
      if (errorMessage) errorMessage.classList.remove('is-visible');

      // Garde-fou : clé absente ou placeholder {{…}} non remplacé.
      var accessKey = keyField ? keyField.value.trim() : '';
      if (!accessKey || accessKey.indexOf('{{') !== -1) {
        showError('clé Web3Forms non configurée dans contact.html (champ access_key).');
        return;
      }

      // Piège à robots : un humain ne voit pas ces champs.
      var trapField = form.querySelector('[name="champ_controle"]');
      var trapBox = form.querySelector('[name="botcheck"]');
      if ((trapField && trapField.value) || (trapBox && trapBox.checked)) {
        showError('champ piège rempli (robot probable).');
        return;
      }

      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });
      delete data.champ_controle; // inutile dans l'email reçu
      // « Autre » + précision → une seule ligne lisible dans l'email
      // (ex. « Autre — pergola ») ; précision ignorée si « Autre » n'est
      // pas sélectionné.
      otherFields.forEach(function (wrap) {
        var name = wrap.getAttribute('data-other-for');
        var input = wrap.querySelector('input');
        if (!input) return;
        var detail = (data[input.name] || '').trim();
        if (data[name] === 'Autre' && detail) data[name] = 'Autre — ' + detail;
        delete data[input.name];
      });
      // Champs facultatifs laissés vides : on ne les envoie pas
      Object.keys(data).forEach(function (k) { if (data[k] === '') delete data[k]; });

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.label = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours…';
      }

      // Délai maximal : sans réponse au bout de 15 s (réseau mobile qui
      // décroche…), on abandonne et on affiche l'erreur plutôt que de
      // laisser le bouton bloqué sur « Envoi en cours… ».
      var controller = window.AbortController ? new AbortController() : null;
      var timeout = controller && setTimeout(function () { controller.abort(); }, 15000);

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
        signal: controller ? controller.signal : undefined
      })
        .then(function (response) {
          return response.json().then(function (result) {
            if (!response.ok || !result || result.success !== true) {
              throw new Error('réponse ' + response.status +
                (result && result.message ? ' : ' + result.message : ''));
            }
          });
        })
        .then(function () {
          if (successMessage) successMessage.classList.add('is-visible');
          form.reset();
        })
        .catch(function (err) {
          showError(err.name === 'AbortError'
            ? 'aucune réponse du service d\'envoi après 15 s.'
            : 'refus ou panne du service d\'envoi (' + err.message + ').');
        })
        .then(function () {
          clearTimeout(timeout);
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.label;
          }
        });
    });
  }

  /* ------------------------------------------------------------------------
     7. CARROUSEL COVERFLOW D'AVIS GOOGLE — avis central + latéraux en retrait
     Positions calculées en JS (translate + scale + opacity + léger rotateY).
     Clic sur une carte latérale, flèches, puces, glissement tactile et
     clavier. Défilement auto doux, en pause au survol/focus/onglet masqué.
     ------------------------------------------------------------------------ */
  var coverflow = document.querySelector('[data-coverflow]');

  if (coverflow) {
    var stage = coverflow.querySelector('.coverflow__stage');
    var cards = Array.prototype.slice.call(
      coverflow.querySelectorAll('[data-cf-item]')
    );
    var cfDots = Array.prototype.slice.call(
      coverflow.querySelectorAll('[data-cf-dot]')
    );
    var prevBtn = coverflow.querySelector('[data-cf-prev]');
    var nextBtn = coverflow.querySelector('[data-cf-next]');

    if (cards.length > 1) {
      var activeIndex = Math.floor(cards.length / 2); // démarre au centre
      var cfTimer = null;
      var CF_DELAY = 6000;

      // Gabarit des positions selon la largeur d'écran. Sur mobile, les
      // cartes latérales sont plus effacées pour privilégier l'avis central.
      function cfMetrics() {
        var w = window.innerWidth;
        if (w < 600) return { gap: 60, scale: 0.8, side: 0.18, depth: -90 };
        var m = w < 900
          ? { gap: 232, scale: 0.82, side: 0.5, depth: -130 }
          : { gap: 300, scale: 0.84, side: 0.55, depth: -150 };
        // L'écart ne doit pas faire sortir les cartes latérales du carrousel
        // (sinon elles sont coupées au bord de l'écran sur tablette). On
        // tient compte de la perspective, qui rapproche les cartes du centre.
        var perspective = parseFloat(window.getComputedStyle(stage).perspective) || 1600;
        var shrink = perspective / (perspective - m.depth);
        var sideHalf = cards[0].offsetWidth * m.scale / 2;
        var maxGap = (coverflow.clientWidth / 2 - 8) / shrink - sideHalf;
        m.gap = Math.max(0, Math.min(m.gap, maxGap));
        return m;
      }

      function cfLayout() {
        var m = cfMetrics();
        cards.forEach(function (card, i) {
          var pos = i - activeIndex;            // décalage par rapport au centre
          var dist = Math.abs(pos);
          var x = pos * m.gap;                  // translation horizontale (px)
          var scale = dist === 0 ? 1 : (dist === 1 ? m.scale : m.scale * 0.85);
          var rotate = -pos * 16;               // léger pivot « Coverflow »
          var depth = dist === 0 ? 0 : (dist === 1 ? m.depth : m.depth * 1.6);
          var opacity = dist === 0 ? 1 : (dist === 1 ? m.side : 0);

          card.style.transform =
            'translate(-50%, -50%) translateX(' + x + 'px) translateZ(' + depth +
            'px) scale(' + scale + ') rotateY(' + rotate + 'deg)';
          card.style.opacity = opacity;
          card.style.zIndex = String(30 - dist);
          card.style.pointerEvents = dist <= 1 ? 'auto' : 'none';
          // Seul l'avis central est lu par les lecteurs d'écran. Les cartes
          // ne sont pas des boutons : au clavier, on navigue avec les
          // flèches et les puces (clic souris / doigt toujours possible).
          card.setAttribute('aria-hidden', dist === 0 ? 'false' : 'true');
          card.classList.toggle('is-center', dist === 0);
        });
        cfDots.forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === activeIndex);
          if (i === activeIndex) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
        });
        // La hauteur de la scène suit la carte centrale (contenu variable)
        stage.style.height = cards[activeIndex].offsetHeight + 'px';
      }

      function cfGo(i) {
        activeIndex = (i + cards.length) % cards.length;
        cfLayout();
      }
      function cfNext() { cfGo(activeIndex + 1); }
      function cfPrev() { cfGo(activeIndex - 1); }

      function cfStart() {
        if (prefersReducedMotion || cfTimer) return;
        cfTimer = window.setInterval(cfNext, CF_DELAY);
      }
      function cfStop() {
        if (cfTimer) { window.clearInterval(cfTimer); cfTimer = null; }
      }
      function cfRestart() { cfStop(); cfStart(); }

      cards.forEach(function (card, i) {
        card.addEventListener('click', function () {
          if (i !== activeIndex) { cfGo(i); cfRestart(); }
        });
      });
      cfDots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { cfGo(i); cfRestart(); });
      });
      if (prevBtn) prevBtn.addEventListener('click', function () { cfPrev(); cfRestart(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { cfNext(); cfRestart(); });

      // Glissement tactile / souris
      var dragX = null;
      stage.addEventListener('pointerdown', function (e) { dragX = e.clientX; });
      stage.addEventListener('pointerup', function (e) {
        if (dragX === null) return;
        var delta = e.clientX - dragX;
        if (Math.abs(delta) > 40) { delta < 0 ? cfNext() : cfPrev(); cfRestart(); }
        dragX = null;
      });

      coverflow.addEventListener('mouseenter', cfStop);
      coverflow.addEventListener('mouseleave', cfStart);
      coverflow.addEventListener('focusin', cfStop);
      coverflow.addEventListener('focusout', cfStart);
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) cfStop(); else cfStart();
      });

      var cfResizeTimer = null;
      window.addEventListener('resize', function () {
        window.clearTimeout(cfResizeTimer);
        cfResizeTimer = window.setTimeout(cfLayout, 120);
      });

      cfLayout();
      // Recalcule la hauteur une fois les polices chargées (évite un saut)
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(cfLayout);
      window.addEventListener('load', cfLayout);
      cfStart();
    }
  }

  /* ------------------------------------------------------------------------
     8. BARRE D'ACTION MOBILE (Appeler / Devis) — pur HTML + CSS, visible
     dès l'arrivée sur téléphone ; aucun JavaScript nécessaire.
     ------------------------------------------------------------------------ */

  /* ------------------------------------------------------------------------
     9. CARTE GOOGLE MAPS AU CLIC (RGPD)
     Aucun appel à Google tant que le visiteur n'a pas cliqué sur
     « Afficher la carte ». L'adresse vient du lien lui-même (paramètre q=),
     auquel on ajoute &output=embed pour obtenir la carte intégrable.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-map]').forEach(function (frame) {
    var loadLink = frame.querySelector('[data-map-load]');
    if (!loadLink) return;

    loadLink.addEventListener('click', function (e) {
      e.preventDefault();
      var iframe = document.createElement('iframe');
      iframe.src = loadLink.href + '&output=embed';
      iframe.title = frame.getAttribute('data-map-title') || 'Plan d\'accès';
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.setAttribute('allowfullscreen', '');
      frame.innerHTML = '';
      frame.appendChild(iframe);
      iframe.focus();
    });
  });

  /* ------------------------------------------------------------------------
     10. AVANT / APRÈS — comparateur à curseur (galerie)
     Le curseur natif (input range) pilote la variable CSS --pos, qui
     découpe l'image « avant » et place la poignée.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-ba]').forEach(function (frame) {
    var range = frame.querySelector('[data-ba-range]');
    if (!range) return;
    var update = function () {
      frame.style.setProperty('--pos', range.value + '%');
      range.setAttribute('aria-valuetext', range.value + ' % de l\'image « avant » visible');
    };
    range.addEventListener('input', update);
    update();
  });

  /* ------------------------------------------------------------------------
     11. FAQ — ouverture / fermeture en douceur
     Les questions sont des <details> natifs : sans JS (ou si le visiteur a
     demandé moins d'animations), elles s'ouvrent instantanément. Ici, on
     anime la hauteur pour que la suite de la page glisse au lieu de sauter.
     ------------------------------------------------------------------------ */
  if (!prefersReducedMotion && Element.prototype.animate) {
    document.querySelectorAll('.faq__item').forEach(function (item) {
      var summary = item.querySelector('summary');
      var answer = item.querySelector('summary ~ *');
      var anim = null;
      var DURATION = 320;
      var EASING = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

      summary.addEventListener('click', function (e) {
        e.preventDefault();
        var start = item.offsetHeight;                 // hauteur actuelle
        var opening = !item.open || item.dataset.closing === '1';
        if (anim) { anim.cancel(); anim = null; }

        var end;
        if (opening) {
          delete item.dataset.closing;
          item.open = true;
          end = item.offsetHeight;                     // hauteur ouverte
        } else {
          item.dataset.closing = '1';                  // reste ouvert pendant l'animation
          end = summary.offsetHeight + (item.offsetHeight - item.clientHeight);
        }

        item.style.overflow = 'hidden';
        anim = item.animate({ height: [start + 'px', end + 'px'] },
                            { duration: DURATION, easing: EASING });
        if (opening && answer) {
          answer.animate({ opacity: [0, 1], transform: ['translateY(-6px)', 'none'] },
                         { duration: DURATION, easing: EASING });
        }
        anim.onfinish = function () {
          anim = null;
          if (!opening) { item.open = false; delete item.dataset.closing; }
          item.style.overflow = '';
        };
      });
    });
  }

  /* ------------------------------------------------------------------------
     Année automatique du pied de page
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();

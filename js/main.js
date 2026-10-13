/**
 * AN SINH 360 - VIỆT NAM | MAIN COMMON JAVASCRIPT
 * Handles: Theme toggle, Page transitions, Back button, Mobile nav, Audio synthesis
 */

(function () {
  'use strict';

  // 1. THEME MANAGEMENT (Dark Mode Default)
  function initTheme() {
    const savedTheme = localStorage.getItem('as360_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('as360_theme', nextTheme);
    updateThemeIcon(nextTheme);
    playPopSound();
  }

  function updateThemeIcon(theme) {
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach((btn) => {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('title', theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối');
    });
  }

  // 2. PAGE TRANSITIONS (Smooth exit and bfcache restoration)
  function initPageTransitions() {
    document.body.classList.add('page-enter');

    // Handle bfcache when user clicks browser Back / Forward
    window.addEventListener('pageshow', (event) => {
      document.body.classList.remove('page-exit');
      document.body.classList.add('page-enter');
    });

    // Intercept internal links
    document.addEventListener('click', (e) => {
      const targetLink = e.target.closest('a');
      if (!targetLink) return;

      const href = targetLink.getAttribute('href');
      // Only handle local html files without target="_blank"
      if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('http') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        !targetLink.hasAttribute('target')
      ) {
        e.preventDefault();
        playPopSound();
        document.body.classList.add('page-exit');
        setTimeout(() => {
          window.location.href = href;
        }, 260);
      }
    });
  }

  // 3. BACK BUTTON
  window.goBack = function () {
    playPopSound();
    if (window.history.length > 1) {
      document.body.classList.add('page-exit');
      setTimeout(() => {
        window.history.back();
      }, 220);
    } else {
      const isSubfolder = window.location.pathname.includes('/Trang con/') || window.location.pathname.includes('/Trang%20con/') || window.location.pathname.includes('/pages/');
      window.location.href = isSubfolder ? '../index.html' : 'index.html';
    }
  };

  // 4. MOBILE DRAWER MENU
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle-btn');
    const drawer = document.querySelector('.mobile-drawer');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      toggleBtn.innerHTML = drawer.classList.contains('open') ? '✕' : '☰';
    });
  }

  // 5. WEB AUDIO SYNTHESIS SOUND EFFECTS
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playPopSound() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      // Audio fallback
    }
  }

  window.playAlarmSound = function () {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, ctx.currentTime);
      osc.frequency.setValueAtTime(160, ctx.currentTime + 0.15);
      osc.frequency.setValueAtTime(110, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  };

  window.playSuccessSound = function () {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const now = ctx.currentTime;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.1, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.2);
      });
    } catch (e) {}
  };

  // Global modal handlers
  window.openModal = function (modalId) {
    playPopSound();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function (modalId) {
    playPopSound();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Close modal when clicking backdrop or ESC key
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-backdrop.open');
      if (openModal) {
        openModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  // INITIALIZE
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initPageTransitions();
    initMobileMenu();

    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    themeBtns.forEach((btn) => btn.addEventListener('click', toggleTheme));
  });
})();

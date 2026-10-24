/**
 * AURO CORPORATION — Client Logic & Interactive Features
 */

function initApp() {
  initSkiper10Preloader();
  initNavbarScroll();
  initModals();
  initBackToTop();
  initMobileNav();
  initStepPath();
  initSkiper31Process();
  initPetalDissolve();
  initPremiumScrollMotion();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* 1. Navbar Sticky Effect & Navigation Controls */
function initNavbarScroll() {
  const header = document.getElementById('siteNavbar') || document.querySelector('.navbar') || document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // Divisions submenu dropdown
  const divTrigger = document.getElementById('navDivisionTrigger');
  const divSubmenu = document.getElementById('divisionSubmenu');
  if (divTrigger && divSubmenu) {
    divTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = divSubmenu.hasAttribute('hidden');
      if (isHidden) {
        divSubmenu.removeAttribute('hidden');
        divTrigger.setAttribute('aria-expanded', 'true');
      } else {
        divSubmenu.setAttribute('hidden', '');
        divTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById('navbarMenuToggle');
  const primaryNav = document.getElementById('primaryNav');
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = primaryNav.classList.toggle('navbar__links--open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Close menus on outside click or navigation link click
  document.addEventListener('click', (e) => {
    if (divSubmenu && !divSubmenu.contains(e.target) && e.target !== divTrigger) {
      divSubmenu.setAttribute('hidden', '');
      if (divTrigger) divTrigger.setAttribute('aria-expanded', 'false');
    }
    if (primaryNav && menuToggle && !primaryNav.contains(e.target) && !menuToggle.contains(e.target)) {
      primaryNav.classList.remove('navbar__links--open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  if (primaryNav) {
    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('navbar__links--open');
        if (divSubmenu) divSubmenu.setAttribute('hidden', '');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        if (divTrigger) divTrigger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* 2. Back to Top Button */
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top-btn');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* 3. Modal System (Enquiry, Medical Deep-Dive, Resonance Deep-Dive, Quote) */
function initModals() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModalBtn');

  function openModal(title, htmlContent) {
    if (!modalOverlay) return;
    modalTitle.textContent = title;
    modalContent.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Bind Division Detail Buttons
  const openMedicalBtn = document.querySelectorAll('.open-medical-details');
  openMedicalBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(
        'Medical Division — Auro Corporation',
        `
        <div style="line-height:1.7; color:#334155;">
          <p style="margin-bottom:1rem; font-size:1.025rem;">
            Auro Corporation's <strong>Medical Division</strong> is an established healthcare trading portfolio delivering clinical instruments, hospital infrastructure, and vital medical diagnostics.
          </p>
          <div style="background:#f0f7ff; border-left:4px solid #00a2ea; padding:1.15rem; border-radius:8px; margin-bottom:1.5rem;">
            <h4 style="color:#0284c7; font-weight:800; margin-bottom:0.4rem; font-size:0.95rem;">Core Trading Verticals:</h4>
            <ul style="margin-left:1.25rem; font-size:0.875rem; color:#475569; display:flex; flex-direction:column; gap:0.35rem;">
              <li>Medical Equipment & Instruments</li>
              <li>Healthcare Supplies & Consumables</li>
              <li>Diagnostics & Laboratory Products</li>
              <li>Surgical & Clinical Products</li>
            </ul>
          </div>
          <p style="margin-bottom:1.75rem; font-size:0.875rem; color:#64748b;">
            All healthcare products are procured through verified certified channels adhering strictly to international standards including ISO 13485 and regulatory compliances.
          </p>
          <div style="display:flex; gap:1rem; justify-content:flex-end;">
            <button class="btn-cyan-pill" onclick="window.openQuoteModal('Medical Division Portfolio', 'Medical Division')">Submit Medical Enquiry</button>
          </div>
        </div>
        `
      );
    });
  });

  const openResonanceBtn = document.querySelectorAll('.open-resonance-details');
  openResonanceBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(
        'Resonance Division — Auro Corporation',
        `
        <div style="line-height:1.7; color:#334155;">
          <p style="margin-bottom:1rem; font-size:1.025rem;">
            Auro Corporation's <strong>Resonance Division</strong> focuses on diversified industrial trading, precision engineering components, technical equipment, and cross-border commercial distribution.
          </p>
          <div style="background:#f0fdfa; border-left:4px solid #0d9488; padding:1.15rem; border-radius:8px; margin-bottom:1.5rem;">
            <h4 style="color:#0f766e; font-weight:800; margin-bottom:0.4rem; font-size:0.95rem;">Core Trading Verticals:</h4>
            <ul style="margin-left:1.25rem; font-size:0.875rem; color:#475569; display:flex; flex-direction:column; gap:0.35rem;">
              <li>Industrial Products & Machinery</li>
              <li>Technical & Specialised Products</li>
              <li>General Trading Solutions</li>
              <li>Lifestyle & Consumer Products</li>
            </ul>
          </div>
          <p style="margin-bottom:1.75rem; font-size:0.875rem; color:#64748b;">
            The Resonance network connects manufacturers with institutional buyers across key industrial corridors with comprehensive shipment tracking and quality guarantees.
          </p>
          <div style="display:flex; gap:1rem; justify-content:flex-end;">
            <button class="btn-cyan-pill" onclick="window.openQuoteModal('Resonance Division Portfolio', 'Resonance Division')">Submit Resonance Enquiry</button>
          </div>
        </div>
        `
      );
    });
  });

  // Global helper for enquiry / contact triggers
  window.openQuoteModal = function(companyOrProduct, division = 'Medical Division') {
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `mailto:info@aurocorporation.com?subject=Enquiry:%20${encodeURIComponent(companyOrProduct || 'Auro Corporation')}`;
    }
  };

  window.handleModalSubmit = function(e, item) {
    e.preventDefault();
    closeModal();
    const refId = 'AURO-REQ-' + Math.floor(10000 + Math.random() * 90000);
    showToast(`Commercial Enquiry for "${item}" submitted! Tracking ID: ${refId}.`);
  };
}

function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

// 4. Smooth Scroll & Highlight for Hero Division Cards
window.scrollToDivision = function(type) {
  const cardId = type === 'medical' ? 'medicalDivisionCard' : 'resonanceDivisionCard';
  const pulseClass = type === 'medical' ? 'highlight-pulse-medical' : 'highlight-pulse-resonance';
  const targetElement = document.getElementById(cardId);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetElement.classList.remove('highlight-pulse-medical', 'highlight-pulse-resonance');
    // trigger reflow for smooth re-animation
    void targetElement.offsetWidth;
    targetElement.classList.add(pulseClass);
    setTimeout(() => {
      targetElement.classList.remove(pulseClass);
    }, 2200);
  } else {
    const divSection = document.getElementById('divisions');
    if (divSection) {
      divSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

// 5. Mobile Navigation Drawer Handler
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeBtn = document.getElementById('closeMobileNav');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const links = document.querySelectorAll('.mobile-nav-link');

  let closeTimer = null;

  function openDrawer() {
    if (!drawer) return;
    if (closeTimer) clearTimeout(closeTimer);
    drawer.style.display = 'flex';
    // Force DOM reflow so transition plays smoothly
    void drawer.offsetWidth;
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
    closeTimer = setTimeout(() => {
      if (!drawer.classList.contains('open')) {
        drawer.style.display = 'none';
      }
    }, 360);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer && drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  links.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Ensure default closed state has display: none
  if (drawer && !drawer.classList.contains('open')) {
    drawer.style.display = 'none';
  }
}

// 6. Double Stairs Preloader Curtain Animation
function initSkiper10Preloader() {
  const preloader = document.getElementById('sitePreloader') || document.getElementById('skiper10Preloader') || document.querySelector('.preloader');
  if (!preloader) return;

  const brandEl = document.getElementById('preloaderBrand');
  const statusEl = document.getElementById('preloaderStatus');
  const loaderEl = document.getElementById('preloaderLoader');
  const imageEl = document.getElementById('preloaderImage');
  const veilEl = document.getElementById('preloaderVeil');

  // Lock scroll during preloading
  document.body.style.overflow = 'hidden';

  // Guaranteed, prominent display duration (2.4s) so every visitor sees the full luxury atmosphere
  const duration = 2400;

  const timer = setTimeout(() => {
    triggerStairsExit();
  }, duration);

  function triggerStairsExit() {
    // 1. Smoothly fade out brand emblem & wordmark
    if (brandEl) {
      brandEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease, visibility 0.35s ease';
      brandEl.style.opacity = '0';
      brandEl.style.transform = 'scale(0.94)';
      brandEl.style.visibility = 'hidden';
      brandEl.style.pointerEvents = 'none';
    }

    // 2. Smoothly fade out status dot and sweep bar
    if (statusEl) {
      statusEl.style.transition = 'opacity 0.35s ease, visibility 0.35s ease';
      statusEl.style.opacity = '0';
      statusEl.style.visibility = 'hidden';
    }
    if (loaderEl) {
      loaderEl.style.transition = 'opacity 0.35s ease, visibility 0.35s ease';
      loaderEl.style.opacity = '0';
      loaderEl.style.visibility = 'hidden';
    }

    // 3. Smoothly fade out background image & veil to reveal the deep navy stair columns
    if (imageEl) {
      imageEl.style.transition = 'opacity 0.35s ease, visibility 0.35s ease';
      imageEl.style.opacity = '0';
      imageEl.style.visibility = 'hidden';
    }
    if (veilEl) {
      veilEl.style.transition = 'opacity 0.35s ease, visibility 0.35s ease';
      veilEl.style.opacity = '0';
      veilEl.style.visibility = 'hidden';
    }

    // 4. Trigger staircase curtains opening wave (top slides UP, bottom slides DOWN)
    setTimeout(() => {
      preloader.classList.add('animate-exit');
      document.body.style.overflow = '';

      // 5. Complete cleanup once all columns finish sliding away
      setTimeout(() => {
        preloader.classList.add('finished');
        preloader.style.display = 'none';
        preloader.style.visibility = 'hidden';
        preloader.style.pointerEvents = 'none';
        if (preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 1300);
    }, 150);
  }

  // Safety fallback: ensure page is never locked and preloader is never stuck
  setTimeout(() => {
    document.body.style.overflow = '';
    const lingeringPreloader = document.getElementById('sitePreloader') || document.getElementById('skiper10Preloader') || document.querySelector('.preloader');
    if (lingeringPreloader) {
      lingeringPreloader.style.display = 'none';
      if (lingeringPreloader.parentNode) {
        lingeringPreloader.parentNode.removeChild(lingeringPreloader);
      }
    }
  }, 5000);
}

// 7. Interactive Step Path Animation (#c-step-path) — Sticky Sequential Reveal
function initStepPath() {
  const wrapper = document.getElementById('why-us');
  const container = document.getElementById('stepPathContainer');
  const trackPath = document.getElementById('stepPathTrack');
  const drawPath = document.getElementById('stepPathDraw');
  const beamPath = document.getElementById('stepPathBeam');
  const items = document.querySelectorAll('.step-path-item');
  if (!container || !trackPath || !drawPath || items.length === 0) return;

  let cachedPathLength = 0;

  function recalculatePath() {
    const dots = container.querySelectorAll('.step-path-dot-anchor');
    if (dots.length < 2) return;
    const cRect = container.getBoundingClientRect();
    const pts = [];
    dots.forEach(dot => {
      const dRect = dot.getBoundingClientRect();
      pts.push({
        x: dRect.left + dRect.width / 2 - cRect.left,
        y: dRect.top + dRect.height / 2 - cRect.top
      });
    });

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const isHorizontal = Math.abs(p2.x - p1.x) > Math.abs(p2.y - p1.y);
      if (isHorizontal) {
        // Subtle arched hops between dots
        const midX = (p1.x + p2.x) / 2;
        const waveY = (i % 2 === 0) ? Math.min(p1.y, p2.y) - 20 : Math.max(p1.y, p2.y) + 20;
        d += ` Q ${midX} ${waveY}, ${p2.x} ${p2.y}`;
      } else {
        // Vertical connecting S-curve
        const midY = (p1.y + p2.y) / 2;
        const waveX = (i % 2 === 0) ? p1.x + 24 : p1.x - 24;
        d += ` Q ${waveX} ${midY}, ${p2.x} ${p2.y}`;
      }
    }

    trackPath.setAttribute('d', d);
    drawPath.setAttribute('d', d);
    if (beamPath) beamPath.setAttribute('d', d);

    try {
      cachedPathLength = drawPath.getTotalLength();
      drawPath.style.strokeDasharray = cachedPathLength;
    } catch (e) {}
  }

  let isTicking = false;

  function updateStickyStepProgress() {
    isTicking = false;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const stickyTop = window.innerWidth <= 768 ? 66 : 75;
    const totalScrollable = wrapper.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    // Progress 0..1 during the pinned scroll interval
    const scrolledDistance = stickyTop - rect.top;
    let progress = scrolledDistance / totalScrollable;
    progress = Math.max(0, Math.min(1, progress));

    // Also detect if the section is approaching into view
    const isApproaching = rect.top <= window.innerHeight * 0.75;
    if (!isApproaching && progress === 0) {
      items.forEach(item => {
        item.classList.remove('revealed', 'current-step');
      });
      container.classList.remove('active');
      if (cachedPathLength > 0) {
        drawPath.style.strokeDashoffset = cachedPathLength;
      }
      return;
    }

    // Milestones for sequential unlock:
    // Step 1: unlocked right away once section is at viewport
    // Step 2: unlocked at progress >= 0.22
    // Step 3: unlocked at progress >= 0.48
    // Step 4: unlocked at progress >= 0.74
    const milestones = [0.0, 0.22, 0.48, 0.74];

    items.forEach((item, idx) => {
      const stepMilestone = milestones[idx];
      const nextMilestone = milestones[idx + 1] !== undefined ? milestones[idx + 1] : 1.0;

      if (progress >= stepMilestone || (idx === 0 && isApproaching)) {
        item.classList.add('revealed');
      } else {
        item.classList.remove('revealed');
      }

      // Current focus highlight (pulse ring)
      if (progress >= stepMilestone && (progress < nextMilestone || idx === items.length - 1)) {
        item.classList.add('current-step');
      } else {
        item.classList.remove('current-step');
      }
    });

    // Synchronize the glowing SVG path progress
    if (cachedPathLength > 0) {
      const lineProgress = Math.max(0, Math.min(1, (progress - 0.05) / 0.75));
      drawPath.style.strokeDashoffset = cachedPathLength * (1 - lineProgress);
    }

    // When all 4 points are unlocked, trigger the energy travelling beam
    if (progress >= 0.88) {
      container.classList.add('active');
    } else {
      container.classList.remove('active');
    }
  }

  // Recalculate SVG path coordinates initially and on resize
  recalculatePath();
  window.addEventListener('resize', () => {
    recalculatePath();
    updateStickyStepProgress();
  });
  setTimeout(recalculatePath, 350);
  setTimeout(recalculatePath, 1500);

  // Real-time smooth scroll event listener
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateStickyStepProgress);
      isTicking = true;
    }
  }, { passive: true });

  // Initial call
  updateStickyStepProgress();
}

// 8. Perspective Text & Step Scroll Animation
function initSkiper31Process() {
  const section = document.getElementById('process');
  if (!section) return;

  const heading = document.getElementById('processHeading');
  const nodes = section.querySelectorAll('.process-step-node');
  const arrows = section.querySelectorAll('.process-arrow-divider');

  // Split heading characters (perspective: 500px, x & rotateX per distanceFromCenter)
  if (heading && !heading.dataset.split) {
    heading.dataset.split = 'true';
    const originalText = heading.textContent.trim();
    heading.innerHTML = '';
    const words = originalText.split(' ');
    let charGlobalIndex = 0;
    const totalChars = originalText.replace(/\s+/g, '').length;
    const centerCharIndex = Math.floor(totalChars / 2);

    words.forEach((word, wIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'skiper31-word';

      word.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'skiper31-char';
        charSpan.textContent = char;
        charSpan.dataset.dist = (charGlobalIndex - centerCharIndex).toString();
        wordSpan.appendChild(charSpan);
        charGlobalIndex++;
      });

      heading.appendChild(wordSpan);
      if (wIdx < words.length - 1) {
        heading.appendChild(document.createTextNode(' '));
      }
    });
  }

  const chars = section.querySelectorAll('.skiper31-char');
  const totalNodes = nodes.length;
  const centerNodeIndex = (totalNodes - 1) / 2; // for 4 nodes: 1.5

  let ticking = false;

  function updateSkiper31() {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const winHeight = window.innerHeight;

    // Scroll progress as section travels into view
    const startY = winHeight * 0.95;
    const endY = winHeight * 0.35;
    let progress = (startY - rect.top) / (startY - endY);
    progress = Math.max(0, Math.min(1, progress));

    // 1. Heading characters (CharacterV1): rotateX + horizontal spread
    const textFactor = 1 - progress;
    chars.forEach((c) => {
      const dist = parseFloat(c.dataset.dist) || 0;
      const x = dist * 18 * textFactor;
      const rotateX = dist * 14 * textFactor;
      const opacity = 0.25 + 0.75 * progress;
      c.style.transform = `translate3d(${x}px, 0, 0) rotateX(${rotateX}deg)`;
      c.style.opacity = opacity;
    });

    // 2. Process Step Nodes: fanning out and converging dynamically on scroll
    const isDesktop = window.innerWidth > 768;
    nodes.forEach((node, idx) => {
      if (isDesktop) {
        const dist = idx - centerNodeIndex; // -1.5, -0.5, 0.5, 1.5
        const factor = 1 - progress;
        const x = dist * 42 * factor;
        const y = Math.abs(dist) * 16 * factor;
        const rotate = dist * 12 * factor;
        const scale = 0.82 + 0.18 * progress;
        const opacity = 0.25 + 0.75 * progress;

        node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
        node.style.opacity = opacity;
      } else {
        const factor = 1 - progress;
        const y = 20 * factor;
        const opacity = 0.3 + 0.7 * progress;
        node.style.transform = `translate3d(0, ${y}px, 0)`;
        node.style.opacity = opacity;
      }
    });

    // 3. Arrow dividers
    arrows.forEach((arr) => {
      arr.style.opacity = (progress * 0.9).toString();
      arr.style.transform = `scale(${0.6 + 0.4 * progress})`;
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateSkiper31);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateSkiper31);
  updateSkiper31();
}

// 9. Aura Petal Dissolve Effect (#c-petal-dissolve) — True Scroll-Driven Assembly & Dissolve
function initPetalDissolve() {
  const targets = document.querySelectorAll('.petal-dissolve-target');
  if (targets.length === 0) return;

  const colorPalettes = {
    hero: [
      { r: 245, g: 194, b: 83 },  // #f5c253 luxury gold
      { r: 229, g: 169, b: 60 },  // #e5a93c amber
      { r: 56,  g: 189, b: 248 }, // #38bdf8 cyan
      { r: 255, g: 255, b: 255 }, // pearl white
    ],
    about: [
      { r: 245, g: 194, b: 83 },  // gold
      { r: 229, g: 169, b: 60 },  // amber
      { r: 251, g: 113, b: 133 }, // rose petal
      { r: 255, g: 255, b: 255 }, // white
    ],
    vision: [
      { r: 56,  g: 189, b: 248 }, // cyan
      { r: 14,  g: 165, b: 233 }, // deep cyan
      { r: 245, g: 194, b: 83 },  // gold
      { r: 255, g: 255, b: 255 }, // white
    ],
    cta: [
      { r: 255, g: 255, b: 255 }, // pure pearl white
      { r: 245, g: 194, b: 83 },  // radiant gold
      { r: 56,  g: 189, b: 248 }, // cyan
      { r: 251, g: 113, b: 133 }, // rose
    ]
  };

  const targetInstances = [];

  targets.forEach((target) => {
    // 1. Wrap original text in .petal-target-text span if not already wrapped
    let textSpan = target.querySelector('.petal-target-text');
    if (!textSpan) {
      const rawHtml = target.innerHTML;
      textSpan = document.createElement('span');
      textSpan.className = 'petal-target-text';
      textSpan.innerHTML = rawHtml;
      target.innerHTML = '';
      target.appendChild(textSpan);
    }

    // 2. Create and attach canvas
    let canvas = target.querySelector('.petal-dissolve-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'petal-dissolve-canvas';
      target.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    const targetId = target.dataset.petalId || 'hero';
    const isHero = targetId === 'hero';
    const palette = colorPalettes[targetId] || colorPalettes.hero;

    let dims = { w: 100, h: 80, bufferX: 140, bufferY: 120, textW: 100, textH: 30 };
    let particles = [];
    let currentProgress = isHero ? 1.0 : 0.0;
    let targetProgress = isHero ? 1.0 : 0.0;

    function resizeCanvas() {
      const rect = target.getBoundingClientRect();
      const bufferX = 140;
      const bufferY = 120;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(100, rect.width + bufferX * 2);
      const h = Math.max(80, rect.height + bufferY * 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      dims = { w, h, bufferX, bufferY, textW: rect.width, textH: rect.height };
      generatePetals();
    }

    function generatePetals() {
      const count = Math.min(65, Math.max(40, Math.round(dims.textW / 4.2)));
      particles = [];
      for (let i = 0; i < count; i++) {
        const uPos = i / (count - 1 || 1);
        const x0 = dims.bufferX + uPos * dims.textW + (Math.random() - 0.5) * 16;
        const y0 = dims.bufferY + dims.textH * 0.5 + (Math.random() - 0.5) * (dims.textH * 0.85);

        // Dispersed / scattered trajectory vector
        const angleDir = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
        const speed = 45 + Math.random() * 80;
        const dx = Math.cos(angleDir) * speed + (uPos - 0.5) * 75;
        const dy = Math.sin(angleDir) * speed - (30 + Math.random() * 55);

        const colorObj = palette[Math.floor(Math.random() * palette.length)];
        const color = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, `;

        particles.push({
          x0,
          y0,
          dx,
          dy,
          width: 7 + Math.random() * 7,
          height: 13 + Math.random() * 12,
          angle0: (Math.random() - 0.5) * 0.25,
          scatterSpin: (Math.random() - 0.5) * 5.4,
          swayAmp: 14 + Math.random() * 20,
          swayFreq: 5 + Math.random() * 4,
          seed: Math.random() * Math.PI * 2,
          color
        });
      }
    }

    function drawPetal(c, x, y, w, h, rot, opacity, colorBase) {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.globalAlpha = Math.max(0, Math.min(1, opacity));

      c.beginPath();
      c.moveTo(0, -h * 0.5);
      c.bezierCurveTo(w * 0.55, -h * 0.25, w * 0.65, h * 0.25, 0, h * 0.5);
      c.bezierCurveTo(-w * 0.65, h * 0.25, -w * 0.55, -h * 0.25, 0, -h * 0.5);
      c.closePath();

      const grad = c.createLinearGradient(-w * 0.5, -h * 0.5, w * 0.5, h * 0.5);
      grad.addColorStop(0, `${colorBase}0.95)`);
      grad.addColorStop(0.5, `${colorBase}0.85)`);
      grad.addColorStop(1, `${colorBase}0.4)`);

      c.fillStyle = grad;
      c.shadowColor = `${colorBase}0.45)`;
      c.shadowBlur = 8;
      c.fill();

      c.beginPath();
      c.moveTo(0, -h * 0.4);
      c.lineTo(0, h * 0.35);
      c.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.45})`;
      c.lineWidth = 1;
      c.stroke();

      c.restore();
    }

    function updateProgressFromScroll() {
      const rect = target.getBoundingClientRect();
      const winH = window.innerHeight;

      if (isHero) {
        // Hero Section: at scrollY = 0, word is fully formed.
        // As you scroll down (0 -> 280px), it dissolves into flying petals!
        // As you scroll back up, petals fly back in and form the word!
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = Math.min(300, winH * 0.45);
        let p = 1 - (scrollY / maxScroll);
        targetProgress = Math.max(0, Math.min(1, p));
      } else {
        // Other Sections (About, Vision, CTA):
        // As you scroll down and section enters from bottom: petals fly in and form the word!
        // Enter zone: from winH * 0.92 to winH * 0.48
        // Focal zone: from winH * 0.48 to winH * 0.20
        // Exit zone: from winH * 0.20 to -50px
        const enterStart = winH * 0.92;
        const enterEnd = winH * 0.48;
        const exitStart = winH * 0.20;
        const exitEnd = -50;

        if (rect.top > enterStart) {
          targetProgress = 0; // Off-screen below
        } else if (rect.top >= enterEnd) {
          // Entering -> Petals fly in and assemble the word!
          targetProgress = (enterStart - rect.top) / (enterStart - enterEnd);
        } else if (rect.top >= exitStart) {
          // Focal reading zone -> Word fully formed!
          targetProgress = 1;
        } else if (rect.top >= exitEnd) {
          // Exiting -> Dissolves into petals as it leaves top!
          targetProgress = (rect.top - exitEnd) / (exitStart - exitEnd);
        } else {
          targetProgress = 0; // Off-screen above
        }
        targetProgress = Math.max(0, Math.min(1, targetProgress));
      }
    }

    function render(force = false) {
      // Smooth physical interpolation towards scroll target
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.003 || force) {
        currentProgress += diff * 0.2;
      } else {
        currentProgress = targetProgress;
      }

      const p = currentProgress;
      const ease = p * p * (3 - 2 * p); // smoothstep

      if (ease >= 0.99) {
        // Fully assembled: crisp clean text, clear canvas
        textSpan.style.opacity = '1';
        textSpan.style.filter = 'none';
        ctx.clearRect(0, 0, dims.w, dims.h);
        return;
      }

      // Mid-flight or dissolved state:
      ctx.clearRect(0, 0, dims.w, dims.h);

      // Text fade in/out
      if (ease > 0.70) {
        const textAlpha = (ease - 0.70) / 0.30;
        textSpan.style.opacity = textAlpha.toString();
        textSpan.style.filter = `blur(${(1 - textAlpha) * 3}px)`;
      } else {
        textSpan.style.opacity = '0';
        textSpan.style.filter = 'blur(4px)';
      }

      // Draw petals at current scroll position
      const disperse = 1 - ease;
      particles.forEach((pt) => {
        const x = pt.x0 + pt.dx * disperse + Math.sin(disperse * pt.swayFreq + pt.seed) * (pt.swayAmp * disperse);
        const y = pt.y0 + pt.dy * disperse + Math.cos(disperse * pt.swayFreq * 0.8 + pt.seed) * (pt.swayAmp * 0.6 * disperse);
        const rot = pt.angle0 + pt.scatterSpin * disperse;
        const w = pt.width * (0.8 + 0.35 * Math.sin(ease * Math.PI));
        const h = pt.height * (0.8 + 0.35 * Math.sin(ease * Math.PI));
        const opacity = Math.sin(ease * Math.PI * 0.92 + 0.08);

        drawPetal(ctx, x, y, w, h, rot, opacity, pt.color);
      });
    }

    resizeCanvas();

    targetInstances.push({
      target,
      resizeCanvas,
      updateProgressFromScroll,
      render,
      getProgress: () => currentProgress,
      getTargetProgress: () => targetProgress,
    });
  });

  // Global Loop for smooth scroll response
  let isTicking = false;
  function onScroll() {
    targetInstances.forEach(inst => inst.updateProgressFromScroll());
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(runLoop);
    }
  }

  function runLoop() {
    let needsAnotherPass = false;
    targetInstances.forEach((inst) => {
      inst.render();
      if (Math.abs(inst.getTargetProgress() - inst.getProgress()) > 0.003) {
        needsAnotherPass = true;
      }
    });

    if (needsAnotherPass) {
      requestAnimationFrame(runLoop);
    } else {
      isTicking = false;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    targetInstances.forEach(inst => {
      inst.resizeCanvas();
      inst.updateProgressFromScroll();
      inst.render(true);
    });
  });

  // Initial update
  setTimeout(() => {
    targetInstances.forEach(inst => {
      inst.resizeCanvas();
      inst.updateProgressFromScroll();
      inst.render(true);
    });
  }, 250);
}

/* ==========================================================================
   11. LUXURY SCROLL MOTION ENGINE (Top Reading Bar, Stat Counters, Stagger Reveals, Parallax)
   ========================================================================== */
function initPremiumScrollMotion() {
  // 1. Inject Top Slim Luxury Progress Bar if not present
  let progressBar = document.getElementById('pageScrollProgress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'pageScrollProgress';
    progressBar.className = 'page-scroll-progress-line';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.prepend(progressBar);
  }

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  };

  // 2. Animated Number Counter for Stats Bar (Bidirectional: triggers on every entry)
  function animateCounter(el) {
    if (!el) return;
    if (el._animId) {
      cancelAnimationFrame(el._animId);
      el._animId = null;
    }
    const target = parseFloat(el.getAttribute('data-count-to')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo for ultra smooth luxury snap
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(target * ease);
      el.textContent = current + suffix;
      if (progress < 1) {
        el._animId = requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
        el._animId = null;
      }
    }
    el._animId = requestAnimationFrame(step);
  }

  function resetCounter(el) {
    if (!el) return;
    if (el._animId) {
      cancelAnimationFrame(el._animId);
      el._animId = null;
    }
    const suffix = el.getAttribute('data-suffix') || '';
    el.textContent = '0' + suffix;
  }

  // 3. Staggered Scroll Reveal IntersectionObserver (Bidirectional: triggers on both scroll down & scroll up)
  const revealElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom'
  );

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          
          // Trigger counter animation on every viewport entry (scroll up or down)
          if (entry.target.hasAttribute('data-count-to')) {
            animateCounter(entry.target);
          }
          const nestedCounters = entry.target.querySelectorAll('[data-count-to]');
          nestedCounters.forEach(animateCounter);
        } else {
          // When leaving viewport, remove revealed state so it animates again on next entry
          entry.target.classList.remove('is-revealed');

          // Reset counters to 0 so they count up freshly next time
          if (entry.target.hasAttribute('data-count-to')) {
            resetCounter(entry.target);
          }
          const nestedCounters = entry.target.querySelectorAll('[data-count-to]');
          nestedCounters.forEach(resetCounter);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px 0px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: reveal all immediately if IntersectionObserver unsupported
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 4. Parallax Depth on Division images & About HQ building image
  const divisionImages = document.querySelectorAll('.division-card__image');
  const aboutImage = document.querySelector('.about-building-img-wrap img');

  let isParallaxTicking = false;
  const onScrollParallax = () => {
    updateScrollProgress();
    if (!isParallaxTicking) {
      isParallaxTicking = true;
      requestAnimationFrame(() => {
        const winH = window.innerHeight;
        
        // Division cards subtle image parallax
        divisionImages.forEach(img => {
          const rect = img.getBoundingClientRect();
          if (rect.top < winH && rect.bottom > 0) {
            const relY = ((rect.top - winH / 2) / winH) * 26;
            img.style.setProperty('--parallax-y', `${relY.toFixed(1)}px`);
          }
        });

        // About building image gentle parallax
        if (aboutImage) {
          const rect = aboutImage.getBoundingClientRect();
          if (rect.top < winH && rect.bottom > 0) {
            const relY = ((rect.top - winH / 2) / winH) * 32;
            aboutImage.style.setProperty('--parallax-about-y', `${relY.toFixed(1)}px`);
          }
        }

        isParallaxTicking = false;
      });
    }
  };

  window.addEventListener('scroll', onScrollParallax, { passive: true });
  window.addEventListener('resize', updateScrollProgress, { passive: true });
  updateScrollProgress();
}

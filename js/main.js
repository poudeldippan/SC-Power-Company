/**
 * S.C. POWER COMPANY PVT. LTD. - Official Website Scripts
 * Production-ready vanilla JavaScript with:
 * 1. Horizontal track slider (4.5s auto-play, left/right navigation, touch support)
 * 2. Salient features collapsible accordion (+ / - toggle)
 * 3. Gallery grid lightbox with Prev/Next multi-photo navigation & counter
 * 4. Interactive contact form & mobile navigation drawer
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================================================
  // 1. MOBILE HAMBURGER & SUBMENU NAVIGATION
  // ==========================================================================
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  const mobileDropdowns = document.querySelectorAll('.mobile-has-submenu');
  mobileDropdowns.forEach(function (item) {
    const toggleTrigger = item.querySelector('.mobile-submenu-trigger');
    const submenu = item.querySelector('.mobile-submenu');

    if (toggleTrigger && submenu) {
      toggleTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        const isOpen = submenu.classList.toggle('open');
        toggleTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  });

  document.addEventListener('click', function (e) {
    if (mobileNav && mobileNav.classList.contains('open')) {
      if (!mobileNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        mobileNav.classList.remove('open');
        if (hamburgerBtn) {
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });

  // ==========================================================================
  // 2. HOMEPAGE HERO CROSS-FADE SLIDER (3.2s MAJESTIC FADE)
  // ==========================================================================
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('hero-prev-btn');
  const nextBtn = document.getElementById('hero-next-btn');
  const dots = document.querySelectorAll('.slider-dot');
  const sliderSection = document.querySelector('.hero-slider-section');

  if (slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideTimer = null;
    const slideDuration = 5500; // 5.5s display before 3.2s smooth crossfade

    function showSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;

      slides.forEach(function (slide, i) {
        if (i === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      dots.forEach(function (dot, i) {
        if (i === currentSlide) {
          dot.classList.add('active');
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.classList.remove('active');
          dot.removeAttribute('aria-current');
        }
      });
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        nextSlide();
        resetTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prevSlide();
        resetTimer();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showSlide(i);
        resetTimer();
      });
    });

    function startTimer() {
      if (!slideTimer) {
        slideTimer = setInterval(nextSlide, slideDuration);
      }
    }

    function stopTimer() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }

    function resetTimer() {
      stopTimer();
      startTimer();
    }

    if (sliderSection) {
      sliderSection.addEventListener('mouseenter', stopTimer);
      sliderSection.addEventListener('mouseleave', startTimer);

      let touchStartX = 0;
      let touchEndX = 0;

      sliderSection.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      sliderSection.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          resetTimer();
        }
      }, { passive: true });
    }

    document.addEventListener('keydown', function (e) {
      if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        nextSlide();
        resetTimer();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        resetTimer();
      }
    });

    // Initialize slide 0
    showSlide(0);
    startTimer();
  }

  // ==========================================================================
  // 3. SALIENT FEATURES FAQ-STYLE ACCORDION (+ / − TOGGLE)
  // ==========================================================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  const expandAllBtn = document.getElementById('expand-all-btn');
  const collapseAllBtn = document.getElementById('collapse-all-btn');
  const accordionItems = document.querySelectorAll('.accordion-item');

  function updateAccordionIcon(item, isExpanded) {
    const icon = item.querySelector('.accordion-icon');
    if (icon) {
      icon.textContent = isExpanded ? '−' : '+';
    }
  }

  window.toggleAccordion = function (headerBtn) {
    const item = headerBtn.closest('.accordion-item');
    if (!item) return;
    const isActive = item.classList.toggle('active');
    headerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    updateAccordionIcon(item, isActive);
  };

  if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(function (header) {
      header.addEventListener('click', function () {
        const item = header.closest('.accordion-item');
        const isActive = item.classList.contains('active');

        if (isActive) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
          updateAccordionIcon(item, false);
        } else {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
          updateAccordionIcon(item, true);
        }
      });
    });

    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', function () {
        accordionItems.forEach(function (item) {
          item.classList.add('active');
          const hdr = item.querySelector('.accordion-header');
          if (hdr) hdr.setAttribute('aria-expanded', 'true');
          updateAccordionIcon(item, true);
        });
      });
    }

    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', function () {
        accordionItems.forEach(function (item) {
          item.classList.remove('active');
          const hdr = item.querySelector('.accordion-header');
          if (hdr) hdr.setAttribute('aria-expanded', 'false');
          updateAccordionIcon(item, false);
        });
      });
    }
  }

  // ==========================================================================
  // 4. GALLERY GRID WITH LIGHTBOX & PREV/NEXT MULTI-PHOTO NAVIGATION
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const galleryModal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalCounter = document.getElementById('modal-counter');
  const modalClose = document.getElementById('modal-close');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');

  let currentGalleryIndex = 0;
  let activeGalleryItems = galleryItems;

  function updateActiveItems() {
    activeGalleryItems = galleryItems.filter(function (item) {
      return item.style.display !== 'none';
    });
  }

  function showModalImage(index) {
    if (activeGalleryItems.length === 0) return;
    currentGalleryIndex = (index + activeGalleryItems.length) % activeGalleryItems.length;
    const targetItem = activeGalleryItems[currentGalleryIndex];
    const img = targetItem.querySelector('img');
    const title = targetItem.querySelector('.gallery-item-title');
    const loc = targetItem.querySelector('.gallery-item-loc');

    if (img && modalImg) {
      modalImg.style.opacity = '0';
      setTimeout(function () {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Gallery photo';
        modalImg.style.opacity = '1';
      }, 100);

      if (modalCaption) {
        modalCaption.textContent = (title ? title.textContent : '') + (loc ? ' — ' + loc.textContent : '');
      }

      if (modalCounter) {
        modalCounter.textContent = 'Image ' + (currentGalleryIndex + 1) + ' of ' + activeGalleryItems.length;
      }
    }
  }

  // Global trigger function for inline onclick & programmatic access
  window.openGalleryLightbox = function (index) {
    updateActiveItems();
    if (!galleryModal) return;
    showModalImage(index);
    galleryModal.classList.add('open');
  };

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });

        updateActiveItems();
      });
    });
  }

  if (galleryItems.length > 0 && galleryModal && modalImg) {
    galleryItems.forEach(function (item, index) {
      item.addEventListener('click', function () {
        updateActiveItems();
        const activeIdx = activeGalleryItems.indexOf(item);
        window.openGalleryLightbox(activeIdx !== -1 ? activeIdx : index);
      });
    });

    if (modalNext) {
      modalNext.addEventListener('click', function (e) {
        e.stopPropagation();
        showModalImage(currentGalleryIndex + 1);
      });
    }

    if (modalPrev) {
      modalPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        showModalImage(currentGalleryIndex - 1);
      });
    }

    if (modalClose) {
      modalClose.addEventListener('click', function () {
        galleryModal.classList.remove('open');
      });
    }

    galleryModal.addEventListener('click', function (e) {
      if (e.target === galleryModal) {
        galleryModal.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (galleryModal.classList.contains('open')) {
        if (e.key === 'Escape') {
          galleryModal.classList.remove('open');
        } else if (e.key === 'ArrowRight') {
          showModalImage(currentGalleryIndex + 1);
        } else if (e.key === 'ArrowLeft') {
          showModalImage(currentGalleryIndex - 1);
        }
      }
    });

    let modalTouchStartX = 0;
    let modalTouchEndX = 0;

    galleryModal.addEventListener('touchstart', function (e) {
      modalTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryModal.addEventListener('touchend', function (e) {
      modalTouchEndX = e.changedTouches[0].screenX;
      const diff = modalTouchStartX - modalTouchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          showModalImage(currentGalleryIndex + 1);
        } else {
          showModalImage(currentGalleryIndex - 1);
        }
      }
    }, { passive: true });
  }

  // ==========================================================================
  // 5. INTERACTIVE CONTACT FORM SUBMISSION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Processing Inquiry...</span>';
      }

      setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span>';
        }
        formFeedback.style.display = 'block';
        contactForm.reset();
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 700);
    });
  }
});

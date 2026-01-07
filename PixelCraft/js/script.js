// Main JavaScript for PixelCraft Digital Agency

// Form Validation
class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = form.querySelectorAll("input, textarea, select");
    this.init();
  }

  init() {
    this.inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearError(input));
    });

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (!value) {
          errorMessage = "Name is required";
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = "Name must be at least 2 characters";
          isValid = false;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = "Email is required";
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = "Please enter a valid email address";
          isValid = false;
        }
        break;

      case "subject":
        if (!value) {
          errorMessage = "Subject is required";
          isValid = false;
        } else if (value.length < 5) {
          errorMessage = "Subject must be at least 5 characters";
          isValid = false;
        }
        break;

      case "message":
        if (!value) {
          errorMessage = "Message is required";
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = "Message must be at least 10 characters";
          isValid = false;
        }
        break;

      case "service":
        if (!value) {
          errorMessage = "Please select a service";
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  showError(field, message) {
    field.classList.add("error");
    const errorElement = field.parentElement.querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  clearError(field) {
    field.classList.remove("error");
    const errorElement = field.parentElement.querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let isFormValid = true;
    this.inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Simulate form submission
      const submitBtn = this.form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("Thank you for your message! We'll get back to you soon.");
        this.form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  }
}

// Portfolio Filter
class PortfolioFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll(".filter-btn");
    this.portfolioItems = document.querySelectorAll(".portfolio-item");
    this.init();
  }

  init() {
    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => this.filterItems(button));
    });
  }

  filterItems(button) {
    // Update active button
    this.filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    this.portfolioItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (filterValue === "all" || itemCategory === filterValue) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 100);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  }
}

// Testimonials Slider
class TestimonialsSlider {
  constructor() {
    this.slides = document.querySelectorAll(".testimonial");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.querySelector(".testimonial-prev");
    this.nextBtn = document.querySelector(".testimonial-next");
    this.currentSlide = 0;
    this.autoSlideInterval = null;
    this.init();
  }

  init() {
    if (this.slides.length > 0) {
      this.showSlide(0);
      this.startAutoSlide();

      if (this.prevBtn) {
        this.prevBtn.addEventListener("click", () => this.prevSlide());
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", () => this.nextSlide());
      }

      this.dots.forEach((dot, index) => {
        dot.addEventListener("click", () => this.goToSlide(index));
      });
    }
  }

  showSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    this.slides[index].classList.add("active");
    this.dots[index].classList.add("active");
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(this.currentSlide);
    this.resetAutoSlide();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
    this.resetAutoSlide();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.showSlide(this.currentSlide);
    this.resetAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }
}

// Modal System
class ModalSystem {
  constructor() {
    this.modals = document.querySelectorAll(".modal");
    this.init();
  }

  init() {
    // Open modals
    document.querySelectorAll("[data-modal]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute("data-modal");
        this.openModal(modalId);
      });
    });

    // Close modals
    document.querySelectorAll(".modal-close").forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => this.closeAllModals());
    });

    // Close on outside click
    this.modals.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeAllModals();
        }
      });
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAllModals();
      }
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }

  closeAllModals() {
    this.modals.forEach((modal) => {
      modal.classList.remove("show");
    });
    document.body.style.overflow = "";
  }
}

// Portfolio Lightbox
class PortfolioLightbox {
  constructor() {
    this.items = document.querySelectorAll(".portfolio-item");
    this.modal = null;
    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.createModal();
    this.items.forEach((item, index) => {
      item.addEventListener("click", () => this.openModal(index));
    });
  }

  createModal() {
    this.modal = document.createElement("div");
    this.modal.className = "portfolio-modal";
    this.modal.innerHTML = `
      <div class="portfolio-modal-content">
        <span class="portfolio-modal-close">&times;</span>
        <img class="portfolio-modal-image" src="" alt="">
        <div class="portfolio-modal-info">
          <h3 class="portfolio-modal-title"></h3>
          <p class="portfolio-modal-description"></p>
        </div>
        <button class="portfolio-modal-prev">&larr;</button>
        <button class="portfolio-modal-next">&rarr;</button>
      </div>
    `;
    document.body.appendChild(this.modal);

    // Event listeners
    this.modal
      .querySelector(".portfolio-modal-close")
      .addEventListener("click", () => this.closeModal());
    this.modal
      .querySelector(".portfolio-modal-prev")
      .addEventListener("click", () => this.showPrev());
    this.modal
      .querySelector(".portfolio-modal-next")
      .addEventListener("click", () => this.showNext());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (this.modal.style.display === "flex") {
        if (e.key === "Escape") this.closeModal();
        if (e.key === "ArrowLeft") this.showPrev();
        if (e.key === "ArrowRight") this.showNext();
      }
    });
  }

  openModal(index) {
    this.currentIndex = index;
    this.updateModal();
    this.modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  showPrev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateModal();
  }

  showNext() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateModal();
  }

  updateModal() {
    const item = this.items[this.currentIndex];
    const img = item.querySelector("img");
    const overlay = item.querySelector(".portfolio-overlay");
    const title = overlay.querySelector("h3").textContent;
    const description = overlay.querySelector("p").textContent;

    this.modal.querySelector(".portfolio-modal-image").src = img.src;
    this.modal.querySelector(".portfolio-modal-title").textContent = title;
    this.modal.querySelector(".portfolio-modal-description").textContent =
      description;
  }
}

// Newsletter Form
class NewsletterForm {
  constructor() {
    this.forms = document.querySelectorAll(".newsletter-form");
    this.init();
  }

  init() {
    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => this.handleSubmit(e, form));
    });
  }

  handleSubmit(e, form) {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();

    if (!email) {
      this.showMessage(form, "Please enter your email address", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showMessage(form, "Please enter a valid email address", "error");
      return;
    }

    // Simulate subscription
    const button = form.querySelector("button");
    const originalText = button.textContent;
    button.textContent = "Subscribing...";
    button.disabled = true;

    setTimeout(() => {
      this.showMessage(
        form,
        "Thank you for subscribing! We'll keep you updated with our latest news.",
        "success"
      );
      form.reset();
      button.textContent = originalText;
      button.disabled = false;
    }, 1500);
  }

  showMessage(form, message, type) {
    // Remove existing message
    const existingMsg = form.querySelector(".newsletter-message");
    if (existingMsg) {
      existingMsg.remove();
    }

    // Create new message
    const msgDiv = document.createElement("div");
    msgDiv.className = `newsletter-message ${type}`;
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
      margin-top: 10px;
      padding: 10px 15px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      ${
        type === "success"
          ? "background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;"
          : "background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"
      }
    `;

    form.appendChild(msgDiv);

    // Auto remove success messages after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        if (msgDiv.parentNode) {
          msgDiv.remove();
        }
      }, 5000);
    }
  }
}

// Back to Top Button
class BackToTop {
  constructor() {
    this.button = document.getElementById("back-to-top");
    this.init();
  }

  init() {
    if (this.button) {
      window.addEventListener("scroll", () => this.toggleVisibility());
      this.button.addEventListener("click", () => this.scrollToTop());
    }
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.button.classList.add("show");
    } else {
      this.button.classList.remove("show");
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Form validation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    new FormValidator(contactForm);
  }

  const quoteForm = document.getElementById("quote-form");
  if (quoteForm) {
    new FormValidator(quoteForm);
  }

  // Portfolio filter
  new PortfolioFilter();

  // Testimonials slider
  new TestimonialsSlider();

  // Modal system
  new ModalSystem();

  // Portfolio lightbox
  new PortfolioLightbox();

  // Newsletter form
  new NewsletterForm();

  // Back to top button
  new BackToTop();

  // Add fade-in-up classes to elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe various elements
  document
    .querySelectorAll(
      ".service-card, .portfolio-item, .team-member, .contact-item"
    )
    .forEach((el, index) => {
      el.classList.add(`delay-${(index % 5) + 1}`);
      observer.observe(el);
    });
});

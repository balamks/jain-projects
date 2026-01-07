// Animations and Effects for PixelCraft

// Typewriter Effect
class Typewriter {
  constructor(element, words, wait = 3000) {
    this.element = element;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = `<span class="typewriter">${this.txt}</span>`;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Counter Animation
class Counter {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = parseInt(target);
    this.duration = duration;
    this.start = 0;
    this.startTime = null;
    this.observer = null;
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startAnimation();
            this.observer.unobserve(this.element);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(this.element);
  }

  startAnimation() {
    this.startTime = null;
    this.animate();
  }

  animate(currentTime) {
    if (!this.startTime) this.startTime = currentTime;
    const progress = currentTime - this.startTime;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const percentage = Math.min(progress / this.duration, 1);
    const easedPercentage = easeOut(percentage);

    this.element.textContent = Math.floor(this.target * easedPercentage);

    if (percentage < 1) {
      requestAnimationFrame((time) => this.animate(time));
    } else {
      this.element.textContent = this.target;
    }
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll(".fade-in-up");
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    this.elements.forEach((element) => {
      observer.observe(element);
    });
  }
}

// Smooth Scroll
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

// Active Navigation
class ActiveNavigation {
  constructor() {
    this.sections = document.querySelectorAll("section[id]");
    this.navLinks = document.querySelectorAll(".nav-menu a");
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.updateActiveLink());
    this.updateActiveLink();
  }

  updateActiveLink() {
    const scrollY = window.pageYOffset;

    this.sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}

// Loading Screen
class LoadingScreen {
  constructor() {
    this.screen = document.getElementById("loading-screen");
    this.init();
  }

  init() {
    if (this.screen) {
      setTimeout(() => {
        this.screen.classList.add("hide");
        setTimeout(() => {
          this.screen.style.display = "none";
        }, 500);
      }, 2000);
    }
  }
}

// Theme Switcher
class ThemeSwitcher {
  constructor() {
    this.toggle = document.getElementById("theme-toggle");
    this.init();
  }

  init() {
    if (this.toggle) {
      // Load saved theme
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        this.updateIcon();
      }

      this.toggle.addEventListener("click", () => this.toggleTheme());
    }
  }

  toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    this.updateIcon();
  }

  updateIcon() {
    const isDark = document.body.classList.contains("dark-theme");
    this.toggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }
}

// Mobile Menu
class MobileMenu {
  constructor() {
    this.btn = document.getElementById("mobile-menu-btn");
    this.menu = document.querySelector(".nav-menu");
    this.init();
  }

  init() {
    if (this.btn && this.menu) {
      this.btn.addEventListener("click", () => this.toggleMenu());
    }
  }

  toggleMenu() {
    this.menu.classList.toggle("mobile-menu");
    const isOpen = this.menu.classList.contains("mobile-menu");
    this.btn.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  }
}

// Parallax Effect
class ParallaxEffect {
  constructor() {
    this.heroContent = document.querySelector(".hero-content");
    this.init();
  }

  init() {
    if (this.heroContent) {
      window.addEventListener("scroll", () => this.updateParallax());
    }
  }

  updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    this.heroContent.style.transform = `translateY(${rate}px)`;
  }
}

// Initialize all animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Typewriter effect
  const typewriterElement = document.querySelector(".typewriter");
  if (typewriterElement) {
    const words = [
      "Digital Innovation",
      "Creative Solutions",
      "Modern Design",
      "Pixel Perfect",
    ];
    new Typewriter(typewriterElement, words);
  }

  // Counter animations
  document.querySelectorAll(".stat-number").forEach((counter) => {
    const target = counter.getAttribute("data-target");
    if (target) {
      new Counter(counter, target);
    }
  });

  // Scroll animations
  new ScrollAnimations();

  // Smooth scroll
  new SmoothScroll();

  // Active navigation
  new ActiveNavigation();

  // Loading screen - disabled for smoother navigation
  // new LoadingScreen();

  // Theme switcher
  new ThemeSwitcher();

  // Mobile menu
  new MobileMenu();

  // Parallax effect
  new ParallaxEffect();
});

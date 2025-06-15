// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Sticky navbar on scroll and scroll progress bar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("sticky", window.scrollY > 0);

  // Update scroll progress bar
  const scrollProgress = document.getElementById("scroll-progress");
  if (scrollProgress) {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
  }
});

// Initialize AOS animations
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: false,
    offset: 100,
  });

  // Initialize typing effect
  if (document.querySelector(".typing-text")) {
    initTypingEffect();
  }

  // Initialize skill counters
  animateSkillBars();
});

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    console.log("Form submitted:", data);

    // Show success message
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });
}

// Recommendations slider (show 2 at a time)
document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("recommendationsGrid");
  if (!grid) return;
  const cards = Array.from(grid.children);
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let start = 0;
  const visible = 2;

  function showCards() {
    cards.forEach((card, idx) => {
      card.style.display =
        idx >= start && idx < start + visible ? "flex" : "none";
    });
  }

  prevBtn.addEventListener("click", () => {
    start = (start - visible + cards.length) % cards.length;
    showCards();
  });

  nextBtn.addEventListener("click", () => {
    start = (start + visible) % cards.length;
    showCards();
  });

  showCards();
});

// Typing effect function
function initTypingEffect() {
  const element = document.querySelector(".typing-text");
  const texts = JSON.parse(element.getAttribute("data-text"));
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before starting new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// Animate skill bars on scroll
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-level");

  function showSkills() {
    skillBars.forEach((bar) => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (barPosition < screenPosition) {
        bar.style.width = bar.dataset.width || bar.style.width;
        bar.style.opacity = 1;
      }
    });
  }

  // Initial check on load
  showSkills();

  // Check on scroll
  window.addEventListener("scroll", showSkills);
}

// Custom cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");
  const cursorDot = document.querySelector(".cursor-dot");

  if (!cursor || !cursorDot) return;

  // Only enable custom cursor for non-touch screens
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .btn, .project-card, .certificate-card, .hamburger"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
        cursorDot.classList.add("cursor-hover");
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
        cursorDot.classList.remove("cursor-hover");
      });
    });
  }
});

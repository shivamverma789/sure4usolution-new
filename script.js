const fname = document.getElementById("name")
const email = document.getElementById("email")
const message = document.getElementById("message")
const phone = document.getElementById("phone")
const submit = document.getElementsByClassName("form-contact")[0]
const Email = window.Email // Declare the Email variable

// DOM Elements
const loadingScreen = document.getElementById("loading-screen")
const navMenu = document.getElementById("nav-menu")
const navToggle = document.querySelector(".nav-toggle")
const navClose = document.querySelector(".nav-close")
const header = document.querySelector(".header")

// Contact form elements
const contactForm = document.getElementById("contact-form")

// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add("hidden")
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }
  }, 500)
})

// Mobile Navigation
function openMenu() {
  if (navMenu) {
    navMenu.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeMenu() {
  if (navMenu) {
    navMenu.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

// Event Listeners for Navigation
if (navToggle) {
  navToggle.addEventListener("click", openMenu)
}

if (navClose) {
  navClose.addEventListener("click", closeMenu)
}

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMenu)
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (navMenu && navMenu.classList.contains("active")) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      closeMenu()
    }
  }
})

// Header Scroll Effect
window.addEventListener("scroll", () => {
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(15px)"
      header.style.boxShadow = "0 5px 25px rgba(0, 0, 0, 0.15)"
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    }
  }
})

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".counter")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active")

      // Trigger counter animation for stats
      if (entry.target.classList.contains("stats-section")) {
        animateCounters()
      }

      // Add staggered animation delays
      const animatedElements = entry.target.querySelectorAll(
        ".animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-scale",
      )
      animatedElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.animationDelay = `${index * 0.1}s`
          el.classList.add("active")
        }, index * 100)
      })
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-scale, .stats-section, .service-item, .consultant-card, .image-item, .contact-item, .industry-card, .stat-card",
  )

  animateElements.forEach((el) => {
    observer.observe(el)
  })

  // Initialize scroll animations
  const scrollElements = document.querySelectorAll(".scroll-animate")
  scrollElements.forEach((el) => {
    observer.observe(el)
  })

  // Add loaded class to body for CSS animations
  document.body.classList.add("loaded")

  // Initialize tooltips
  const tooltipElements = document.querySelectorAll("[data-tooltip]")
  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", showTooltip)
    element.addEventListener("mouseleave", hideTooltip)
  })

  // Initialize any other components
  console.log("Sure4USolutions website initialized successfully!")
})

// Tooltip Functions
function showTooltip(e) {
  const tooltip = document.createElement("div")
  tooltip.className = "tooltip"
  tooltip.textContent = e.target.getAttribute("data-tooltip")
  tooltip.style.cssText = `
    position: absolute;
    background: #2d3748;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 0.9rem;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

  document.body.appendChild(tooltip)

  const rect = e.target.getBoundingClientRect()
  tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"
  tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px"

  setTimeout(() => {
    tooltip.style.opacity = "1"
  }, 100)

  e.target.tooltipElement = tooltip
}

function hideTooltip(e) {
  if (e.target.tooltipElement) {
    e.target.tooltipElement.style.opacity = "0"
    setTimeout(() => {
      if (e.target.tooltipElement) {
        e.target.tooltipElement.remove()
        e.target.tooltipElement = null
      }
    }, 300)
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = header ? header.offsetHeight : 0
      const targetPosition = target.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Contact Form Handling
document.addEventListener("DOMContentLoaded", () => {
  const fname = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");
  const contactForm = document.getElementById("contact-form");

  if (!fname || !email || !phone || !message || !contactForm) {
    console.error("❌ One or more form input elements are missing from the HTML.");
    return;
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!fname.value.trim() || !email.value.trim() || !phone.value.trim() || !message.value.trim()) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value.replace(/\D/g, ""))) {
      showNotification("Please enter a valid 10-digit phone number", "error");
      return;
    }

    // ✅ Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
    const originalText = submitBtn.value || submitBtn.textContent;
    if (submitBtn.tagName === "INPUT") {
      submitBtn.value = "Sending...";
    } else {
      submitBtn.textContent = "Sending...";
    }
    submitBtn.disabled = true;

    // ✅ Send with EmailJS
    emailjs.send("service_cs9fckh", "template_9p6aepe", {
      name: fname.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
      time: new Date().toLocaleString()
    }).then(() => {
      showNotification("Email sent successfully!", "success");
      contactForm.reset();
      if (submitBtn.tagName === "INPUT") {
        submitBtn.value = originalText;
      } else {
        submitBtn.textContent = originalText;
      }
      submitBtn.disabled = false;
    }, (error) => {
      console.error("EmailJS Error:", error);
      showNotification("Failed to send email. Please try again later.", "error");
      if (submitBtn.tagName === "INPUT") {
        submitBtn.value = originalText;
      } else {
        submitBtn.textContent = originalText;
      }
      submitBtn.disabled = false;
    });
  });
});


// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">
        ${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}
      </span>
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero-bg-animation")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Image Lazy Loading
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      if (img.dataset.src) {
        img.src = img.dataset.src
        img.classList.add("loaded")
        imageObserver.unobserve(img)
      }
    }
  })
})

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img)
})

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
  if (e.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
    closeMenu()
  }

  // Navigate with arrow keys (for accessibility)
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Performance Optimization
let ticking = false

function updateOnScroll() {
  // Throttle scroll events
  if (!ticking) {
    requestAnimationFrame(() => {
      // Add scroll-based animations here
      ticking = false
    })
    ticking = true
  }
}

window.addEventListener("scroll", updateOnScroll)

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
})

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

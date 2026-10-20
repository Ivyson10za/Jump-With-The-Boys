
/* =========================================
   JUMP WITH THE BOYS — WEBSITE JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  // 1. MOBILE NAVIGATION MENU
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. AUTOMATIC COPYRIGHT YEAR
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 3. SMOOTH SCROLLING FOR WEBSITE LINKS
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // 4. PRODUCT CARD REVEAL ANIMATION
  const animatedItems = document.querySelectorAll(
    ".product-card, .collection-card, .feature-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    animatedItems.forEach(function (item) {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    animatedItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  // 5. BACK-TO-TOP BUTTON
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 6. NEWSLETTER FORM
  // This is a front-end demonstration only.
  // A real mailing service is needed to collect subscriptions.
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = newsletterForm.querySelector(
        'input[type="email"]'
      );

      if (!emailInput || !emailInput.checkValidity()) {
        if (emailInput) emailInput.reportValidity();
        return;
      }

      alert(
        "Thanks for your interest in Jump with the Boys! " +
        "Newsletter subscriptions are not connected yet."
      );

      newsletterForm.reset();
    });
  }

  // 7. IMAGE FALLBACK
  // Keep broken product images from showing a broken-image icon.
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      img.classList.add("image-unavailable");
      img.alt = img.alt || "Product image currently unavailable";
    });
  });

});

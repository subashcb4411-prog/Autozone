document.addEventListener("DOMContentLoaded", () => {
  // ====================
  // Search Functionality
  // ====================
  const searchInput = document.querySelector(".search-area input");
  const carCards = document.querySelectorAll(".car-card");

  document.querySelector(".search-area button").addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();

    carCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      if (title.includes(searchTerm) || searchTerm === "") {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // ====================
  // Auto Image Slider
  // ====================
  const slides = document.querySelectorAll(".slider img");
  let index = 0;

  function showSlide() {
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? "block" : "none";
      slide.style.width = "100%"; // make responsive
    });
    index = (index + 1) % slides.length;
  }

  showSlide(); 
  setInterval(showSlide, 3000);

  // ====================
  // Active Navigation Link
  // ====================
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // ====================
  // Mobile Menu Toggle
  // ====================
  const nav = document.querySelector("nav ul");
  const menuBtn = document.createElement("div");
  menuBtn.classList.add("menu-btn");
  menuBtn.innerHTML = "☰"; // hamburger icon
  document.querySelector("header").insertBefore(menuBtn, nav);

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show-menu");
  });

  // ====================
  // Responsive Adjustments
  // ====================
  function handleResize() {
    if (window.innerWidth > 768) {
      nav.classList.remove("show-menu"); // reset menu on desktop
    }
  }

  window.addEventListener("resize", handleResize);
});

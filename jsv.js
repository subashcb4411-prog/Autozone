document.addEventListener("DOMContentLoaded", () => {
  // === Filter Buttons ===
  const filterButtons = document.querySelectorAll(".filters button");
  const vehicleCards = document.querySelectorAll(".vehicles .card");

  const vehicleCategories = {
    Hatchback: [],
    Sedan: ["camry", "bmw", "mercedes"],
    SUV: ["audi"],
    Luxury: ["bmw", "mercedes", "audi"],
    Electric: []
  };

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const selected = button.textContent.trim();

      vehicleCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        if (
          vehicleCategories[selected].some(cat => name.includes(cat)) ||
          selected === "All"
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // === Smooth Scroll ===
  const viewBtn = document.querySelector(".hero a");
  const vehiclesSection = document.querySelector(".vehicles");
  viewBtn.addEventListener("click", e => {
    e.preventDefault();
    vehiclesSection.scrollIntoView({ behavior: "smooth" });
  });

  // === Auto Image Slider ===
  const slides = document.querySelectorAll(".slider img");
  let index = 0;
  setInterval(() => {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? "1" : "0";
    });
    index = (index + 1) % slides.length;
  }, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-area input");
  const searchButton = document.querySelector(".search-area button");
  const carCards = document.querySelectorAll(".car-card");
  const filters = document.querySelectorAll(".filters select");

  // === APPLY ALL FILTERS + SEARCH COMBINED ===
  function applyAllFilters() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const [typeFilter, brandFilter, yearFilter, priceFilter] = [...filters].map(f => f.value.toLowerCase());

    carCards.forEach(card => {
      const type = card.dataset.type.toLowerCase();
      const brand = card.dataset.brand.toLowerCase();
      const year = card.dataset.year.toLowerCase();
      const price = parseFloat(card.dataset.price);
      const name = card.querySelector("h3").textContent.toLowerCase();

      let visible = true;

      // search condition
      if (searchValue && !name.includes(searchValue)) visible = false;
      // filters
      if (typeFilter !== "type" && type !== typeFilter) visible = false;
      if (brandFilter !== "brand" && brand !== brandFilter) visible = false;
      if (yearFilter !== "year" && year !== yearFilter) visible = false;

      if (priceFilter !== "price") {
        if (priceFilter === "under 30000" && price > 30000) visible = false;
        if (priceFilter === "30000-40000" && (price < 30000 || price > 40000)) visible = false;
        if (priceFilter === "above 40000" && price < 40000) visible = false;
      }

      card.style.display = visible ? "block" : "none";
    });
  }

  // === TRIGGERS ===
  searchInput.addEventListener("input", applyAllFilters);
  searchButton.addEventListener("click", applyAllFilters);
  filters.forEach(filter => filter.addEventListener("change", applyAllFilters));

  // === BOOK TEST DRIVE ===
  const bookBtn = document.querySelector(".actions .btn:first-child");
  bookBtn.addEventListener("click", () => {
    const visibleCars = [...carCards].filter(c => c.style.display !== "none");
    if (visibleCars.length === 1) {
      const carName = visibleCars[0].querySelector("h3").textContent;
      alert(`✅ Test drive booked for ${carName}!`);
    } else if (visibleCars.length > 1) {
      alert("🚗 Please filter to one car before booking a test drive.");
    } else {
      alert("❌ No car visible. Please search or filter to choose a car first.");
    }
  });

  // === VIEW SERVICES ===
  const serviceBtn = document.querySelector(".actions .btn:last-child");
  serviceBtn.addEventListener("click", () => {
    window.location.href = "services.html";
  });
});

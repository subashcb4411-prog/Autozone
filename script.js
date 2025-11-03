document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-area input");
  const searchButton = document.querySelector(".search-area button");
  const carCards = document.querySelectorAll(".car-card");
  const filters = document.querySelectorAll(".filters select");
  const sortSelect = document.getElementById("sort-by");
  const resetBtn = document.getElementById("reset-filters");

  // --- MAIN FILTER FUNCTION ---
  function applyAllFilters() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const [typeFilter, brandFilter, yearFilter, priceFilter] = [...filters].map(f => f.value.toLowerCase());

    carCards.forEach(card => {
      const type = card.dataset.type.toLowerCase();
      const brand = card.dataset.brand.toLowerCase();
      const year = card.dataset.year.toLowerCase();
      const price = parseFloat(card.dataset.price);
      const name = card.querySelector("h3").textContent.toLowerCase();

      const matchesSearch = !searchValue || name.includes(searchValue) || brand.includes(searchValue);
      const matchesFilters =
        (typeFilter === "type" || type === typeFilter) &&
        (brandFilter === "brand" || brand === brandFilter) &&
        (yearFilter === "year" || year === yearFilter) &&
        (priceFilter === "price" ||
          (priceFilter === "under 30000" && price < 30000) ||
          (priceFilter === "30000-40000" && price >= 30000 && price <= 40000) ||
          (priceFilter === "above 40000" && price > 40000));

      if (matchesSearch && matchesFilters) {
        card.classList.remove("hidden-card");
      } else {
        card.classList.add("hidden-card");
      }
    });

    applySorting();
  }

  // --- SORTING FUNCTION ---
  function applySorting() {
    if (!sortSelect) return;
    const sortType = sortSelect.value;
    if (sortType === "Sort By") return;

    const grid = document.querySelector(".car-grid");
    const visibleCards = Array.from(carCards).filter(card => !card.classList.contains("hidden-card"));

    visibleCards.sort((a, b) => {
      const priceA = parseFloat(a.dataset.price);
      const priceB = parseFloat(b.dataset.price);
      const yearA = parseInt(a.dataset.year);
      const yearB = parseInt(b.dataset.year);

      if (sortType === "price-asc") return priceA - priceB;
      if (sortType === "price-desc") return priceB - priceA;
      if (sortType === "year-desc") return yearB - yearA;
      return 0;
    });

    visibleCards.forEach(card => grid.appendChild(card));
  }

  // --- RESET BUTTON ---
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      filters.forEach(f => (f.value = f.options[0].value));
      searchInput.value = "";
      if (sortSelect) sortSelect.value = "Sort By";
      carCards.forEach(card => card.classList.remove("hidden-card"));
    });
  }

  // --- POPUP FUNCTION ---
  function showCenterPopup(message, success = true) {
    const oldPopup = document.querySelector(".center-popup");
    if (oldPopup) oldPopup.remove();

    const popup = document.createElement("div");
    popup.className = `center-popup ${success ? "success" : "error"}`;
    popup.innerHTML = `
      <div class="popup-content">
        <span class="popup-icon">${success ? "✅" : "❌"}</span>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(popup);

    setTimeout(() => popup.classList.add("show"), 100);
    setTimeout(() => {
      popup.classList.remove("show");
      setTimeout(() => popup.remove(), 500);
    }, 2500);
  }

  // --- BOOK BUTTON ---
  const bookBtn = document.getElementById("book-btn");
  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      const visibleCars = Array.from(carCards).filter(c => !c.classList.contains("hidden-card"));
      if (visibleCars.length === 1) {
        const carName = visibleCars[0].querySelector("h3").textContent;
        showCenterPopup(`✅ Test drive booked for ${carName}!`, true);
      } else if (visibleCars.length > 1) {
        showCenterPopup("❗ Please filter to one car before booking.", false);
      } else {
        showCenterPopup("❌ No car visible. Please search or filter first.", false);
      }
    });
  }

  // --- SERVICES BUTTON ---
  const serviceBtn = document.getElementById("service-btn");
  if (serviceBtn) {
    serviceBtn.addEventListener("click", () => {
      window.location.href = "services.html";
    });
  }

  // --- GLOW EFFECT (Optional enhancement) ---
  carCards.forEach(card => {
    card.addEventListener("mouseenter", () => card.classList.add("glow-active"));
    card.addEventListener("mouseleave", () => card.classList.remove("glow-active"));
  });

  // --- SEARCH + FILTER INIT ---
  if (searchButton) searchButton.addEventListener("click", applyAllFilters);
  if (searchInput) searchInput.addEventListener("input", applyAllFilters);
  filters.forEach(f => f.addEventListener("change", applyAllFilters));

  applyAllFilters();
});

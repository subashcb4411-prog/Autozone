document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-area input");
  const searchButton = document.querySelector(".search-area button");
  const carCards = document.querySelectorAll(".car-card");
  const filters = document.querySelectorAll(".filters select");
  const sortSelect = document.getElementById("sort-by");
  const activeFilterContainer = document.querySelector(".active-filters");
  const resetBtn = document.getElementById("reset-filters");

  // Apply filters and search
  function applyAllFilters() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const [typeFilter, brandFilter, yearFilter, priceFilter] = [...filters].map(f => f.value.toLowerCase());

    carCards.forEach(card => {
      const type = card.dataset.type.toLowerCase();
      const brand = card.dataset.brand.toLowerCase();
      const year = card.dataset.year.toLowerCase();
      const price = parseFloat(card.dataset.price);
      const name = card.querySelector("h3").textContent.toLowerCase();

      let matchesSearch = !searchValue || name.includes(searchValue) || brand.includes(searchValue);
      let matchesFilters =
        (typeFilter === "type" || type === typeFilter) &&
        (brandFilter === "brand" || brand === brandFilter) &&
        (yearFilter === "year" || year === yearFilter) &&
        (priceFilter === "price" ||
          (priceFilter === "under 30000" && price < 30000) ||
          (priceFilter === "30000-40000" && price >= 30000 && price <= 40000) ||
          (priceFilter === "above 40000" && price > 40000));

      card.style.display = matchesSearch && matchesFilters ? "block" : "none";
    });

    updateActiveFilters();
    applySorting();
  }

  // Update filter tags
  function updateActiveFilters() {
    activeFilterContainer.innerHTML = "";
    filters.forEach(f => {
      if (f.value.toLowerCase() !== f.options[0].value.toLowerCase()) {
        const tag = document.createElement("span");
        tag.className = "filter-tag";
        tag.textContent = f.value;
        tag.onclick = () => {
          f.value = f.options[0].value;
          applyAllFilters();
        };
        activeFilterContainer.appendChild(tag);
      }
    });
  }

  // Sorting logic
  function applySorting() {
    const sortType = sortSelect?.value;
    if (!sortType || sortType === "Sort By") return;

    const grid = document.querySelector(".car-grid");
    const visibleCards = Array.from(carCards).filter(card => card.style.display !== "none");

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

  // Reset filters
  resetBtn?.addEventListener("click", () => {
    filters.forEach(f => f.value = f.options[0].value);
    searchInput.value = "";
    sortSelect.value = "Sort By";
    applyAllFilters();
  });

  // Load saved filter state
  filters.forEach(f => {
    const saved = localStorage.getItem(f.name);
    if (saved) f.value = saved;
  });
  searchInput.value = localStorage.getItem("searchValue") || "";
  if (sortSelect) sortSelect.value = localStorage.getItem("sortValue") || "Sort By";

  applyAllFilters();

  // Save filter state before leaving
  window.addEventListener("beforeunload", () => {
    filters.forEach(f => localStorage.setItem(f.name, f.value));
    localStorage.setItem("searchValue", searchInput.value);
    localStorage.setItem("sortValue", sortSelect?.value || "");
  });

  // Event listeners
  searchInput.addEventListener("input", applyAllFilters);
  searchButton.addEventListener("click", applyAllFilters);
  filters.forEach(filter => filter.addEventListener("change", applyAllFilters));
  sortSelect?.addEventListener("change", applyAllFilters);

  // Book Test Drive
  const bookBtn = document.querySelector(".actions .btn:first-child");
  bookBtn?.addEventListener("click", () => {
    const visibleCars = Array.from(carCards).filter(card => card.style.display !== "none");
    if (visibleCars.length === 1) {
      const carName = visibleCars[0].querySelector("h3").textContent;
      alert(`✅ Test drive booked for ${carName}!`);
    } else if (visibleCars.length > 1) {
      alert("🚗 Please filter to one car before booking a test drive.");
    } else {
      alert("❌ No car visible. Please search or filter to choose a car first.");
    }
  });

  // View Services
  const serviceBtn = document.querySelector(".actions .btn:last-child");
  serviceBtn?.addEventListener("click", () => {
    window.location.href = "services.html";
  });
});

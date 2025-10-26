document.addEventListener("DOMContentLoaded", function () {
  // 1. Booking Button Alert
  const bookBtn = document.querySelector(".btn");
  if (bookBtn) {
    bookBtn.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Thank you for choosing AutoZone! We'll contact you shortly to confirm your booking.");
    });
  }

  // 2. Smooth Scroll for Internal Links
  document.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  // 3. Highlight Active Section on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("class");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // 4. Scroll-to-Top Button
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollTopBtn";
  scrollBtn.textContent = "↑ Top";
  scrollBtn.style.cssText = `
    display:none;
    position:fixed;
    bottom:30px;
    right:30px;
    padding:10px 15px;
    background:#007bff;
    color:#fff;
    border:none;
    border-radius:5px;
    cursor:pointer;
    z-index:999;
  `;
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

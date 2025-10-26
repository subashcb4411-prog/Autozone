document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("testDriveForm");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const car = document.getElementById("car").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Validation check
    if (!name || !email || !phone || !car || !date || !time) {
      alert("❌ Please fill out all fields before submitting.");
      return;
    }

    // Optional: simple phone number format check
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      alert("📞 Please enter a valid 10-digit phone number.");
      return;
    }

    // Confirmation message
    alert(`✅ Test drive booked for ${car} on ${date} at ${time}.
We'll contact you soon, ${name}!`);

    // Reset form after success
    form.reset();
  });
});

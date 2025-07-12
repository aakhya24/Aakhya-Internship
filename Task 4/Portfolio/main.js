document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("formMessage").textContent = "Thank you! Your message has been sent.";
  this.reset();
});

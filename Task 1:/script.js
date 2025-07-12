function subscribe() {
  alert("🎉 Thanks for subscribing! We'll send you tasty recipes soon.");
}

function toggleReadMore(btn) {
  const parent = btn.previousElementSibling; // the <p> element
  const dots = parent.querySelector(".dots");
  const moreText = parent.querySelector(".more-text");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    moreText.style.display = "none";
    btn.textContent = "Read more";
  } else {
    dots.style.display = "none";
    moreText.style.display = "inline";
    btn.textContent = "Read less";
  }
}

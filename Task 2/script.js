// Password Validation Function
function isPasswordValid(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{8,}$/;
  return regex.test(password);
}

// Form Submission and Validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !password || !message) {
    alert("All fields are required.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Invalid email address.");
    return;
  }

  if (!isPasswordValid(password)) {
    alert("Password must include: 1 uppercase, 1 lowercase, 1 digit, 1 special character and be at least 8 characters long.");
    return;
  }

  document.getElementById("formMessage").textContent = "Form submitted successfully!";
  document.getElementById("contact").classList.add("hidden");
  document.getElementById("taskGallery").classList.remove("hidden");
  document.querySelector(".back-btn-floating").style.display = "block";
});

// To-Do List
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (!task) {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");
  li.textContent = task;

  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.onclick = () => li.remove();

  li.appendChild(btn);
  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

// Image Upload
function addImage() {
  const fileInput = document.getElementById("imageFile");
  const file = fileInput.files[0];

  if (!file || !file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const box = document.createElement("div");
    box.className = "img-box";

    const img = document.createElement("img");
    img.src = e.target.result;
    img.alt = "User Image";

    const btn = document.createElement("button");
    btn.textContent = "×";
    btn.onclick = () => box.remove();

    box.appendChild(img);
    box.appendChild(btn);
    document.getElementById("imageList").appendChild(box);
  };

  reader.readAsDataURL(file);
  fileInput.value = ""; // reset input
}
function goBack() {
  document.getElementById("taskGallery").classList.add("hidden");
  document.getElementById("contact").classList.remove("hidden");
  document.getElementById("formMessage").textContent = "";
  document.querySelector(".back-btn-floating").style.display = "none";
}

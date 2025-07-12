// ----- QUIZ -----
const quizData = [
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Set"],
    answer: 1
  },
  {
    question: "Which HTML tag loads JavaScript?",
    options: ["<js>", "<script>", "<javascript>"],
    answer: 1
  },
  {
    question: "Which method fetches data from APIs?",
    options: ["loadData()", "fetch()", "getAPI()"],
    answer: 1
  }
];

let quizIndex = 0;
let score = 0;

function loadQuiz() {
  const q = quizData[quizIndex];
  document.getElementById("quiz-question").textContent = q.question;

  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(idx);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = quizData[quizIndex].answer;
  if (selected === correct) {
    score++;
    alert("✅ Correct!");
  } else {
    alert("❌ Wrong!");
  }
  document.getElementById("score").textContent = `Score: ${score}/${quizData.length}`;
}

document.getElementById("next-btn").addEventListener("click", () => {
  quizIndex++;
  if (quizIndex < quizData.length) {
    loadQuiz();
  } else {
    document.getElementById("quiz-box").innerHTML = `<h3>You scored ${score}/${quizData.length}</h3>`;
  }
});

loadQuiz();

// ----- CAROUSEL -----
const images = [
  "https://picsum.photos/600/300?random=1",
  "https://picsum.photos/600/300?random=2",
  "https://picsum.photos/600/300?random=3"
];
let imgIndex = 0;

function updateImage() {
  document.getElementById("carousel-img").src = images[imgIndex];
}

function nextImage() {
  imgIndex = (imgIndex + 1) % images.length;
  updateImage();
}

function prevImage() {
  imgIndex = (imgIndex - 1 + images.length) % images.length;
  updateImage();
}

// ----- API Fetch -----
function fetchWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const output = document.getElementById("weather-result");

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // 1. Get coordinates using OpenCage or use preset cities for now
  // For demo: Use city-to-lat/lon mapping for simplicity
  const cities = {
    delhi: { lat: 28.6139, lon: 77.2090 },
    mumbai: { lat: 19.0760, lon: 72.8777 },
    bengaluru: { lat: 12.9716, lon: 77.5946 },
    london: { lat: 51.5074, lon: -0.1278 },
    newyork: { lat: 40.7128, lon: -74.0060 }
  };

  const key = city.toLowerCase();
  if (!cities[key]) {
    output.innerHTML = `<p>⚠️ Demo supports: Delhi, Mumbai, Bengaluru, London, NewYork</p>`;
    return;
  }

  const { lat, lon } = cities[key];

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const weather = data.current_weather;
      output.innerHTML = `
        <h3>${city.toUpperCase()}</h3>
        <p>🌡️ Temperature: ${weather.temperature}°C</p>
        <p>💨 Wind Speed: ${weather.windspeed} km/h</p>
        <p>⏰ Time: ${weather.time}</p>
      `;
    })
    .catch(() => {
      output.textContent = "❌ Failed to fetch weather data.";
    });
}

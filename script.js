const weddingDate = new Date("2026-08-02T18:00:00+07:00");

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFHZY2boc-Hx8Ua8BCUzMKOmbhV2lqQn_wR4iw7I9zXXZ9woUy8_pndibT7gDvsUDs/exec";

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.querySelector(".count-row").innerHTML =
      "<p>Hôm nay là ngày vui của chúng mình 💚</p>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (!isPlaying) {
      await bgMusic.play();
      musicBtn.textContent = "❚❚";
      isPlaying = true;
    } else {
      bgMusic.pause();
      musicBtn.textContent = "♪";
      isPlaying = false;
    }
  } catch (error) {
    alert("Chưa phát được nhạc. Hãy kiểm tra file music.mp3 đã upload chưa.");
  }
});

const giftToggle = document.getElementById("giftToggle");
const giftContent = document.getElementById("giftContent");

giftToggle.addEventListener("click", () => {
  giftContent.classList.toggle("show");
});

function updateLocalCount(attendValue) {
  let total = Number(localStorage.getItem("totalCount") || 0);
  let yes = Number(localStorage.getItem("yesCount") || 0);

  total += 1;
  if (attendValue === "Có, mình sẽ đến") {
    yes += 1;
  }

  localStorage.setItem("totalCount", total);
  localStorage.setItem("yesCount", yes);

  document.getElementById("totalCount").textContent = total;
  document.getElementById("yesCount").textContent = yes;
}

function loadLocalCount() {
  document.getElementById("totalCount").textContent =
    localStorage.getItem("totalCount") || 0;
  document.getElementById("yesCount").textContent =
    localStorage.getItem("yesCount") || 0;
}

loadLocalCount();

document.getElementById("rsvpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const result = document.getElementById("result");

  const data = Object.fromEntries(new FormData(form).entries());

  data.createdAt = new Date().toLocaleString("vi-VN");
  data.page = "Thảo & Khoa Wedding";

  result.textContent = "Đang gửi lời nhắn...";
  result.style.color = "#4f6b4a";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    updateLocalCount(data.attend);

    result.textContent = "Cảm ơn bạn! Lời nhắn đã được gửi thành công.";
    form.reset();
  } catch (error) {
    result.textContent = "Có lỗi khi gửi. Bạn thử lại giúp mình nhé.";
    result.style.color = "red";
  }
});
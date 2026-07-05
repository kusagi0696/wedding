const weddingDate = new Date("2026-08-02T18:00:00+07:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.querySelector(".count-row").innerHTML = "<p>Hôm nay là ngày vui của chúng mình 💚</p>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(diff / (1000 * 60) % 60);
  const seconds = Math.floor(diff / 1000 % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("rsvpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const list = JSON.parse(localStorage.getItem("thaoKhoaRSVP") || "[]");
  list.push({ ...data, time: new Date().toISOString() });
  localStorage.setItem("thaoKhoaRSVP", JSON.stringify(list));
  document.getElementById("result").textContent = "Cảm ơn bạn! Lời nhắn đã được lưu ở bản demo.";
  e.target.reset();
});

document.getElementById("musicBtn").addEventListener("click", () => {
  alert("Bạn có thể thêm nhạc sau. Mình sẽ nối nút này với file mp3 khi bạn gửi nhạc.");
});

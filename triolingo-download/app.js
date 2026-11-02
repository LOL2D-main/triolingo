// Triolingo Store Reviews & Dynamic Logic
const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "Hoàng Minh Quân",
    rating: 5,
    platform: "Windows",
    date: "Hôm qua",
    comment: "Bản máy tính dùng siêu mượt! Giao diện như Duolingo nhưng có thêm cả đề Duolingo English Test và phát âm AI chuẩn bản xứ. Cài xong có icon desktop mở lên học cực tiện.",
    helpful: 42
  },
  {
    id: 2,
    name: "Nguyễn Thu Hà",
    rating: 5,
    platform: "iPhone / iPad",
    date: "3 ngày trước",
    comment: "Làm theo hướng dẫn Safari thêm vào màn hình chính rất nhanh, mở lên full màn hình không khác gì tải app trên App Store. Đỡ tốn dung lượng máy nữa!",
    helpful: 28
  },
  {
    id: 3,
    name: "Trần Đức Anh",
    rating: 5,
    platform: "Windows",
    date: "1 tuần trước",
    comment: "App cài đặt một click là xong, giao diện sạch đẹp, không bị quảng cáo làm phiền. Học từ vựng theo chủ đề rất khoa học, từ A1 đến tận C2.",
    helpful: 19
  },
  {
    id: 4,
    name: "Lê Phương Linh",
    rating: 4,
    platform: "Android",
    date: "2 tuần trước",
    comment: "Đang hóng bản APK hoàn chỉnh trên Google Play. Hiện tại dùng tạm trên Chrome thêm ra màn hình chính cũng khá ngon.",
    helpful: 11
  }
];

function getStoredReviews() {
  try {
    const raw = localStorage.getItem("triolingo_user_reviews");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return [...parsed, ...DEFAULT_REVIEWS];
      }
    }
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_REVIEWS;
}

function renderReviews() {
  const container = document.getElementById("reviews-list");
  if (!container) return;

  const reviews = getStoredReviews();
  container.innerHTML = "";

  reviews.forEach((item) => {
    const starsHtml = Array.from({ length: 5 })
      .map((_, i) => `
        <svg viewBox="0 0 24 24" fill="${i < item.rating ? '#e37400' : '#dadce0'}" style="width: 14px; height: 14px;">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      `)
      .join("");

    const initial = (item.name || "U").slice(0, 2).toUpperCase();

    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-header">
        <div class="review-avatar">${initial}</div>
        <div>
          <div class="review-author">${escapeHtml(item.name)}</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="display: flex;">${starsHtml}</div>
            <span class="review-date">${item.date} • ${item.platform || 'Windows'}</span>
          </div>
        </div>
      </div>
      <p class="review-text">${escapeHtml(item.comment)}</p>
      <button class="review-helpful" onclick="increaseHelpful(${item.id}, this)">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 14px; height: 14px;">
          <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
        </svg>
        Hữu ích (<span class="helpful-num">${item.helpful || 0}</span>)
      </button>
    `;
    container.appendChild(card);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

let selectedRating = 5;

function openReviewModal() {
  const modal = document.getElementById("review-modal");
  if (modal) modal.style.display = "flex";
  setRating(5);
}

function closeReviewModal() {
  const modal = document.getElementById("review-modal");
  if (modal) modal.style.display = "none";
}

function setRating(num) {
  selectedRating = num;
  const stars = document.querySelectorAll(".star-pick-btn");
  stars.forEach((btn, idx) => {
    if (idx < num) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function submitReview(e) {
  e.preventDefault();
  const nameInput = document.getElementById("reviewer-name");
  const platformSelect = document.getElementById("reviewer-platform");
  const commentInput = document.getElementById("reviewer-comment");

  const name = nameInput.value.trim();
  const platform = platformSelect.value;
  const comment = commentInput.value.trim();

  if (!name || !comment) {
    alert("Vui lòng nhập họ tên và nhận xét của bạn.");
    return;
  }

  const newReview = {
    id: Date.now(),
    name,
    rating: selectedRating,
    platform,
    date: "Vừa xong",
    comment,
    helpful: 1
  };

  try {
    const raw = localStorage.getItem("triolingo_user_reviews");
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(newReview);
    localStorage.setItem("triolingo_user_reviews", JSON.stringify(list));
  } catch (err) {
    console.error(err);
  }

  nameInput.value = "";
  commentInput.value = "";
  closeReviewModal();
  renderReviews();
  alert("Cảm ơn bạn đã gửi đánh giá cho Triolingo!");
}

function increaseHelpful(id, btn) {
  const numSpan = btn.querySelector(".helpful-num");
  if (numSpan && !btn.dataset.clicked) {
    btn.dataset.clicked = "true";
    numSpan.textContent = parseInt(numSpan.textContent, 10) + 1;
    btn.style.color = "var(--play-green)";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderReviews();
});


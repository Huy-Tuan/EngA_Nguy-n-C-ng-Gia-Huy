const back = document.getElementById("back");
const formComment = document.getElementById("commentForm");
const modal = document.getElementById("commentModal");
// Lấy id bài viết từ localStorage
const id = localStorage.getItem("selectedArticleId");

// Lấy danh sách bài viết
const articles = JSON.parse(localStorage.getItem("articles")) || [];

// Tìm bài viết theo id
const article = articles.find(item => item.id == id);

// Hiển thị
if (article) {
  document.getElementById("title").innerText = article.title;
  document.getElementById("content").innerText = article.content;
} else {
  document.body.innerHTML = "<p>Không tìm thấy bài viết.</p>";
}

back.addEventListener("click", function () {
    window.location.href = "../pages/index.html";
});

// Lưu bài viết lại để cập nhật sau
let currentArticle = { ...article };

// Khởi tạo
currentArticle.likes = currentArticle.likes || 0;
currentArticle.comments = currentArticle.comments || [];

// Hiển thị lượt like
const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");
likeCount.innerText = currentArticle.likes;

likeBtn.addEventListener("click", () => {
  currentArticle.likes++;
  likeCount.innerText = currentArticle.likes;
  updateArticle(currentArticle);
});

// Hiển thị danh sách bình luận
const commentList = document.getElementById("commentList");
function renderComments() {
  commentList.innerHTML = "";
  currentArticle.comments.forEach((cmt, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${cmt} 
      <button onclick="deleteComment(${index})">Xóa</button>
    `;
    commentList.appendChild(li);
  });
}
renderComments();

// Thêm bình luận
const commentForm = document.getElementById("commentForm");
commentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("commentInput");
  const text = input.value.trim();
  if (text) {
    currentArticle.comments.push(text);
    input.value = "";
    renderComments();
    updateArticle(currentArticle);
  }
});

// Xóa bình luận
window.deleteComment = function (index) {
  currentArticle.comments.splice(index, 1);
  renderComments();
  updateArticle(currentArticle);
};

// Cập nhật bài viết trong localStorage
function updateArticle(updated) {
  const all = JSON.parse(localStorage.getItem("articles")) || [];
  const idx = all.findIndex(a => a.id == updated.id);
  if (idx !== -1) {
    all[idx] = updated;
    localStorage.setItem("articles", JSON.stringify(all));
    localStorage.setItem("selectedArticle", JSON.stringify(updated)); // cập nhật luôn
  }
}

const openCommentModal = document.getElementById("openCommentModal");
const commentModal = document.getElementById("commentModal");
const closeModal = document.getElementById("closeModal");

openCommentModal.addEventListener("click", () => {
  commentModal.style.display = "block";
});
closeModal.addEventListener("click", () => {
  commentModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target == commentModal) {
    commentModal.style.display = "none";
  }
});

formComment.addEventListener("submit", function (e) {
    e.preventDefault();
    modal.classList.add("hidden");
});
const back = document.getElementById("back");
const modal = document.getElementById("commentModal");
const btnSubmit = document.getElementById("send-comment");
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
currentArticle.comments = Array.isArray(currentArticle.comments) ? currentArticle.comments : [];

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
const commentBtn = document.getElementById("openCommentModal");
const commentCount = document.querySelector("#commentCount");
commentCount.innerText = currentArticle.comments.length;
const commentList = document.getElementById("commentList");

function renderComments() {
  commentList.innerHTML = "";
  commentCount.innerText = currentArticle.comments.length;

  currentArticle.comments.forEach((cmt, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <div class = "comment-style">
    ${cmt} 
    <button class = "btndelet" onclick="deleteComment(${index})">Xóa</button>
    </div>
    `;
    commentList.appendChild(li);
  });
  updateArticle(currentArticle);
}
renderComments();

// Thêm bình luận
const commentForm = document.getElementById("commentForm");

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
  commentModal.classList.remove("hidden");
});
closeModal.addEventListener("click", () => {
  commentModal.classList.add("hidden");
});
window.addEventListener("click", (e) => {
  if (e.target == commentModal) {
    commentModal.classList.add("hidden");
  }
});

btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    const newComment = commentInput.value.trim();
    if (newComment) {
    currentArticle.comments.push(newComment);
    commentInput.value = "";
    commentModal.classList.add("hidden");
    renderComments(); // render lại danh sách và cập nhật count
  }
});
const profileContainer = document.querySelector(".profile-container");
const dropdownMenu = document.querySelector(".dropdown-menu");
const addArticle = document.querySelector("#btn-add-article");
const articleList = document.getElementById("article-list");
const detail = document.getElementById("");

const articles = JSON.parse(localStorage.getItem("articles")) || [];

profileContainer.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle("active"); // Bật/tắt menu
});

// Ẩn menu khi click ra ngoài
document.addEventListener("click", function (event) {
    if (!profileContainer.contains(event.target)) {
        dropdownMenu.classList.remove("active");
    }
});

addArticle.addEventListener("click", function () {
    console.log("Clicked Add Article");
   window.location.href = "add_new_article.html"; 
});

function goToDetail(id) {
    localStorage.setItem("selectedArticleId", id);
    window.location.href = "pages/article_details.html";
  }  

function renderArticles(list) {
    articleList.innerHTML = "";

    list.forEach(a => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <a class="display-a" href="#" onclick="goToDetail(${a.id})">
            <img
                style="width: 592px; height: 268px"
                src="${a.image || 'default.jpg'}"
                class="card-img-top"
                alt="..."
            />
            <div class="card-body">
                <p class="date">Date: ${a.createdAt || "2025-04-09"}</p>
                <h4 class="title">${a.title}</h4>
                <p class="content">${a.content.slice(0, 100)}</p>
                <p class="category ${a.category}">${a.category}</p>
            </div>
        </a>
        `
        ;

        articleList.appendChild(card);

        // Gắn click để lưu bài viết & chuyển trang
        card.querySelector("a").addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.setItem("selectedArticle", JSON.stringify(a));
            window.location.href = "article_details.html";
        });
    });
}

renderArticles(articles);

window.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("category-nav");
    const categories = JSON.parse(localStorage.getItem("categories")) || [];

     // Thêm sự kiện click cho "All blog posts"
     const allPostsLink = document.querySelector(".category-link");
     allPostsLink.addEventListener("click", function () {
         const allLinks = document.querySelectorAll(".category-link");
         allLinks.forEach(link => link.classList.remove("active"));
         this.classList.add("active");

         renderArticles(addArticle);
    });

    categories.forEach(category => {
        const link = document.createElement("a");
        link.href = "#";
        link.className = "category-link";
        link.textContent = category.name;
        // Gắn sự kiện click để set "active"
        link.addEventListener("click", function () {
            const allLinks = document.querySelectorAll(".category-link");
            allLinks.forEach(link => link.classList.remove("active")); // Bỏ active của tất cả
            this.classList.add("active"); // Active cho thằng được click

            // Lọc bài viết theo danh mục
            const filtered = articles.filter(a => a.category === category.name);
            renderArticles(filtered);
        });
        nav.appendChild(link);

        });
});
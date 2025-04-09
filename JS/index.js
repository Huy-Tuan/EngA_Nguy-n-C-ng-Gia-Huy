const profileContainer = document.querySelector(".profile-container");
const dropdownMenu = document.querySelector(".dropdown-menu");
const addArticle = document.getElementById("btn-add-article");
const articleList = document.getElementById("article-list");
const detail = document.getElementById("")

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
   window.location.href = "../pages/add_new_article.html"; 
});

function renderArticles(article) {
    articleList.innerHTML = "";

    articles.forEach(a => {
    const card = document.createElement("div");
    card.classList.add("card");
    
    card.innerHTML = `
    <a class = "display-a" href="${a.id}">
        <img
            style="width: 592px; height: 268px"
            src="${a.image || 'default.jpg'}"
            class="card-img-top"
            alt="..."
        />
        <div class="card-body">
        <p class="date">Date: ${a.createdAt || "2025-04-09"}</p>
        <h4 class = "title">${a.title}</h4>
        <p class = "content">${a.content.slice(0, 100)}</p>
        <p class="category ${a.category}">${a.category}</p>
        </div>
    </a>
    `
    articleList.appendChild(card);
    });
    
}
renderArticles(articles);






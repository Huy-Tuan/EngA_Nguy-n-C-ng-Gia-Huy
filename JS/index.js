const profileContainer = document.querySelector(".profile-container");
const dropdownMenu = document.querySelector(".dropdown-menu");
const addArticle = document.querySelector("#btn-add-article");
const articleList = document.getElementById("article-list");
const paginationContainer = document.getElementById("pagination"); // Thêm thẻ này trong HTML
const articles = JSON.parse(localStorage.getItem("articles")) || [];

const articlesPerPage = 5;
let currentPage = 1;

profileContainer.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle("active");
});

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
        `;

        articleList.appendChild(card);

        card.querySelector("a").addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.setItem("selectedArticle", JSON.stringify(a));
            window.location.href = "article_details.html";
        });
    });
}

function paginateArticles(list, page) {
    const start = (page - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const paginatedList = list.slice(start, end);
    renderArticles(paginatedList);
    renderPagination(list.length, page);
}

function renderPagination(totalArticles, currentPage) {
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    paginationContainer.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.innerText = "Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            paginateArticles(articles, --currentPage);
        }
    });
    paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.innerText = i;
        if (i === currentPage) pageBtn.classList.add("active");
        pageBtn.addEventListener("click", () => {
            paginateArticles(articles, i);
            currentPage = i;
        });
        paginationContainer.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            paginateArticles(articles, ++currentPage);
        }
    });
    paginationContainer.appendChild(nextBtn);
}

window.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("category-nav");
    const categories = JSON.parse(localStorage.getItem("categories")) || [];

    const allPostsLink = document.querySelector(".category-link");
    allPostsLink.addEventListener("click", function () {
        const allLinks = document.querySelectorAll(".category-link");
        allLinks.forEach(link => link.classList.remove("active"));
        this.classList.add("active");

        paginateArticles(articles, 1);
        currentPage = 1;
    });

    categories.forEach(category => {
        const link = document.createElement("a");
        link.href = "#";
        link.className = "category-link";
        link.textContent = category.name;
        link.addEventListener("click", function () {
            const allLinks = document.querySelectorAll(".category-link");
            allLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");

            const filtered = articles.filter(a => a.category === category.name);
            paginateArticles(filtered, 1);
            currentPage = 1;
        });
        nav.appendChild(link);
    });

    paginateArticles(articles, currentPage);
});

const articleBody = document.getElementById("list-article");
const btnAdd = document.getElementById("btnAdd");
const btnCancel = document.getElementById("btn-cancel");
const btnSave = document.getElementById("btn-save");
const modalDelet = document.getElementById("modal-delete");
const modalEdit = document.getElementById("modal-edit");
const newTitleArt = document.getElementById("edit-title");
const newContentArt = document.getElementById("edit-content");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const back = document.getElementById("back");
const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../pages/login.html";
});

window.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn", "true");
  
    if (isLoggedIn !== "true") {
      window.location.replace("../pages/homepage.html");
    }

    const logged = JSON.parse(localStorage.getItem("logged")) || null;
    if(!logged) {
        this.window.location.href = "./login.html"
    }
  });

logoutBtn.addEventListener("click", function () {
   localStorage.removeItem("logged");
});

back.addEventListener("click", function () {
   window.location.href = "../pages/index.html"; 
});

let articles = JSON.parse(localStorage.getItem("articles")) || [];

let currentPage = 1;
const itemsPerPage = 5;

function renderPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(articles.length / itemsPerPage);

    // Nút Previous
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderArticle();
        }
    });
    pagination.appendChild(prevBtn);

    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = i === currentPage ? "active" : "";
        btn.addEventListener("click", () => {
            currentPage = i;
            renderArticle();
        });
        pagination.appendChild(btn);
    }

    // Nút Next
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderArticle();
        }
    });
    pagination.appendChild(nextBtn);
}

function renderArticle() {
    articleBody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedArticles = articles.slice(startIndex, endIndex);

    paginatedArticles.forEach(article => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img class="image" src="../assets/images/Bài viết 1.png" alt=""></td>
            <td>${article.title}</td>
            <td>${article.category}</td>
            <td>${article.content}</td>
            <td>
                <span class="${article.status.toLowerCase() === "public" ? "public" : "private"}">
                    ${article.status.toLowerCase() === "public" ? "Public" : "Private"}
                </span>
            </td>
            <td>
                <select onchange="updateStatus(${article.id}, this.value)">
                    <option value="public" ${article.status.toLowerCase() === "public" ? "selected" : ""}>Public</option>
                    <option value="private" ${article.status.toLowerCase() === "private" ? "selected" : ""}>Private</option>
                </select>
            </td>
            <td>
                <div class="action">
                    <button class = "edit" onclick="editRow(${article.id})">Sửa</button>
                    <button class = "delete" onclick="deleteRow(${article.id})">Xóa</button>
                </div>
            </td>
        `;
        articleBody.appendChild(row);
    });

    renderPagination();
}

renderArticle();

function updateStatus(artId, newStatus) {
    articles = JSON.parse(localStorage.getItem("articles")) || [];
    const index = articles.findIndex(article => article.id === artId);

    if (index !== -1) {
        articles[index].status = newStatus;
        localStorage.setItem("articles", JSON.stringify(articles));
        renderArticle();
    }
}

let idDelet;

function deleteRow(artId) {
    idDelet = artId;
    modalDelet.classList.remove("hidden");
}

let idEdit;

function editRow(artId) {
    modalEdit.classList.remove("hidden");
    idEdit = artId;

}

yes.addEventListener("click", function () {
   articles = JSON.parse(localStorage.getItem("articles")) || [];
   const index = articles.findIndex(art => art.id === idDelet);
   articles.splice(index, 1);
   localStorage.setItem("articles", JSON.stringify(articles));
   modalDelet.classList.add("hidden");
   renderArticle();
});

no.addEventListener("click", function () {
   modalDelet.classList.add("hidden"); 
});

btnCancel.addEventListener("click", function () {
   modalEdit.classList.add("hidden"); 

});

btnSave.addEventListener("click", function () {
//    articles.title = newTitleArt.value;
//    articles.content = newContentArt.value;

   articles = JSON.parse(localStorage.getItem("articles")) || [];
    const editTitle = articles.find(article => article.id === idEdit);
    const editContent = articles.find(art => art.id === idEdit);

    editTitle.title = newTitleArt.value.trim();
    editContent.content = newContentArt.value.trim();

    localStorage.setItem("articles", JSON.stringify(articles));
    renderArticle();

    newTitleArt.value = "";
    newContentArt.value = "";
   localStorage.setItem("articles", JSON.stringify(articles));
   modalEdit.classList.add("hidden");
   renderArticle(); 
});
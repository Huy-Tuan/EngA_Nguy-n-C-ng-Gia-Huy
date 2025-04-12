const userManager = document.getElementById("user-manage");
const entries = document.getElementById("entries");
const article = document.getElementById("article");
const logout = document.getElementById("logout");
const back = document.getElementById("back");
const pagination = document.getElementById("pagination");
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

let users = JSON.parse(localStorage.getItem("users")) || [];

back.addEventListener("click", function () {
    window.history.back();
});

let currentPage = 1;
const itemsPerPage = 5;

function renderPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderUserList();
        }
    });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = i === currentPage ? "active" : "";
        btn.addEventListener("click", () => {
            currentPage = i;
            renderUserList();
        });
        pagination.appendChild(btn);
    }

    const next = document.createElement("button");
    next.textContent = "Next";
    next.disabled = currentPage === totalPages;
    next.addEventListener("click", () => {
        currentPage++;
        renderUserList();
    });
    pagination.appendChild(next);
}
function renderUserList() {
    const userTable = document.getElementById("user-list");
    userTable.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedArticles = users.slice(startIndex, endIndex);

    // const users = JSON.parse(localStorage.getItem("users")) || [];

    paginatedArticles.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="admin">
                    <div>
                        <img class="avatar-admin" src="../assets/images/Avatar-1.png" alt=""> 
                    </div>
                    <div>
                        <b>${user.name}</b>
                        <p class="style-font">${user.username}</p> 
                    </div> 
                </div>  
            </td>
            <td>Hoạt động</td>
            <td class="style-font">${user.email}</td>
            <td><span class="block">block</span></td>
            <td><span class="unblock">unblock</span></td>
            <td></td>
            <td></td>
        `;
        userTable.appendChild(row);
    });

    renderPagination();
}

// Gọi hàm hiển thị khi trang load
renderUserList();

function blockUser(id) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index].status = "blocked";
        localStorage.setItem("users", JSON.stringify(users));
        renderUserList();
    }
};

function unblockUser(id) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index].status = "active";
        localStorage.setItem("users", JSON.stringify(users));
        renderUserList();
    }
};

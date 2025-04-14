const user = document.getElementById("user-manage");
const entry = document.getElementById("entries");
const article = document.getElementById("article");
const logout = document.getElementById("logout");
const newCate = document.querySelector("#new-name-category");
const btnAdd = document.querySelector("#btnAdd");
const btnEdit = document.getElementById("btnEdit");
const modalDelet = document.getElementById("modal-delete");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const back = document.getElementById("back");
const logoutBtn = document.getElementById("logout");
const listCategory = document.getElementById("list-category");

let categories = JSON.parse(localStorage.getItem("categories")) || [];

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
   window.history.back(); 
});

if (!localStorage.getItem("categories")) {
        const entries = [];

    localStorage.setItem("categories", JSON.stringify(entries));
}

user.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "../pages/user_manager.html";
});

let type;
let idEdit;

function editRow(cateId) {
    btnAdd.classList.add("hidden");
    btnEdit.classList.remove("hidden");
    idEdit = cateId;
    type = "edit";
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let editName = categories.find(category => category.id === idEdit);
    localStorage.setItem("categories" , JSON.stringify(categories));
    newCate.value = editName.name;
    renderCategory();
}

let nameCate = "";

btnEdit.addEventListener("click", function () {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    const cateEdit = categories.find((cate) => cate.id == idEdit);
    cateEdit.name = newCate.value;

    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategory();
    type = "";
    newCate.value = "";
    btnAdd.classList.remove("hidden");
    btnEdit.classList.add("hidden");
});

btnAdd.addEventListener("click", function (e) {
    e.preventDefault();
    let a = Math.ceil(Math.random() * 255);
    let b = Math.ceil(Math.random() * 255);
    let c = Math.ceil(Math.random() * 255);
    let d = 0.1;

    let colorText = `rgb(${a}, ${b}, ${c})`;
    let colorBg = `rgba(${a}, ${b}, ${c}, ${d})`;
    type = "add";
    nameCate = newCate.value.trim();

    if (!nameCate) {
        alert("Vui lòng nhập tên danh mục");
        return;
    }

    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let newId;

    do {
        newId = Math.ceil(Math.random() * 100000);
    } while (categories.some(cat => cat.id === newId));
    
    const newCategoryObj = {
        id: newId,
        name: nameCate,
        color: colorText,
        background: colorBg,
    }
    categories.push(newCategoryObj);   
    
    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategory();
    type = "";
    newCate.value = "";
});

let currentPage = 1;
let itemsPerPage = 5;

function renderPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(categories.length / itemsPerPage);

    // Nút previous
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", function(){
        if (currentPage > 1) {
            currentPage--;
            renderCategory();
        }
    });
    pagination.appendChild(prevBtn);

    // Nút số trang
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = i === currentPage ? "active" : "";
        btn.addEventListener("click", function () {
                currentPage = i;
                renderCategory();
        });
        pagination.appendChild(btn);
    }

    //Nút next
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            renderCategory();
        } 
    });
    pagination.appendChild(nextBtn);
}

function renderCategory() {
    categories = JSON.parse(localStorage.getItem("categories")) || [];
    listCategory.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginateCategories = categories.slice(startIndex, endIndex);

    paginateCategories.forEach(category => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>
        <button onclick = "editRow(${category.id})">Sửa</button>
        <button onclick = "deleteRow(${category.id})">Xóa</button>
        </td>
        `;
        listCategory.appendChild(newRow);
    });
    renderPagination();
}

renderCategory();

let idDelet;

function deleteRow(cateId) {
    idDelet = cateId;
    modalDelet.classList.remove("hidden");
}

yes.addEventListener("click", function () {
    let categories = JSON.parse(localStorage.getItem("categories"));
    const index = categories.findIndex(cate => cate.id === idDelet);
    categories.splice(index, 1);
    localStorage.setItem("categories", JSON.stringify(categories));
    modalDelet.classList.add("hidden");
    renderCategory();
});

no.addEventListener("click", function () {
   modalDelet.classList.add("hidden"); 
});



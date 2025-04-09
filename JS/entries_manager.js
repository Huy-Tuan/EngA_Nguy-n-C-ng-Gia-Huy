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

if (!localStorage.getItem("categories")) {
        const entries = [
        {
            id: 1,
            name: "Nhật ký học tập"
        },

        {
            id: 2,
            name: "Nhật ký mục tiêu và kế hoạch"
        },
        {
            id: 3,
            name: "Nhật ký trải nghiệm - học qua đời sống",
        }
    ];

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
    }
    categories.push(newCategoryObj);   
    
    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategory();
    type = "";
    newCate.value = "";
});

function renderCategory() {
    const listCategory = document.getElementById("list-category");
    listCategory.innerHTML = "";

    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    categories.forEach(category => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>
        <button onclick = "editRow(${category.id})">Sửa</button>
        <button onclick = "deleteRow(${category.id})">Xóa</button>
        </td>
        `
        listCategory.appendChild(newRow);
        
    });
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



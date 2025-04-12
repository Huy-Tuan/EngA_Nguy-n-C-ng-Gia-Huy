const inputTitle = document.getElementById("input-title");
const inputContent = document.getElementById("input-content");
const inputStatus = document.querySelectorAll("input[type='radio']");
const add = document.getElementById("btn-add");
const form = document.getElementById("form");
const selectCate = document.getElementById("list-category");
const inputImage = document.getElementById("input-image").value.trim();
const previewImage = document.getElementById("preview-image");
const btnClose = document.getElementById("close-btn");

let categories = JSON.parse(localStorage.getItem("categories")) || [];
let articles = JSON.parse(localStorage.getItem("articles")) || [];

btnClose.addEventListener("click", function () {
  window.history.back();
});

// let selectedImageBase64 = ""; //  ảnh sẽ lưu tại đây

// // Đọc file khi người dùng chọn ảnh
// inputImage.addEventListener("change", function (event) {
//   const file = event.target.files[0];

//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       selectedImageBase64 = e.target.result; //  lưu ảnh
//       previewImage.src = selectedImageBase64;
//       previewImage.style.display = "block";
//     };
//     reader.readAsDataURL(file);
//   } else {
//     selectedImageBase64 = "";
//     previewImage.src = "";
//     previewImage.style.display = "none";
//   }
// });

let idCate;

//  Render danh mục
categories.forEach(c => {
  const row = document.createElement("option");
  idCate = row.id;
  row.value = c.name;
  row.textContent = c.name;
  selectCate.appendChild(row);
});


//  Submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const titleValue = inputTitle.value.trim();
  const cateValue = selectCate.value.trim();
  const contentValue = inputContent.value.trim();
  let statusValue = null;
  for (let i = 0; i < inputStatus.length; i++) {
    if (inputStatus[i].checked) {
      statusValue = inputStatus[i].value;
    }
  }

  if (!titleValue || !contentValue || !statusValue) {
    console.log("Không được để trống các trường!");
    return;
  }

  let newId;
  do {
    newId = Math.ceil(Math.random() * 100000);
  } while (articles.some(ar => ar.id === newId));

  const cateInfo = categories.find(c => c.name === cateValue);
  const color = cateInfo?.color || "rgb(0,0,0)";
  const background = cateInfo?.background || "rgba(0,0,0,0.1)";  
  
  const newArticleObj = {
    id: newId,
    title: titleValue,
    category: cateValue,
    content: contentValue,
    status: statusValue.toLowerCase(),
    image: document.getElementById("input-image").value,
    createdAt: new Date().toISOString().split("T")[0],
    color,
    background,
  };

  articles.push(newArticleObj);
  localStorage.setItem("articles", JSON.stringify(articles));

  //  Reset form
  inputTitle.value = "";
  selectCate.selectedIndex = 0;
  inputContent.value = "";
  inputImage.value = "";
  previewImage.src = "";
  previewImage.style.display = "none";
  for (let radio of inputStatus) {
    radio.checked = false;
  }

  window.location.href = "../pages/index.html";
});

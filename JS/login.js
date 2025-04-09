const formLoginElement = document.getElementById("form-login");
const emailLoginElement = document.getElementById("email-login");
const passwordLoginElement = document.getElementById("password-login");
const validateEmail = document.getElementById("error-email");
const validatePass = document.getElementById("error-pass");
const error = document.getElementById("validate");

formLoginElement.addEventListener("submit", function (e) {
    e.preventDefault();

    // Lấy danh sách user từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Ẩn lỗi cũ mỗi lần submit
    validateEmail.style.display = "none";
    validatePass.style.display = "none";
    error.style.display = "none";

    // Kiểm tra input rỗng
    if (emailLoginElement.value === "") {
        validateEmail.style.display = "block";
        return;
    }

    if (passwordLoginElement.value === "") {
        validatePass.style.display = "block";
        return;
    }

    // Tìm user khớp email và password
    const isValidUser = users.some(user => 
        user.email === emailLoginElement.value && user.password === passwordLoginElement.value
    );

    if (isValidUser) {
        window.location.href = "../pages/index.html"; // Chuyển trang nếu đúng
    } else {
        error.style.display = "block"; // Hiện lỗi nếu sai
    }
});

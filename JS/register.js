const formRegisterElement = document.getElementById("form-register");
const firstNameElement = document.querySelector(".first-name");
const lastNameElement = document.querySelector(".last-name");
const emailRegisterElement = document.getElementById("email-register");
const passwordRegisterElement = document.getElementById("password-register");
const confirmPassword = document.getElementById("confirm-password");
const errorEmail = document.getElementById("error-email");
const errorPassword = document.getElementById("error-pass");
const errorConfirm = document.getElementById("error-confirm")

const userLocal = JSON.parse(localStorage.getItem("users")) || [];
let flag = 0;

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|vn)$/;

    return emailRegex.test(email);
    
}

formRegisterElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailExists = userLocal.some(user => user.email === emailRegisterElement.value);
    
    if (emailExists) {
        errorEmail.style.display = "block";
        flag = 0;
        return;
    }else {
        flag = 1;
    }

    if (passwordRegisterElement.value.length >= 6) {
        errorPassword.style.display = "none";
        flag = 1;
    }else {
        errorPassword.style.display = "block";
        flag = 0;
        return;
    }

    if (emailRegisterElement.value === "") {
        errorEmail.textContent = "Email không được để trống";
        errorEmail.style.display = "block";
        flag = 0;
        return;
    }else {
        flag = 1;
    }

    if (!validateEmail(emailRegisterElement.value)){
        errorEmail.textContent = "Email không đúng định dạng";
        errorEmail.style.display = "block";
        flag = 0;
        return;
    }else {
        flag = 1;
    }

    if (passwordRegisterElement.value ==="") {
        errorPassword.textContent = "Mật khẩu không được để trống";
        errorPassword.style.display = "block";
        flag = 0;
        return;
    }else {
        flag = 1;
    }

    if (confirmPassword.value !== passwordRegisterElement.value || confirmPassword.value === "") {
        errorConfirm.style.display = "block";
        flag = 0;
        return;
    }else {
        flag = 1;
    }

    if (flag) {
        // Tạo user mới
        const newUser = {
            id: Date.now(), // ID duy nhất theo timestamp
            name: `${firstNameElement.value} ${lastNameElement.value}`,
            email: emailRegisterElement.value,
            username: emailRegisterElement.value.split("@")[0], // tạo username từ email
            password: passwordRegisterElement.value,
            status: "active"
        };
    
        // Thêm vào danh sách local
        userLocal.push(newUser);
        localStorage.setItem("users", JSON.stringify(userLocal));
    
        // Xóa form
        firstNameElement.value = "";
        lastNameElement.value = "";
        emailRegisterElement.value = "";
        passwordRegisterElement.value = "";
        confirmPassword.value = "";
    
        // Điều hướng
        window.location.href = "../pages/login.html"; 
    }
});
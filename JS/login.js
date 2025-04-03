const users = [
    {
        id: 1,
        firstname: "Lê",
        lastname: "Minh Thu",
        email: "minhthu@gmail.com",
        password: "123456abc"
    },
    {
        id: 2,
        firstname: "Vũ",
        lastname: "Hồng Vân",
        email: "hongvan@yahoo.com",
        password: "abc12345"
    }
]

localStorage.setItem("users", JSON.stringify(users));
const formLoginElement = document.getElementById("form-login");
const emailLoginElement = document.getElementById("email-login");
const passwordLoginElement = document.getElementById("password-login");
const errorEmail = document.getElementById("validate-email");
const errorPass = document.getElementById("validate-password");

formLoginElement.addEventListener("submit", function (e) {
    e.preventDefault();
    let flag = 0;
   for (let i = 0; i < users.length; i++) {
        if (emailLoginElement.value === users[i].email && passwordLoginElement.value === users[i].password) {
            flag = 1;
        }
   } 

    if (flag == 1) {
        window.location.href = "../pages/index.html"
    } else {
        errorEmail.style.display = "block";
        errorPass.style.display = "block";
    }
});
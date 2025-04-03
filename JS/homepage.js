const btnSignUp = document.querySelector("#register");
const btnSignIn = document.querySelector("#login");

btnSignUp.addEventListener("click", function (e) {
    e.preventDefault();

    window.location.href = "../pages/register.html";
});

btnSignIn.addEventListener("click", function (e) {
    e.preventDefault();

    window.location.href = "../pages/login.html";
});
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

window.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  
    if (isLoggedIn !== "true") {
      window.location.replace("../pages/login.html"); // hoặc login.html nếu muốn
    }
  });
  
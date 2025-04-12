const informationBody = document.getElementById("information-user");
let users = JSON.parse(localStorage.getItem("users")) || [];
let logged = JSON.parse(localStorage.getItem("logged")) || [];

function renderInformation() {
    informationBody.innerHTML = "";

    const foundUser = users.find((user) => user.email === logged);
    if (foundUser) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${foundUser.id}</td>
            <td>${foundUser.name}</td>
            <td>${foundUser.email}</td>
            <td>${foundUser.password}</td>
        `;
        informationBody.appendChild(row);
    }

}
renderInformation();
const userManager = document.getElementById("user-manage");
const entries = document.getElementById("entries");
const article = document.getElementById("article");
const logout = document.getElementById("logout");

function renderUserList() {
    const userTable = document.getElementById("user-list");
    userTable.innerHTML = "";

    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach(user => {
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
}

// Gọi hàm hiển thị khi trang load
renderUserList();

function blockUser(id) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index].status = "blocked";
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    }
};

function unblockUser(id) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index].status = "active";
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    }
};

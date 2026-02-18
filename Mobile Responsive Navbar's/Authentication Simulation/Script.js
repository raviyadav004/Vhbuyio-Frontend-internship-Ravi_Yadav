const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openMenu = document.getElementById("openMenu");
const authArea = document.getElementById("authArea");
const mobileAuth = document.getElementById("mobileAuth");
const loginModal = document.getElementById("loginModal");
const sideLinks = document.querySelectorAll("#sideLinks li");
const successMsg = document.getElementById("successMsg");

openMenu.onclick = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");

    sideLinks.forEach((link, i) => {
        setTimeout(() => {
            link.classList.add("show");
        }, i * 100);
    });
};

overlay.onclick = closeSidebar;

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeSidebar();
        closeLogin();
    }
});

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");

    sideLinks.forEach(link => {
        link.classList.remove("show");
    });
}

function showLogin() {
    loginModal.classList.add("active");
}

function closeLogin() {
    loginModal.classList.remove("active");
}

function login() {
    const user = document.getElementById("userId").value.trim();
    const pass = document.getElementById("password").value.trim();
    if (user === "" || pass === "") {
        return;
    }

    localStorage.setItem("loggedInUser", user);
    successMsg.innerText = "Login Successful!";
    setTimeout(() => {
        loginModal.classList.remove("active");
        successMsg.innerText = "";
        updateUI();
    }, 800);
}

function logout() {
    localStorage.removeItem("loggedInUser");
    updateUI();
}

function updateUI() {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
        authArea.innerHTML = `<div class="user-box">
                    <div class="avatar">${user.charAt(0).toUpperCase()}</div>
                    <span class="user-name">${user}</span>
                    <button class="logout-btn" onclick="logout()">Logout</button>
                </div> `;

        mobileAuth.innerHTML = `<div class="mobile-auth">
                    <div class="user-box">
                        <div class="avatar">${user.charAt(0).toUpperCase()}</div>
                        <span class="user-name">${user}</span>
                    </div>
                    <button class="logout-btn" onclick="logout()">Logout</button>
                </div>
                `;
    } else {
        authArea.innerHTML = `<button class="btn login-btn" onclick="showLogin()">Login</button>
                <button class="btn signup-btn">Sign Up</button> `;
        mobileAuth.innerHTML = `<button class="btn login-btn" onclick="showLogin()">Login</button>
                <button class="btn signup-btn">Sign Up</button> `;
    }
}

updateUI();
window.addEventListener("scroll", () => {
    document.getElementById("header").classList.toggle("scrolled", window.scrollY > 10);
});
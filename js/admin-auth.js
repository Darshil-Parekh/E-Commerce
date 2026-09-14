const ADMIN_SESSION_KEY = "darveAdminAuthenticated";

function isAdminAuthenticated() {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function protectAdminPage() {
    if (document.body.hasAttribute("data-admin-page") && !isAdminAuthenticated()) {
        window.location.replace("admin-login.html");
    }
}

function setupAdminLogin() {
    const loginForm = document.querySelector("#adminLoginForm");

    if (!loginForm) {
        return;
    }

    if (isAdminAuthenticated()) {
        window.location.replace("admin.html");
        return;
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.querySelector("#adminUsername").value.trim();
        const password = document.querySelector("#adminPassword").value;
        const loginMessage = document.querySelector("#loginMessage");

        if (username === "admin" && password === "darve-admin") {
            sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
            window.location.replace("admin.html");
            return;
        }

        loginMessage.textContent = "Incorrect username or password.";
    });
}

function setupAdminLogout() {
    const logoutButton = document.querySelector("#adminLogout");

    if (!logoutButton) {
        return;
    }

    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        window.location.replace("admin-login.html");
    });
}

protectAdminPage();
setupAdminLogin();
setupAdminLogout();
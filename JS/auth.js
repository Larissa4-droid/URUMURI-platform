// auth.js

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    alert("Login successful (mock)");
    window.location.href = "index.html";
  });
}

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    alert("Registration complete (mock)");
    window.location.href = "login.html";
  });
}

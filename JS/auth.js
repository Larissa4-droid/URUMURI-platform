const apiBase = "http://localhost:5001/api";

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

function saveSession(token, user) {
  localStorage.setItem("urumuri_token", token);
  localStorage.setItem("urumuri_user", JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem("urumuri_token");
  localStorage.removeItem("urumuri_user");
}

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Login failed");
      saveSession(data.token, data.user);
      window.location.href = "index.html";
    } catch {
      alert("Network error");
    }
  });
}

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    try {
      const res = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Registration failed");
      alert("Registration successful, please login.");
      window.location.href = "login.html";
    } catch {
      alert("Network error");
    }
  });
}

// Optional: attach a logout handler anywhere
window.urumuriLogout = function () {
  clearSession();
  window.location.href = "login.html";
};


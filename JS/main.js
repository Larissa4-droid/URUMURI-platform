const API_URL = "http://localhost:5001/api/posts";

const token = localStorage.getItem("urumuri_token");
if (!token) {
  // Not logged in, redirect to login
  window.location.href = "login.html";
}

// DOM
const feed = document.getElementById("feed");
const postBtn = document.getElementById("postBtn");
const postText = document.getElementById("postText");
const tagsInput = document.getElementById("tags");

// Load posts
async function loadPosts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load posts");
    const posts = await res.json();
    renderPosts(posts);
  } catch (e) {
    feed.innerHTML = "<p class='error'>Could not load posts.</p>";
  }
}

function renderPosts(posts) {
  feed.innerHTML = "";
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="post-header">
        <img src="images/default-avatar.png" alt="User Avatar" class="avatar">
        <div>
          <h4>${post.user_name || "Anonymous"}</h4>
          <span class="timestamp">${new Date(post.created_at).toLocaleString()}</span>
        </div>
      </div>
      <div class="post-content">
        <p>${post.content}</p>
        ${post.tag ? `<p class="tag">#${post.tag}</p>` : ""}
      </div>
      <div class="post-actions">
        <button class="like-btn" title="Like">❤️ <span>${post.likes || 0}</span></button>
        <button class="comment-btn" title="Comment">💬</button>
        <button class="share-btn" title="Share">🔗</button>
      </div>
      <div class="comments-section hidden">
        <input type="text" class="comment-input" placeholder="Write a comment...">
        <button class="send-comment">Send</button>
        <div class="comments-list"></div>
      </div>
    `;
    // Like front-end only for now
    postEl.querySelector(".like-btn").addEventListener("click", () => {
      const span = postEl.querySelector(".like-btn span");
      span.textContent = parseInt(span.textContent, 10) + 1;
    });
    // Toggle comments
    const toggle = postEl.querySelector(".comment-btn");
    const section = postEl.querySelector(".comments-section");
    toggle.addEventListener("click", () => section.classList.toggle("hidden"));
    // Share (use Web Share API if available)
    postEl.querySelector(".share-btn").addEventListener("click", async () => {
      const url = `${window.location.origin}/post/${post.id}`;
      if (navigator.share) {
        try { await navigator.share({ title: "URUMURI", url }); } catch {}
      } else {
        await navigator.clipboard.writeText(url);
        alert("Post link copied!");
      }
    });
    feed.appendChild(postEl);
  });
}

// Create post
async function createPost() {
  const content = postText.value.trim();
  const tag = tagsInput.value.trim();
  if (!content) return alert("Please write your concern first!");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ content, tag })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || "Failed to create post");
    postText.value = "";
    tagsInput.value = "";
    loadPosts();
  } catch {
    alert("Network error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
  if (postBtn) postBtn.addEventListener("click", createPost);
});


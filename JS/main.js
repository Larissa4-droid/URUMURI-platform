const API_URL = "https://urumuri-backend.onrender.com/api"; 
const token = localStorage.getItem("urumuri_token");
const currentUser = JSON.parse(localStorage.getItem("urumuri_user"));

// Auth Check
if (!token && !window.location.href.includes("login.html") && !window.location.href.includes("register.html")) {
  window.location.href = "login.html";
}

// 1. Load Posts
async function loadPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`);
    const posts = await res.json();
    renderPosts(posts);
  } catch (e) { console.error(e); }
}

// 2. Render Feed
function renderPosts(posts) {
  const feed = document.getElementById("feed");
  if(!feed) return;
  
  feed.innerHTML = "";
  posts.forEach(async (post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    const likeCount = await getLikeCount(post.id);

    // --- VIDEO & IMAGE LOGIC ---
    let mediaHtml = "";
    if (post.image_url) {
        // Check if the file extension suggests a video
        const isVideo = post.image_url.match(/\.(mp4|webm|ogg|mov)$/i);
        
        if (isVideo) {
            mediaHtml = `
                <video controls style="max-width:100%; border-radius:10px; margin-top:10px;">
                    <source src="http://localhost:5005${post.image_url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
        } else {
            mediaHtml = `<img src="http://localhost:5005${post.image_url}" class="post-image" style="max-width:100%; border-radius:10px; margin-top:10px;">`;
        }
    }

    // --- ANONYMITY LOGIC ---
    // Check if the tag contains the secret marker "ANON"
    const isAnon = post.tag && post.tag.includes("ANON");
    const displayName = isAnon ? "Anonymous Student" : post.author;
    const displayInitials = isAnon ? "?" : (post.author ? post.author[0].toUpperCase() : "U");
    
    // Remove "ANON" from the displayed tag so it looks clean
    const cleanTag = post.tag ? post.tag.replace("ANON", "").trim() : "";

    postEl.innerHTML = `
      <div class="post-header">
        <div class="avatar-placeholder">${displayInitials}</div>
        <div class="post-info">
          <h4>${displayName} <span class="tag">${cleanTag ? `#${cleanTag}` : ""}</span></h4>
          <span class="timestamp">${new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      <div class="post-content">
        <p>${post.content}</p>
        ${mediaHtml}
      </div>
      <div class="post-actions">
        <button class="like-btn" onclick="toggleLike(${post.id})">
          ❤️ <span id="likes-${post.id}">${likeCount}</span>
        </button>
        <button class="comment-btn" onclick="toggleComments(${post.id})">💬 Reply</button>
      </div>
      
      <div class="comments-section hidden" id="comments-${post.id}">
        <div class="comments-list" id="list-${post.id}">Loading...</div>
        <div class="comment-box">
            <input type="text" id="input-${post.id}" placeholder="Write a reply...">
            <button onclick="postComment(${post.id})">Send</button>
        </div>
      </div>
    `;
    feed.appendChild(postEl);
  });
}

// 3. Create Post (Supports Image/Video & Anonymity)
const postBtn = document.getElementById("postBtn");
if (postBtn) {
    postBtn.addEventListener("click", async () => {
        const content = document.getElementById("postText").value;
        const tag = document.getElementById("tags").value;
        const fileInput = document.getElementById("postImage");
        const anonCheck = document.getElementById("anonCheck"); // Get the checkbox
        
        if (!content && fileInput.files.length === 0) return alert("Write something or upload media!");

        const formData = new FormData();
        formData.append("content", content);
        
        // Handle Anonymity Marker
        let finalTag = tag;
        if (anonCheck && anonCheck.checked) {
            finalTag += " ANON"; 
        }
        formData.append("tag", finalTag);

        if (fileInput.files[0]) {
            formData.append("image", fileInput.files[0]);
        }

        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }, // No Content-Type for FormData!
                body: formData
            });
            if (res.ok) {
                document.getElementById("postText").value = "";
                document.getElementById("tags").value = "";
                fileInput.value = ""; // Clear file
                if(anonCheck) anonCheck.checked = false; // Reset checkbox
                loadPosts();
            } else {
                alert("Failed to post");
            }
        } catch { alert("Network error"); }
    });
}

// 4. Comments (Fixed Clearing)
window.postComment = async function(postId) {
    const input = document.getElementById(`input-${postId}`);
    const text = input.value.trim();
    if (!text) return;

    try {
        const res = await fetch(`${API_URL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ post_id: postId, comment: text })
        });
        if (res.ok) {
            input.value = ""; // CLEAR INPUT HERE
            loadComments(postId);
        }
    } catch (e) { alert("Error posting comment"); }
};

// Helper functions (Likes/Load Comments same as before)
window.toggleComments = function(postId) {
    const el = document.getElementById(`comments-${postId}`);
    el.classList.toggle("hidden");
    if(!el.classList.contains("hidden")) loadComments(postId);
}

async function loadComments(postId) {
    const list = document.getElementById(`list-${postId}`);
    const res = await fetch(`${API_URL}/comments/${postId}`);
    const data = await res.json();
    list.innerHTML = data.map(c => `<div class='comment'><b>${c.user_name}:</b> ${c.comment}</div>`).join("") || "No comments.";
}

async function getLikeCount(pid) {
    const res = await fetch(`${API_URL}/posts/${pid}/likes`);
    const d = await res.json();
    return d.count;
}

window.toggleLike = async function(pid) {
    const res = await fetch(`${API_URL}/posts/${pid}/like`, {
        method: "POST", headers: {"Authorization": `Bearer ${token}`}
    });
    if(res.ok) {
        document.getElementById(`likes-${pid}`).innerText = await getLikeCount(pid);
    }
}

document.addEventListener("DOMContentLoaded", loadPosts);
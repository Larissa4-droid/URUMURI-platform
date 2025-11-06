const feed = document.getElementById("feed");
const postBtn = document.getElementById("postBtn"); 
const postText = document.getElementById("postText");
const tagsInput = document.getElementById("tags");

// Render posts
function renderPosts() {
  feed.innerHTML = "";
  mockPosts.forEach(post => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <h4>${post.user}</h4>
      <p>${post.content}</p>
      <p class="tag">#${post.tag}</p>
      <div class="reactions">
        <button>👍 ${post.likes}</button>
        <button>💬 ${post.comments}</button>
      </div>
    `;
    feed.appendChild(postEl);
  });
}

// Add a new post (temporarily in memory)
postBtn.addEventListener("click", () => {
  const content = postText.value.trim();
  const tag = tagsInput.value.trim();

  if (content === "") return alert("Please write your concern first!");

  mockPosts.unshift({
    id: Date.now(),
    user: "You",
    content,
    tag: tag || "Untagged", // 👈 Default if no tag entered
    likes: 0,
    comments: 0
  });

  postText.value = "";
  tagsInput.value = "";
  renderPosts();
});

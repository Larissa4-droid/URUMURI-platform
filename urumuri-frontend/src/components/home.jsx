import React, { useEffect, useState } from "react";
import Post from "./components/Post";

const API_BASE = "http://localhost:5001";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`${API_BASE}/api/posts`); // assuming you have this route
      const data = await res.json();
      setPosts(data.posts || data); // adapt to your response shape
    }
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}

export default Feed;

import React, { useState, useEffect } from "react";

function LikeButton({ postId, initialLikesCount, initiallyLiked }) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const token = localStorage.getItem("jwtToken");

  const toggleLike = async () => {
    if (!token) {
      alert("You must be logged in to like posts.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update like status");
      }

      const data = await response.json();
      // Assuming your backend returns { liked: true/false, likesCount: number }
      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch (error) {
      console.error("Error liking post:", error);
      alert("There was an error updating your like. Please try again.");
    }
  };

  return (
    <button
      onClick={toggleLike}
      style={{
        color: liked ? "red" : "gray",
        cursor: "pointer",
      }}
      aria-pressed={liked}
      aria-label={liked ? "Unlike post" : "Like post"}
    >
      ❤️ {likesCount}
    </button>
  );
}

export default LikeButton;

import React from "react";
import LikeButton from "./LikeButton";

function Post({ post }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "8px", marginBottom: "8px" }}>
      <p>{post.content}</p>
      <small>Tag: {post.tag}</small>
      <div style={{ marginTop: "4px" }}>
        <LikeButton postId={post.id} />
        {/* Later you’ll add CommentButton, ShareButton here */}
      </div>
    </div>
  );
}

export default Post;

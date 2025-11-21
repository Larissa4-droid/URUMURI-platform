const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// Create a post - requires auth
router.post(
  "/",
  (req, res, next) => {
    console.log("[POSTS] POST /api/posts HIT (before auth)");
    next();
  },
  auth,
  (req, res) => {
    console.log("[POSTS] AFTER auth, req.user =", req.user);
    const { content, tag } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required" });

    db.run(
      `INSERT INTO posts (user_id, content, tag) VALUES (?, ?, ?)`,
      [req.user && req.user.userId, content, tag || null],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Post created", postId: this.lastID });
      }
    );
  }
);

// Toggle Like for authenticated user on a post
router.post("/:postId/like", auth, (req, res) => {
  const userId = req.user.userId;
  const postId = req.params.postId;

  db.get(
    "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
    [userId, postId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (row) {
        // User already liked, so unlike (delete)
        db.run(
          "DELETE FROM likes WHERE user_id = ? AND post_id = ?",
          [userId, postId],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ liked: false });
          }
        );
      } else {
        // Not liked yet, insert like
        db.run(
          "INSERT INTO likes (user_id, post_id) VALUES (?, ?)",
          [userId, postId],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ liked: true });
          }
        );
      }
    }
  );
});

// Get total likes count for a post (public)
router.get("/:postId/likes", (req, res) => {
  const postId = req.params.postId;
  db.get(
    "SELECT COUNT(*) as count FROM likes WHERE post_id = ?",
    [postId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ count: row.count });
    }
  );
});

// router.get("/test", (req, res) => res.send("Posts route OK"));

// Get all posts (public)
router.get("/", (req, res) => {
  db.all(
    `SELECT p.id, p.content, p.tag, p.user_id, u.name as author
     FROM posts p
     LEFT JOIN users u ON p.user_id = u.id
     ORDER BY p.id DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});


module.exports = router;



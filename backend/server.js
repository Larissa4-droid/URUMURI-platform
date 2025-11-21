// backend/server.js
app.get("/test", (_req, res) => res.send("Root OK"));

console.log("[SERVER] server.js loaded from:", __filename);

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Optional: confirm where Express resolves your middleware from
console.log("[SERVER] auth middleware resolve:", require.resolve("./middleware/auth"));

const app = express();
console.log("[STARTUP] Express server starting…");

app.use(cors());
app.use(bodyParser.json());

// DB init (kept as-is so your existing db.js runs)
const db = require("./db");

// Route modules
const authRoutes = require("./routes/auth");
console.log("[SERVER] authRoutes loaded:", require.resolve("./routes/auth"));

const postRoutes = require("./routes/posts");
console.log("[SERVER] postRoutes loaded:", require.resolve("./routes/posts"));

const commentRoutes = require("./routes/comments");
console.log("[SERVER] commentRoutes loaded:", require.resolve("./routes/comments"));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Health check
app.get("/", (_req, res) => res.send("Urumuri backend running"));

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


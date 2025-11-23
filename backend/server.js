const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// 1. Initialize App
const app = express();

// 2. Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// 3. Import Routes
try {
    const authRoutes = require("./routes/auth");
    const postRoutes = require("./routes/posts");
    const commentRoutes = require("./routes/comments");

    // 4. Mount Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/posts", postRoutes);
    app.use("/api/comments", commentRoutes);
    
    console.log("[SERVER] Routes mounted successfully.");
} catch (error) {
    console.error("[SERVER] Error mounting routes:", error.message);
}

// 5. Root Route (Health Check)
app.get("/", (req, res) => {
  res.send("Urumuri Backend is Running on Port 5005!");
});

// 6. Start Server on NEW PORT
const PORT = 5005; // CHANGED TO 5005
app.listen(PORT, () => {
  console.log(`\n✅ SERVER STARTED on http://localhost:${PORT}`);
  console.log(`👉 Posts Link: http://localhost:${PORT}/api/posts\n`);
});


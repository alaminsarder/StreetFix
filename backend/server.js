const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

// =================================================================
// ✅ CORS Setup - Render এর লাইভ লিংকও এখানে অ্যাড করা আছে
// =================================================================
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5000",
  "http://localhost:3001",
  "https://streetfix-qhie.onrender.com" // <-- তোমার লাইভ Render লিংক
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
  })
);

// =================================================================
// ✅ MongoDB Connection
// =================================================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

// Health Route
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "StreetFix API running" });
});

// Routes
app.use("/api/problems", require("./routes/problems"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// =================================================================
// ✅ Serve React build (Frontend)
// =================================================================
const buildPath = path.resolve(__dirname, "..", "frontend", "build");
const indexFile = path.join(buildPath, "index.html");

console.log("Serving React build from:", buildPath);
console.log("Index exists?", fs.existsSync(indexFile));

// serve static but don't auto-serve index
app.use(express.static(buildPath, { index: false }));

// all non-api routes -> React index.html
app.get(/^(?!\/api).*/, (req, res) => {
  if (!fs.existsSync(indexFile)) {
    return res
      .status(500)
      .send("React build missing. Run: cd frontend && npm run build");
  }
  return res.sendFile("index.html", { root: buildPath });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
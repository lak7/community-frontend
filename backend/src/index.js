import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import Connection from "./modules/middleware/shared/db.js";
import authRouting from "./modules/routes/auth.js";
import adminRouting from "./modules/routes/adminRoutes.js";
import userRouting from "./modules/routes/userRoutes.js";
import taskRouting from "./modules/routes/taskRoutes.js";
import leaderboardRouting from "./modules/routes/leaderboardRoutes.js";
import uploadRouting from "./modules/routes/uploadRoutes.js";

// Config
dotenv.config();
const app = express();

// to handle cors
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://community-partner.onrender.com",
    "https://community-partner-app.onrender.com", // Add any additional frontend URLs
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Explicitly allow necessary headers
};

// Middleware

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1> Hello </h1>");
});

// Routing
app.use("/api/auth", authRouting);
app.use("/api/admin", adminRouting);
app.use("/api/user", userRouting);
app.use("/api/tasks", taskRouting);
app.use("/api/leaderboard", leaderboardRouting);
app.use("/api/upload", uploadRouting);

app.listen(process.env.PORTNUMBER || 5000, async () => {
  try {
    await Connection();
    console.log(`Server is running on port ${process.env.PORTNUMBER || 5000}`);
  } catch (err) {
    console.error("Failed to connect to the database. Server not started.");
    process.exit(1); // Exit the process with failure
  }
});

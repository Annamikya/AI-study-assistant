const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");


// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, ".env") });
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const chatRoutes = require("./routes/chatRoutes");
const quizRoutes = require("./routes/quizRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
const noteRoutes = require("./routes/noteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://ai-study-assistant-seven-flame.vercel.app",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 AI Study Assistant Backend is Running");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, "0.0.0.0",() => {
  console.log(`🚀 Server running on port ${PORT}`);
});



app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
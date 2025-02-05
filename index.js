import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "dotenv/config";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import { getUserProfile } from "./Controllers/userController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Debugging log to ensure the environment variable is loaded
console.log("MongoDB URL:", process.env.MONGO_URL);

app.use(
  cors({
    origin: "https://medicare-divyenduvimals-projects-0a9ec642.vercel.app",
    credentials: true, // If your API uses cookies for authentication
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is working");
});

app.get("/api/v1/auth/login", (req, res) => {
  getUserProfile(req, res);
  // res.send('Auth API Working');
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database is connected");
  } catch (err) {
    console.log("MongoDB database connection failed", err);
  }
};

app.use("/api/v1/auth", authRoute); // domain/api/v1/auth/register
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port " + port);
});

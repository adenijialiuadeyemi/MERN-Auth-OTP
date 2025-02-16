import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import { authRouter } from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:5173"];
app.use(express.json()); // parse json bodies
app.use(cors({ origin: allowedOrigins, credentials: true })); // allow cookies to be sent from the server to the client
app.use(express.urlencoded({ extended: true })); // parse urlencoded bodies
app.use(cookieParser()); // parse cookies from the client

//API Endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

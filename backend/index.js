import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import calorieRoutes from "./routes/calorieRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();


const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
const PORT = process.env.PORT || 5000;
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});


app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/calorie",calorieRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

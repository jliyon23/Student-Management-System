import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import studentRoutes from "./routes/student.route.js";
import facultyRoutes from "./routes/faculty.route.js";
import adminRoutes from "./routes/admin.route.js";
import cookieParser from "cookie-parser";

const app = express();

//middleware
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "https://sms-dbms-project.vercel.app/",
  credentials: true,
}));


//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });


//routes
app.use("/student", studentRoutes);
app.use("/faculty", facultyRoutes);
app.use("/admin", adminRoutes);



//port
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/users.js";

dotenv.config();
const app = express();
app.use(cors()); // Enable CORS

mongoose
  .connect(process.env.MONGO) 
  .then(() => console.log("Connected to database.")) 
  .catch((err) => console.log("DB ERROR", err));

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

const port = process.env.PORT || 5500; // Use environment variable for the port if available

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(port, () => { // Fixed: Pass the port as an argument
  console.log(`Server is running at port ${port}`);
});


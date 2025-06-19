import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRouter from "./route/user.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/v1/user", userRouter);

// NW3IqY8IILVJVy8j
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});

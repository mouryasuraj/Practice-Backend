import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/database.js";
import authRouter from "./src/routes/auth.js";
import userAuth from "./src/middlewares/userAuth.js";


const app = express();
const PORT = process.env.PORT

//middlewares
app.use(express.json()) // used to parse json to javascript object
app.use(cookieParser()) // used to parse the cookies into javascript object


//Routes
app.use("/auth", authRouter)
app.use("/profile", userAuth, authRouter)



connectDB()
  .then(() => {
    console.log("Database connection established")
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT:${PORT}`)
    })
  })
  .catch((err) => {
    console.log("Database connection failed: ", err)
  });

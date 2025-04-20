import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT

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

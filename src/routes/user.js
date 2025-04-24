import express from 'express'
import { handleGetFeed } from '../controller/user.js';

const userRouter = express.Router()


userRouter.get("/feed", handleGetFeed)


export default userRouter;


import express from 'express'
import { handleSendRequest } from '../controller/request.js';

const requestRouter = express.Router()

requestRouter.post("/send/:status/:toUserId", handleSendRequest)

export default requestRouter;



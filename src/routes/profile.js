import express from 'express'
import { handleGetProfileByEmailId } from '../controller/profile';

const profileRouter = express.Router()


profileRouter.get("/view/:userId", handleGetProfileByEmailId)


export default profileRouter;
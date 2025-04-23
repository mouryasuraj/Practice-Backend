import express from 'express'
import { handleGetProfile, handleEditProfile, handleResetPassword } from '../controller/profile.js';

const profileRouter = express.Router()


profileRouter.get("/view", handleGetProfile)
profileRouter.patch("/edit", handleEditProfile)
profileRouter.patch("/resetpassword", handleResetPassword)

export default profileRouter;
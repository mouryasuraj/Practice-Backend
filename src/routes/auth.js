import express from 'express';
import { handleLogin, handleSignUp, handleLogout } from '../controller/auth.js';

const authRouter = express.Router();

authRouter.post("/signup", handleSignUp)
authRouter.post("/login", handleLogin)
authRouter.post("/logout", handleLogout)

export default authRouter;
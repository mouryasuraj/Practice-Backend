import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { handleError } from "../utils/helper.js";

const userAuth = async (req, res, next) => {
  try {
    //Check token is present or not
    const { token } = req.cookies;
    if (!token) throw new Error("Token is not present");

    //Verfiy token
    const decodedData = jwt.verify(token, process.env.SECRETKEY);
    if (!decodedData) throw new Error("Token is invalid");

    const { _id } = decodedData;

    const user = await User.findById(_id);
    if (!user) return res.status(404).send("User is not found");

    req.user = user;
    next();
  } catch (error) {
    handleError(error, res)
  }
};

export default userAuth;

import User from "../models/user.js";
import { handleError } from "../utils/helper.js";

export const handleGetFeed = async (req, res) => {
  try {
    
    const alluser = await User.find({})
    res.json({message:"Feed Data", data:alluser})

  } catch (error) {
    handleError(error, res);
  }
};

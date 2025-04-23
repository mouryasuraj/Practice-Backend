import bcrypt from 'bcrypt'
import User from "../models/user.js";
import { handleError } from "../utils/helper.js";
import { validateEditRequestBody, validateResetPasswordRequestBody } from "../utils/validation.js";

export const handleGetProfile = async (req, res) => {
  try {
    const { firstName, lastName, skills, about, age } = req.user;
    res.json({
      firstName,
      lastName,
      skills,
      about,
      age,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const handleEditProfile = async (req, res) => {
  try {
    // Validate request body
    validateEditRequestBody(req);

    const { _id } = req.user;
    const body = req.body;
    const updatedUser = await User.findByIdAndUpdate(_id, body, {returnOriginal:false});
    const {firstName, lastName, about, skills, createdAt,updatedAt} = updatedUser
    res.json({ message: "Profile updated successfully", user: {
      firstName,
      lastName,
      about,
      skills,
      createdAt,
      updatedAt
    } });
  } catch (error) {
    handleError(error, res);
  }
};

export const handleResetPassword = async (req,res) =>{
  try {
    
    // validate request body
    validateResetPasswordRequestBody(req)
    const {currentPassword, newPassword} = req.body

    const {_id} = req.user
    // Check current password is valid or not
    const isPasswordCorrect = await req.user.verifyPassword(currentPassword)
    if(!isPasswordCorrect){
      throw new Error("Current Password is invalid")
    }

    // hashed new password
    const hashPassword = await bcrypt.hash(newPassword, 10)
    
    await User.findByIdAndUpdate(_id, {password:hashPassword})

    res.json({message:"Password reset successfully"})
    

  } catch (error) {
    handleError(error, res)
  }
}

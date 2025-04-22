import bcrypt from "bcrypt";
import { handleError } from "../utils/helper.js";
import { validateLoginRequestBody, validateSignUpRequestBody } from "../utils/validation.js";
import User from "../models/user.js";


//handleSignup
export const handleSignUp = async (req, res) => {
  try {
    //Validate Request body
    validateSignUpRequestBody(req);
    const { firstName, lastName, email, password, age, gender, about, skills } =
      req.body;

    //Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    //save user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      age,
      gender,
      about,
      skills,
    });
    await user.save()

    res.json({message:"User created successfully", email:user.email});
  } catch (error) {
    if(error.code===11000){
        return res.status(409).json({message:"Email already exists"})
    }
    handleError(error, res);
  }
};

//handleLogin
export const handleLogin = async (req, res) =>{
    try {
        //Validate request body
        validateLoginRequestBody(req)
        const {email,password} = req.body

        //Check user exist or not
        const user = await User.findOne({email})
        if(!user){
          console.log("User not found");
          return res.status(401).json({message:"Invalid credentials"})
        }

        //Check password
        const isPasswordCorrect = await user.verifyPassword(password)
        if(!isPasswordCorrect){
          console.log("Password is incorrect");
          return res.status(401).json({message:"Invalid credentials"})
        }

        //Generate token
        const token = await user.generateToken();
        res.cookie("token", token, {httpOnly:true, expires:new Date(Date.now() + 3600000)})

        // Send success message
        res.json({message:"Logged in successfully"})

    } catch (error) {
        handleError(error, res)
    }
};

//handleLogout
export const handleLogout = (req, res) =>{
  try {
      res.clearCookie("token").json({message:"Logged out succesfully"})
  } catch (error) {
    handleError(error, res)
  }
}
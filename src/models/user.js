import mongoose, { mongo } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const { Schema, model } = mongoose;
const SECRETKEY = process.env.SECRETKEY

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 15,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 250,
      validator: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validator: (value) => {
        if (
          !validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minSymbols: 1,
            minNumbers: 1,
            minUppercase: 1,
          })
        ) {
          throw new Error(
            `Your password should contain at least one number, one uppercase and lowercase letter, one special character`
          );
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
      trim: true,
      required: true,
      validator: (value) => {
        if (value < 18 || value > 100) {
          throw new Error(`Invalid age. Your age must be between 18 to 100`);
        }
      },
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["Male", "Female", "Others"],
        message: `Invalid gender : {VALUE}`,
      },
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    skills: {
      type: [String],
      required: true,
      validator: (values) => {
        if (Array.isArray(values) && values.length > 5) {
          throw new Error("Skill should be less than or equal to 5");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

//Create methods


//Verify password
userSchema.methods.verifyPassword = async function (userInputPassword) {
  const { password } = this;
  return await bcrypt.compare(password, userInputPassword);
};

//Generate token
userSchema.methods.generateToken = function () {
    const {email} = this
    const token = jwt.sign({email}, SECRETKEY, {expiresIn:'1h'})
    return token;
}

const User = model("User", userSchema);

export default User;

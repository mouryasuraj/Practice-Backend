import mongoose from "mongoose";
import validator from 'validator'
const { Schema, model } = mongoose;


const userSchema = new Schema(
  {
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:4,
        maxLength:15
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minLength:4,
        maxLength:15
    },
    email:{
        type:String,
        required:true,
        trim:true,
        maxLength:250,
        validator:(value)=>{
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:36,
        validator:(value)=>{
            if(!validator.isStrongPassword(value, {minLength:8, minLowercase:1, minSymbols:1, minNumbers:1, minUppercase:1})){
                throw new Error(`Your password should contain at least one number, one uppercase and lowercase letter, one special character`)
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:100,
        trim:true,
        validator:(value)=>{
            if(value<18 || value>100){
                throw new Error(`Invalid age. Your age must be between 18 to 100`)
            }
        }
    },
    gender:{
        type:String,
        enum:{
            values:["Male","Female","Others"],
            message:`Invalid gender : {VALUE}`
        },
        trim:true
    },
    about:{
        type:String,
        trim:true,
        maxLength:200
    },
    skills:{
        type:[String],
        validator:(values)=>{
            if(Array.isArray(values) && values.length>5){
                throw new Error("Skill should be less than or equal to 5")
            }
        }
    }

  },
  {
    timestamps: true,
  }
);


const User = new model("User", userSchema)

export default User;
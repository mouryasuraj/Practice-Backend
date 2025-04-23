import validator from 'validator'
import { allowedEditFields, allowedGenders, allowedloginFields, allowedResetPasswordFields, allowedSignUpFields } from "./constant.js";
import { validateReqFields } from './helper.js';

//Auth

export const validateSignUpRequestBody = (req) => {

    //validate request body field
    const {reqBodyKeys} = validateReqFields(req, allowedSignUpFields)
    const {body} = req
    const {firstName, lastName, email, password, age, gender, about, skills} = body

    // empty value
    for(const check of reqBodyKeys){
        if(check==="skills" && Array.isArray(skills) && skills.length===0){
            throw new Error(`skill cannot be empty`)
        }else if(!body[check]){
            throw new Error(`${check} cannot be empty`)
        }
    }  

    //field value validation
    const validation = [
        {
            valid:firstName.length<4 || firstName.length>15, message:"firstName must be between 4 to 15 character"
        },
        {
            valid:lastName.length<4 || lastName.length>15, message:"lastName must be between 4 to 15 character"
        },
        {
            valid:!validator.isEmail(email), message:`email is invalid: ${email} `
        },
        {
            valid:!validator.isStrongPassword(password), message:"Your password should contain at least one number, one uppercase and lowercase letter, one special character"
        },
        {
            valid:age<18 || age>100, message:`age must be between 18 to 100: ${age}`
        },
        {
            valid:!allowedGenders.includes(gender), message:`gender is invalid: ${gender}`
        },
        {
            valid:about.length>200, message:`about length exceeds 200`
        },
        {
            valid:!Array.isArray(skills), message:`skills should be an array`
        },
        {
            valid:skills.length>5 , message:`skills length exceeds 5`
        },
    ]

    for(const check of validation){
        if(check.valid){
            throw new Error(check.message)
        }
    }
    


};

export const validateLoginRequestBody = (req) =>{
    //validate request body field
    
    const {reqBodyKeys} = validateReqFields(req, allowedloginFields)
    const {body} = req

    //validate empty field
    for(const check of reqBodyKeys){
        if(!body[check]){
            throw new Error(`${check} cannot be empty`)
        }
    }
    const {email} = body

    //validate field value
    if(!validator.isEmail(email)){
        throw new Error(`Email is not valid: ${email}`)
    }  

}



// Profile

export const validateEditRequestBody = (req) =>{

    // validate request body field
    const {reqBodyKeys} = validateReqFields(req,allowedEditFields)

    const body = req.body
    const {firstName, lastName, about, skills} = body

    //validte empty fields
    for(const check of reqBodyKeys){
        if(!body[check]){
            throw new Error(`${check} cannot be empty`)
        }
    }

    //field value validation
    const validation = [
        {
            valid:firstName.length<4 || firstName.length>15, message:"firstName must be between 4 to 15 character"
        },
        {
            valid:lastName.length<4 || lastName.length>15, message:"lastName must be between 4 to 15 character"
        },
        {
            valid:about.length>200, message:`about length exceeds 200`
        },
        {
            valid:!Array.isArray(skills), message:`skills should be an array`
        },
        {
            valid:skills.length===0 , message:`atleast one skill required`
        },
        {
            valid:skills.length>5 , message:`skills length exceeds 5`
        },
    ]

    for(const check of validation){
        if(check.valid){
            throw new Error(check.message)
        }
    }

}

export const validateResetPasswordRequestBody = (req) =>{
    // validate request body fields
    const {reqBodyKeys} = validateReqFields(req,allowedResetPasswordFields)

    const {body} = req
    
    //validate empty fields
    for(const check of reqBodyKeys){
        if(!body[check]){
            throw new Error(`${check} cannot be empty`)
        }
    }

    const {newPassword, confirmPassword} = body

    // validate field value
    const validation = [
        {
            valid:!validator.isStrongPassword(newPassword), message:"newPassword should contain at least one number, one uppercase and lowercase letter, one special character"
        },
        {
            valid:newPassword!==confirmPassword, message:"newPassword and confirmPassword is not matched"
        },
    ]

    for(const check of validation){
        if(check.valid){
            throw new Error(check.message)
        }
    }

}
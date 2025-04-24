// Auth

export const allowedSignUpFields = ["firstName","lastName", "email", "password", "age", "gender", "about", "skills"]
export const allowedloginFields = ["email", "password"]
export const allowedGenders = ["Male","Female", "Others"]

// Profile
export const allowedEditFields = ["firstName","lastName", "about", "skills"]
export const allowedResetPasswordFields = ["currentPassword","newPassword", "confirmPassword"]

// Connection Request
export const allowedStatus = ["ignore","interested","accepted","rejected"]
export const allowedSendRequestFields = ["fromUserId","toUserId","status"]
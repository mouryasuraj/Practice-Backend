import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODBURI)
    } catch (error) {
        console.log("DB connection failed");
    }
}

export default connectDB;
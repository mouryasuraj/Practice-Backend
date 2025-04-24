import mongoose from "mongoose";
import { allowedStatus } from "../utils/constant";
const { Schema, model } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:allowedStatus,
        required:true
    }
  },
  {
    timestamps: true,
  }
);


const ConnectionRequest = model("ConnectionRequest", connectionRequestSchema)

export default ConnectionRequest;
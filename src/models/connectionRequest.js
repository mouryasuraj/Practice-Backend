import mongoose from "mongoose";
import { allowedStatus } from "../utils/constant.js";
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

connectionRequestSchema.pre('save', function(next){
  const connectionRequest = this
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("You can't sent connection request to yourself")
  }
  next()
})



const ConnectionRequest = model("ConnectionRequest", connectionRequestSchema)

export default ConnectionRequest;
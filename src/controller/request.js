import { handleError } from "../utils/helper.js";
import { validateSendRequestBody } from "../utils/validation.js";
import User from "../models/user.js";
import ConnectionRequest from "../models/connectionRequest.js";

export const handleSendRequest = async (req, res) => {
  try {
    // validate request body
    validateSendRequestBody(req);
    const { toUserId, status } = req.params;
    const { _id:fromUserId } = req.user;

    // Check if toUser is exist or not
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }



    //Check if connection request already exists or not
    const connectionAlreadyExist = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    console.log(connectionAlreadyExist);


    if (connectionAlreadyExist) {
      throw new Error("Connection already exists");
    }
    
    const newConnectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    await newConnectionRequest.save();
    res.json({ message: "Connection request sent successfully" });
  } catch (error) {
    handleError(error, res);
  }
};

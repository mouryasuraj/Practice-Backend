import User from "../models/user.js";
import { handleError } from "../utils/helper";

export const handleGetProfileByEmailId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new Error(`userId params not present`);

    const { firstName, lastName, skills, about } = req.user;
    res.json({
      firstName,
      lastName,
      skills,
      about,
    });
  } catch (error) {
    handleError(error, req)
  }
};

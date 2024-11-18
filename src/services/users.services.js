import { getAllUsers } from "../controllers/users.controllers.js";

export const getAllUsersServices = async (req, res, next) => {
  try {
    const response = await getAllUsers();
    res.status(200).json({ res: response, totalUsers: response.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next();
  }
};

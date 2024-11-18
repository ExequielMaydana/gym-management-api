import {
  createUserServices,
  deleteUserServices,
  getAllUsersServices,
  getMyProfileServices,
  getUserByNameServices,
  updateUserByIdServices,
} from "../services/users.services.js";

export const getAllUsersControllers = async (req, res, next) => {
  try {
    const response = await getAllUsersServices();
    res.status(200).json({ res: response, totalUsers: response.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next();
  }
};

export const getUserByNameControllers = async (req, res, next) => {
  try {
    const { full_name } = req.params;
    const userFound = await getUserByNameServices(full_name);

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found", user: userFound });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

export const getMyProfileControllers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await getMyProfileServices(userId);

    res
      .status(200)
      .json({ message: "User profile retrieved successfully", user });
  } catch (error) {
    res.status(404).json({ message: error.message });
    next();
  }
};

export const updateUserByIdControllers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await updateUserByIdServices(id, updateData);

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next();
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteUserServices(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
    next();
  }
};

export const createUserController = async (req, res, next) => {
  try {
    const response = await createUserServices(req.body);
    res
      .status(201)
      .json({ message: "User successfully created", newUser: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next();
  }
};

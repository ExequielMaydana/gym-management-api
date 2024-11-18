import Users from "../models/users.model.js";

export const getAllUsers = async () => {
  const allUsers = await Users.find({}).populate({
    path: "roles",
    select: "name -_id",
  });
  return allUsers;
};

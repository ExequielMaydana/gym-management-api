import Roles from "../models/roles.model.js";
import Users from "../models/users.model.js";
import { hashPassword } from "../utils/crypt.js";

export const getAllUsersServices = async () => {
  try {
    const allUsers = await Users.find({}).populate({
      path: "roles",
      select: "name -_id",
    });
    return allUsers;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByNameServices = async (fullName) => {
  try {
    const userFound = await Users.findOne({ full_name: fullName });
    if (!userFound) {
      throw new Error("User not found");
    }
    return userFound;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMyProfileServices = async (userId) => {
  try {
    const user = await Users.findById(userId).populate("roles", "name -_id");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserByIdServices = async (id, updateData) => {
  try {
    const { roles, password, confirm_password, ...restOfData } = updateData; // Excluir los campos sensibles

    // Si se envían roles, verifica y actualiza
    if (roles && roles.length > 0) {
      const roleFound = await Roles.find({ name: { $in: roles } });
      if (roleFound.length > 0) {
        restOfData.roles = roleFound.map((role) => role._id); // Agrega los ObjectIds de los roles encontrados
      } else {
        throw new Error("Invalid or missing roles.");
      }
    }

    // Actualiza el usuario excluyendo password y confirm_password
    const user = await Users.findByIdAndUpdate(id, restOfData, { new: true });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUserServices = async (userId) => {
  try {
    const user = await Users.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User successfully deleted" };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUserServices = async (data) => {
  try {
    const { roles, password, confirm_password, ...restOfData } = data;

    const newUser = await Users.create({
      ...restOfData,
      password: hashPassword(password),
      roles: [],
    });
    if (roles && roles.length > 0) {
      // Verifico si el usuario indicó roles y los busco en la BD
      const roleFound = await Roles.find({ name: { $in: roles } });
      if (roleFound.length > 0) {
        // Asigno los ObjectIds de los roles encontrados
        newUser.roles = roleFound.map((rol) => rol._id);
      } else {
        throw new Error("Invalid or missing roles.");
      }
    } else {
      const defaultRole = await Roles.findOne({ name: "client" });
      if (defaultRole) {
        newUser.roles = [defaultRole._id];
      } else {
        throw new Error("Default role not found.");
      }
    }

    return await newUser.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

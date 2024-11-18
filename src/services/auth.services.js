import Roles from "../models/roles.model.js";
import Users from "../models/users.model.js";
import { comparePassword, hashPassword } from "../utils/crypt.js";
import { generateToken } from "../utils/jwt.js";

export const signUpServices = async (data) => {
  try {
    if (data) {
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
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logInServices = async ({ email, password }) => {
  try {
    const user = await Users.findOne({ email }).populate("roles", "name");
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const payload = {
      id: user._id,
      email: user.email,
      roles: user.roles.map((role) => role.name),
    };
    const token = generateToken(payload);

    return { token, user: payload };
  } catch (error) {
    throw new Error(error.message);
  }
};

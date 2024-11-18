import Roles from "../models/roles.model.js";

const createRoles = async () => {
  try {
    const countDocuments = await Roles.estimatedDocumentCount();
    if (countDocuments > 0) return;

    const res = await Promise.all([
      new Roles({ name: "admin" }).save(),
      new Roles({ name: "moderator" }).save(),
      new Roles({ name: "client" }).save(),
    ]);

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export default createRoles;

import Clients from "../models/clients.model.js";

export const getAllClients = async () => {
  try {
    const allClients = await Clients.find({});
    return allClients;
  } catch (error) {
    throw new Error(error.message);
  }
};
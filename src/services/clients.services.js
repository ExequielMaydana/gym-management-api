import Clients from "../models/clients.model.js";

export const getAllClientsServices = async () => {
  try {
    const allClients = await Clients.find({});
    return allClients;
  } catch (error) {
    throw new Error(error.message);
  }
};

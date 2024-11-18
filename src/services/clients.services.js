import { getAllClients } from "../controllers/clients.controllers.js";

export const getAllClientsService = async (req, res, next) => {
  try {
    const clients = await getAllClients();
    res
      .status(200)
      .json({ message: "", clients: clients, totalClients: clients.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
};

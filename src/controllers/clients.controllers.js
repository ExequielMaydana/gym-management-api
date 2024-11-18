import { getAllClientsServices } from "../services/clients.services.js";

export const getAllClientsControllers = async (req, res, next) => {
  try {
    const response = await getAllClientsServices();
    res
      .status(200)
      .json({ message: "", res: response, total_clients: response.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next();
  }
};

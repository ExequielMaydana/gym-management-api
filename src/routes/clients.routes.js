import { Router } from "express";
import { getAllClientsService } from "../services/clients.services.js";

const router = Router();

router.route("/").get(getAllClientsService);

export default router;

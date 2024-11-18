import { Router } from "express";
import { getAllClientsControllers } from "../controllers/clients.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").get(authenticateToken, getAllClientsControllers);

export default router;

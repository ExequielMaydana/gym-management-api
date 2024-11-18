import { Router } from "express";
import { getAllUsersServices } from "../services/users.services.js";

const router = Router();

router.route("/users").get(getAllUsersServices);

export default router;

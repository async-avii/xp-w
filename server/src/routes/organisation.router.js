import { Router } from "express";
import { createOrganisation } from "../controllers/organisations.controllers.js";
import verifiedUser from "../middlewares/verifiedUser.middlewre.js";
import { loggedMiddleware } from "../middlewares/logged.middleware.js";

const router = Router();
router.post("/create/:id", loggedMiddleware, verifiedUser, createOrganisation);

export default router;

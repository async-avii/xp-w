import { Router } from "express";
import { createOrganisation } from "../controllers/organisations.controllers.js";
import verifiedUser from "../middlewares/verifiedUser.middlewre.js";

const router = Router();
router.post("/create/:id", verifiedUser, createOrganisation);

export default router;

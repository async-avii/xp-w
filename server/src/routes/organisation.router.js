import { Router } from "express";
import {
  createOrganisation,
  joinOrganisation,
} from "../controllers/organisations.controllers.js";
import { loggedMiddleware } from "../middlewares/logged.middleware.js";
import verifiedByCookie from "../middlewares/verifiedByCookie.js";
import { createLink } from "../controllers/organisations.controllers.js";

const router = Router();
router.post("/create", loggedMiddleware, verifiedByCookie, createOrganisation);
router.post("/create-link/:id", loggedMiddleware, verifiedByCookie, createLink);
router.post("/join/:id", loggedMiddleware, verifiedByCookie, joinOrganisation);

export default router;

import { Router } from "express";
import { createOrganisation } from "../controllers/organisations.controllers.js";
import { loggedMiddleware } from "../middlewares/logged.middleware.js";
import verifiedByCookie from "../middlewares/verifiedByCookie.js";
import { joinTest } from "../controllers/joinTestController.js";

const router = Router();
router.post("/create", loggedMiddleware, verifiedByCookie, createOrganisation);
router.post("/join/:id", loggedMiddleware, verifiedByCookie, joinTest);

export default router;

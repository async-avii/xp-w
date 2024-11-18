import { Router } from "express";
import { loginUser } from "../controllers/users.controllers.js";
import { signInUser } from "../controllers/users.controllers.js";

const router = Router();

router.route("/signUp").post(signInUser);
router.route("/login").post(loginUser);

export default router;

import { Router } from "express";
import { loginUser } from "../controllers/users.controllers.js";
import { signUpUser } from "../controllers/users.controllers.js";

const router = Router();

router.route("/signUp").post(signUpUser);
router.route("/login").post(loginUser);

export default router;

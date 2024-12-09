import { Router } from "express";
import {
  getUser,
  loginUser,
  verifyUser,
} from "../controllers/users.controllers.js";
import { signUpUser } from "../controllers/users.controllers.js";

const router = Router();

router.route("/signUp").post(signUpUser);
router.route("/login").post(loginUser);
router.route("/:id").get(getUser);
router.route("/:id").patch(verifyUser);

export default router;

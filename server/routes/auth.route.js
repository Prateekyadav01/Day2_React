import { Router } from "express";
import { login, logoutUser, signIn } from "../controller/user.controller.js";

const router = Router();


router.route("/sign").post(signIn)
router.route("/login").post(login)
router.route("/logout").post(logoutUser)


export default router;
import { Router } from "express";
import { signIn } from "../controller/user.controller.js";

const router = Router();


router.route("/sign").post(signIn)


export default router;
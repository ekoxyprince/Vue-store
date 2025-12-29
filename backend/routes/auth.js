import { Router } from "express";
import * as controller from "../controller/auth.js";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/forgot-password", controller.resetPassword);
router.post("/reset-password/:resetToken", controller.resetPasswordAction);

export default router;

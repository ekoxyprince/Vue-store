import { Router } from "express";
import * as controller from "../controller/user.js";

import { isAdmin } from "../middleware/role.js";

const router = Router();
router.get("/profile", controller.getUserProfile);
router.patch("/profile", controller.updateUserProfile);
router.patch("/change-password", controller.changePassword);
router.get("/", isAdmin, controller.getAllUsers);

export default router;

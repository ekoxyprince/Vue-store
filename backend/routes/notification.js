import { Router } from "express";
import * as controller from "../controller/notification.js";
import { isAdmin } from "../middleware/role.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/admin", auth, isAdmin, controller.sendEmailNotificationAdmin);
router.post("/contact", controller.sendEmailNotification);

export default router;

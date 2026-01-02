import { Router } from "express";
import * as controller from "../controller/order.js";

import { isAdmin, isUser } from "../middleware/role.js";

const router = Router();

router.post("/", isUser, controller.createOrder);
router.get("/", isAdmin, controller.getOrders);
router.patch("/:id", isAdmin, controller.updateOrder);

export default router;

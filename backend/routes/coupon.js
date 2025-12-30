import { Router } from "express";
import * as controller from "../controller/coupon.js";

import { isAdmin } from "../middleware/role.js";

const router = Router();

router.get("/", isAdmin, controller.getAllCoupons);
router.post("/", isAdmin, controller.createCoupon);
router.get("/:id", controller.getCouponById);
router.patch("/:id", isAdmin, controller.updateCoupon);
router.delete("/:id", isAdmin, controller.deleteCoupon);

export default router;

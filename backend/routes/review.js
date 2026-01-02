import { Router } from "express";
import * as controller from "../controller/review.js";
import { isAdmin, isUser } from "../middleware/role.js";
import auth from "../middleware/auth.js";

const router = Router();
router.get("/", controller.getAllReviews);
router.post("/", auth, isUser, controller.createReview);
router.patch("/:id", auth, isAdmin, controller.updateReview);
router.delete("/:id", auth, isAdmin, controller.deleteReview);

export default router;

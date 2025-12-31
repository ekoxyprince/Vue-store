import { Router } from "express";
import * as controller from "../controller/review.js";
import { isAdmin, isUser } from "../middleware/role.js";

const router = Router();
router.get("/", isAdmin, controller.getAllReviews);
router.post("/", isUser, controller.createReview);
router.patch("/:id", isAdmin, controller.updateReview);
router.delete("/:id", isAdmin, controller.deleteReview);

export default router;

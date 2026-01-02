import { Router } from "express";
import * as controller from "../controller/analytics.js";

const router = Router();

router.get("/dashboard-stats", controller.dashboardStats);

export default router;

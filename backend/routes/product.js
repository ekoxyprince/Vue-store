import { Router } from "express";
import * as controller from "../controller/product.js";

import { isAdmin } from "../middleware/role.js";
import auth from "../middleware/auth.js";
import fileupload from "../utils/fileupload.js";
const router = Router();
router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.post(
  "/",
  auth,
  isAdmin,
  fileupload.array("image"),
  controller.createProduct
);
router.patch("/:id", auth, isAdmin, controller.updateProduct);
router.delete("/:id", auth, isAdmin, controller.deleteProduct);

export default router;

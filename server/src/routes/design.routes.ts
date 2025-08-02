import express from "express";
import {
  createDesign,
  getAllDesigns,
  getDesign,
} from "../controllers/design.controller";
import { upload } from "../middleware/multer";

const router = express.Router();

router.get("/", getAllDesigns);
router.get("/:id", getDesign);
router.post("/", upload.array("images"), createDesign);

export default router;

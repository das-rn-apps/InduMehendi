import express from "express";
import { getAllFeedbacks, getFeedback,addFeedback } from "../controllers/feedback.controller";

const router = express.Router();

router.get("/:id", getFeedback);
router.get("/", getAllFeedbacks);
router.post("/", addFeedback);

export default router;

import express from "express";
import {
  getAllFeedbacks,
  getFeedbacksByDesignId,
  createFeedback,
  deleteFeedback,
} from "../controllers/feedback.controller";

const router = express.Router();

router.get("/", getAllFeedbacks);
router.get("/:designId", getFeedbacksByDesignId);
router.post("/", createFeedback);
router.delete("/:id", deleteFeedback); // GET all feedback for a specific design

export default router;

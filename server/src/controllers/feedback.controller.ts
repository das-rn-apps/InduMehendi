import { Request, Response } from "express";
import Feedback from "../models/feedback.model";
import mongoose from "mongoose";

// GET all feedbacks
export const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET feedbacks by Design ID
export const getFeedbacksByDesignId = async (req: Request, res: Response) => {
  const { designId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(designId)) {
    return res.status(400).json({ message: "Invalid design ID" });
  }

  try {
    const feedbacks = await Feedback.find({ designId }).sort({ createdAt: -1 });
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks for design:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// POST create a new feedback
export const createFeedback = async (req: Request, res: Response) => {
  const { designId, name, email, message, rating } = req.body;

  if (!designId || !name || !email || !message || rating == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newFeedback = new Feedback({
      designId,
      name,
      email,
      message,
      rating,
      createdAt: new Date(),
    });

    const saved = await newFeedback.save();
    res.status(201).json({ feedback: saved });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE feedback by ID
export const deleteFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid feedback ID" });
  }

  try {
    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

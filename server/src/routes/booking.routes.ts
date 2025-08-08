import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getUserBookings,
} from "../controllers/booking.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", createBooking); // Create
router.get("/", getBookings); // All
router.get("/my", protect, getUserBookings);
router.get("/:id", getBookingById); // Single
router.put("/:id", updateBooking); // Update
router.delete("/:id", deleteBooking); // Delete

export default router;

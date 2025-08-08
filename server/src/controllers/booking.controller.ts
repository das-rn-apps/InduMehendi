import { Request, Response } from "express";
import Booking from "../models/booking.model";

// Create Booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

// Get All Bookings
export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().populate("user").populate("design");
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get Logged-in User's Bookings
export const getUserBookings = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - If you're using TS, add a proper type for req.user
    const userId = req.user.id; // comes from auth middleware

    const bookings = await Booking.find({ user: userId })
      .populate("user")
      .populate("design");

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get Single Booking
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user")
      .populate("design");
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Update Booking
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

// Delete Booking
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

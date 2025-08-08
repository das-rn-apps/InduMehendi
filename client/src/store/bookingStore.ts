// src/store/bookingStore.ts
import { create } from "zustand";
import axios from "axios";
import type { Design, User } from "../types";

export interface Booking {
  _id: string;
  name: string;
  email: string;
  contact?: string;
  location: string;
  design?: Design;
  designId?: string; // in case you only store ID in some scenarios
  personCount: number;
  date: string; // ISO date string (YYYY-MM-DD)
  note?: string;
  createdAt?: string;
  updatedAt?: string;
  user: User;
  phone: string;
  address?: string;
  hand: "left" | "right" | "both";
  personType: "bride" | "groom" | "guest" | "other";
  bookingDate: string;
  bookingTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  loading: boolean;
  error: string | null;

  fetchBookings: () => Promise<void>;
  fetchBookingById: (id: string) => Promise<Booking | null>;
  addBooking: (data: any) => Promise<Booking | null>;
  updateBookingStatus: (
    id: string,
    status: Booking["status"]
  ) => Promise<boolean>;
  clearCurrentBooking: () => void;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,

  // Fetch all bookings for the current logged-in user
  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token"); // get token from localStorage
      const res = await axios.get(`${API_BASE_URL}/booking/my`, {
        headers: {
          Authorization: `Bearer ${token}`, // send token here
        },
      });
      set({ bookings: res.data.bookings || [], loading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch bookings",
        loading: false,
      });
    }
  },

  // Fetch a single booking by ID
  fetchBookingById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_BASE_URL}/booking/${id}`);
      const booking = res.data;
      set({ currentBooking: booking, loading: false });
      return booking;
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch booking",
        loading: false,
      });
      return null;
    }
  },

  // Create a new booking
  addBooking: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_BASE_URL}/booking`, data);
      const newBooking = res.data;
      set({ bookings: [...get().bookings, newBooking], loading: false });
      return newBooking;
    } catch (err: any) {
      set({
        error: err.message || "Failed to create booking",
        loading: false,
      });
      return null;
    }
  },

  // Update booking status (e.g., Confirm, Cancel)
  updateBookingStatus: async (id, status) => {
    try {
      await axios.patch(`${API_BASE_URL}/booking/${id}`, { status });
      set({
        bookings: get().bookings.map((b) =>
          b._id === id ? { ...b, status } : b
        ),
      });
      return true;
    } catch (err: any) {
      set({ error: err.message || "Failed to update booking status" });
      return false;
    }
  },

  // Clear the currently selected booking
  clearCurrentBooking: () => {
    set({ currentBooking: null });
  },
}));

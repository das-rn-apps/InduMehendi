import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
  user: Types.ObjectId; // Reference to User model
  name: string;
  email: string;
  phone: string;
  address?: string;
  design: Types.ObjectId; // Reference to Design model
  hand: "left" | "right" | "both";
  personType: "bride" | "groom" | "guest" | "other";
  bookingDate: Date;
  bookingTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    design: { type: Schema.Types.ObjectId, ref: "Design", required: true },
    hand: { type: String, enum: ["left", "right", "both"], required: true },
    personType: {
      type: String,
      enum: ["bride", "groom", "guest", "other"],
      required: true,
    },
    bookingDate: { type: Date, required: true },
    bookingTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;

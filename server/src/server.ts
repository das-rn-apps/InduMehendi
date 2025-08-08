import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import design from "./routes/design.routes";
import auth from "./routes/auth.routes";
import user from "./routes/user.routes";
import feedback from "./routes/feedback.routes";
import booking from "./routes/booking.routes";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/user", user);
app.use("/design", design);
app.use("/feedback", feedback);
app.use("/booking", booking);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

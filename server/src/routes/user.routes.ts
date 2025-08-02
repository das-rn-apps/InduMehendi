import express from "express";
import { getAllUsers, getUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAllUsers);

export default router;

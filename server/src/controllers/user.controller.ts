import { Request, Response } from "express";
import { User } from "../models/user.model";
import generateToken from "../utils/generateToken";
import { ObjectId } from "mongoose";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id as ObjectId),
    isAdmin: user.isAdmin,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id as ObjectId),
    isAdmin: user.isAdmin,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(403).json({ message: "User not found" });
  }
  res.json(user);
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(404).json({ message: "No users found" });
      return;
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

const generateToken = (id: string): string => {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await Employee.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      res
        .status(400)
        .json({
          message: "Employee already registered, do you want them to login?",
        });
    }

    const user = await Employee.create({ name, email, password });
    const token = generateToken(user._id.toString());
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error registering employee" });
  }
};

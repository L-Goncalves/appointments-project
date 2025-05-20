import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Employee from '../models/Employee';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Employee.findOne({ email });
  if (!user){
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
    res.status(401).json({ error: 'Invalid credentials' });

  } 
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

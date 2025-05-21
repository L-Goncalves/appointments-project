import { Schema, model, Document, Types } from 'mongoose';

export interface IEmployee extends Document {
  _id: Types.ObjectId,
  name: string;
  email: string;
  password: string;
}

const EmployeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

export default model<IEmployee>('Employee', EmployeeSchema);

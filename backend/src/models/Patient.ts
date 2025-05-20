import mongoose, { Document, Schema } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  personalDocumentId: string;
  birthDate: Date;
  address: string;
}

const PatientSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  personalDocumentId: {
    type: String,
    required: true,
    unique: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IPatient>('Patient', PatientSchema);
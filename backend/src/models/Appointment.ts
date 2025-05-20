import { Schema, model, Document, Types } from 'mongoose';

export interface IAppointment extends Document {
  patient: Types.ObjectId;
  date: Date;
  doctor: string;
  diagnosis: string;
  prescriptions: string;
  notes: string;
}

const AppointmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: false,
  },
  prescriptions: [{
    type: String,
  }],
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

export default model<IAppointment>('Appointment', AppointmentSchema);

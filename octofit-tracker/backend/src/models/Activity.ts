import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['run', 'walk', 'swim', 'bike', 'gym'], required: true },
    distance: { type: Number },
    duration: { type: Number },
    calories: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Activity', activitySchema);

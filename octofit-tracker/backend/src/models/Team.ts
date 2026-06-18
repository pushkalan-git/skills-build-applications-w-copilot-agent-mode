import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Team', teamSchema);

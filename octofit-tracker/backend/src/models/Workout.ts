import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['strength', 'cardio', 'flexibility', 'balance'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
    duration: { type: Number },
    exercises: [{ type: String }],
    points: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export default mongoose.model('Workout', workoutSchema);

import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json({ workouts, count: workouts.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({ message: 'Workout created', workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

export default router;

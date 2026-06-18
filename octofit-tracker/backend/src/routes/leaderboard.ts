import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user', '-password')
      .populate('team')
      .sort({ points: -1 });
    res.json({ leaderboard, count: leaderboard.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

router.post('/', async (req, res) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    await entry.populate('user', '-password');
    await entry.populate('team');
    res.status(201).json({ message: 'Leaderboard entry created', entry });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

export default router;

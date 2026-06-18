import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('user', '-password');
    res.json({ activities, count: activities.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    await activity.populate('user', '-password');
    res.status(201).json({ message: 'Activity logged', activity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to log activity' });
  }
});

export default router;

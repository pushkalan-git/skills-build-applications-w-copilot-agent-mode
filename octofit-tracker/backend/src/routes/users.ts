import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users, count: users.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

export default router;

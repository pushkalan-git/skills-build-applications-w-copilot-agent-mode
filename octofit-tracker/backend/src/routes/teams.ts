import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('members', '-password').populate('leader', '-password');
    res.json({ teams, count: teams.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

router.post('/', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json({ message: 'Team created', team });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

export default router;

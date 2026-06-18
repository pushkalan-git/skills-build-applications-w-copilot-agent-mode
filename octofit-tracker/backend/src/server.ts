import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit';

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (req, res) => {
  res.send({ status: 'OctoFit Tracker API', version: '0.1.0', apiHost: API_HOST });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Backend server running on ${API_HOST}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

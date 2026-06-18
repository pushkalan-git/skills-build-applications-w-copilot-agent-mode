import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const users = await User.create([
      {
        username: 'alice_runner',
        email: 'alice@octofit.com',
        password: 'hashed_password_1',
        firstName: 'Alice',
        lastName: 'Johnson',
        bio: 'Marathon enthusiast',
      },
      {
        username: 'bob_swimmer',
        email: 'bob@octofit.com',
        password: 'hashed_password_2',
        firstName: 'Bob',
        lastName: 'Smith',
        bio: 'Competitive swimmer',
      },
      {
        username: 'carol_cyclist',
        email: 'carol@octofit.com',
        password: 'hashed_password_3',
        firstName: 'Carol',
        lastName: 'Williams',
        bio: 'Road bike lover',
      },
      {
        username: 'dave_lifter',
        email: 'dave@octofit.com',
        password: 'hashed_password_4',
        firstName: 'Dave',
        lastName: 'Brown',
        bio: 'Strength training focused',
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create sample teams
    const teams = await Team.create([
      {
        name: 'Thunder Runners',
        description: 'Fast-paced running group',
        members: [users[0]._id, users[1]._id],
        leader: users[0]._id,
        totalPoints: 500,
      },
      {
        name: 'Ocean Swimmers',
        description: 'Competitive swimming team',
        members: [users[1]._id, users[2]._id],
        leader: users[1]._id,
        totalPoints: 450,
      },
      {
        name: 'Fit Collective',
        description: 'All-around fitness enthusiasts',
        members: [users[2]._id, users[3]._id, users[0]._id],
        leader: users[3]._id,
        totalPoints: 600,
      },
    ]);
    console.log(`Created ${teams.length} teams`);

    // Create sample activities
    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'run',
        distance: 10.5,
        duration: 60,
        calories: 850,
        notes: 'Morning jog in the park',
      },
      {
        user: users[0]._id,
        type: 'run',
        distance: 5.2,
        duration: 35,
        calories: 450,
        notes: 'Quick evening run',
      },
      {
        user: users[1]._id,
        type: 'swim',
        distance: 2,
        duration: 45,
        calories: 550,
        notes: 'Lap swimming session',
      },
      {
        user: users[2]._id,
        type: 'bike',
        distance: 25,
        duration: 90,
        calories: 900,
        notes: 'Long-distance cycling',
      },
      {
        user: users[3]._id,
        type: 'gym',
        distance: 0,
        duration: 60,
        calories: 600,
        notes: 'Weight lifting and cardio',
      },
    ]);
    console.log(`Created ${activities.length} activities`);

    // Create sample leaderboard entries
    const leaderboard = await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 250, rank: 1 },
      { user: users[1]._id, team: teams[1]._id, points: 220, rank: 2 },
      { user: users[2]._id, team: teams[2]._id, points: 210, rank: 3 },
      { user: users[3]._id, team: teams[2]._id, points: 200, rank: 4 },
    ]);
    console.log(`Created ${leaderboard.length} leaderboard entries`);

    // Create sample workouts
    const workouts = await Workout.create([
      {
        title: 'Morning Cardio Blast',
        description: 'High-intensity cardio workout',
        type: 'cardio',
        difficulty: 'intermediate',
        duration: 30,
        exercises: ['Running', 'Jumping jacks', 'Burpees'],
        points: 20,
      },
      {
        title: 'Strength Builder',
        description: 'Full-body strength training',
        type: 'strength',
        difficulty: 'advanced',
        duration: 60,
        exercises: ['Squats', 'Deadlifts', 'Bench press', 'Pull-ups'],
        points: 30,
      },
      {
        title: 'Yoga Flow',
        description: 'Relaxing flexibility workout',
        type: 'flexibility',
        difficulty: 'beginner',
        duration: 45,
        exercises: ['Sun salutation', 'Downward dog', 'Child pose', 'Corpse pose'],
        points: 15,
      },
      {
        title: 'Balance & Core',
        description: 'Core strengthening and balance training',
        type: 'balance',
        difficulty: 'intermediate',
        duration: 40,
        exercises: ['Plank', 'Single-leg stand', 'Balance board work'],
        points: 18,
      },
    ]);
    console.log(`Created ${workouts.length} workouts`);

    console.log('\n✅ Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();

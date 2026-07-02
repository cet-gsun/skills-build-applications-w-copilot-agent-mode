import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        const users = [
            { name: 'Ava Matthews', email: 'ava.matthews@example.com', role: 'member' },
            { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'coach' },
            { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'member' },
        ];
        const teams = [
            { name: 'OctoFit Squad', description: 'Competitive fitness team', memberIds: [] },
            { name: 'Morning Movers', description: 'Early bird workout group', memberIds: [] },
        ];
        const workouts = [
            {
                name: 'Full Body Strength',
                description: 'A compound workout focusing on strength and mobility.',
                durationMinutes: 45,
                intensity: 'high',
                exercises: ['Squats', 'Push-ups', 'Deadlifts', 'Plank'],
            },
            {
                name: 'Cardio Blast',
                description: 'High-energy cardio circuit to boost endurance.',
                durationMinutes: 30,
                intensity: 'medium',
                exercises: ['Burpees', 'Mountain Climbers', 'Jump Rope', 'Sprint Intervals'],
            },
        ];
        const leaderboard = [
            { userId: 'Ava Matthews', score: 1280, rank: 1 },
            { userId: 'Mia Chen', score: 1120, rank: 2 },
            { userId: 'Noah Patel', score: 980, rank: 3 },
        ];
        const activities = [
            {
                userId: 'Ava Matthews',
                type: 'Cycling',
                durationMinutes: 45,
                caloriesBurned: 520,
                notes: 'Morning endurance ride',
                workoutId: '',
                performedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
            },
            {
                userId: 'Mia Chen',
                type: 'Strength Training',
                durationMinutes: 55,
                caloriesBurned: 610,
                notes: 'Upper body focus',
                workoutId: '',
                performedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
            },
        ];
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Workout.deleteMany({}),
            Leaderboard.deleteMany({}),
            Activity.deleteMany({}),
        ]);
        const createdUsers = await User.create(users);
        const createdTeams = await Team.create([
            { ...teams[0], memberIds: [createdUsers[0]._id.toString(), createdUsers[2]._id.toString()] },
            { ...teams[1], memberIds: [createdUsers[1]._id.toString()] },
        ]);
        const createdWorkouts = await Workout.create(workouts);
        await Leaderboard.create(leaderboard);
        const createdActivities = await Activity.create([
            { ...activities[0], workoutId: createdWorkouts[1]._id.toString() },
            { ...activities[1], workoutId: createdWorkouts[0]._id.toString() },
        ]);
        console.log('Seeded users:', createdUsers.length);
        console.log('Seeded teams:', createdTeams.length);
        console.log('Seeded workouts:', createdWorkouts.length);
        console.log('Seeded leaderboard entries:', leaderboard.length);
        console.log('Seeded activities:', createdActivities.length);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();

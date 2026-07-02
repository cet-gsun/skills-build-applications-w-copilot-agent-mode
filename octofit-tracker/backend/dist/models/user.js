import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['member', 'coach', 'admin'], default: 'member' },
    teamId: { type: String, required: false },
}, {
    timestamps: true,
});
const User = mongoose.model('User', userSchema);
export default User;

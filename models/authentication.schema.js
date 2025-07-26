import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user',
    },
    studies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Study',
        },
    ],
}, { timestamps: true });



const user = mongoose.model('User', userSchema);

export default user;
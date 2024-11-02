import { Schema, model, models } from "mongoose";

const ParticipantsSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: Number,
        trim: true,
        unique: true,
        sparse: true,
    }
})

const EventsSchema = new Schema({
    EventName: {
        type: String,
        trim: true,
    },
    participants: [ParticipantsSchema]
})

// Main User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    collegeName: {
        type: String,
        trim: true,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        max: 50,
    },
    phone: {
        type: Number,
        trim: true,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        min: 8,
    },
    picture: {
        type: String,
        default: '',
    },
    isVerified: {
        type: Date,
        default: null,
    },
    events: [EventsSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const UserModel = models?.User || model("User", UserSchema)

export default UserModel
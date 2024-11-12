import { Schema, model, models } from "mongoose";

const ParticipantsSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
    },
    events: [{
        eventName: {
            type: String,
            trim: true,
        },
        eventType: {
            type: String,
            trim: true
        }
    }]
})

const EventsSchema = new Schema({
    eventName: {
        type: String,
        trim: true,
    },
    eventType: {
        type: String,
        trim: true
    },
    participants: [{
        name: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
            unique: true,
            sparse: true,
        },
    }]
})

const PaymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        default: 'PENDING',
    },
    recieptUrl: {
        type: String,
        required: true,
    },
    uploadAt: {
        type: Date,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    }
});

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
    department: {
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
    accomodationRequired: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Date,
        default: null,
    },
    participants: [ParticipantsSchema],
    events: [EventsSchema],
    payment: [PaymentSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const UserModel = models?.User || model("User", UserSchema)

export default UserModel
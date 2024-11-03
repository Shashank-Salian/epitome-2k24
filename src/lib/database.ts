"use server"
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!
let cached = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
        console.log("MongoDB Connected")
    } catch (err) {
        cached.promise = null
        console.log(err)
        throw err
    }

    return cached.conn
}
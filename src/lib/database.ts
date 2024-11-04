"use server"
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!
let cached = global as typeof globalThis & {
    mongoose: any
}

if (!cached.mongoose) {
    cached.mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {
    if (cached.mongoose.conn) {
        return cached.mongoose.conn
    }

    // if (!cached.mongoose.promise) {
    //     const opts = {
    //         bufferCommands: false,
    //     }

    //     cached.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    //         return mongoose
    //     })
    // }

    try {
        // cached.mongoose.conn = await cached.mongoose.promise
        const conn = await mongoose.connect(MONGODB_URI)
        cached.mongoose.conn = conn

        console.log("MongoDB Connected")
        return conn
    } catch (err) {
        cached.mongoose.promise = null
        console.log(err)
        throw err
    }

    // return cached.mongoose.conn
}
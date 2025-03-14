import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI) {
    throw new Error("No MongoDB URI defined for db connection");
}

let cached = (global as any).mongoose || {conn: null, promise: null};

export async function connectToDB () {
    if (cached.conn) return cached.conn;

    if (!cached.promise){
        cached.promise = mongoose
            .connect(MONGODB_URI, {dbName: "next_auth"})
            .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
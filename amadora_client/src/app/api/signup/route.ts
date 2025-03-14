import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { username } = await req.json();
        if (!username) return NextResponse.json({ error: "Username is required"}, {status: 400});

        await connectToDB();

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return NextResponse.json({ exists: true, message: "Username already taken"}, {status: 409});
        } else {
            const newUser = new User({ username });
            await newUser.save();
            return NextResponse.json({ exists: false, message: "User registered successfully"}, {status: 201});
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error"}, {status: 500});
    }
}
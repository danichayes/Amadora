import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const {username} = await req.json();
        if (!username) return NextResponse.json({ error: "Username required"}, {status: 400});

        await connectToDB();

        const existingUser = await User.findOne({ username });

        if(!existingUser) {
            return NextResponse.json({message: "User not found. Please sign up"}, {status: 404});
        }
        return NextResponse.json({message: "Login successful!", user: existingUser}, {status: 200});

    } catch(error){
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}
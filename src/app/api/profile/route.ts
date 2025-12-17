import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { name, currentPassword, newPassword } = await req.json();

        await connectDB();

        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Update name if provided
        if (name && name !== user.name) {
            user.name = name;
        }

        // Update password if provided
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch) {
                return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 });
            }

            user.password = await bcrypt.hash(newPassword, 10);
        }

        await user.save();

        return NextResponse.json({ message: "Profile updated successfully", user: { name: user.name, email: user.email } });
    } catch (error) {
        return NextResponse.json({ message: "Error updating profile", error }, { status: 500 });
    }
}

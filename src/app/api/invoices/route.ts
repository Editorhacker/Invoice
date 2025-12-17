import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import Invoice from "@/models/Invoice";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const invoices = await Invoice.find({ userId: session.user.id }).sort({ date: -1 });

    return NextResponse.json(invoices);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await connectDB();

    const newInvoice = await Invoice.create({
        ...body,
        userId: session.user.id,
    });

    return NextResponse.json(newInvoice, { status: 201 });
}

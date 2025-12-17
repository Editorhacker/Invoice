import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import Invoice from "@/models/Invoice";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const invoice = await Invoice.findOne({ _id: id, userId: session.user.id });

    if (!invoice) {
        return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice);
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updatedInvoice = await Invoice.findOneAndUpdate(
        { _id: id, userId: session.user.id },
        body,
        { new: true }
    );

    if (!updatedInvoice) {
        return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(updatedInvoice);
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const deletedInvoice = await Invoice.findOneAndDelete({ _id: id, userId: session.user.id });

    if (!deletedInvoice) {
        return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Invoice deleted" });
}

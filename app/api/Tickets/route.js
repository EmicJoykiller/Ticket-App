import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const ticketData = body;

        const newTicket = await Ticket.create(ticketData);

        return NextResponse.json({ message: "Ticket Created", ticket: newTicket }, { status: 201 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
    }
}


export async function GET() {
    try {
        const tickets = await Ticket.find();
        return NextResponse.json({ tickets }, { status: 200 });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
    }
}

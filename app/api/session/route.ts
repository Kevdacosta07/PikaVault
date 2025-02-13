import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();

    if (!session || !session.user?.email) {
        return NextResponse.json({ session: null, user: null });
    }

    const user = await prisma.user.findFirst({
        where: { email: session.user.email },
    });

    return NextResponse.json({ session, user });
}

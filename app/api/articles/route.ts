import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET()
{
    const articles = await prisma.article.findMany();
    return NextResponse.json(articles);
}
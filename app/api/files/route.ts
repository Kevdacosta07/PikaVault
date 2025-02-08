import {NextRequest, NextResponse} from "next/server";
import {pinata} from "@/lib/pinata";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        const uploadData = await pinata.upload.file(file);
        const url = await pinata.gateways.createSignedURL({
            cid: uploadData.cid,
            expires: 30 /* J */ * 24 * 60 * 60 // 1 mois ensuite expiration
        })
        return NextResponse.json(url, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status : 500 }
        );
    }
}
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { getCurrentUser } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    console.log("ID", id)

    const rateLimitData = await checkRateLimit();

    if (!rateLimitData.success) {
        return NextResponse.json(
            {
                message: "Too many requests",
            },
            {
                status: 429,
                headers: {
                    "X-RateLimit-Limit": rateLimitData.limit.toString(),
                    "X-RateLimit-Remaining": rateLimitData.remaining.toString(),
                    "X-RateLimit-Reset": rateLimitData.reset.toString(),
                },
            }
        );
    }

    try {
        const user = await getCurrentUser();

        const link = await prisma.link.findFirst({
            where: {
                id,
                userId: user?.userId,
            },
        });

        if (!link) {
            return NextResponse.json(
                { message: "Link not found" },
                { status: 404 }
            );
        }

        await prisma.link.delete({
            where: {
                id: link.id,
            },
        });

        return NextResponse.json(
            { message: "Link deleted successfully" },
            { status: 200 }
        );
    }
    catch (error) {
        console.log("Error", error);
        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}
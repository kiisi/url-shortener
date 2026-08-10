import { checkRateLimit } from "@/lib/rate-limit";
import { getCurrentUser } from "@/lib/user";
import { NextResponse } from "next/server";

export async function GET() {

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

        return NextResponse.json({
            success: true,
            message: "Success!",
        }, {
            status: 201,
        });
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
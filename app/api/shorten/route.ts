import { createShortLink } from "@/lib/create-short-link";
import { checkRateLimit } from "@/lib/rate-limit";
import { CreateLinkSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    // const { success, limit, remaining, reset } = await checkRateLimit();
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

    const body = await request.json();

    const result = CreateLinkSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            {
                error: "Invalid URL",
            },
            {
                status: 400,
            }
        );
    }

    const link = await createShortLink(result.data.url);

    return Response.json({
        success: true,
        message: "Done! Your long URL just got a whole lot shorter. 🎉 ",
        data: {
            shortCode: link.shortCode,
            originalUrl: link.originalUrl,
            shortUrl: `${process.env.BASE_URL}/${link.shortCode}`
        }
    }, {
        status: 201,
    });
}
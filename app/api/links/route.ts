import { createShortLink, createShortLinkWithAlias } from "@/lib/create-short-link";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { getCurrentUser } from "@/lib/user";
import { CreateLinkSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

// POST
export async function POST(request: Request) {

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

    const user = await getCurrentUser();

    console.log("User", user);

    if (!user) {
        return NextResponse.json(
            {
                error: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const body = await request.json();

    const result = CreateLinkSchema.safeParse(body);

    const firstIssue = result?.error?.issues[0];

    const field = String(firstIssue?.path?.[0]);
    const message = `${field}: ${firstIssue?.message}`;

    if (!result.success) {
        return NextResponse.json(
            {
                error: message,
            },
            {
                status: 400,
            }
        );
    }

    // TODO: check if url exists to avoid creating shortcodes for the same url
    let link = await prisma.link.findFirst({
        where: {
            originalUrl: result.data.url,
            userId: user.userId,
        },
    });

    if (link) {
        return Response.json({
            success: true,
            message: "Your link has been shortened successfully.🎉",
            data: {
                shortCode: link.shortCode,
                originalUrl: link.originalUrl,
                shortUrl: `${process.env.BASE_URL}/${link.shortCode}`,
            }
        }, {
            status: 201,
        });
    }

    //  Add Alias implementation
    if (result.data.alias) {
        link = await createShortLinkWithAlias(result.data.url, result.data.alias, user.userId,);
    } else {
        link = await createShortLink(result.data.url, user.userId,);
    }

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

// GET
export async function GET() {

    try {
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

        const user = await getCurrentUser();

        console.log("User", user);

        if (!user) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        console.log("User", user)

        const links = await prisma.link.findMany({
            where: {
                userId: user.userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            message: "All links fetched successfully!",
            data: links,
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
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { getCurrentUser } from "@/lib/user";
import { NextResponse } from "next/server";
import { success } from "zod";


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

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const userId = user.userId;

        const [
            clicksResult,
            totalLinks,
            activeLinks,
            _clicksOverTime,
            topPerformingLinks,
            recentActivity
        ] = await Promise.all([
            prisma.link.aggregate({
                where: {
                    userId,
                },
                _sum: {
                    clickCount: true,
                },
            }),

            prisma.link.count({
                where: {
                    userId,
                },
            }),

            prisma.link.count({
                where: {
                    userId,
                    status: "ACTIVE",
                },
            }),

            // Clicks over time
            prisma.$queryRaw<
                { date: Date; clicks: bigint }[]
            >`
        SELECT
          DATE_TRUNC('day', lc."clickedAt") AS date,
          COUNT(*) AS clicks
        FROM "LinkClick" lc
        INNER JOIN "Link" l
          ON l.id = lc."linkId"
        WHERE l."userId" = ${userId}
          AND lc."clickedAt" >= NOW() - INTERVAL '30 days'
        GROUP BY DATE_TRUNC('day', lc."clickedAt")
        ORDER BY date ASC;
      `,

            // Top 4 links
            prisma.link.findMany({
                where: {
                    userId,
                },
                orderBy: {
                    clickCount: "desc",
                },
                take: 4,
                select: {
                    id: true,
                    shortCode: true,
                    originalUrl: true,
                    clickCount: true,
                    status: true,
                },
            }),

            prisma.link.findMany({
                where: {
                    userId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 3,
                select: {
                    id: true,
                    shortCode: true,
                    originalUrl: true,
                    createdAt: true,
                    status: true,
                    clickCount: true,
                },
            })
        ]);

        const totalClicks = Number(clicksResult._sum.clickCount ?? 0);

        const avgClicksPerActiveLink =
            activeLinks > 0
                ? Number((totalClicks / activeLinks).toFixed(2))
                : 0;

        const clicksOverTime = _clicksOverTime.map((item) => ({
            date: item.date,
            clicks: Number(item.clicks),
        }));

        return NextResponse.json(
            {
                message: "Dashboard data successfully fetched",
                data: {
                    overview: {
                        totalClicks,
                        totalLinks,
                        activeLinks,
                        avgClicksPerActiveLink,
                    },
                    clicksOverTime,
                    topPerformingLinks,
                    recentActivity,
                },
                success: true,
            },
            { status: 200 }
        );
    }
    catch (error) {
        console.log("Error:", error);
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
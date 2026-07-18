import { inngest } from "@/inngest/client";
import { EVENTS } from "@/inngest/event";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {

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

  const { code } = await params;

  const link = await prisma.link.findUnique({
    where: {
      shortCode: code,
    },
  });

  if (!link) {
    return new Response("Link not found", {
      status: 404,
    });
  }

  const h = await headers();

  const referer = h.get("referer");

  const forwarded = h.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";

  const userAgent = h.get("user-agent") ?? "";

  const parser = new UAParser(userAgent);
  const ua = parser.getResult();

  const browser = ua.browser;
  const os = ua.os;

  await inngest.send({
    name: EVENTS.CLICK_TRACKED,
    data: {
      shortCode: link.shortCode,
      linkId: link.id,
      ip,
      referer,
      browser: browser.name,
      os: os.name,
      clickedAt: new Date().toISOString(),
    },
  });

  return Response.redirect(link.originalUrl, 302);
}
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
import { headers } from "next/headers";

export const ratelimit = new Ratelimit({
  redis,

  limiter: Ratelimit.tokenBucket(
    20,
    "60 s",
    20
  ),

  analytics: true,

  prefix: "miniurl",
});


export async function checkRateLimit() {
  const h = await headers();

  const forwarded = h.get("x-forwarded-for");

  const ip =
    forwarded?.split(",")[0]?.trim() ??
    "unknown";

  return ratelimit.limit(ip);
}
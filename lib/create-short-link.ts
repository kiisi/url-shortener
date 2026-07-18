import { prisma } from "@/lib/prisma";
import { generateShortCode } from "@/lib/nanoid";
import { Prisma } from "@/app/generated/prisma/client";

export async function createShortLink(originalUrl: string) {
  const MAX_RETRIES = 5;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await prisma.link.create({
        data: {
          originalUrl,
          shortCode: generateShortCode(),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        continue;
      }

      throw error;
    }
  }

  throw new Error("Failed to generate a unique short code.");
}
import { prisma } from "@/lib/prisma";
import { inngest } from "./client";
import { EVENTS } from "./event";

export const trackClick = inngest.createFunction(
  {
    id: "track-click",
    triggers: { event: EVENTS.CLICK_TRACKED }
  },
  async ({ event, step }) => {
     const {
      linkId,
      clickedAt,
      browser,
      os,
      referer,
      ip,
    } = event.data;

    await step.run("create-click-event", async () => {
      return prisma.linkClick.create({
        data: {
          linkId,
          clickedAt: new Date(clickedAt),
          browser,
          os,
          referer,
          ip,
        },
      });
    });

    await step.run("increment-click-count", async () => {
      return prisma.link.update({
        where: {
          id: linkId,
        },
        data: {
          clickCount: {
            increment: 1,
          },
        },
      });
    });
  }
);

export const functions = [
  trackClick,
];
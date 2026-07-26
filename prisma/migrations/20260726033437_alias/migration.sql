/*
  Warnings:

  - You are about to drop the column `ipHash` on the `LinkClick` table. All the data in the column will be lost.
  - You are about to drop the column `referrer` on the `LinkClick` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[alias]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "alias" TEXT;

-- AlterTable
ALTER TABLE "LinkClick" DROP COLUMN "ipHash",
DROP COLUMN "referrer",
ADD COLUMN     "ip" TEXT,
ADD COLUMN     "referer" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Link_alias_key" ON "Link"("alias");

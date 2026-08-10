/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LinkStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'DISABLED');

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "status" "LinkStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
DROP COLUMN "username";

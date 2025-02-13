/*
  Warnings:

  - You are about to drop the column `stripeSessionId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Order` table. All the data in the column will be lost.
  - Added the required column `email` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_stripeSessionId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "stripeSessionId",
DROP COLUMN "userEmail",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

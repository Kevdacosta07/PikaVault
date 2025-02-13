/*
  Warnings:

  - You are about to drop the `Commands` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Commands";

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "items" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "Order"("stripeSessionId");

/*
  Warnings:

  - You are about to drop the column `priceprovider` on the `Offers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offers" DROP COLUMN "priceprovider",
ADD COLUMN     "tracknumber" TEXT;

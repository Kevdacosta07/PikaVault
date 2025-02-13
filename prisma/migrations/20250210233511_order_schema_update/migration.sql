/*
  Warnings:

  - Added the required column `adress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cp` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinataire` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "cp" TEXT NOT NULL,
ADD COLUMN     "destinataire" TEXT NOT NULL;

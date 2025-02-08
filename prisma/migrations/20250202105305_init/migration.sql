/*
  Warnings:

  - You are about to drop the column `firstname` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `profile` table. All the data in the column will be lost.
  - Added the required column `name` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profil" DROP COLUMN "firstname",
DROP COLUMN "lastname",
ADD COLUMN     "name" TEXT NOT NULL;

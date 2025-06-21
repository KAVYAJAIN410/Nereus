/*
  Warnings:

  - You are about to drop the column `serialNumber` on the `User` table. All the data in the column will be lost.
  - Added the required column `userSessionNo` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSessionNo` to the `Temp` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_serialNumber_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "userSessionNo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Temp" ADD COLUMN     "userSessionNo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "serialNumber";

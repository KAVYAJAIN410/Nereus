/*
  Warnings:

  - The `invoiceNumber` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `invoiceNumber` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueId` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `participantLimit` on the `TimeSlot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `paymentId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `paymentStatus` on the `Temp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `count` to the `TimeSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'REFUND';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "orderId" TEXT NOT NULL,
ALTER COLUMN "paymentId" SET NOT NULL,
ALTER COLUMN "paymentStatus" DROP NOT NULL,
DROP COLUMN "invoiceNumber",
ADD COLUMN     "invoiceNumber" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Temp" DROP COLUMN "invoiceNumber",
DROP COLUMN "paymentId",
DROP COLUMN "uniqueId",
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "participantLimit",
ADD COLUMN     "count" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_uniqueId_key" ON "User"("uniqueId");

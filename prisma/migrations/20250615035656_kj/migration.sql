/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `ageConfirmation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `consentAgreement` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `slotId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Slot` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `address` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uniqueId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_locationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_slotId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "createdAt",
ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ageConfirmation",
DROP COLUMN "consentAgreement",
DROP COLUMN "invoiceNumber",
DROP COLUMN "paymentId",
DROP COLUMN "paymentStatus",
DROP COLUMN "slotId",
ALTER COLUMN "uniqueId" SET NOT NULL;

-- DropTable
DROP TABLE "Slot";

-- CreateTable
CREATE TABLE "Temp" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "medicalHistory" TEXT,
    "whyMove" TEXT NOT NULL,
    "fitnessGoal" TEXT NOT NULL,
    "consentAgreement" BOOLEAN NOT NULL DEFAULT true,
    "ageConfirmation" BOOLEAN NOT NULL,
    "paymentId" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "invoiceNumber" TEXT,
    "uniqueId" TEXT,
    "timeSlotId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Temp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlotDate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "SlotDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "participantLimit" INTEGER NOT NULL,
    "slotDateId" TEXT NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "consentAgreement" BOOLEAN NOT NULL DEFAULT true,
    "ageConfirmation" BOOLEAN NOT NULL,
    "paymentId" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "invoiceNumber" TEXT,
    "timeSlotId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Temp" ADD CONSTRAINT "Temp_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlotDate" ADD CONSTRAINT "SlotDate_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_slotDateId_fkey" FOREIGN KEY ("slotDateId") REFERENCES "SlotDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

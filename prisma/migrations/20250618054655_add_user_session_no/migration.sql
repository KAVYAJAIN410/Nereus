/*
  Warnings:

  - You are about to drop the column `userId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `userSessionNo` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `userSessionNo` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientSessionNo` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SessionNo` to the `Temp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "userId",
DROP COLUMN "userSessionNo",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "clientSessionNo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Temp" DROP COLUMN "userSessionNo",
ADD COLUMN     "SessionNo" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "medicalHistory" TEXT,
    "whyMove" TEXT NOT NULL,
    "fitnessGoal" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_uniqueId_key" ON "Client"("uniqueId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "serialNumber" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_serialNumber_key" ON "User"("serialNumber");

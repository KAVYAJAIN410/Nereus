-- CreateEnum
CREATE TYPE "EvalSection" AS ENUM ('mobility', 'strength', 'endurance');

-- CreateEnum
CREATE TYPE "TrainingCategory" AS ENUM ('expand', 'improve', 'injury');

-- DropIndex
DROP INDEX "Client_email_key";

-- DropIndex
DROP INDEX "Client_uniqueId_key";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "adminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "UniqueId" TEXT,
    "gender" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "sleepLevels" DOUBLE PRECISION NOT NULL,
    "activityLevel" TEXT NOT NULL,
    "calorieIntake" INTEGER NOT NULL,
    "mood" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "testerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "testId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestRating" (
    "id" TEXT NOT NULL,
    "overall" INTEGER NOT NULL,
    "mobility" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "endurance" INTEGER NOT NULL,
    "feedback" TEXT,
    "customerFeedback" TEXT,
    "testId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseAssetFile" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "s3PathRaw" TEXT NOT NULL,
    "s3PathProcessed" TEXT,
    "analysisResults" JSONB,
    "status" TEXT NOT NULL DEFAULT 'uploaded',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseAssetFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionEvaluation" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "section" "EvalSection" NOT NULL,
    "dropdowns" JSONB NOT NULL,
    "comments" JSONB NOT NULL,
    "textLabels" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPurpose" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "category" "TrainingCategory" NOT NULL,
    "slot" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingPurpose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovementSignature" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "mobilityRating" INTEGER NOT NULL DEFAULT 5,
    "enduranceRating" INTEGER NOT NULL DEFAULT 5,
    "strengthRating" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovementSignature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TestRating_testId_key" ON "TestRating"("testId");

-- CreateIndex
CREATE INDEX "ExerciseAssetFile_exerciseId_idx" ON "ExerciseAssetFile"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "SectionEvaluation_customerId_section_key" ON "SectionEvaluation"("customerId", "section");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingPurpose_customerId_category_slot_key" ON "TrainingPurpose"("customerId", "category", "slot");

-- CreateIndex
CREATE UNIQUE INDEX "MovementSignature_customerId_key" ON "MovementSignature"("customerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_testerId_fkey" FOREIGN KEY ("testerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestRating" ADD CONSTRAINT "TestRating_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseAssetFile" ADD CONSTRAINT "ExerciseAssetFile_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionEvaluation" ADD CONSTRAINT "SectionEvaluation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPurpose" ADD CONSTRAINT "TrainingPurpose_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovementSignature" ADD CONSTRAINT "MovementSignature_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

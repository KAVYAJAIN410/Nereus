-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_testerId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_testId_fkey";

-- DropForeignKey
ALTER TABLE "TestRating" DROP CONSTRAINT "TestRating_testId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseAssetFile" DROP CONSTRAINT "ExerciseAssetFile_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "SectionEvaluation" DROP CONSTRAINT "SectionEvaluation_customerId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPurpose" DROP CONSTRAINT "TrainingPurpose_customerId_fkey";

-- DropForeignKey
ALTER TABLE "MovementSignature" DROP CONSTRAINT "MovementSignature_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Temp" DROP CONSTRAINT "Temp_timeSlotId_fkey";

-- DropForeignKey
ALTER TABLE "SlotDate" DROP CONSTRAINT "SlotDate_locationId_fkey";

-- DropForeignKey
ALTER TABLE "TimeSlot" DROP CONSTRAINT "TimeSlot_slotDateId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_timeSlotId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "TestRating";

-- DropTable
DROP TABLE "ExerciseAssetFile";

-- DropTable
DROP TABLE "SectionEvaluation";

-- DropTable
DROP TABLE "TrainingPurpose";

-- DropTable
DROP TABLE "MovementSignature";

-- DropTable
DROP TABLE "Temp";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "SlotDate";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "TimeSlot";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Config";

-- DropEnum
DROP TYPE "EvalSection";

-- DropEnum
DROP TYPE "TrainingCategory";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "PaymentStatus";


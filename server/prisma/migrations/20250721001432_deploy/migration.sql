-- CreateEnum
CREATE TYPE "TeachingStage" AS ENUM ('EDUCACAO_INFANTIL', 'ENSINO_FUNDAMENTAL_I', 'ENSINO_FUNDAMENTAL_II', 'ENSINO_MEDIO');

-- CreateEnum
CREATE TYPE "ChallengeCategory" AS ENUM ('EDUCACAO', 'MEIO_AMBIENTE', 'SAUDE', 'CULTURA', 'ESPORTE', 'TECNOLOGIA', 'CIDADANIA', 'INCLUSAO', 'OUTRO');

-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Ong" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contact_phone" TEXT,
    "instagram_link" TEXT,
    "facebook_link" TEXT,
    "site" TEXT,
    "logo_photo_url" TEXT,

    CONSTRAINT "Ong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolManager" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "school_name" TEXT NOT NULL,
    "teachingStages" "TeachingStage"[] DEFAULT ARRAY[]::"TeachingStage"[],
    "inep_code" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "address_complement" TEXT,
    "school_image_url" TEXT,

    CONSTRAINT "SchoolManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "idealAge" "TeachingStage"[] DEFAULT ARRAY[]::"TeachingStage"[],
    "neededResources" TEXT NOT NULL,
    "category" "ChallengeCategory" NOT NULL,
    "documentUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "ChallengeStatus" NOT NULL DEFAULT 'PENDING',
    "ongId" INTEGER NOT NULL,
    "managerId" INTEGER,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checkpoint" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "photoUrl" TEXT,
    "completionDate" TIMESTAMP(3),
    "checkpointNumber" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "Checkpoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ong_name_key" ON "Ong"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ong_email_key" ON "Ong"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolManager_email_key" ON "SchoolManager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolManager_inep_code_key" ON "SchoolManager"("inep_code");

-- CreateIndex
CREATE UNIQUE INDEX "Checkpoint_challengeId_checkpointNumber_key" ON "Checkpoint"("challengeId", "checkpointNumber");

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "Ong"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "SchoolManager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkpoint" ADD CONSTRAINT "Checkpoint_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

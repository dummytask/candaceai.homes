-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "propertySize" TEXT NOT NULL,
    "roomCount" TEXT NOT NULL,
    "smartHomeSetup" TEXT NOT NULL,
    "productInterest" TEXT NOT NULL,
    "usageIntent" TEXT NOT NULL,
    "discoverySource" TEXT NOT NULL,
    "incomeRange" TEXT NOT NULL,
    "agreedToTerms" BOOLEAN NOT NULL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

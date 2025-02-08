-- CreateTable
CREATE TABLE "Offers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Offers_pkey" PRIMARY KEY ("id")
);

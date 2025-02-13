-- CreateTable
CREATE TABLE "Commands" (
    "id" TEXT NOT NULL,
    "user_id" TEXT[],
    "articles" TEXT[],
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "adress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "cp" INTEGER NOT NULL,
    "tracknumber" TEXT,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Commands_pkey" PRIMARY KEY ("id")
);

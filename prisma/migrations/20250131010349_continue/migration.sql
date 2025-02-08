-- CreateTable
CREATE TABLE "Profil" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "cp" INTEGER NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Profil_pkey" PRIMARY KEY ("id")
);

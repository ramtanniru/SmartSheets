-- CreateTable
CREATE TABLE "SheetData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sheetRow" INTEGER NOT NULL,

    CONSTRAINT "SheetData_pkey" PRIMARY KEY ("id")
);

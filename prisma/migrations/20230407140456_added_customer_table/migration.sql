-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "subscribed" BOOLEAN NOT NULL DEFAULT false
);

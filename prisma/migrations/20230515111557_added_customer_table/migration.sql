/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Customer";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Holiday" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Holiday_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Holiday" ("approved", "employeeId", "end_date", "id", "start_date") SELECT "approved", "employeeId", "end_date", "id", "start_date" FROM "Holiday";
DROP TABLE "Holiday";
ALTER TABLE "new_Holiday" RENAME TO "Holiday";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

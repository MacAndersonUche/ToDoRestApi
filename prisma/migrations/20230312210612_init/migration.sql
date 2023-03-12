/*
  Warnings:

  - The primary key for the `ToDo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ToDo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_ToDo" ("content", "id", "isActive") SELECT "content", "id", "isActive" FROM "ToDo";
DROP TABLE "ToDo";
ALTER TABLE "new_ToDo" RENAME TO "ToDo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

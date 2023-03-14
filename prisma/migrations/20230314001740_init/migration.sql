-- CreateTable
CREATE TABLE "ToDo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

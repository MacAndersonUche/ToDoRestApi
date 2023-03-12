-- CreateTable
CREATE TABLE "ToDo" (
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "ToDo_id_key" ON "ToDo"("id");

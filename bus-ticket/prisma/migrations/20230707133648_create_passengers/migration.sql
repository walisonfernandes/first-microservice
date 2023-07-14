-- CreateTable
CREATE TABLE "passengers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "start_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" DATETIME,
    "quantity" REAL NOT NULL,
    "name_bus" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collaboratorsId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "passengers_cpf_key" ON "passengers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "passengers_collaboratorsId_key" ON "passengers"("collaboratorsId");

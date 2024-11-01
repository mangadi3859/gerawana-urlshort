/*
  Warnings:

  - You are about to drop the column `click` on the `shortlink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `shortlink` DROP COLUMN `click`;

-- CreateTable
CREATE TABLE `Visit` (
    `id` VARCHAR(191) NOT NULL,
    `shortLinkId` VARCHAR(191) NOT NULL,
    `visitedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_shortLinkId_fkey` FOREIGN KEY (`shortLinkId`) REFERENCES `ShortLink`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

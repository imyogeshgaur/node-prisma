-- AlterTable
ALTER TABLE `user` ADD COLUMN `userImage` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Post` (
    `postId` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL,
    `postImage` VARCHAR(191) NOT NULL,
    `caption` VARCHAR(191) NULL,
    `hashtags` VARCHAR(191) NULL,
    `authorId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

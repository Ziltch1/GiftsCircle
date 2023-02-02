-- CreateTable
CREATE TABLE `otp` (
    `id` VARCHAR(50) NOT NULL,
    `code` VARCHAR(5) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `user` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

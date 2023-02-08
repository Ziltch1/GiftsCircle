-- CreateTable
CREATE TABLE `delivery` (
    `id` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `orderDate` DATETIME(3) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `expectedDate` DATETIME(3) NOT NULL,
    `postalCode` VARCHAR(255) NOT NULL,
    `tel` VARCHAR(255) NOT NULL,
    `tel2` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,

    INDEX `Delivery_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `category` VARCHAR(255) NOT NULL,
    `venue` VARCHAR(255) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `start_time` VARCHAR(191) NOT NULL,
    `end_time` VARCHAR(191) NOT NULL,
    `timezone` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `descCeleb` VARCHAR(255) NULL,
    `summary` VARCHAR(255) NULL,
    `descSummary` VARCHAR(255) NULL,
    `published` BOOLEAN NOT NULL,
    `applyDonation` BOOLEAN NOT NULL,
    `percentDonation` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `host` VARCHAR(255) NOT NULL,

    INDEX `Event_userId_fkey`(`host`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gift` (
    `id` VARCHAR(255) NOT NULL,
    `giftItemId` VARCHAR(255) NOT NULL,
    `enableContribution` BOOLEAN NOT NULL,
    `purchased` BOOLEAN NOT NULL,
    `quantity` INTEGER NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `complimentaryGift` VARCHAR(255) NOT NULL,
    `amountPaid` INTEGER NOT NULL,
    `eventId` VARCHAR(255) NULL,

    INDEX `Gift_eventId_fkey`(`eventId`),
    INDEX `Gift_giftItemId_fkey`(`giftItemId`),
    INDEX `Gift_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `giftitem` (
    `id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `category` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,
    `details` VARCHAR(255) NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NULL,
    `placeOfResidence` VARCHAR(255) NULL,
    `tel` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `dob` VARCHAR(255) NULL,
    `emailVerified` BOOLEAN NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `eventId` VARCHAR(255) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp` (
    `id` VARCHAR(50) NOT NULL,
    `code` VARCHAR(5) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `user` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `gift` ADD CONSTRAINT `gift_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `userType` ENUM('CLIENT', 'MUSICIAN') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicianProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `category` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `priceFrom` INTEGER NULL,
    `experience` VARCHAR(191) NULL,
    `equipment` VARCHAR(191) NULL,
    `availability` VARCHAR(191) NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0.0,
    `ratingCount` INTEGER NOT NULL DEFAULT 0,
    `eventsCount` INTEGER NOT NULL DEFAULT 0,
    `satisfactionRate` INTEGER NULL,
    `responseTime` VARCHAR(191) NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MusicianProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PortfolioItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `musicianProfileId` INTEGER NOT NULL,
    `type` ENUM('IMAGE', 'VIDEO', 'AUDIO') NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `genre` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Genre_name_key`(`name`),
    UNIQUE INDEX `Genre_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instrument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Instrument_name_key`(`name`),
    UNIQUE INDEX `Instrument_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicianGenre` (
    `musicianProfileId` INTEGER NOT NULL,
    `genreId` INTEGER NOT NULL,

    PRIMARY KEY (`musicianProfileId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicianInstrument` (
    `musicianProfileId` INTEGER NOT NULL,
    `instrumentId` INTEGER NOT NULL,

    PRIMARY KEY (`musicianProfileId`, `instrumentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `musicianProfileId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `event` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `musicianProfileId` INTEGER NOT NULL,
    `clientId` INTEGER NULL,
    `eventDate` DATETIME(3) NOT NULL,
    `eventType` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `monthlyPrice` INTEGER NOT NULL,
    `yearlyPrice` INTEGER NOT NULL,
    `badge` VARCHAR(191) NULL,
    `isMusicianPlan` BOOLEAN NOT NULL,
    `isClientPlan` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Plan_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanFeature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `planId` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `available` BOOLEAN NOT NULL,
    `highlight` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FAQItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MusicianProfile` ADD CONSTRAINT `MusicianProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PortfolioItem` ADD CONSTRAINT `PortfolioItem_musicianProfileId_fkey` FOREIGN KEY (`musicianProfileId`) REFERENCES `MusicianProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianGenre` ADD CONSTRAINT `MusicianGenre_musicianProfileId_fkey` FOREIGN KEY (`musicianProfileId`) REFERENCES `MusicianProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianGenre` ADD CONSTRAINT `MusicianGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianInstrument` ADD CONSTRAINT `MusicianInstrument_musicianProfileId_fkey` FOREIGN KEY (`musicianProfileId`) REFERENCES `MusicianProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MusicianInstrument` ADD CONSTRAINT `MusicianInstrument_instrumentId_fkey` FOREIGN KEY (`instrumentId`) REFERENCES `Instrument`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_musicianProfileId_fkey` FOREIGN KEY (`musicianProfileId`) REFERENCES `MusicianProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_musicianProfileId_fkey` FOREIGN KEY (`musicianProfileId`) REFERENCES `MusicianProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanFeature` ADD CONSTRAINT `PlanFeature_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

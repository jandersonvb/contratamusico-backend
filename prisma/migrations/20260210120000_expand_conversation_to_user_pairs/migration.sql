-- Expande conversas para pares de usuários (CLIENT<->CLIENT, CLIENT<->MUSICIAN, MUSICIAN<->MUSICIAN)

ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_clientId_fkey`;
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_musicianProfileId_fkey`;

ALTER TABLE `Conversation`
  ADD COLUMN `userAId` INTEGER NULL,
  ADD COLUMN `userBId` INTEGER NULL;

UPDATE `Conversation` c
INNER JOIN `MusicianProfile` mp ON mp.id = c.musicianProfileId
SET
  c.userAId = LEAST(c.clientId, mp.userId),
  c.userBId = GREATEST(c.clientId, mp.userId);

ALTER TABLE `Conversation`
  MODIFY `userAId` INTEGER NOT NULL,
  MODIFY `userBId` INTEGER NOT NULL;

ALTER TABLE `Conversation` DROP INDEX `Conversation_clientId_musicianProfileId_key`;
ALTER TABLE `Conversation` DROP INDEX `Conversation_clientId_idx`;
ALTER TABLE `Conversation` DROP INDEX `Conversation_musicianProfileId_idx`;

ALTER TABLE `Conversation`
  DROP COLUMN `clientId`,
  DROP COLUMN `musicianProfileId`;

ALTER TABLE `Conversation`
  ADD CONSTRAINT `Conversation_userAId_fkey` FOREIGN KEY (`userAId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Conversation_userBId_fkey` FOREIGN KEY (`userBId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX `Conversation_userAId_idx` ON `Conversation`(`userAId`);
CREATE INDEX `Conversation_userBId_idx` ON `Conversation`(`userBId`);
CREATE UNIQUE INDEX `Conversation_userAId_userBId_key` ON `Conversation`(`userAId`, `userBId`);

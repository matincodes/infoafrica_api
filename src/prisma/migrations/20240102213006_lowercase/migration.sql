/*
  Warnings:

  - You are about to drop the column `Address` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `PhoneNumber` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `Sector` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `Website` on the `Companies` table. All the data in the column will be lost.
  - Added the required column `address` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Companies] DROP COLUMN [Address],
[Email],
[Name],
[PhoneNumber],
[Sector],
[Website];
ALTER TABLE [dbo].[Companies] ADD [address] NVARCHAR(max) NOT NULL,
[email] NVARCHAR(max) NOT NULL,
[name] NVARCHAR(max) NOT NULL,
[phoneNumber] NVARCHAR(max) NOT NULL,
[sector] NVARCHAR(max) NOT NULL,
[website] NVARCHAR(max) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

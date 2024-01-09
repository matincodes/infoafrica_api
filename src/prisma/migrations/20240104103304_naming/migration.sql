/*
  Warnings:

  - You are about to drop the column `countryName` on the `Companies` table. All the data in the column will be lost.
  - Added the required column `country` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Companies] DROP COLUMN [countryName];
ALTER TABLE [dbo].[Companies] ADD [country] NVARCHAR(max) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

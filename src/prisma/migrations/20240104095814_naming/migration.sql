/*
  Warnings:

  - You are about to drop the column `countryName` on the `Resources` table. All the data in the column will be lost.
  - You are about to drop the column `resourceName` on the `Resources` table. All the data in the column will be lost.
  - Added the required column `country` to the `Resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Resources` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Resources] DROP COLUMN [countryName],
[resourceName];
ALTER TABLE [dbo].[Resources] ADD [country] NVARCHAR(max) NOT NULL,
[name] NVARCHAR(max) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

/*
  Warnings:

  - You are about to drop the column `agencyName` on the `GovernmentAgencies` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `MiningCompanies` table. All the data in the column will be lost.
  - You are about to drop the column `locationName` on the `ResourceLocations` table. All the data in the column will be lost.
  - Added the required column `agency` to the `GovernmentAgencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `MiningCompanies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `ResourceLocations` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[GovernmentAgencies] DROP COLUMN [agencyName];
ALTER TABLE [dbo].[GovernmentAgencies] ADD [agency] NVARCHAR(max) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[MiningCompanies] DROP COLUMN [companyName];
ALTER TABLE [dbo].[MiningCompanies] ADD [company] NVARCHAR(max) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ResourceLocations] DROP COLUMN [locationName];
ALTER TABLE [dbo].[ResourceLocations] ADD [location] NVARCHAR(max) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

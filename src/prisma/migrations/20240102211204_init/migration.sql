BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Companies] (
    [id] INT NOT NULL IDENTITY(1,1),
    [countryName] NVARCHAR(max) NOT NULL,
    [Name] NVARCHAR(max) NOT NULL,
    [Address] NVARCHAR(max) NOT NULL,
    [Sector] NVARCHAR(max) NOT NULL,
    [Website] NVARCHAR(max) NOT NULL,
    [Email] NVARCHAR(max) NOT NULL,
    [PhoneNumber] NVARCHAR(max) NOT NULL,
    CONSTRAINT [Companies_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Resources] (
    [id] INT NOT NULL IDENTITY(1,1),
    [resourceName] NVARCHAR(max) NOT NULL,
    [countryName] NVARCHAR(max) NOT NULL,
    CONSTRAINT [Resources_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ResourceLocations] (
    [id] INT NOT NULL IDENTITY(1,1),
    [locationName] NVARCHAR(max) NOT NULL,
    [resourcesId] INT NOT NULL,
    CONSTRAINT [ResourceLocations_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MiningCompanies] (
    [id] INT NOT NULL IDENTITY(1,1),
    [companyName] NVARCHAR(max) NOT NULL,
    [resourcesId] INT NOT NULL,
    CONSTRAINT [MiningCompanies_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[GovernmentAgencies] (
    [id] INT NOT NULL IDENTITY(1,1),
    [agencyName] NVARCHAR(max) NOT NULL,
    [resourcesId] INT NOT NULL,
    CONSTRAINT [GovernmentAgencies_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[ResourceLocations] ADD CONSTRAINT [ResourceLocations_resourcesId_fkey] FOREIGN KEY ([resourcesId]) REFERENCES [dbo].[Resources]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MiningCompanies] ADD CONSTRAINT [MiningCompanies_resourcesId_fkey] FOREIGN KEY ([resourcesId]) REFERENCES [dbo].[Resources]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[GovernmentAgencies] ADD CONSTRAINT [GovernmentAgencies_resourcesId_fkey] FOREIGN KEY ([resourcesId]) REFERENCES [dbo].[Resources]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

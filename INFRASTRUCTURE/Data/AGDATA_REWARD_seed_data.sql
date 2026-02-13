-- =============================================
-- AGDATA Rewards System - Complete Seed Data
-- =============================================
-- Version: 2.0
-- Date: 2026-02-13
-- Description: Production-ready seed data with proper domain rules
--              and NO concurrency issues
-- =============================================

USE [master];
GO

-- Drop and recreate database
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'AGDATA_REWARD')
BEGIN
    ALTER DATABASE [AGDATA_REWARD] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [AGDATA_REWARD];
END
GO

CREATE DATABASE [AGDATA_REWARD];
GO

USE [AGDATA_REWARD];
GO

-- =============================================
-- SCHEMA CREATION
-- =============================================

CREATE TABLE [Roles] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [Name] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(500) NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [UQ_Roles_Name] UNIQUE ([Name])
);

CREATE TABLE [Users] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [EmployeeId] NVARCHAR(50) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL,
    [FirstName] NVARCHAR(100) NOT NULL,
    [LastName] NVARCHAR(100) NOT NULL,
    [PasswordHash] NVARCHAR(500) NOT NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [MustChangePassword] BIT NOT NULL DEFAULT 0,
    [LastPasswordChangedAt] DATETIME2 NULL,
    [FailedLoginCount] INT NOT NULL DEFAULT 0,
    [LockoutEndUtc] DATETIME2 NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [UQ_Users_Email] UNIQUE ([Email]),
    CONSTRAINT [UQ_Users_EmployeeId] UNIQUE ([EmployeeId])
);

CREATE TABLE [UserRoleAssignments] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [RoleId] UNIQUEIDENTIFIER NOT NULL,
    [AssignedBy] UNIQUEIDENTIFIER NOT NULL,
    [AssignedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [UQ_UserRoleAssignments_UserRole] UNIQUE ([UserId], [RoleId]),
    CONSTRAINT [FK_UserRoleAssignments_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserRoleAssignments_Roles] FOREIGN KEY ([RoleId]) REFERENCES [Roles]([Id]) ON DELETE CASCADE
);

CREATE TABLE [UserPointsAccounts] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [CurrentBalance] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [TotalEarned] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [TotalRedeemed] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [LastUpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedAt] DATETIME2 NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [FK_UserPointsAccounts_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE,
    CONSTRAINT [UQ_UserPointsAccounts_UserId] UNIQUE ([UserId]),
    CONSTRAINT [CK_UserPointsAccounts_NonNegativeBalance] CHECK ([CurrentBalance] >= 0)
);

CREATE TABLE [UserPointsTransactions] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [Points] DECIMAL(18,2) NOT NULL,
    [TransactionType] INT NOT NULL,
    [Source] NVARCHAR(50) NOT NULL,
    [SourceId] UNIQUEIDENTIFIER NULL,
    [Description] NVARCHAR(500) NOT NULL,
    [BalanceAfter] DECIMAL(18,2) NOT NULL,
    [Timestamp] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [ProcessedBy] UNIQUEIDENTIFIER NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedAt] DATETIME2 NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [FK_UserPointsTransactions_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE NO ACTION,
    CONSTRAINT [CK_UserPointsTransactions_Type] CHECK ([TransactionType] IN (0, 1, 2, 3)),
    CONSTRAINT [CK_UserPointsTransactions_NonNegativeBalanceAfter] CHECK ([BalanceAfter] >= 0)
);
CREATE INDEX [IX_UserPointsTransactions_Timestamp] ON [UserPointsTransactions]([Timestamp]);
CREATE INDEX [IX_UserPointsTransactions_UserId_Timestamp] ON [UserPointsTransactions]([UserId], [Timestamp]);

CREATE TABLE [ProductCategories] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [Name] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(500) NULL,
    [DisplayOrder] INT NOT NULL DEFAULT 0,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NULL,
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL
);
CREATE INDEX [IX_ProductCategories_DisplayOrder] ON [ProductCategories]([DisplayOrder]);

CREATE TABLE [Products] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [Name] NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    [CategoryId] UNIQUEIDENTIFIER NOT NULL,
    [ImageUrl] NVARCHAR(1000) NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [DeactivationReason] NVARCHAR(500) NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [FK_Products_Categories] FOREIGN KEY ([CategoryId]) REFERENCES [ProductCategories]([Id]) ON DELETE NO ACTION
);
CREATE INDEX [IX_Products_IsActive] ON [Products]([IsActive]);

CREATE TABLE [InventoryItems] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [ProductId] UNIQUEIDENTIFIER NOT NULL,
    [QuantityAvailable] INT NOT NULL DEFAULT 0,
    [QuantityReserved] INT NOT NULL DEFAULT 0,
    [CurrentStock] INT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NULL,
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [FK_InventoryItem_Product] FOREIGN KEY ([ProductId]) REFERENCES [Products]([Id]) ON DELETE CASCADE,
    CONSTRAINT [UQ_InventoryItems_ProductId] UNIQUE ([ProductId]),
    CONSTRAINT [CK_InventoryItems_NonNegativeStock] CHECK ([QuantityAvailable] >= 0 AND [CurrentStock] >= 0)
);

CREATE TABLE [ProductPricing] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [ProductId] UNIQUEIDENTIFIER NOT NULL,
    [PointsCost] DECIMAL(18,2) NOT NULL,
    [EffectiveFrom] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [EffectiveTo] DATETIME2 NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NULL,
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [FK_ProductPricing_Product] FOREIGN KEY ([ProductId]) REFERENCES [Products]([Id]) ON DELETE CASCADE,
    CONSTRAINT [CK_ProductPricing_PointsCost] CHECK ([PointsCost] >= 1 AND [PointsCost] <= 10000000)
);
CREATE INDEX [IX_ProductPricing_ProductId] ON [ProductPricing]([ProductId]);

-- CRITICAL: Events table with RowVersion for optimistic concurrency
-- RowVersion is auto-managed by SQL Server - NEVER manually set values
CREATE TABLE [Events] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [Name] NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(2000) NULL,
    [EventDate] DATETIME2 NOT NULL,
    [Status] INT NOT NULL DEFAULT 0, -- 0=Draft, 1=Active, 2=Completed, 3=Cancelled
    [TotalPointsPool] DECIMAL(18,2) NULL,
    [Location] NVARCHAR(500) NULL,
    [MaxParticipants] INT NULL,
    [RegistrationEndDate] DATETIME2 NULL,
    [BannerImageUrl] NVARCHAR(1000) NULL,
    [PointsPerParticipant] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [DistributedPoints] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [RowVersion] ROWVERSION NOT NULL, -- Auto-managed by SQL Server for concurrency
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [CK_Events_Status] CHECK ([Status] IN (0, 1, 2, 3)),
    CONSTRAINT [CK_Events_DistributedNotExceedPool] CHECK ([DistributedPoints] <= ISNULL([TotalPointsPool], 999999999))
);

CREATE TABLE [PrizeTiers] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [EventId] UNIQUEIDENTIFIER NOT NULL,
    [Rank] INT NOT NULL,
    [Points] INT NOT NULL,
    CONSTRAINT [FK_PrizeTiers_Events] FOREIGN KEY ([EventId]) REFERENCES [Events]([Id]) ON DELETE CASCADE,
    CONSTRAINT [CK_PrizeTiers_RankTop3] CHECK ([Rank] >= 1 AND [Rank] <= 3),
    CONSTRAINT [UQ_PrizeTiers_EventRank] UNIQUE ([EventId], [Rank])
);

CREATE TABLE [EventParticipants] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [EventId] UNIQUEIDENTIFIER NOT NULL,
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [PointsAwarded] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [Rank] INT NULL,
    [RegisteredAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [AwardedAt] DATETIME2 NULL,
    [AwardedBy] UNIQUEIDENTIFIER NULL,
    [AttendanceStatus] INT NOT NULL DEFAULT 0, -- 0=Registered, 1=CheckedIn, 2=NoShow
    [CheckedInAt] DATETIME2 NULL,
    CONSTRAINT [FK_EventParticipants_Events] FOREIGN KEY ([EventId]) REFERENCES [Events]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_EventParticipants_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE NO ACTION,
    CONSTRAINT [UQ_EventParticipants_EventUser] UNIQUE ([EventId], [UserId]),
    CONSTRAINT [CK_EventParticipants_AttendanceStatus] CHECK ([AttendanceStatus] IN (0, 1, 2)),
    CONSTRAINT [CK_EventParticipants_RankTop3OrNull] CHECK ([Rank] IS NULL OR ([Rank] >= 1 AND [Rank] <= 3))
);

CREATE TABLE [Redemptions] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [ProductId] UNIQUEIDENTIFIER NOT NULL,
    [PointsSpent] DECIMAL(18,2) NOT NULL,
    [Quantity] INT NOT NULL DEFAULT 1,
    [Status] NVARCHAR(20) NOT NULL DEFAULT 'Pending',
    [AdminNotes] NVARCHAR(500) NULL,
    [ApprovedBy] UNIQUEIDENTIFIER NULL,
    [ApprovedAt] DATETIME2 NULL,
    [DeliveredBy] UNIQUEIDENTIFIER NULL,
    [DeliveredAt] DATETIME2 NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedBy] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [FK_Redemptions_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Redemptions_Products] FOREIGN KEY ([ProductId]) REFERENCES [Products]([Id]) ON DELETE NO ACTION,
    CONSTRAINT [CK_Redemptions_Status] CHECK ([Status] IN ('Pending', 'Approved', 'Rejected', 'Delivered', 'Cancelled')),
    CONSTRAINT [CK_Redemptions_QuantityOne] CHECK ([Quantity] = 1)
);
CREATE INDEX [IX_Redemptions_UserId] ON [Redemptions]([UserId]);
CREATE INDEX [IX_Redemptions_Status] ON [Redemptions]([Status]);
CREATE INDEX [IX_Redemptions_CreatedAt] ON [Redemptions]([CreatedAt]);

PRINT '=== Schema created successfully ===';
GO

-- =============================================
-- SEED DATA: Roles & Users
-- =============================================

DECLARE @AdminRoleId UNIQUEIDENTIFIER = 'A0000001-0001-0001-0001-000000000001';
DECLARE @EmployeeRoleId UNIQUEIDENTIFIER = 'A0000001-0001-0001-0001-000000000002';

INSERT INTO [Roles] ([Id], [Name], [Description], [IsActive], [CreatedAt], [UpdatedAt])
VALUES
(@AdminRoleId, 'Admin', 'System administrator with full access', 1, '2025-11-01', '2025-11-01'),
(@EmployeeRoleId, 'Employee', 'Standard employee access', 1, '2025-11-01', '2025-11-01');

-- Password for all users: Password@123
-- BCrypt hash: $2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42
DECLARE @Admin1Id UNIQUEIDENTIFIER = 'B0000001-0001-0001-0001-000000000001';
DECLARE @Admin2Id UNIQUEIDENTIFIER = 'B0000001-0001-0001-0001-000000000002';
DECLARE @User01Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000001';
DECLARE @User02Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000002';
DECLARE @User03Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000003';
DECLARE @User04Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000004';
DECLARE @User05Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000005';
DECLARE @User06Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000006';
DECLARE @User07Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000007';
DECLARE @User08Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000008';
DECLARE @User09Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000009';
DECLARE @User10Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000010';

INSERT INTO [Users] ([Id], [EmployeeId], [Email], [FirstName], [LastName], [PasswordHash], [IsActive], [MustChangePassword], [LastPasswordChangedAt], [CreatedAt], [UpdatedAt])
VALUES
(@Admin1Id, 'ADM100001', 'admin.master@agdata.com', 'Michael', 'Anderson', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-11-15 08:30:00', '2025-11-10 09:00:00', '2025-11-15 08:30:00'),
(@Admin2Id, 'ADM200002', 'sarah.admin@agdata.com', 'Sarah', 'Williams', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-11-18 10:15:00', '2025-11-12 11:00:00', '2025-11-18 10:15:00'),
(@User01Id, 'EMP100001', 'james.miller@agdata.com', 'James', 'Miller', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-11-20 14:00:00', '2025-11-15 08:00:00', '2025-11-20 14:00:00'),
(@User02Id, 'EMP200002', 'emily.johnson@agdata.com', 'Emily', 'Johnson', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-11-22 09:30:00', '2025-11-16 09:00:00', '2025-11-22 09:30:00'),
(@User03Id, 'EMP300003', 'david.brown@agdata.com', 'David', 'Brown', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-11-25 11:00:00', '2025-11-18 10:00:00', '2025-11-25 11:00:00'),
(@User04Id, 'EMP400004', 'olivia.davis@agdata.com', 'Olivia', 'Davis', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-11-28 15:45:00', '2025-11-20 08:30:00', '2025-11-28 15:45:00'),
(@User05Id, 'EMP500005', 'william.wilson@agdata.com', 'William', 'Wilson', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-12-01 10:00:00', '2025-11-22 09:00:00', '2025-12-01 10:00:00'),
(@User06Id, 'EMP600006', 'sophia.taylor@agdata.com', 'Sophia', 'Taylor', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-12-05 14:30:00', '2025-11-25 10:00:00', '2025-12-05 14:30:00'),
(@User07Id, 'EMP700007', 'benjamin.moore@agdata.com', 'Benjamin', 'Moore', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-12-08 09:00:00', '2025-11-28 11:00:00', '2025-12-08 09:00:00'),
(@User08Id, 'EMP800008', 'isabella.white@agdata.com', 'Isabella', 'White', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-12-12 16:00:00', '2025-12-01 08:00:00', '2025-12-12 16:00:00'),
(@User09Id, 'EMP900009', 'alexander.harris@agdata.com', 'Alexander', 'Harris', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-12-15 11:30:00', '2025-12-05 09:00:00', '2025-12-15 11:30:00'),
(@User10Id, 'EMP100010', 'charlotte.martin@agdata.com', 'Charlotte', 'Martin', '$2a$12$as.QVLiKh5tWYswrAJvh0e/txIb/UyVZuptoBq7Q0JOAUNL2zMi42', 1, 0, '2025-12-18 08:45:00', '2025-12-08 10:00:00', '2025-12-18 08:45:00');

-- Role assignments
INSERT INTO [UserRoleAssignments] ([Id], [UserId], [RoleId], [AssignedBy], [AssignedAt], [CreatedAt], [UpdatedAt])
VALUES
(NEWID(), @Admin1Id, @AdminRoleId, @Admin1Id, '2025-11-10 09:00:00', '2025-11-10 09:00:00', '2025-11-10 09:00:00'),
(NEWID(), @Admin2Id, @AdminRoleId, @Admin1Id, '2025-11-12 11:00:00', '2025-11-12 11:00:00', '2025-11-12 11:00:00'),
(NEWID(), @User01Id, @EmployeeRoleId, @Admin1Id, '2025-11-15 08:00:00', '2025-11-15 08:00:00', '2025-11-15 08:00:00'),
(NEWID(), @User02Id, @EmployeeRoleId, @Admin1Id, '2025-11-16 09:00:00', '2025-11-16 09:00:00', '2025-11-16 09:00:00'),
(NEWID(), @User03Id, @EmployeeRoleId, @Admin1Id, '2025-11-18 10:00:00', '2025-11-18 10:00:00', '2025-11-18 10:00:00'),
(NEWID(), @User04Id, @EmployeeRoleId, @Admin1Id, '2025-11-20 08:30:00', '2025-11-20 08:30:00', '2025-11-20 08:30:00'),
(NEWID(), @User05Id, @EmployeeRoleId, @Admin1Id, '2025-11-22 09:00:00', '2025-11-22 09:00:00', '2025-11-22 09:00:00'),
(NEWID(), @User06Id, @EmployeeRoleId, @Admin2Id, '2025-11-25 10:00:00', '2025-11-25 10:00:00', '2025-11-25 10:00:00'),
(NEWID(), @User07Id, @EmployeeRoleId, @Admin2Id, '2025-11-28 11:00:00', '2025-11-28 11:00:00', '2025-11-28 11:00:00'),
(NEWID(), @User08Id, @EmployeeRoleId, @Admin2Id, '2025-12-01 08:00:00', '2025-12-01 08:00:00', '2025-12-01 08:00:00'),
(NEWID(), @User09Id, @EmployeeRoleId, @Admin2Id, '2025-12-05 09:00:00', '2025-12-05 09:00:00', '2025-12-05 09:00:00'),
(NEWID(), @User10Id, @EmployeeRoleId, @Admin2Id, '2025-12-08 10:00:00', '2025-12-08 10:00:00', '2025-12-08 10:00:00');

PRINT '=== Users and roles created ===';
GO

-- =============================================
-- SEED DATA: Products
-- =============================================

DECLARE @Cat01Id UNIQUEIDENTIFIER = 'E0000001-0001-0001-0001-000000000001';
DECLARE @Cat02Id UNIQUEIDENTIFIER = 'E0000001-0001-0001-0001-000000000002';
DECLARE @Cat03Id UNIQUEIDENTIFIER = 'E0000001-0001-0001-0001-000000000003';

INSERT INTO [ProductCategories] ([Id], [Name], [Description], [DisplayOrder], [IsActive])
VALUES
(@Cat01Id, 'Electronics', 'Electronic devices and gadgets', 1, 1),
(@Cat02Id, 'Gift Cards', 'Digital and physical gift cards', 2, 1),
(@Cat03Id, 'Office Supplies', 'Premium office supplies', 3, 1);

DECLARE @Prod01Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000001';
DECLARE @Prod02Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000002';
DECLARE @Prod03Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000003';
DECLARE @Prod04Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000004';
DECLARE @Prod05Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000005';
DECLARE @Prod06Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000006';
DECLARE @Admin1Id UNIQUEIDENTIFIER = 'B0000001-0001-0001-0001-000000000001';

INSERT INTO [Products] ([Id], [Name], [Description], [CategoryId], [ImageUrl], [IsActive], [CreatedAt], [UpdatedAt], [CreatedBy])
VALUES
(@Prod01Id, 'Wireless Headphones', 'Premium noise cancelling wireless headphones', @Cat01Id, 'https://example.com/headphones.jpg', 1, '2025-11-20 10:00:00', '2025-11-20 10:00:00', @Admin1Id),
(@Prod02Id, 'Amazon Gift Card', 'Digital Amazon gift card $50 value', @Cat02Id, 'https://example.com/amazon.jpg', 1, '2025-11-20 10:15:00', '2025-11-20 10:15:00', @Admin1Id),
(@Prod03Id, 'Premium Notebook Set', 'High quality leather bound notebooks', @Cat03Id, 'https://example.com/notebook.jpg', 1, '2025-11-22 09:00:00', '2025-11-22 09:00:00', @Admin1Id),
(@Prod04Id, 'Bluetooth Speaker', 'Portable waterproof bluetooth speaker', @Cat01Id, 'https://example.com/speaker.jpg', 1, '2025-12-08 11:00:00', '2025-12-08 11:00:00', @Admin1Id),
(@Prod05Id, 'Starbucks Gift Card', 'Digital Starbucks gift card $25 value', @Cat02Id, 'https://example.com/starbucks.jpg', 1, '2025-12-10 09:00:00', '2025-12-10 09:00:00', @Admin1Id),
(@Prod06Id, 'Desk Organizer', 'Multi compartment bamboo desk organizer', @Cat03Id, 'https://example.com/organizer.jpg', 1, '2025-12-12 14:30:00', '2025-12-12 14:30:00', @Admin1Id);

INSERT INTO [InventoryItems] ([Id], [ProductId], [QuantityAvailable], [QuantityReserved], [CurrentStock])
VALUES
(NEWID(), @Prod01Id, 45, 2, 45),
(NEWID(), @Prod02Id, 500, 5, 500),
(NEWID(), @Prod03Id, 120, 0, 120),
(NEWID(), @Prod04Id, 95, 0, 95),
(NEWID(), @Prod05Id, 300, 4, 300),
(NEWID(), @Prod06Id, 150, 0, 150);

INSERT INTO [ProductPricing] ([Id], [ProductId], [PointsCost], [EffectiveFrom])
VALUES
(NEWID(), @Prod01Id, 1500, '2025-11-20 10:00:00'),
(NEWID(), @Prod02Id, 500, '2025-11-20 10:15:00'),
(NEWID(), @Prod03Id, 350, '2025-11-22 09:00:00'),
(NEWID(), @Prod04Id, 450, '2025-12-08 11:00:00'),
(NEWID(), @Prod05Id, 250, '2025-12-10 09:00:00'),
(NEWID(), @Prod06Id, 300, '2025-12-12 14:30:00');

PRINT '=== Products created ===';
GO

-- =============================================
-- SEED DATA: Events (PROPER STATUS MANAGEMENT)
-- CRITICAL: Events must follow proper lifecycle
-- Draft (0) -> Active (1) -> Completed (2)
-- RowVersion is AUTO-managed by SQL Server
-- =============================================

DECLARE @Admin1Id UNIQUEIDENTIFIER = 'B0000001-0001-0001-0001-000000000001';
DECLARE @Admin2Id UNIQUEIDENTIFIER = 'B0000001-0001-0001-0001-000000000002';

-- Event IDs
DECLARE @DraftEvent01 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000001';
DECLARE @DraftEvent02 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000002';
DECLARE @ActiveEvent01 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000003';
DECLARE @ActiveEvent02 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000004';
DECLARE @CompletedEvent01 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000005';
DECLARE @CompletedEvent02 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000006';

-- Step 1: Insert all events in Draft status (Status=0)
INSERT INTO [Events] ([Id], [Name], [Description], [EventDate], [Status], [TotalPointsPool], [Location], [MaxParticipants], [RegistrationEndDate], [DistributedPoints], [PointsPerParticipant], [CreatedAt], [UpdatedAt], [CreatedBy])
VALUES
-- DRAFT Events (future, open for registration)
(@DraftEvent01, 'Q1 Innovation Workshop', 'Quarterly innovation and brainstorming workshop for all teams', '2026-03-15 14:00:00', 0, 5000.00, 'Innovation Lab Floor 3', 50, '2026-03-10 23:59:59', 0, 100.00, '2026-02-01 09:00:00', '2026-02-01 09:00:00', @Admin1Id),
(@DraftEvent02, 'Team Building Spring Event', 'Outdoor team building activities and collaboration exercises', '2026-03-20 09:00:00', 0, 8000.00, 'Mountain Resort', 60, '2026-03-15 23:59:59', 0, 0, '2026-02-05 10:00:00', '2026-02-05 10:00:00', @Admin2Id),

-- ACTIVE Events (currently happening, registration closed, no points distributed yet)
(@ActiveEvent01, 'Customer Excellence Summit', 'Recognition ceremony for outstanding customer service', '2026-02-20 14:00:00', 0, 6000.00, 'Main Conference Hall', 40, '2026-02-15 23:59:59', 0, 0, '2026-01-25 11:00:00', '2026-01-25 11:00:00', @Admin1Id),
(@ActiveEvent02, 'Technical Deep Dive Series', 'Advanced technical training and certification program', '2026-02-25 09:00:00', 0, 9000.00, 'Training Center B', 35, '2026-02-20 23:59:59', 0, 0, '2026-01-28 10:00:00', '2026-01-28 10:00:00', @Admin1Id),

-- COMPLETED Events (past events with points already distributed)
(@CompletedEvent01, 'Year End Celebration', 'Annual year-end awards and recognition event', '2025-12-20 15:00:00', 0, 10000.00, 'Grand Ballroom', 50, '2025-12-15 23:59:59', 0, 0, '2025-12-01 09:00:00', '2025-12-01 09:00:00', @Admin1Id),
(@CompletedEvent02, 'Sales Excellence Q4', 'Quarterly sales performance recognition', '2026-01-15 14:00:00', 0, 7500.00, 'Conference Room A', 30, '2026-01-10 23:59:59', 0, 0, '2025-12-28 10:00:00', '2025-12-28 10:00:00', @Admin2Id);

-- Step 2: Update events to Active status (simulate domain method Activate())
UPDATE [Events] SET [Status] = 1, [UpdatedAt] = GETUTCDATE() 
WHERE [Id] IN (@ActiveEvent01, @ActiveEvent02);

-- Step 3: Update events to Completed status (simulate domain method Complete())
UPDATE [Events] SET [Status] = 2, [UpdatedAt] = GETUTCDATE() 
WHERE [Id] IN (@CompletedEvent01, @CompletedEvent02);

-- Prize tiers for completed events
INSERT INTO [PrizeTiers] ([Id], [EventId], [Rank], [Points])
VALUES
(NEWID(), @CompletedEvent01, 1, 4000),
(NEWID(), @CompletedEvent01, 2, 3500),
(NEWID(), @CompletedEvent01, 3, 2500),
(NEWID(), @CompletedEvent02, 1, 3000),
(NEWID(), @CompletedEvent02, 2, 2500),
(NEWID(), @CompletedEvent02, 3, 2000);

PRINT '=== Events created with proper status lifecycle ===';
GO

-- =============================================
-- SEED DATA: Event Participants
-- =============================================

DECLARE @Admin1Id UNIQUEIDENTIFIER = 'B0000001-0001-0001-0001-000000000001';
DECLARE @User01Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000001';
DECLARE @User02Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000002';
DECLARE @User03Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000003';
DECLARE @User04Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000004';
DECLARE @User05Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000005';

DECLARE @DraftEvent01 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000001';
DECLARE @ActiveEvent01 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000003';
DECLARE @CompletedEvent01 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000005';
DECLARE @CompletedEvent02 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000006';

-- Draft event participants (registered, waiting for event)
INSERT INTO [EventParticipants] ([Id], [EventId], [UserId], [PointsAwarded], [Rank], [RegisteredAt], [AwardedAt], [AwardedBy], [AttendanceStatus], [CheckedInAt])
VALUES
(NEWID(), @DraftEvent01, @User01Id, 0, NULL, '2026-02-05 10:00:00', NULL, NULL, 0, NULL),
(NEWID(), @DraftEvent01, @User02Id, 0, NULL, '2026-02-06 11:00:00', NULL, NULL, 0, NULL);

-- Active event participants (registered, event happening)
INSERT INTO [EventParticipants] ([Id], [EventId], [UserId], [PointsAwarded], [Rank], [RegisteredAt], [AwardedAt], [AwardedBy], [AttendanceStatus], [CheckedInAt])
VALUES
(NEWID(), @ActiveEvent01, @User03Id, 0, NULL, '2026-02-10 09:00:00', NULL, NULL, 1, '2026-02-20 13:45:00'),
(NEWID(), @ActiveEvent01, @User04Id, 0, NULL, '2026-02-12 14:00:00', NULL, NULL, 1, '2026-02-20 13:50:00');

-- Completed event participants with awards
INSERT INTO [EventParticipants] ([Id], [EventId], [UserId], [PointsAwarded], [Rank], [RegisteredAt], [AwardedAt], [AwardedBy], [AttendanceStatus], [CheckedInAt])
VALUES
(NEWID(), @CompletedEvent01, @User01Id, 4000, 1, '2025-12-10 10:00:00', '2025-12-20 16:00:00', @Admin1Id, 1, '2025-12-20 14:45:00'),
(NEWID(), @CompletedEvent01, @User02Id, 3500, 2, '2025-12-11 11:00:00', '2025-12-20 16:00:00', @Admin1Id, 1, '2025-12-20 14:50:00'),
(NEWID(), @CompletedEvent01, @User03Id, 2500, 3, '2025-12-12 09:00:00', '2025-12-20 16:00:00', @Admin1Id, 1, '2025-12-20 14:55:00'),
(NEWID(), @CompletedEvent02, @User04Id, 3000, 1, '2026-01-05 10:00:00', '2026-01-15 15:00:00', @Admin1Id, 1, '2026-01-15 13:45:00'),
(NEWID(), @CompletedEvent02, @User05Id, 2500, 2, '2026-01-06 11:00:00', '2026-01-15 15:00:00', @Admin1Id, 1, '2026-01-15 13:50:00');

-- Update completed events with distributed points
UPDATE [Events] SET [DistributedPoints] = 10000, [UpdatedAt] = GETUTCDATE() WHERE [Id] = @CompletedEvent01;
UPDATE [Events] SET [DistributedPoints] = 5500, [UpdatedAt] = GETUTCDATE() WHERE [Id] = @CompletedEvent02;

PRINT '=== Event participants created ===';
GO

-- =============================================
-- SEED DATA: User Points & Transactions
-- =============================================

DECLARE @Admin1Id UNIQUEIDENTIFIER = 'B0000001-0001-0001-0001-000000000001';
DECLARE @User01Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000001';
DECLARE @User02Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000002';
DECLARE @User03Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000003';
DECLARE @User04Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000004';
DECLARE @User05Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000005';
DECLARE @CompletedEvent01 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000005';
DECLARE @CompletedEvent02 UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000006';

INSERT INTO [UserPointsAccounts] ([Id], [UserId], [CurrentBalance], [TotalEarned], [TotalRedeemed], [LastUpdatedAt])
VALUES
(NEWID(), @User01Id, 4500, 5000, 500, '2026-02-10 14:00:00'),
(NEWID(), @User02Id, 3500, 3500, 0, '2025-12-20 16:00:00'),
(NEWID(), @User03Id, 2500, 2500, 0, '2025-12-20 16:00:00'),
(NEWID(), @User04Id, 2700, 3000, 300, '2026-01-20 10:00:00'),
(NEWID(), @User05Id, 2500, 2500, 0, '2026-01-15 15:00:00');

-- Transaction Type: 0=Earn, 1=Redeem, 2=Adjustment, 3=Refund
INSERT INTO [UserPointsTransactions] ([Id], [UserId], [Points], [TransactionType], [Source], [SourceId], [Description], [BalanceAfter], [Timestamp], [ProcessedBy])
VALUES
-- User01 transactions
(NEWID(), @User01Id, 500, 2, 'Admin', NULL, 'Welcome bonus', 500, '2025-12-01 09:00:00', @Admin1Id),
(NEWID(), @User01Id, 4000, 0, 'Event', @CompletedEvent01, 'Year End Celebration - Rank 1', 4500, '2025-12-20 16:00:00', @Admin1Id),
(NEWID(), @User01Id, 500, 1, 'Redemption', NULL, 'Amazon Gift Card', 4000, '2026-01-15 10:00:00', @Admin1Id),
(NEWID(), @User01Id, 500, 2, 'Admin', NULL, 'Monthly performance bonus', 4500, '2026-02-01 09:00:00', @Admin1Id),

-- User02 transactions
(NEWID(), @User02Id, 3500, 0, 'Event', @CompletedEvent01, 'Year End Celebration - Rank 2', 3500, '2025-12-20 16:00:00', @Admin1Id),

-- User03 transactions
(NEWID(), @User03Id, 2500, 0, 'Event', @CompletedEvent01, 'Year End Celebration - Rank 3', 2500, '2025-12-20 16:00:00', @Admin1Id),

-- User04 transactions
(NEWID(), @User04Id, 3000, 0, 'Event', @CompletedEvent02, 'Sales Excellence Q4 - Rank 1', 3000, '2026-01-15 15:00:00', @Admin1Id),
(NEWID(), @User04Id, 300, 1, 'Redemption', NULL, 'Desk Organizer', 2700, '2026-01-20 10:00:00', @Admin1Id),

-- User05 transactions
(NEWID(), @User05Id, 2500, 0, 'Event', @CompletedEvent02, 'Sales Excellence Q4 - Rank 2', 2500, '2026-01-15 15:00:00', @Admin1Id);

PRINT '=== Points and transactions created ===';
GO

-- =============================================
-- SEED DATA: Redemptions
-- =============================================

DECLARE @Admin1Id UNIQUEIDENTIFIER = 'B0000001-0001-0001-0001-000000000001';
DECLARE @User01Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000001';
DECLARE @User04Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000004';
DECLARE @Prod02Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000002';
DECLARE @Prod06Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000006';

INSERT INTO [Redemptions] ([Id], [UserId], [ProductId], [PointsSpent], [Quantity], [Status], [AdminNotes], [ApprovedBy], [ApprovedAt], [DeliveredBy], [DeliveredAt], [CreatedAt], [UpdatedAt])
VALUES
(NEWID(), @User01Id, @Prod02Id, 500, 1, 'Delivered', 'Amazon gift card sent via email', @Admin1Id, '2026-01-16 10:00:00', @Admin1Id, '2026-01-16 10:30:00', '2026-01-15 10:00:00', '2026-01-16 10:30:00'),
(NEWID(), @User04Id, @Prod06Id, 300, 1, 'Delivered', 'Desk organizer shipped to office', @Admin1Id, '2026-01-21 09:00:00', @Admin1Id, '2026-01-25 10:00:00', '2026-01-20 10:00:00', '2026-01-25 10:00:00');

PRINT '=== Redemptions created ===';
GO

-- =============================================
-- DATA VERIFICATION QUERIES
-- =============================================

PRINT '';
PRINT '=== VERIFICATION: Balance Reconciliation ===';
SELECT 
    u.FirstName + ' ' + u.LastName AS UserName,
    upa.CurrentBalance AS AccountBalance,
    ISNULL(SUM(CASE WHEN upt.TransactionType = 0 THEN upt.Points WHEN upt.TransactionType = 2 THEN upt.Points ELSE -upt.Points END), 0) AS CalculatedBalance,
    CASE 
        WHEN upa.CurrentBalance = ISNULL(SUM(CASE WHEN upt.TransactionType = 0 THEN upt.Points WHEN upt.TransactionType = 2 THEN upt.Points ELSE -upt.Points END), 0) THEN 'OK'
        ELSE 'MISMATCH'
    END AS Status
FROM Users u
LEFT JOIN UserPointsAccounts upa ON u.Id = upa.UserId
LEFT JOIN UserPointsTransactions upt ON u.Id = upt.UserId
WHERE u.Id NOT IN ('B0000001-0001-0001-0001-000000000001', 'B0000001-0001-0001-0001-000000000002')
GROUP BY u.FirstName, u.LastName, upa.CurrentBalance
ORDER BY u.FirstName;

PRINT '';
PRINT '=== VERIFICATION: Event Pool Status ===';
SELECT 
    e.Name,
    CASE e.Status 
        WHEN 0 THEN 'Draft' 
        WHEN 1 THEN 'Active' 
        WHEN 2 THEN 'Completed' 
        WHEN 3 THEN 'Cancelled' 
    END AS Status,
    e.TotalPointsPool,
    e.DistributedPoints,
    ISNULL(SUM(ep.PointsAwarded), 0) AS SumAwards,
    CASE 
        WHEN e.Status = 2 AND e.DistributedPoints = ISNULL(SUM(ep.PointsAwarded), 0) THEN 'OK'
        WHEN e.Status IN (0, 1) AND e.DistributedPoints = 0 THEN 'OK'
        ELSE 'MISMATCH'
    END AS PoolStatus
FROM Events e
LEFT JOIN EventParticipants ep ON e.Id = ep.EventId
GROUP BY e.Name, e.Status, e.TotalPointsPool, e.DistributedPoints
ORDER BY e.Status, e.Name;

PRINT '';
PRINT '=== VERIFICATION: Data Integrity Checks ===';
SELECT 'Events with invalid status' AS [Check], COUNT(*) AS Count 
FROM Events WHERE [Status] NOT IN (0, 1, 2, 3)
UNION ALL SELECT 'Invalid PrizeTier ranks', COUNT(*) FROM PrizeTiers WHERE [Rank] < 1 OR [Rank] > 3
UNION ALL SELECT 'Invalid EventParticipant ranks', COUNT(*) FROM EventParticipants WHERE [Rank] IS NOT NULL AND ([Rank] < 1 OR [Rank] > 3)
UNION ALL SELECT 'Negative point balances', COUNT(*) FROM UserPointsAccounts WHERE CurrentBalance < 0
UNION ALL SELECT 'Negative transaction balances', COUNT(*) FROM UserPointsTransactions WHERE BalanceAfter < 0
UNION ALL SELECT 'Completed events with pool mismatch', COUNT(*) FROM Events WHERE Status = 2 AND DistributedPoints > TotalPointsPool;

PRINT '';
PRINT '=== SUMMARY STATISTICS ===';
SELECT 'Total Users' AS Metric, COUNT(*) AS Count FROM Users
UNION ALL SELECT 'Total Active Products', COUNT(*) FROM Products WHERE IsActive = 1
UNION ALL SELECT 'Total Product Categories', COUNT(*) FROM ProductCategories WHERE IsActive = 1
UNION ALL SELECT 'Draft Events', COUNT(*) FROM Events WHERE Status = 0
UNION ALL SELECT 'Active Events', COUNT(*) FROM Events WHERE Status = 1
UNION ALL SELECT 'Completed Events', COUNT(*) FROM Events WHERE Status = 2
UNION ALL SELECT 'Total Event Participants', COUNT(*) FROM EventParticipants
UNION ALL SELECT 'Total Redemptions', COUNT(*) FROM Redemptions
UNION ALL SELECT 'Delivered Redemptions', COUNT(*) FROM Redemptions WHERE Status = 'Delivered'
UNION ALL SELECT 'Total Transactions', COUNT(*) FROM UserPointsTransactions;

PRINT '';
PRINT '=== SEED DATA COMPLETED SUCCESSFULLY ===';
PRINT 'Database: AGDATA_REWARD';
PRINT 'Default Admin: admin.master@agdata.com';
PRINT 'Default Password: Password@123';
PRINT '===========================================';
GO

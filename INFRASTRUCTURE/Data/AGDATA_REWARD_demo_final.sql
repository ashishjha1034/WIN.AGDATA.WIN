USE [master];
GO
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

CREATE TABLE [Roles] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [Name] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(500) NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
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
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [RoleId] UNIQUEIDENTIFIER NOT NULL,
    [AssignedBy] UNIQUEIDENTIFIER NOT NULL,
    [AssignedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT [PK_UserRoleAssignments] PRIMARY KEY ([UserId], [RoleId]),
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
    [IsActive] BIT NOT NULL DEFAULT 1
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
    CONSTRAINT [FK_InventoryItem_Product] FOREIGN KEY ([ProductId]) REFERENCES [Products]([Id]) ON DELETE CASCADE,
    CONSTRAINT [UQ_InventoryItems_ProductId] UNIQUE ([ProductId]),
    CONSTRAINT [CK_InventoryItems_NonNegativeStock] CHECK ([QuantityAvailable] >= 0 AND [CurrentStock] >= 0)
);

CREATE TABLE [ProductPricing] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [ProductId] UNIQUEIDENTIFIER NOT NULL,
    [PointsCost] INT NOT NULL,
    [EffectiveFrom] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [EffectiveTo] DATETIME2 NULL,
    CONSTRAINT [FK_ProductPricing_Product] FOREIGN KEY ([ProductId]) REFERENCES [Products]([Id]) ON DELETE CASCADE,
    CONSTRAINT [CK_ProductPricing_PointsCost] CHECK ([PointsCost] >= 1 AND [PointsCost] <= 10000000)
);
CREATE INDEX [IX_ProductPricing_ProductId] ON [ProductPricing]([ProductId]);

CREATE TABLE [Events] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [Name] NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(2000) NULL,
    [EventDate] DATETIME2 NOT NULL,
    [Status] INT NOT NULL DEFAULT 0,
    [TotalPointsPool] DECIMAL(18,2) NULL,
    [Location] NVARCHAR(500) NULL,
    [MaxParticipants] INT NULL,
    [RegistrationEndDate] DATETIME2 NULL,
    [BannerImageUrl] NVARCHAR(1000) NULL,
    [PointsPerParticipant] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [DistributedPoints] DECIMAL(18,2) NOT NULL DEFAULT 0,
    [RowVersion] ROWVERSION NOT NULL,
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
    [EventRank] INT NULL,
    [RegisteredAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [AwardedAt] DATETIME2 NULL,
    [AwardedBy] UNIQUEIDENTIFIER NULL,
    [AttendanceStatus] INT NOT NULL DEFAULT 0,
    [CheckedInAt] DATETIME2 NULL,
    CONSTRAINT [FK_EventParticipants_Events] FOREIGN KEY ([EventId]) REFERENCES [Events]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_EventParticipants_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE NO ACTION,
    CONSTRAINT [UQ_EventParticipants_EventUser] UNIQUE ([EventId], [UserId]),
    CONSTRAINT [CK_EventParticipants_AttendanceStatus] CHECK ([AttendanceStatus] IN (0, 1, 2)),
    CONSTRAINT [CK_EventParticipants_RankTop3OrNull] CHECK ([EventRank] IS NULL OR ([EventRank] >= 1 AND [EventRank] <= 3))
);

CREATE TABLE [Redemptions] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [ProductId] UNIQUEIDENTIFIER NOT NULL,
    [PointsSpent] INT NOT NULL,
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

DECLARE @AdminRoleId UNIQUEIDENTIFIER = 'A0000001-0001-0001-0001-000000000001';
DECLARE @EmployeeRoleId UNIQUEIDENTIFIER = 'A0000001-0001-0001-0001-000000000002';

INSERT INTO [Roles] ([Id], [Name], [Description], [IsActive])
VALUES
(@AdminRoleId, 'Admin', 'System administrator with full access to all features', 1),
(@EmployeeRoleId, 'Employee', 'Standard employee with access to rewards and redemption', 1);

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
DECLARE @User11Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000011';
DECLARE @User12Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000012';
DECLARE @User13Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000013';
DECLARE @User14Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000014';
DECLARE @User15Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000015';
DECLARE @User16Id UNIQUEIDENTIFIER = 'C0000001-0001-0001-0001-000000000016';

INSERT INTO [Users] ([Id], [EmployeeId], [Email], [FirstName], [LastName], [PasswordHash], [IsActive], [MustChangePassword], [LastPasswordChangedAt], [CreatedAt], [UpdatedAt])
VALUES
(@Admin1Id, 'ADM100001', 'admin.master@agdata.com', 'Michael', 'Anderson', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-11-15 08:30:00', '2025-11-10 09:00:00', '2025-11-15 08:30:00'),
(@Admin2Id, 'ADM200002', 'sarah.admin@agdata.com', 'Sarah', 'Williams', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-11-18 10:15:00', '2025-11-12 11:00:00', '2025-11-18 10:15:00'),
(@User01Id, 'EMP100001', 'james.miller@agdata.com', 'James', 'Miller', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-11-20 14:00:00', '2025-11-15 08:00:00', '2025-11-20 14:00:00'),
(@User02Id, 'EMP200002', 'emily.johnson@agdata.com', 'Emily', 'Johnson', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-11-22 09:30:00', '2025-11-16 09:00:00', '2025-11-22 09:30:00'),
(@User03Id, 'EMP300003', 'david.brown@agdata.com', 'David', 'Brown', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-11-25 11:00:00', '2025-11-18 10:00:00', '2025-11-25 11:00:00'),
(@User04Id, 'EMP400004', 'olivia.davis@agdata.com', 'Olivia', 'Davis', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-11-28 15:45:00', '2025-11-20 08:30:00', '2025-11-28 15:45:00'),
(@User05Id, 'EMP500005', 'william.wilson@agdata.com', 'William', 'Wilson', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-12-01 10:00:00', '2025-11-22 09:00:00', '2025-12-01 10:00:00'),
(@User06Id, 'EMP600006', 'sophia.taylor@agdata.com', 'Sophia', 'Taylor', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-12-05 14:30:00', '2025-11-25 10:00:00', '2025-12-05 14:30:00'),
(@User07Id, 'EMP700007', 'benjamin.moore@agdata.com', 'Benjamin', 'Moore', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-12-08 09:00:00', '2025-11-28 11:00:00', '2025-12-08 09:00:00'),
(@User08Id, 'EMP800008', 'isabella.white@agdata.com', 'Isabella', 'White', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-12-12 16:00:00', '2025-12-01 08:00:00', '2025-12-12 16:00:00'),
(@User09Id, 'EMP900009', 'alexander.harris@agdata.com', 'Alexander', 'Harris', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-12-15 11:30:00', '2025-12-05 09:00:00', '2025-12-15 11:30:00'),
(@User10Id, 'EMP100010', 'charlotte.martin@agdata.com', 'Charlotte', 'Martin', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-12-18 08:45:00', '2025-12-08 10:00:00', '2025-12-18 08:45:00'),
(@User11Id, 'EMP110011', 'daniel.thompson@agdata.com', 'Daniel', 'Thompson', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-12-22 10:00:00', '2025-12-12 09:00:00', '2025-12-22 10:00:00'),
(@User12Id, 'EMP120012', 'amelia.garcia@agdata.com', 'Amelia', 'Garcia', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-12-25 14:00:00', '2025-12-15 08:30:00', '2025-12-25 14:00:00'),
(@User13Id, 'EMP130013', 'matthew.martinez@agdata.com', 'Matthew', 'Martinez', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2025-12-28 09:30:00', '2025-12-18 10:00:00', '2025-12-28 09:30:00'),
(@User14Id, 'EMP140014', 'harper.robinson@agdata.com', 'Harper', 'Robinson', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2026-01-02 11:00:00', '2025-12-22 09:00:00', '2026-01-02 11:00:00'),
(@User15Id, 'EMP150015', 'ethan.clark@agdata.com', 'Ethan', 'Clark', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2026-01-05 15:00:00', '2025-12-25 10:30:00', '2026-01-05 15:00:00'),
(@User16Id, 'EMP160016', 'evelyn.lewis@agdata.com', 'Evelyn', 'Lewis', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.Lr/7FnN8HY1FZm', 1, 0, '2026-01-08 10:00:00', '2025-12-28 11:00:00', '2026-01-08 10:00:00');

INSERT INTO [UserRoleAssignments] ([UserId], [RoleId], [AssignedBy], [AssignedAt])
VALUES
(@Admin1Id, @AdminRoleId, @Admin1Id, '2025-11-10 09:00:00'),
(@Admin2Id, @AdminRoleId, @Admin1Id, '2025-11-12 11:00:00'),
(@User01Id, @EmployeeRoleId, @Admin1Id, '2025-11-15 08:00:00'),
(@User02Id, @EmployeeRoleId, @Admin1Id, '2025-11-16 09:00:00'),
(@User03Id, @EmployeeRoleId, @Admin1Id, '2025-11-18 10:00:00'),
(@User04Id, @EmployeeRoleId, @Admin1Id, '2025-11-20 08:30:00'),
(@User05Id, @EmployeeRoleId, @Admin1Id, '2025-11-22 09:00:00'),
(@User06Id, @EmployeeRoleId, @Admin2Id, '2025-11-25 10:00:00'),
(@User07Id, @EmployeeRoleId, @Admin2Id, '2025-11-28 11:00:00'),
(@User08Id, @EmployeeRoleId, @Admin2Id, '2025-12-01 08:00:00'),
(@User09Id, @EmployeeRoleId, @Admin2Id, '2025-12-05 09:00:00'),
(@User10Id, @EmployeeRoleId, @Admin2Id, '2025-12-08 10:00:00'),
(@User11Id, @EmployeeRoleId, @Admin1Id, '2025-12-12 09:00:00'),
(@User12Id, @EmployeeRoleId, @Admin1Id, '2025-12-15 08:30:00'),
(@User13Id, @EmployeeRoleId, @Admin1Id, '2025-12-18 10:00:00'),
(@User14Id, @EmployeeRoleId, @Admin2Id, '2025-12-22 09:00:00'),
(@User15Id, @EmployeeRoleId, @Admin2Id, '2025-12-25 10:30:00'),
(@User16Id, @EmployeeRoleId, @Admin2Id, '2025-12-28 11:00:00');

DECLARE @Cat01Id UNIQUEIDENTIFIER = 'E0000001-0001-0001-0001-000000000001';
DECLARE @Cat02Id UNIQUEIDENTIFIER = 'E0000001-0001-0001-0001-000000000002';
DECLARE @Cat03Id UNIQUEIDENTIFIER = 'E0000001-0001-0001-0001-000000000003';
DECLARE @Cat04Id UNIQUEIDENTIFIER = 'E0000001-0001-0001-0001-000000000004';
DECLARE @Cat05Id UNIQUEIDENTIFIER = 'E0000001-0001-0001-0001-000000000005';
DECLARE @Cat06Id UNIQUEIDENTIFIER = 'E0000001-0001-0001-0001-000000000006';
DECLARE @Cat07Id UNIQUEIDENTIFIER = 'E0000001-0001-0001-0001-000000000007';

INSERT INTO [ProductCategories] ([Id], [Name], [Description], [DisplayOrder], [IsActive])
VALUES
(@Cat01Id, 'Electronics', 'Electronic devices and gadgets including headphones speakers and accessories', 1, 1),
(@Cat02Id, 'Gift Cards', 'Digital and physical gift cards for popular retailers and services', 2, 1),
(@Cat03Id, 'Office Supplies', 'Premium office supplies and desk accessories for productivity', 3, 1),
(@Cat04Id, 'Wellness', 'Health and wellness products including fitness equipment and self care items', 4, 1),
(@Cat05Id, 'Apparel', 'Company branded clothing and merchandise including shirts and jackets', 5, 1),
(@Cat06Id, 'Experience', 'Unique experiences and activities including dining and entertainment vouchers', 6, 1),
(@Cat07Id, 'Home Office', 'Work from home essentials including ergonomic furniture and lighting', 7, 1);

DECLARE @Prod01Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000001';
DECLARE @Prod02Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000002';
DECLARE @Prod03Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000003';
DECLARE @Prod04Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000004';
DECLARE @Prod05Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000005';
DECLARE @Prod06Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000006';
DECLARE @Prod07Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000007';
DECLARE @Prod08Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000008';
DECLARE @Prod09Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000009';
DECLARE @Prod10Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000010';
DECLARE @Prod11Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000011';
DECLARE @Prod12Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000012';
DECLARE @Prod13Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000013';
DECLARE @Prod14Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000014';
DECLARE @Prod15Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000015';
DECLARE @Prod16Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000016';
DECLARE @Prod17Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000017';
DECLARE @Prod18Id UNIQUEIDENTIFIER = 'F0000001-0001-0001-0001-000000000018';

INSERT INTO [Products] ([Id], [Name], [Description], [CategoryId], [ImageUrl], [IsActive], [DeactivationReason], [CreatedAt], [UpdatedAt], [CreatedBy])
VALUES
(@Prod01Id, 'Wireless Headphones', 'Premium noise cancelling wireless headphones with exceptional sound quality and comfortable over ear design perfect for long listening sessions and conference calls', @Cat01Id, 'https://images.example.com/headphones.jpg', 1, NULL, '2025-11-20 10:00:00', '2025-11-20 10:00:00', @Admin1Id),
(@Prod02Id, 'Amazon Gift Card', 'Digital Amazon gift card delivered via email perfect for purchasing millions of items across all categories with no expiration date and easy redemption process', @Cat02Id, 'https://images.example.com/amazon-gc.jpg', 1, NULL, '2025-11-20 10:15:00', '2025-11-20 10:15:00', @Admin1Id),
(@Prod03Id, 'Premium Notebook Set', 'High quality leather bound notebook set with lined pages and pen holder includes three notebooks in different sizes ideal for meetings and personal notes', @Cat03Id, 'https://images.example.com/notebook.jpg', 1, NULL, '2025-11-22 09:00:00', '2025-11-22 09:00:00', @Admin1Id),
(@Prod04Id, 'Fitness Tracker', 'Advanced fitness tracker with heart rate monitoring sleep tracking and water resistance perfect for tracking daily activity goals and workouts', @Cat04Id, 'https://images.example.com/fitness.jpg', 1, NULL, '2025-11-25 11:30:00', '2025-11-25 11:30:00', @Admin1Id),
(@Prod05Id, 'Company Jacket', 'Premium quality branded company jacket with embroidered logo water resistant material and multiple pockets perfect for outdoor events and daily wear', @Cat05Id, 'https://images.example.com/jacket.jpg', 1, NULL, '2025-11-28 14:00:00', '2025-11-28 14:00:00', @Admin2Id),
(@Prod06Id, 'Restaurant Voucher', 'Fine dining experience voucher redeemable at partner restaurants across the city includes appetizer main course and dessert for two people', @Cat06Id, 'https://images.example.com/dining.jpg', 1, NULL, '2025-12-01 09:30:00', '2025-12-01 09:30:00', @Admin2Id),
(@Prod07Id, 'Ergonomic Chair', 'Professional ergonomic office chair with lumbar support adjustable armrests and breathable mesh back designed for all day comfort and posture support', @Cat07Id, 'https://images.example.com/chair.jpg', 1, NULL, '2025-12-05 10:00:00', '2025-12-05 10:00:00', @Admin1Id),
(@Prod08Id, 'Bluetooth Speaker', 'Portable waterproof bluetooth speaker with powerful bass and twelve hour battery life perfect for outdoor activities and home entertainment', @Cat01Id, 'https://images.example.com/speaker.jpg', 1, NULL, '2025-12-08 11:00:00', '2025-12-08 11:00:00', @Admin1Id),
(@Prod09Id, 'Starbucks Gift Card', 'Digital Starbucks gift card for coffee lovers can be used at any Starbucks location for drinks food and merchandise with mobile app integration', @Cat02Id, 'https://images.example.com/starbucks.jpg', 1, NULL, '2025-12-10 09:00:00', '2025-12-10 09:00:00', @Admin2Id),
(@Prod10Id, 'Desk Organizer', 'Multi compartment desk organizer made from sustainable bamboo with slots for phone tablet pens and other office essentials keeps workspace tidy', @Cat03Id, 'https://images.example.com/organizer.jpg', 1, NULL, '2025-12-12 14:30:00', '2025-12-12 14:30:00', @Admin2Id),
(@Prod11Id, 'Yoga Mat Bundle', 'Professional grade yoga mat with carrying bag and resistance bands includes instructional guide for beginners and advanced practitioners alike', @Cat04Id, 'https://images.example.com/yoga.jpg', 1, NULL, '2025-12-15 10:00:00', '2025-12-15 10:00:00', @Admin1Id),
(@Prod12Id, 'Branded Polo Shirt', 'High quality cotton polo shirt with embroidered company logo available in multiple colors comfortable breathable fabric perfect for casual fridays', @Cat05Id, 'https://images.example.com/polo.jpg', 1, NULL, '2025-12-18 11:30:00', '2025-12-18 11:30:00', @Admin1Id),
(@Prod13Id, 'Movie Experience', 'Premium movie theater experience for two including tickets large popcorn and drinks at partner cinema locations valid for any showing', @Cat06Id, 'https://images.example.com/movie.jpg', 1, NULL, '2025-12-20 09:45:00', '2025-12-20 09:45:00', @Admin2Id),
(@Prod14Id, 'Monitor Light Bar', 'LED monitor light bar with adjustable brightness and color temperature reduces eye strain during long work sessions with touch controls', @Cat07Id, 'https://images.example.com/lightbar.jpg', 1, NULL, '2025-12-22 15:00:00', '2025-12-22 15:00:00', @Admin2Id),
(@Prod15Id, 'Smart Watch', 'Advanced smart watch with notifications fitness tracking and customizable watch faces water resistant with week long battery life', @Cat01Id, 'https://images.example.com/smartwatch.jpg', 1, NULL, '2025-12-25 10:30:00', '2025-12-25 10:30:00', @Admin1Id),
(@Prod16Id, 'Standing Desk', 'Electric height adjustable standing desk with memory presets and cable management system promotes healthy work habits with smooth quiet operation', @Cat07Id, 'https://images.example.com/desk.jpg', 0, 'Product discontinued by manufacturer no longer available for restocking', '2025-12-28 09:00:00', '2026-01-15 14:00:00', @Admin1Id),
(@Prod17Id, 'Wireless Mouse', 'Ergonomic wireless mouse with precision tracking rechargeable battery and comfortable grip designed for all day productivity and reduced hand strain', @Cat03Id, 'https://images.example.com/mouse.jpg', 1, NULL, '2026-01-08 10:00:00', '2026-01-08 10:00:00', @Admin2Id),
(@Prod18Id, 'Coffee Maker', 'Premium programmable coffee maker with thermal carafe and brew strength control makes twelve cups and keeps coffee hot for hours', @Cat07Id, 'https://images.example.com/coffee.jpg', 0, 'Low demand product being replaced with newer model in next quarter', '2026-01-12 09:00:00', '2026-01-30 11:00:00', @Admin1Id);

INSERT INTO [InventoryItems] ([Id], [ProductId], [QuantityAvailable], [QuantityReserved], [CurrentStock])
VALUES
(NEWID(), @Prod01Id, 45, 2, 45),
(NEWID(), @Prod02Id, 500, 5, 500),
(NEWID(), @Prod03Id, 120, 0, 120),
(NEWID(), @Prod04Id, 35, 3, 35),
(NEWID(), @Prod05Id, 80, 1, 80),
(NEWID(), @Prod06Id, 60, 0, 60),
(NEWID(), @Prod07Id, 15, 2, 15),
(NEWID(), @Prod08Id, 95, 0, 95),
(NEWID(), @Prod09Id, 300, 4, 300),
(NEWID(), @Prod10Id, 150, 0, 150),
(NEWID(), @Prod11Id, 40, 1, 40),
(NEWID(), @Prod12Id, 200, 0, 200),
(NEWID(), @Prod13Id, 75, 0, 75),
(NEWID(), @Prod14Id, 55, 0, 55),
(NEWID(), @Prod15Id, 25, 2, 25),
(NEWID(), @Prod16Id, 8, 0, 8),
(NEWID(), @Prod17Id, 180, 0, 180),
(NEWID(), @Prod18Id, 5, 0, 5);

INSERT INTO [ProductPricing] ([Id], [ProductId], [PointsCost], [EffectiveFrom])
VALUES
(NEWID(), @Prod01Id, 1500, '2025-11-20 10:00:00'),
(NEWID(), @Prod02Id, 500, '2025-11-20 10:15:00'),
(NEWID(), @Prod03Id, 350, '2025-11-22 09:00:00'),
(NEWID(), @Prod04Id, 800, '2025-11-25 11:30:00'),
(NEWID(), @Prod05Id, 600, '2025-11-28 14:00:00'),
(NEWID(), @Prod06Id, 1200, '2025-12-01 09:30:00'),
(NEWID(), @Prod07Id, 2500, '2025-12-05 10:00:00'),
(NEWID(), @Prod08Id, 450, '2025-12-08 11:00:00'),
(NEWID(), @Prod09Id, 250, '2025-12-10 09:00:00'),
(NEWID(), @Prod10Id, 300, '2025-12-12 14:30:00'),
(NEWID(), @Prod11Id, 400, '2025-12-15 10:00:00'),
(NEWID(), @Prod12Id, 350, '2025-12-18 11:30:00'),
(NEWID(), @Prod13Id, 550, '2025-12-20 09:45:00'),
(NEWID(), @Prod14Id, 650, '2025-12-22 15:00:00'),
(NEWID(), @Prod15Id, 2000, '2025-12-25 10:30:00'),
(NEWID(), @Prod16Id, 5000, '2025-12-28 09:00:00'),
(NEWID(), @Prod17Id, 280, '2026-01-08 10:00:00'),
(NEWID(), @Prod18Id, 720, '2026-01-12 09:00:00');

DECLARE @Event01Id UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000001';
DECLARE @Event02Id UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000002';
DECLARE @Event03Id UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000003';
DECLARE @Event04Id UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000004';
DECLARE @Event05Id UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000005';
DECLARE @Event06Id UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000006';
DECLARE @Event07Id UNIQUEIDENTIFIER = 'AA000001-0001-0001-0001-000000000007';

INSERT INTO [Events] ([Id], [Name], [Description], [EventDate], [Status], [TotalPointsPool], [Location], [MaxParticipants], [RegistrationEndDate], [DistributedPoints], [PointsPerParticipant], [CreatedAt], [UpdatedAt], [CreatedBy])
VALUES
(@Event01Id, 'Sales Excellence Q4', 'Annual sales excellence recognition event celebrating top performers who exceeded their quarterly targets with outstanding customer engagement and revenue generation throughout Q4', '2025-12-15 14:00:00', 2, 6500.00, 'Main Conference Hall Building A', 50, '2025-12-10 23:59:59', 6500.00, 0, '2025-12-01 09:00:00', '2025-12-15 17:00:00', @Admin1Id),
(@Event02Id, 'Innovation Challenge 2025', 'Company wide innovation challenge where teams compete to develop creative solutions for improving operational efficiency and customer experience with prizes for top ideas', '2025-12-20 10:00:00', 2, 12000.00, 'Innovation Lab Floor 3', 30, '2025-12-15 23:59:59', 12000.00, 0, '2025-12-10 10:30:00', '2025-12-20 16:00:00', @Admin1Id),
(@Event03Id, 'Holiday Charity Drive', 'Annual holiday season charity fundraiser event supporting local community organizations with volunteer opportunities and donation matching programs for employees', '2026-01-10 09:00:00', 2, 1500.00, 'Community Center Downtown', 100, '2026-01-05 23:59:59', 1500.00, 100.00, '2025-12-25 11:00:00', '2026-01-10 15:00:00', @Admin2Id),
(@Event04Id, 'Technical Workshop Series', 'Professional development workshop series covering latest technology trends cloud computing and software development best practices for engineering teams', '2026-01-25 09:00:00', 2, 9500.00, 'Training Room B2', 40, '2026-01-20 23:59:59', 9500.00, 0, '2026-01-05 14:00:00', '2026-01-25 16:00:00', @Admin1Id),
(@Event05Id, 'Team Building Retreat', 'Outdoor team building retreat with collaborative activities designed to strengthen interdepartmental relationships and improve communication skills across teams', '2026-02-15 08:00:00', 0, 6000.00, 'Mountain Resort Conference Center', 60, '2026-02-10 23:59:59', 0, 100.00, '2026-01-20 09:30:00', '2026-01-20 09:30:00', @Admin2Id),
(@Event06Id, 'Leadership Summit', 'Executive leadership summit bringing together senior leaders to discuss strategic initiatives and organizational development plans for the upcoming fiscal year', '2026-02-20 09:00:00', 0, 20000.00, 'Executive Board Room', 25, '2026-02-15 23:59:59', 0, 0, '2026-01-25 10:00:00', '2026-01-25 10:00:00', @Admin1Id),
(@Event07Id, 'Customer Service Awards', 'Recognition ceremony honoring employees who demonstrated exceptional customer service throughout the year with testimonials and appreciation awards', '2026-02-12 14:00:00', 0, 9000.00, 'Auditorium Building C', 45, '2026-02-01 23:59:59', 0, 0, '2026-01-10 11:00:00', '2026-01-10 11:00:00', @Admin1Id);

INSERT INTO [PrizeTiers] ([Id], [EventId], [Rank], [Points])
VALUES
(NEWID(), @Event01Id, 1, 3000),
(NEWID(), @Event01Id, 2, 2000),
(NEWID(), @Event01Id, 3, 1500),
(NEWID(), @Event02Id, 1, 5000),
(NEWID(), @Event02Id, 2, 4000),
(NEWID(), @Event02Id, 3, 3000),
(NEWID(), @Event04Id, 1, 4000),
(NEWID(), @Event04Id, 2, 3000),
(NEWID(), @Event04Id, 3, 2500),
(NEWID(), @Event06Id, 1, 8000),
(NEWID(), @Event06Id, 2, 7000),
(NEWID(), @Event06Id, 3, 5000),
(NEWID(), @Event07Id, 1, 4000),
(NEWID(), @Event07Id, 2, 3000),
(NEWID(), @Event07Id, 3, 2000);

DECLARE @Part01Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000001';
DECLARE @Part02Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000002';
DECLARE @Part03Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000003';
DECLARE @Part04Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000004';
DECLARE @Part05Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000005';
DECLARE @Part06Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000006';
DECLARE @Part07Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000007';
DECLARE @Part08Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000008';
DECLARE @Part09Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000009';
DECLARE @Part10Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000010';
DECLARE @Part11Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000011';
DECLARE @Part12Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000012';
DECLARE @Part13Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000013';
DECLARE @Part14Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000014';
DECLARE @Part15Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000015';
DECLARE @Part16Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000016';
DECLARE @Part17Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000017';
DECLARE @Part18Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000018';
DECLARE @Part19Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000019';
DECLARE @Part20Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000020';
DECLARE @Part21Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000021';
DECLARE @Part22Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000022';
DECLARE @Part23Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000023';
DECLARE @Part24Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000024';
DECLARE @Part25Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000025';
DECLARE @Part26Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000026';
DECLARE @Part27Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000027';
DECLARE @Part28Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000028';
DECLARE @Part29Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000029';
DECLARE @Part30Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000030';
DECLARE @Part31Id UNIQUEIDENTIFIER = 'BB000001-0001-0001-0001-000000000031';

INSERT INTO [EventParticipants] ([Id], [EventId], [UserId], [PointsAwarded], [EventRank], [RegisteredAt], [AwardedAt], [AwardedBy], [AttendanceStatus], [CheckedInAt])
VALUES
(@Part01Id, @Event01Id, @User01Id, 3000.00, 1, '2025-12-05 10:00:00', '2025-12-15 16:00:00', @Admin1Id, 1, '2025-12-15 13:45:00'),
(@Part02Id, @Event01Id, @User02Id, 2000.00, 2, '2025-12-06 11:30:00', '2025-12-15 16:00:00', @Admin1Id, 1, '2025-12-15 13:50:00'),
(@Part03Id, @Event01Id, @User03Id, 1500.00, 3, '2025-12-08 09:00:00', '2025-12-15 16:00:00', @Admin1Id, 1, '2025-12-15 13:55:00'),
(@Part04Id, @Event01Id, @User04Id, 0, NULL, '2025-12-09 14:00:00', NULL, NULL, 1, '2025-12-15 14:00:00'),
(@Part05Id, @Event01Id, @User05Id, 0, NULL, '2025-12-09 10:30:00', NULL, NULL, 1, '2025-12-15 14:05:00'),
(@Part06Id, @Event01Id, @User06Id, 0, NULL, '2025-12-10 15:00:00', NULL, NULL, 1, '2025-12-15 14:10:00'),
(@Part07Id, @Event02Id, @User03Id, 5000.00, 1, '2025-12-12 10:00:00', '2025-12-20 15:30:00', @Admin1Id, 1, '2025-12-20 09:45:00'),
(@Part08Id, @Event02Id, @User07Id, 4000.00, 2, '2025-12-14 14:30:00', '2025-12-20 15:30:00', @Admin1Id, 1, '2025-12-20 09:50:00'),
(@Part09Id, @Event02Id, @User11Id, 3000.00, 3, '2025-12-15 09:00:00', '2025-12-20 15:30:00', @Admin1Id, 1, '2025-12-20 09:55:00'),
(@Part10Id, @Event03Id, @User01Id, 100.00, NULL, '2026-01-01 10:00:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 08:45:00'),
(@Part11Id, @Event03Id, @User02Id, 100.00, NULL, '2026-01-02 11:30:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 08:50:00'),
(@Part12Id, @Event03Id, @User04Id, 100.00, NULL, '2026-01-03 09:00:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 08:55:00'),
(@Part13Id, @Event03Id, @User05Id, 100.00, NULL, '2026-01-04 14:00:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:00:00'),
(@Part14Id, @Event03Id, @User06Id, 100.00, NULL, '2026-01-05 10:30:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:05:00'),
(@Part15Id, @Event03Id, @User07Id, 100.00, NULL, '2026-01-05 15:00:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:10:00'),
(@Part16Id, @Event03Id, @User08Id, 100.00, NULL, '2026-01-06 11:00:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:15:00'),
(@Part17Id, @Event03Id, @User09Id, 100.00, NULL, '2026-01-06 09:30:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:20:00'),
(@Part18Id, @Event03Id, @User10Id, 100.00, NULL, '2026-01-07 14:00:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:25:00'),
(@Part19Id, @Event03Id, @User11Id, 100.00, NULL, '2026-01-07 10:00:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:30:00'),
(@Part20Id, @Event03Id, @User12Id, 100.00, NULL, '2026-01-08 11:30:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:35:00'),
(@Part21Id, @Event03Id, @User13Id, 100.00, NULL, '2026-01-08 14:30:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:45:00'),
(@Part22Id, @Event03Id, @User14Id, 100.00, NULL, '2026-01-09 10:00:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:50:00'),
(@Part23Id, @Event03Id, @User15Id, 100.00, NULL, '2026-01-09 11:00:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 09:55:00'),
(@Part24Id, @Event03Id, @User16Id, 100.00, NULL, '2026-01-09 09:30:00', '2026-01-10 14:00:00', @Admin2Id, 1, '2026-01-10 10:00:00'),
(@Part25Id, @Event04Id, @User01Id, 4000.00, 1, '2026-01-10 10:00:00', '2026-01-25 15:00:00', @Admin1Id, 1, '2026-01-25 08:45:00'),
(@Part26Id, @Event04Id, @User04Id, 3000.00, 2, '2026-01-12 14:00:00', '2026-01-25 15:00:00', @Admin1Id, 1, '2026-01-25 08:50:00'),
(@Part27Id, @Event04Id, @User09Id, 2500.00, 3, '2026-01-15 09:30:00', '2026-01-25 15:00:00', @Admin1Id, 1, '2026-01-25 08:55:00'),
(@Part28Id, @Event04Id, @User11Id, 0, NULL, '2026-01-18 11:00:00', NULL, NULL, 1, '2026-01-25 09:00:00'),
(@Part29Id, @Event04Id, @User13Id, 0, NULL, '2026-01-20 15:30:00', NULL, NULL, 1, '2026-01-25 09:05:00'),
(@Part30Id, @Event05Id, @User02Id, 0, NULL, '2026-02-05 10:00:00', NULL, NULL, 0, NULL),
(@Part31Id, @Event05Id, @User03Id, 0, NULL, '2026-02-08 14:00:00', NULL, NULL, 0, NULL);

DECLARE @Red01Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000001';
DECLARE @Red02Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000002';
DECLARE @Red03Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000003';
DECLARE @Red04Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000004';
DECLARE @Red05Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000005';
DECLARE @Red06Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000006';
DECLARE @Red07Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000007';
DECLARE @Red08Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000008';
DECLARE @Red09Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000009';
DECLARE @Red10Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000010';
DECLARE @Red11Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000011';
DECLARE @Red12Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000012';
DECLARE @Red13Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000013';
DECLARE @Red14Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000014';
DECLARE @Red15Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000015';
DECLARE @Red16Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000016';
DECLARE @Red17Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000017';
DECLARE @Red18Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000018';
DECLARE @Red19Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000019';
DECLARE @Red20Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000020';
DECLARE @Red21Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000021';
DECLARE @Red22Id UNIQUEIDENTIFIER = 'CC000001-0001-0001-0001-000000000022';

INSERT INTO [Redemptions] ([Id], [UserId], [ProductId], [PointsSpent], [Quantity], [Status], [AdminNotes], [ApprovedBy], [ApprovedAt], [DeliveredBy], [DeliveredAt], [CreatedAt], [UpdatedAt])
VALUES
(@Red01Id, @User01Id, @Prod02Id, 500, 1, 'Delivered', 'Gift card code sent via email', @Admin1Id, '2026-01-02 10:00:00', @Admin1Id, '2026-01-02 10:30:00', '2026-01-01 14:00:00', '2026-01-02 10:30:00'),
(@Red02Id, @User02Id, @Prod03Id, 350, 1, 'Delivered', 'Notebook set shipped to desk', @Admin1Id, '2026-01-05 14:00:00', @Admin2Id, '2026-01-10 09:00:00', '2026-01-04 10:30:00', '2026-01-10 09:00:00'),
(@Red03Id, @User03Id, @Prod02Id, 500, 1, 'Delivered', 'Amazon code sent via email', @Admin1Id, '2025-12-28 10:00:00', @Admin1Id, '2025-12-28 10:30:00', '2025-12-27 14:00:00', '2025-12-28 10:30:00'),
(@Red04Id, @User04Id, @Prod05Id, 600, 1, 'Approved', 'Jacket size L awaiting shipment', @Admin1Id, '2026-01-30 10:00:00', NULL, NULL, '2026-01-28 09:00:00', '2026-01-30 10:00:00'),
(@Red05Id, @User05Id, @Prod09Id, 250, 1, 'Delivered', 'Starbucks card activated and sent', @Admin1Id, '2026-01-10 15:00:00', @Admin1Id, '2026-01-10 15:30:00', '2026-01-09 10:00:00', '2026-01-10 15:30:00'),
(@Red06Id, @User06Id, @Prod02Id, 500, 1, 'Delivered', 'Amazon code emailed successfully', @Admin1Id, '2026-01-12 11:30:00', @Admin1Id, '2026-01-12 12:00:00', '2026-01-11 16:00:00', '2026-01-12 12:00:00'),
(@Red07Id, @User07Id, @Prod09Id, 250, 1, 'Delivered', 'Coffee card sent to employee email', @Admin2Id, '2026-01-08 14:00:00', @Admin2Id, '2026-01-08 14:30:00', '2026-01-06 11:00:00', '2026-01-08 14:30:00'),
(@Red08Id, @User08Id, @Prod02Id, 500, 1, 'Delivered', 'Amazon gift card delivered', @Admin1Id, '2026-01-15 09:00:00', @Admin1Id, '2026-01-15 09:30:00', '2026-01-14 14:30:00', '2026-01-15 09:30:00'),
(@Red09Id, @User10Id, @Prod12Id, 350, 1, 'Delivered', 'Polo shirt size M shipped', @Admin1Id, '2026-01-20 11:00:00', @Admin1Id, '2026-01-25 10:00:00', '2026-01-18 14:00:00', '2026-01-25 10:00:00'),
(@Red10Id, @User11Id, @Prod02Id, 500, 1, 'Delivered', 'Gift card code delivered successfully', @Admin2Id, '2026-01-18 15:00:00', @Admin2Id, '2026-01-18 15:30:00', '2026-01-16 11:00:00', '2026-01-18 15:30:00'),
(@Red11Id, @User12Id, @Prod09Id, 250, 1, 'Delivered', 'Coffee card activated successfully', @Admin2Id, '2026-01-22 14:00:00', @Admin2Id, '2026-01-22 14:30:00', '2026-01-20 11:00:00', '2026-01-22 14:30:00'),
(@Red12Id, @User14Id, @Prod02Id, 500, 1, 'Delivered', 'Amazon gift card sent via email', @Admin1Id, '2026-01-28 11:30:00', @Admin1Id, '2026-01-28 12:00:00', '2026-01-26 14:00:00', '2026-01-28 12:00:00'),
(@Red13Id, @User16Id, @Prod09Id, 250, 1, 'Delivered', 'Starbucks card sent successfully', @Admin1Id, '2026-01-25 09:30:00', @Admin1Id, '2026-01-25 10:00:00', '2026-01-23 14:00:00', '2026-01-25 10:00:00'),
(@Red14Id, @User03Id, @Prod05Id, 600, 1, 'Delivered', 'Company jacket delivered to desk', @Admin2Id, '2026-01-15 09:00:00', @Admin2Id, '2026-01-20 10:00:00', '2026-01-13 11:00:00', '2026-01-20 10:00:00'),
(@Red15Id, @User05Id, @Prod10Id, 300, 1, 'Delivered', 'Desk organizer shipped successfully', @Admin2Id, '2026-01-18 10:30:00', @Admin2Id, '2026-01-22 09:00:00', '2026-01-16 09:00:00', '2026-01-22 09:00:00'),
(@Red16Id, @User01Id, @Prod09Id, 250, 1, 'Delivered', 'Coffee card activated', @Admin1Id, '2026-01-08 11:00:00', @Admin1Id, '2026-01-08 11:30:00', '2026-01-07 09:30:00', '2026-01-08 11:30:00'),
(@Red17Id, @User01Id, @Prod10Id, 300, 1, 'Pending', NULL, NULL, NULL, NULL, NULL, '2026-02-01 10:00:00', '2026-02-01 10:00:00'),
(@Red18Id, @User02Id, @Prod09Id, 250, 1, 'Pending', NULL, NULL, NULL, NULL, NULL, '2026-02-02 09:30:00', '2026-02-02 09:30:00'),
(@Red19Id, @User07Id, @Prod15Id, 2000, 1, 'Pending', NULL, NULL, NULL, NULL, NULL, '2026-02-02 10:30:00', '2026-02-02 10:30:00'),
(@Red20Id, @User13Id, @Prod03Id, 350, 1, 'Pending', NULL, NULL, NULL, NULL, NULL, '2026-02-03 11:00:00', '2026-02-03 11:00:00');

INSERT INTO [UserPointsAccounts] ([Id], [UserId], [CurrentBalance], [TotalEarned], [TotalRedeemed], [LastUpdatedAt])
VALUES
(NEWID(), @Admin1Id, 0, 0, 0, '2025-11-10 09:00:00'),
(NEWID(), @Admin2Id, 0, 0, 0, '2025-11-12 11:00:00'),
('D0000001-0001-0001-0001-000000000001', @User01Id, 6700.00, 7950.00, 1250.00, '2026-01-28 14:30:00'),
('D0000001-0001-0001-0001-000000000002', @User02Id, 1600.00, 2200.00, 600.00, '2026-01-25 10:00:00'),
('D0000001-0001-0001-0001-000000000003', @User03Id, 5800.00, 7000.00, 1200.00, '2026-01-20 16:45:00'),
('D0000001-0001-0001-0001-000000000004', @User04Id, 2900.00, 3500.00, 600.00, '2026-01-30 09:15:00'),
('D0000001-0001-0001-0001-000000000005', @User05Id, 750.00, 1300.00, 550.00, '2026-01-22 11:30:00'),
('D0000001-0001-0001-0001-000000000006', @User06Id, 800.00, 1300.00, 500.00, '2026-01-18 15:00:00'),
('D0000001-0001-0001-0001-000000000007', @User07Id, 4150.00, 4400.00, 250.00, '2026-01-29 08:45:00'),
('D0000001-0001-0001-0001-000000000008', @User08Id, 900.00, 1400.00, 500.00, '2026-01-15 14:20:00'),
('D0000001-0001-0001-0001-000000000009', @User09Id, 2600.00, 2600.00, 0.00, '2026-01-25 15:00:00'),
('D0000001-0001-0001-0001-000000000010', @User10Id, 550.00, 900.00, 350.00, '2026-01-25 16:00:00'),
('D0000001-0001-0001-0001-000000000011', @User11Id, 2700.00, 3200.00, 500.00, '2026-01-18 15:30:00'),
('D0000001-0001-0001-0001-000000000012', @User12Id, 550.00, 800.00, 250.00, '2026-01-22 14:30:00'),
('D0000001-0001-0001-0001-000000000013', @User13Id, 200.00, 200.00, 0.00, '2026-01-10 14:00:00'),
('D0000001-0001-0001-0001-000000000014', @User14Id, 700.00, 1200.00, 500.00, '2026-01-28 12:00:00'),
('D0000001-0001-0001-0001-000000000015', @User15Id, 200.00, 200.00, 0.00, '2026-01-10 14:00:00'),
('D0000001-0001-0001-0001-000000000016', @User16Id, 550.00, 800.00, 250.00, '2026-01-25 10:00:00');

INSERT INTO [UserPointsTransactions] ([Id], [UserId], [Points], [TransactionType], [Source], [SourceId], [Description], [BalanceAfter], [Timestamp], [ProcessedBy])
VALUES
(NEWID(), @User01Id, 500.00, 2, 'Admin', NULL, 'Welcome bonus for top sales performer recognition', 500.00, '2025-12-01 09:00:00', @Admin1Id),
(NEWID(), @User01Id, 3000.00, 0, 'Event', @Event01Id, 'Sales Excellence Q4 - Rank 1 Award', 3500.00, '2025-12-15 16:00:00', @Admin1Id),
(NEWID(), @User01Id, -500.00, 1, 'Redemption', @Red01Id, 'Amazon Gift Card redemption', 3000.00, '2026-01-01 14:00:00', @Admin1Id),
(NEWID(), @User01Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 3100.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User01Id, -250.00, 1, 'Redemption', @Red16Id, 'Starbucks Gift Card redemption', 2850.00, '2026-01-07 09:30:00', @Admin1Id),
(NEWID(), @User01Id, 350.00, 2, 'Admin', NULL, 'Quarterly performance bonus recognition', 3200.00, '2026-01-20 10:00:00', @Admin1Id),
(NEWID(), @User01Id, 4000.00, 0, 'Event', @Event04Id, 'Technical Workshop Series - Rank 1 Award', 7200.00, '2026-01-25 15:00:00', @Admin1Id),
(NEWID(), @User01Id, -500.00, 1, 'Redemption', @Red17Id, 'Desk Organizer redemption pending', 6700.00, '2026-02-01 10:00:00', NULL),
(NEWID(), @User02Id, 2000.00, 0, 'Event', @Event01Id, 'Sales Excellence Q4 - Rank 2 Award', 2000.00, '2025-12-15 16:00:00', @Admin1Id),
(NEWID(), @User02Id, -350.00, 1, 'Redemption', @Red02Id, 'Premium Notebook Set redemption', 1650.00, '2026-01-04 10:30:00', @Admin1Id),
(NEWID(), @User02Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 1750.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User02Id, -250.00, 1, 'Redemption', @Red18Id, 'Starbucks Gift Card redemption pending', 1500.00, '2026-02-02 09:30:00', NULL),
(NEWID(), @User02Id, 100.00, 2, 'Admin', NULL, 'Team collaboration excellence bonus', 1600.00, '2026-01-25 10:00:00', @Admin1Id),
(NEWID(), @User03Id, 1500.00, 0, 'Event', @Event01Id, 'Sales Excellence Q4 - Rank 3 Award', 1500.00, '2025-12-15 16:00:00', @Admin1Id),
(NEWID(), @User03Id, 5000.00, 0, 'Event', @Event02Id, 'Innovation Challenge 2025 - 1st Place', 6500.00, '2025-12-20 15:30:00', @Admin1Id),
(NEWID(), @User03Id, -500.00, 1, 'Redemption', @Red03Id, 'Amazon Gift Card redemption', 6000.00, '2025-12-27 14:00:00', @Admin1Id),
(NEWID(), @User03Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 6100.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User03Id, 300.00, 2, 'Admin', NULL, 'Innovation excellence recognition bonus', 6400.00, '2025-12-28 10:00:00', @Admin1Id),
(NEWID(), @User03Id, -600.00, 1, 'Redemption', @Red14Id, 'Company Jacket redemption', 5800.00, '2026-01-13 11:00:00', @Admin2Id),
(NEWID(), @User04Id, 1200.00, 2, 'Admin', NULL, 'New employee onboarding bonus for exceptional first quarter', 1200.00, '2025-11-15 09:00:00', @Admin1Id),
(NEWID(), @User04Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 1300.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User04Id, 3000.00, 0, 'Event', @Event04Id, 'Technical Workshop Series - Rank 2 Award', 4300.00, '2026-01-25 15:00:00', @Admin1Id),
(NEWID(), @User04Id, -800.00, 1, 'Redemption', @Red04Id, 'Company Jacket redemption approved', 3500.00, '2026-01-28 09:00:00', @Admin1Id),
(NEWID(), @User04Id, -600.00, 2, 'Admin', NULL, 'Points adjustment for system correction', 2900.00, '2026-01-30 09:00:00', @Admin1Id),
(NEWID(), @User05Id, 1100.00, 2, 'Admin', NULL, 'Project delivery bonus for on time completion of Q4 goals', 1100.00, '2025-11-20 14:00:00', @Admin1Id),
(NEWID(), @User05Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 1200.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User05Id, -250.00, 1, 'Redemption', @Red05Id, 'Starbucks Gift Card redemption', 950.00, '2026-01-09 10:00:00', @Admin1Id),
(NEWID(), @User05Id, -300.00, 1, 'Redemption', @Red15Id, 'Desk Organizer redemption', 650.00, '2026-01-16 09:00:00', @Admin2Id),
(NEWID(), @User05Id, 100.00, 2, 'Admin', NULL, 'Process improvement contribution bonus', 750.00, '2026-01-22 11:00:00', @Admin1Id),
(NEWID(), @User06Id, 1100.00, 2, 'Admin', NULL, 'Customer retention achievement recognition bonus award', 1100.00, '2025-12-01 10:00:00', @Admin2Id),
(NEWID(), @User06Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 1200.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User06Id, 100.00, 2, 'Admin', NULL, 'Peer recognition excellence award', 1300.00, '2026-01-16 14:00:00', @Admin2Id),
(NEWID(), @User06Id, -500.00, 1, 'Redemption', @Red06Id, 'Amazon Gift Card redemption', 800.00, '2026-01-11 16:00:00', @Admin1Id),
(NEWID(), @User07Id, 4000.00, 0, 'Event', @Event02Id, 'Innovation Challenge 2025 - 2nd Place', 4000.00, '2025-12-20 15:30:00', @Admin1Id),
(NEWID(), @User07Id, -250.00, 1, 'Redemption', @Red07Id, 'Starbucks Gift Card redemption', 3750.00, '2026-01-06 11:00:00', @Admin2Id),
(NEWID(), @User07Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 3850.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User07Id, 300.00, 2, 'Admin', NULL, 'Cross-department collaboration excellence', 4150.00, '2026-01-20 15:00:00', @Admin1Id),
(NEWID(), @User08Id, 1200.00, 2, 'Admin', NULL, 'Training completion bonus for advanced certification program', 1200.00, '2025-12-10 09:00:00', @Admin1Id),
(NEWID(), @User08Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 1300.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User08Id, 100.00, 2, 'Admin', NULL, 'Problem solving excellence recognition', 1400.00, '2026-01-14 10:30:00', @Admin2Id),
(NEWID(), @User08Id, -500.00, 1, 'Redemption', @Red08Id, 'Amazon Gift Card redemption', 900.00, '2026-01-14 14:30:00', @Admin1Id),
(NEWID(), @User09Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 100.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User09Id, 2500.00, 0, 'Event', @Event04Id, 'Technical Workshop Series - Rank 3 Award', 2600.00, '2026-01-25 15:00:00', @Admin1Id),
(NEWID(), @User10Id, 800.00, 2, 'Admin', NULL, 'Quality excellence award for exceptional work during audit', 800.00, '2025-12-15 11:00:00', @Admin1Id),
(NEWID(), @User10Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 900.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User10Id, -350.00, 1, 'Redemption', @Red09Id, 'Branded Polo Shirt redemption', 550.00, '2026-01-18 14:00:00', @Admin1Id),
(NEWID(), @User11Id, 3000.00, 0, 'Event', @Event02Id, 'Innovation Challenge 2025 - 3rd Place', 3000.00, '2025-12-20 15:30:00', @Admin1Id),
(NEWID(), @User11Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 3100.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User11Id, 100.00, 2, 'Admin', NULL, 'Teamwork excellence recognition award', 3200.00, '2026-01-16 09:00:00', @Admin1Id),
(NEWID(), @User11Id, -500.00, 1, 'Redemption', @Red10Id, 'Amazon Gift Card redemption', 2700.00, '2026-01-16 11:00:00', @Admin2Id),
(NEWID(), @User12Id, 600.00, 2, 'Admin', NULL, 'Documentation excellence bonus for process improvements', 600.00, '2025-12-20 10:00:00', @Admin1Id),
(NEWID(), @User12Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 700.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User12Id, 100.00, 2, 'Admin', NULL, 'Team support recognition bonus', 800.00, '2026-01-20 11:00:00', @Admin1Id),
(NEWID(), @User12Id, -250.00, 1, 'Redemption', @Red11Id, 'Starbucks Gift Card redemption', 550.00, '2026-01-20 11:00:00', @Admin2Id),
(NEWID(), @User13Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 100.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User13Id, 100.00, 2, 'Admin', NULL, 'Process improvement contribution recognition', 200.00, '2026-01-18 14:00:00', @Admin2Id),
(NEWID(), @User14Id, 1000.00, 2, 'Admin', NULL, 'New client acquisition bonus for expanding customer base', 1000.00, '2025-12-22 15:00:00', @Admin1Id),
(NEWID(), @User14Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 1100.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User14Id, 100.00, 2, 'Admin', NULL, 'Team collaboration award recognition', 1200.00, '2026-01-19 10:00:00', @Admin1Id),
(NEWID(), @User14Id, -500.00, 1, 'Redemption', @Red12Id, 'Amazon Gift Card redemption', 700.00, '2026-01-26 14:00:00', @Admin1Id),
(NEWID(), @User15Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 100.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User15Id, 100.00, 2, 'Admin', NULL, 'Knowledge sharing session bonus recognition', 200.00, '2026-01-22 10:00:00', @Admin1Id),
(NEWID(), @User16Id, 600.00, 2, 'Admin', NULL, 'Support excellence award for outstanding ticket resolution', 600.00, '2025-12-28 14:00:00', @Admin2Id),
(NEWID(), @User16Id, 100.00, 0, 'Event', @Event03Id, 'Holiday Charity Drive - Participation', 700.00, '2026-01-10 14:00:00', @Admin2Id),
(NEWID(), @User16Id, 100.00, 2, 'Admin', NULL, 'Technical support excellence recognition', 800.00, '2026-01-15 08:30:00', @Admin1Id),
(NEWID(), @User16Id, -250.00, 1, 'Redemption', @Red13Id, 'Starbucks Gift Card redemption', 550.00, '2026-01-23 14:00:00', @Admin1Id);

PRINT '=== VERIFICATION: Balance Reconciliation ===';
SELECT 
    u.FirstName + ' ' + u.LastName AS UserName,
    upa.CurrentBalance AS AccountBalance,
    ISNULL(SUM(upt.Points), 0) AS CalculatedBalance,
    CASE 
        WHEN upa.CurrentBalance = ISNULL(SUM(upt.Points), 0) THEN 'OK'
        ELSE 'MISMATCH'
    END AS Status
FROM Users u
JOIN UserPointsAccounts upa ON u.Id = upa.UserId
LEFT JOIN UserPointsTransactions upt ON u.Id = upt.UserId
WHERE u.Id NOT IN ('B0000001-0001-0001-0001-000000000001', 'B0000001-0001-0001-0001-000000000002')
GROUP BY u.FirstName, u.LastName, upa.CurrentBalance
ORDER BY u.FirstName;

PRINT '=== VERIFICATION: Event Pool Status ===';
SELECT 
    e.Name,
    CASE e.Status WHEN 0 THEN 'Draft' WHEN 1 THEN 'Active' WHEN 2 THEN 'Completed' WHEN 3 THEN 'Cancelled' END AS Status,
    e.TotalPointsPool,
    e.DistributedPoints,
    ISNULL(SUM(ep.PointsAwarded), 0) AS SumAwards,
    CASE 
        WHEN e.Status = 2 AND e.DistributedPoints = ISNULL(SUM(ep.PointsAwarded), 0) AND e.DistributedPoints <= e.TotalPointsPool THEN 'OK'
        WHEN e.Status IN (0, 1, 3) AND e.DistributedPoints = 0 THEN 'OK'
        ELSE 'MISMATCH'
    END AS PoolStatus
FROM Events e
LEFT JOIN EventParticipants ep ON e.Id = ep.EventId
GROUP BY e.Name, e.Status, e.TotalPointsPool, e.DistributedPoints
ORDER BY e.Status, e.Name;

PRINT '=== VERIFICATION: Rank Constraints ===';
SELECT 'PrizeTiers > Rank 3' AS [Check], COUNT(*) AS Count FROM PrizeTiers WHERE [Rank] > 3
UNION ALL SELECT 'EventParticipants > Rank 3', COUNT(*) FROM EventParticipants WHERE EventRank > 3
UNION ALL SELECT 'Negative Balances', COUNT(*) FROM UserPointsAccounts WHERE CurrentBalance < 0
UNION ALL SELECT 'Negative BalanceAfter', COUNT(*) FROM UserPointsTransactions WHERE BalanceAfter < 0;

PRINT '=== VERIFICATION: Product Deactivation Scenarios ===';
SELECT 
    p.Name,
    p.IsActive,
    COUNT(CASE WHEN r.Status = 'Pending' THEN 1 END) AS Pending,
    COUNT(CASE WHEN r.Status = 'Approved' THEN 1 END) AS Approved,
    CASE 
        WHEN p.IsActive = 0 AND COUNT(CASE WHEN r.Status IN ('Pending', 'Approved') THEN 1 END) = 0 THEN 'SOFT_WARNING'
        WHEN p.IsActive = 0 AND COUNT(CASE WHEN r.Status IN ('Pending', 'Approved') THEN 1 END) > 0 THEN 'HARD_BLOCK'
        ELSE 'ACTIVE'
    END AS Scenario
FROM Products p
LEFT JOIN Redemptions r ON p.Id = r.ProductId
GROUP BY p.Name, p.IsActive;

PRINT '=== SUMMARY METRICS ===';
SELECT 'Users' AS Metric, COUNT(*) AS Count FROM Users
UNION ALL SELECT 'Products', COUNT(*) FROM Products WHERE IsActive = 1
UNION ALL SELECT 'Events Completed', COUNT(*) FROM Events WHERE Status = 2
UNION ALL SELECT 'Events Draft', COUNT(*) FROM Events WHERE Status = 0
UNION ALL SELECT 'Redemptions Delivered', COUNT(*) FROM Redemptions WHERE Status = 'Delivered'
UNION ALL SELECT 'Redemptions Pending', COUNT(*) FROM Redemptions WHERE Status = 'Pending'
UNION ALL SELECT 'Total Transactions', COUNT(*) FROM UserPointsTransactions;
GO

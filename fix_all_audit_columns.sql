-- Fix all missing audit columns across all tables
-- These columns are expected by the Entity<TId> base class

PRINT 'Adding missing audit columns to tables...';

-- EventParticipants - does NOT inherit from Entity, so no audit columns needed
-- (It's a plain class, not Entity<Guid>)

-- UserPointsTransactions - inherits from Entity<Guid>, needs audit columns
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'UserPointsTransactions' AND COLUMN_NAME = 'CreatedAt')
BEGIN
    ALTER TABLE [UserPointsTransactions] ADD [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE();
    PRINT '  Added CreatedAt to UserPointsTransactions';
END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'UserPointsTransactions' AND COLUMN_NAME = 'CreatedBy')
BEGIN
    ALTER TABLE [UserPointsTransactions] ADD [CreatedBy] UNIQUEIDENTIFIER NULL;
    PRINT '  Added CreatedBy to UserPointsTransactions';
END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'UserPointsTransactions' AND COLUMN_NAME = 'UpdatedAt')
BEGIN
    ALTER TABLE [UserPointsTransactions] ADD [UpdatedAt] DATETIME2 NULL;
    PRINT '  Added UpdatedAt to UserPointsTransactions';
END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'UserPointsTransactions' AND COLUMN_NAME = 'UpdatedBy')
BEGIN
    ALTER TABLE [UserPointsTransactions] ADD [UpdatedBy] UNIQUEIDENTIFIER NULL;
    PRINT '  Added UpdatedBy to UserPointsTransactions';
END

-- UserPointsAccounts - check if it inherits from Entity
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'UserPointsAccounts' AND COLUMN_NAME = 'CreatedAt')
BEGIN
    ALTER TABLE [UserPointsAccounts] ADD [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE();
    PRINT '  Added CreatedAt to UserPointsAccounts';
END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'UserPointsAccounts' AND COLUMN_NAME = 'CreatedBy')
BEGIN
    ALTER TABLE [UserPointsAccounts] ADD [CreatedBy] UNIQUEIDENTIFIER NULL;
    PRINT '  Added CreatedBy to UserPointsAccounts';
END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'UserPointsAccounts' AND COLUMN_NAME = 'UpdatedAt')
BEGIN
    ALTER TABLE [UserPointsAccounts] ADD [UpdatedAt] DATETIME2 NULL;
    PRINT '  Added UpdatedAt to UserPointsAccounts';
END

-- InventoryItems - if exists
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'InventoryItems')
BEGIN
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'InventoryItems' AND COLUMN_NAME = 'CreatedAt')
    BEGIN
        ALTER TABLE [InventoryItems] ADD [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE();
        PRINT '  Added CreatedAt to InventoryItems';
    END

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'InventoryItems' AND COLUMN_NAME = 'CreatedBy')
    BEGIN
        ALTER TABLE [InventoryItems] ADD [CreatedBy] UNIQUEIDENTIFIER NULL;
        PRINT '  Added CreatedBy to InventoryItems';
    END

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'InventoryItems' AND COLUMN_NAME = 'UpdatedAt')
    BEGIN
        ALTER TABLE [InventoryItems] ADD [UpdatedAt] DATETIME2 NULL;
        PRINT '  Added UpdatedAt to InventoryItems';
    END

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'InventoryItems' AND COLUMN_NAME = 'UpdatedBy')
    BEGIN
        ALTER TABLE [InventoryItems] ADD [UpdatedBy] UNIQUEIDENTIFIER NULL;
        PRINT '  Added UpdatedBy to InventoryItems';
    END
END

-- PrizeTiers - if exists  
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'PrizeTiers')
BEGIN
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'PrizeTiers' AND COLUMN_NAME = 'CreatedAt')
    BEGIN
        ALTER TABLE [PrizeTiers] ADD [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE();
        PRINT '  Added CreatedAt to PrizeTiers';
    END

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'PrizeTiers' AND COLUMN_NAME = 'CreatedBy')
    BEGIN
        ALTER TABLE [PrizeTiers] ADD [CreatedBy] UNIQUEIDENTIFIER NULL;
        PRINT '  Added CreatedBy to PrizeTiers';
    END

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'PrizeTiers' AND COLUMN_NAME = 'UpdatedAt')
    BEGIN
        ALTER TABLE [PrizeTiers] ADD [UpdatedAt] DATETIME2 NULL;
        PRINT '  Added UpdatedAt to PrizeTiers';
    END

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'PrizeTiers' AND COLUMN_NAME = 'UpdatedBy')
    BEGIN
        ALTER TABLE [PrizeTiers] ADD [UpdatedBy] UNIQUEIDENTIFIER NULL;
        PRINT '  Added UpdatedBy to PrizeTiers';
    END
END

-- ProductPricing - if exists
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ProductPricing')
BEGIN
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ProductPricing' AND COLUMN_NAME = 'CreatedAt')
    BEGIN
        ALTER TABLE [ProductPricing] ADD [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE();
        PRINT '  Added CreatedAt to ProductPricing';
    END

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ProductPricing' AND COLUMN_NAME = 'CreatedBy')
    BEGIN
        ALTER TABLE [ProductPricing] ADD [CreatedBy] UNIQUEIDENTIFIER NULL;
        PRINT '  Added CreatedBy to ProductPricing';
    END

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ProductPricing' AND COLUMN_NAME = 'UpdatedAt')
    BEGIN
        ALTER TABLE [ProductPricing] ADD [UpdatedAt] DATETIME2 NULL;
        PRINT '  Added UpdatedAt to ProductPricing';
    END

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ProductPricing' AND COLUMN_NAME = 'UpdatedBy')
    BEGIN
        ALTER TABLE [ProductPricing] ADD [UpdatedBy] UNIQUEIDENTIFIER NULL;
        PRINT '  Added UpdatedBy to ProductPricing';
    END
END

PRINT '';
PRINT 'All missing audit columns added successfully!';

-- Verify columns
SELECT 
    t.TABLE_NAME,
    COUNT(CASE WHEN c.COLUMN_NAME = 'CreatedAt' THEN 1 END) AS HasCreatedAt,
    COUNT(CASE WHEN c.COLUMN_NAME = 'CreatedBy' THEN 1 END) AS HasCreatedBy,
    COUNT(CASE WHEN c.COLUMN_NAME = 'UpdatedAt' THEN 1 END) AS HasUpdatedAt,
    COUNT(CASE WHEN c.COLUMN_NAME = 'UpdatedBy' THEN 1 END) AS HasUpdatedBy
FROM INFORMATION_SCHEMA.TABLES t
LEFT JOIN INFORMATION_SCHEMA.COLUMNS c ON t.TABLE_NAME = c.TABLE_NAME 
    AND c.COLUMN_NAME IN ('CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy')
WHERE t.TABLE_TYPE = 'BASE TABLE' AND t.TABLE_NAME != '__EFMigrationsHistory'
GROUP BY t.TABLE_NAME
ORDER BY t.TABLE_NAME;

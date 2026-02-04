-- Fix missing audit columns in tables

-- Add audit columns to Roles table
ALTER TABLE [Roles] ADD 
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedBy] UNIQUEIDENTIFIER NULL;

-- Add audit columns to ProductCategories table
ALTER TABLE [ProductCategories] ADD 
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy] UNIQUEIDENTIFIER NULL,
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedBy] UNIQUEIDENTIFIER NULL;

-- Add Id column to UserRoleAssignments (composite key issue)
-- First, check if it has an Id column
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'UserRoleAssignments' AND COLUMN_NAME = 'Id')
BEGIN
    ALTER TABLE [UserRoleAssignments] ADD [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID();
END

-- Add audit columns to UserRoleAssignments
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'UserRoleAssignments' AND COLUMN_NAME = 'CreatedAt')
BEGIN
    ALTER TABLE [UserRoleAssignments] ADD 
        [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [CreatedBy] UNIQUEIDENTIFIER NULL,
        [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [UpdatedBy] UNIQUEIDENTIFIER NULL;
END

PRINT 'Audit columns added successfully';

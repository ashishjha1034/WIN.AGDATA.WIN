-- =====================================================
-- SYNC EF CORE MIGRATION HISTORY
-- =====================================================
-- This script manually syncs the __EFMigrationsHistory table
-- with all migrations that have already been applied to the database
-- =====================================================

USE [AGDATA_REWARD];
GO

-- Step 1: Check if migration history table exists
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = '__EFMigrationsHistory')
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
    PRINT '✓ Created __EFMigrationsHistory table';
END
ELSE
BEGIN
    PRINT '✓ __EFMigrationsHistory table already exists';
END
GO

-- Step 2: Show current migration history (for reference)
PRINT '';
PRINT '========== CURRENT MIGRATION HISTORY ==========';
SELECT * FROM __EFMigrationsHistory ORDER BY MigrationId;
PRINT '';
GO

-- Step 3: Clear existing migration history (to avoid duplicates)
-- WARNING: This will force EF to re-check all migrations
DELETE FROM __EFMigrationsHistory;
PRINT '✓ Cleared existing migration history';
GO

-- Step 4: Insert ALL migrations that are already applied to your database
-- This tells EF Core: "These migrations are already done, don't run them again"
INSERT INTO __EFMigrationsHistory (MigrationId, ProductVersion) VALUES
('20251129203113_InitialFullSchema_UltraClean', '9.0.0'),
('20251130192327_newupdmigfile', '9.0.0'),
('20251201120000_AddPasswordChangeTracking', '9.0.0'),
('20251201130000_AddPasswordResetTokens', '9.0.0'),
('20260114101640_newmigr14', '9.0.0'),
('20260120043510_MVP_EVENTLIFECYCLE', '9.0.0'),
('20260120120000_AddEventPoolTracking', '9.0.0'),
('20260120183438_Eventparticipant', '9.0.0'),
('20260120183559_Eventparticipant2', '9.0.0'),
('20260122085250_edituser', '9.0.0'),
('20260122090657_edituser2', '9.0.0'),
('20260128100000_AddUserLockoutFields', '9.0.0'),
('20260129042035_Validations', '9.0.0'),
('20260129202904_ProductDeactivation', '9.0.0'),
('20260129220535_UserDeactivation', '9.0.0'),
('20260130073938_Eventnewmigr', '9.0.0'),
('20260131203253_DecimalPointsSupport', '9.0.0'),
('20260131224043_Refunded', '9.0.0'),
('20260202092326_Roles', '9.0.0'),
('20260208052319_AddValueObjectConverters', '9.0.0');

PRINT '✓ Inserted all migration records';
GO

-- Step 5: Verify the migration history
PRINT '';
PRINT '========== UPDATED MIGRATION HISTORY ==========';
SELECT MigrationId, ProductVersion FROM __EFMigrationsHistory ORDER BY MigrationId;
PRINT '';
PRINT '✓ Migration history sync completed successfully!';
PRINT 'You can now re-enable auto-migration in Program.cs';
GO

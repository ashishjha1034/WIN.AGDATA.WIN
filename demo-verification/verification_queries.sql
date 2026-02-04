-- Verification Query A: Balance Reconciliation Per User
SELECT u.Email,
       SUM(CASE WHEN TransactionType=0 THEN Points ELSE 0 END) AS Earned,
       SUM(CASE WHEN TransactionType=1 THEN ABS(Points) ELSE 0 END) AS Redeemed,
       SUM(CASE WHEN TransactionType=2 THEN Points ELSE 0 END) AS Adjusted,
       SUM(CASE WHEN TransactionType=3 THEN Points ELSE 0 END) AS Refunded,
       SUM(CASE WHEN TransactionType=0 THEN Points ELSE 0 END)
     - SUM(CASE WHEN TransactionType=1 THEN ABS(Points) ELSE 0 END)
     + SUM(CASE WHEN TransactionType=2 THEN Points ELSE 0 END)
     + SUM(CASE WHEN TransactionType=3 THEN Points ELSE 0 END) AS CalcBalance,
       upa.CurrentBalance AS AccountBalance,
       CASE 
           WHEN upa.CurrentBalance = SUM(CASE WHEN TransactionType=0 THEN Points ELSE 0 END)
                                   - SUM(CASE WHEN TransactionType=1 THEN ABS(Points) ELSE 0 END)
                                   + SUM(CASE WHEN TransactionType=2 THEN Points ELSE 0 END)
                                   + SUM(CASE WHEN TransactionType=3 THEN Points ELSE 0 END)
           THEN 'MATCH'
           ELSE 'MISMATCH'
       END AS BalanceStatus
FROM Users u
LEFT JOIN UserPointsTransactions t ON t.UserId=u.Id
LEFT JOIN UserPointsAccounts upa ON upa.UserId = u.Id
GROUP BY u.Email, upa.CurrentBalance
ORDER BY u.Email;

-- Verification Query B: Event Pool Arithmetic
SELECT e.Name, e.TotalPointsPool, e.DistributedPoints,
       SUM(ISNULL(p.PointsAwarded,0)) AS SumAwards,
       CASE WHEN e.DistributedPoints = SUM(ISNULL(p.PointsAwarded,0))
            THEN 'MATCHES' ELSE 'MISMATCH' END AS PoolCheck
FROM Events e
LEFT JOIN EventParticipants p ON p.EventId = e.Id
GROUP BY e.Name, e.TotalPointsPool, e.DistributedPoints
ORDER BY e.Name;

-- Verification Query C1: Temporal Window Check
SELECT 
    'Users' AS TableName,
    MIN(CreatedAt) AS OldestRecord,
    MAX(CreatedAt) AS NewestRecord,
    DATEDIFF(DAY, MIN(CreatedAt), GETUTCDATE()) AS DaysOldest,
    DATEDIFF(DAY, GETUTCDATE(), MAX(CreatedAt)) AS DaysNewest
FROM Users
WHERE Id NOT IN ('B0000001-0001-0001-0001-000000000001', 'B0000001-0001-0001-0001-000000000002')
UNION ALL
SELECT 'Events', MIN(CreatedAt), MAX(CreatedAt), DATEDIFF(DAY, MIN(CreatedAt), GETUTCDATE()), DATEDIFF(DAY, GETUTCDATE(), MAX(CreatedAt)) FROM Events
UNION ALL
SELECT 'Transactions', MIN(Timestamp), MAX(Timestamp), DATEDIFF(DAY, MIN(Timestamp), GETUTCDATE()), DATEDIFF(DAY, GETUTCDATE(), MAX(Timestamp)) FROM UserPointsTransactions
UNION ALL
SELECT 'Redemptions', MIN(CreatedAt), MAX(CreatedAt), DATEDIFF(DAY, MIN(CreatedAt), GETUTCDATE()), DATEDIFF(DAY, GETUTCDATE(), MAX(CreatedAt)) FROM Redemptions;

-- Verification Query C2: Event Lifecycle States
SELECT 
    CASE Status 
        WHEN 0 THEN 'Draft'
        WHEN 1 THEN 'Active'
        WHEN 2 THEN 'Completed'
        WHEN 3 THEN 'Cancelled'
    END AS EventStatus,
    COUNT(*) AS EventCount,
    SUM(CASE WHEN DistributedPoints = TotalPointsPool THEN 1 ELSE 0 END) AS PoolExhausted,
    SUM(CASE WHEN DistributedPoints = 0 THEN 1 ELSE 0 END) AS NoDistribution
FROM Events
GROUP BY Status
ORDER BY Status;

-- Verification Query C3: Participant Attendance States
SELECT 
    CASE AttendanceStatus
        WHEN 0 THEN 'Registered'
        WHEN 1 THEN 'CheckedIn'
        WHEN 2 THEN 'Absent'
    END AS AttendanceStatus,
    COUNT(*) AS ParticipantCount,
    COUNT(CASE WHEN CheckedInAt IS NOT NULL THEN 1 END) AS WithCheckinTime,
    COUNT(CASE WHEN PointsAwarded > 0 THEN 1 END) AS WithPoints
FROM EventParticipants
GROUP BY AttendanceStatus
ORDER BY AttendanceStatus;

-- Verification Query C4: Event Chronology Validation
SELECT 
    e.Name,
    e.CreatedAt,
    e.RegistrationEndDate,
    e.EventDate,
    CASE 
        WHEN e.CreatedAt < e.RegistrationEndDate AND e.RegistrationEndDate < e.EventDate THEN 'VALID'
        ELSE 'INVALID'
    END AS ChronologyStatus
FROM Events e
ORDER BY e.EventDate;

-- Verification Query D: Validation Compliance Check

-- D1: Email validation (corporate domain and local part >= 5 chars)
SELECT 'Email Validation' AS ValidationCheck,
       COUNT(*) AS TotalUsers,
       COUNT(CASE WHEN Email LIKE '%@agdata.com' AND LEN(SUBSTRING(Email, 1, CHARINDEX('@', Email) - 1)) >= 5 THEN 1 END) AS Valid,
       COUNT(CASE WHEN NOT (Email LIKE '%@agdata.com' AND LEN(SUBSTRING(Email, 1, CHARINDEX('@', Email) - 1)) >= 5) THEN 1 END) AS Invalid
FROM Users;

-- D2: EmployeeId length = 9
SELECT 'EmployeeId Length' AS ValidationCheck,
       COUNT(*) AS Total,
       COUNT(CASE WHEN LEN(EmployeeId) = 9 THEN 1 END) AS Valid,
       COUNT(CASE WHEN LEN(EmployeeId) != 9 THEN 1 END) AS Invalid
FROM Users;

-- D3: Event name length and word count
SELECT 'Event Name Validation' AS ValidationCheck,
       COUNT(*) AS Total,
       COUNT(CASE WHEN LEN(Name) BETWEEN 2 AND 50 THEN 1 END) AS ValidLength,
       COUNT(CASE WHEN LEN(Name) < 2 OR LEN(Name) > 50 THEN 1 END) AS InvalidLength
FROM Events;

-- D4: Event description length
SELECT 'Event Description' AS ValidationCheck,
       COUNT(*) AS Total,
       COUNT(CASE WHEN Description IS NOT NULL AND LEN(Description) BETWEEN 20 AND 500 THEN 1 END) AS Valid,
       COUNT(CASE WHEN Description IS NULL OR LEN(Description) < 20 OR LEN(Description) > 500 THEN 1 END) AS Invalid
FROM Events;

-- D5: Product points cost range
SELECT 'Product Points Cost' AS ValidationCheck,
       COUNT(*) AS Total,
       COUNT(CASE WHEN PointsCost BETWEEN 1 AND 10000000 THEN 1 END) AS Valid,
       COUNT(CASE WHEN PointsCost < 1 OR PointsCost > 10000000 THEN 1 END) AS Invalid
FROM ProductPricing;

-- D6: Inventory stock range
SELECT 'Inventory Stock' AS ValidationCheck,
       COUNT(*) AS Total,
       COUNT(CASE WHEN CurrentStock BETWEEN 1 AND 1000000 THEN 1 END) AS Valid,
       COUNT(CASE WHEN CurrentStock < 1 OR CurrentStock > 1000000 THEN 1 END) AS Invalid
FROM InventoryItems;

-- Product Deactivation Scenarios
SELECT 
    p.Name AS ProductName,
    p.IsActive,
    i.CurrentStock AS Stock,
    COUNT(CASE WHEN r.Status = 'Pending' THEN 1 END) AS PendingRedemptions,
    COUNT(CASE WHEN r.Status = 'Approved' THEN 1 END) AS ApprovedRedemptions,
    COUNT(CASE WHEN r.CreatedAt >= DATEADD(DAY, -7, GETUTCDATE()) THEN 1 END) AS Recent7Days,
    CASE 
        WHEN p.IsActive = 0 AND COUNT(CASE WHEN r.Status IN ('Pending', 'Approved') THEN 1 END) > 0 THEN 'HARD_BLOCK'
        WHEN p.IsActive = 0 AND (i.CurrentStock > 0 OR COUNT(CASE WHEN r.CreatedAt >= DATEADD(DAY, -7, GETUTCDATE()) THEN 1 END) > 0) THEN 'SOFT_WARNING'
        ELSE 'ACTIVE'
    END AS DeactivationScenario
FROM Products p
LEFT JOIN InventoryItems i ON p.Id = i.ProductId
LEFT JOIN Redemptions r ON p.Id = r.ProductId
GROUP BY p.Name, p.IsActive, i.CurrentStock
ORDER BY DeactivationScenario DESC, p.Name;

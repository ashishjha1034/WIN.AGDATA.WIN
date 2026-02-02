namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Admin;

/// <summary>
/// Transaction DTO with full user details for admin audit views
/// </summary>
public class AdminTransactionDto
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public string Type { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
    public Guid? SourceId { get; set; }
    public decimal BalanceAfter { get; set; }
    public Guid? ProcessedBy { get; set; }
    public string? ProcessedByName { get; set; }
    
    // User details
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public string? EmployeeId { get; set; }
}

/// <summary>
/// Request model for filtering transactions in admin view
/// </summary>
public class TransactionFilterRequest
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    public Guid? UserId { get; set; }
    public string? Type { get; set; } // Earned, Redeemed, Adjusted, Refunded
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Source { get; set; } // Event, Product, Admin
    public string? SearchQuery { get; set; } // Search in description, user name, email
    public string? SortBy { get; set; } = "Timestamp";
    public bool SortDescending { get; set; } = true;
}

/// <summary>
/// Paginated response for admin transaction listing
/// </summary>
public class PagedTransactionResponse
{
    public List<AdminTransactionDto> Data { get; set; } = new();
    public PaginationInfo Pagination { get; set; } = new();
    public TransactionSummary Summary { get; set; } = new();
}

/// <summary>
/// Pagination metadata
/// </summary>
public class PaginationInfo
{
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
    public bool HasNextPage { get; set; }
    public bool HasPreviousPage { get; set; }
}

/// <summary>
/// Summary statistics for transaction list
/// </summary>
public class TransactionSummary
{
    public decimal TotalEarned { get; set; }
    public decimal TotalRedeemed { get; set; }
    public decimal TotalAdjusted { get; set; }
    public int TransactionCount { get; set; }
    public decimal NetPoints { get; set; }
}

/// <summary>
/// Monthly chart data point
/// </summary>
public class MonthlyChartDataPoint
{
    public int Month { get; set; }
    public int Year { get; set; }
    public string MonthName { get; set; } = string.Empty;
    public decimal PointsEarned { get; set; }
    public decimal PointsRedeemed { get; set; }
    public decimal NetPoints { get; set; }
}

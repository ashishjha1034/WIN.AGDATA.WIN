using System;
using System.Collections.Generic;

namespace WIN.AGDATA.WIN.Domain.Exceptions
{
    public class DomainException : Exception
    {
        public DomainException()
        {
        }

        public DomainException(string message) : base(message)
        {
        }

        public DomainException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }

    /// <summary>
    /// Exception thrown when validation fails. Contains field-level error details
    /// that can be mapped to ProblemDetails for API responses.
    /// </summary>
    public class ValidationException : DomainException
    {
        public string FieldName { get; }
        public IDictionary<string, string[]> Errors { get; }

        public ValidationException(string fieldName, string message)
            : base(message)
        {
            FieldName = fieldName;
            Errors = new Dictionary<string, string[]>
            {
                { fieldName, new[] { message } }
            };
        }

        public ValidationException(IDictionary<string, string[]> errors)
            : base("One or more validation errors occurred.")
        {
            FieldName = string.Empty;
            Errors = errors;
        }
    }

    /// <summary>
    /// Exception thrown when product deactivation is blocked due to active redemptions.
    /// This is a hard block that cannot be bypassed.
    /// </summary>
    public class ProductDeactivationBlockedException : DomainException
    {
        public int PendingCount { get; }
        public int ApprovedCount { get; }

        public ProductDeactivationBlockedException(int pendingCount, int approvedCount)
            : base($"Cannot deactivate while redemptions are Pending/Approved (Pending: {pendingCount}, Approved: {approvedCount}).")
        {
            PendingCount = pendingCount;
            ApprovedCount = approvedCount;
        }
    }

    /// <summary>
    /// Result containing deactivation warnings that require admin confirmation.
    /// These are soft warnings - deactivation can proceed if admin confirms.
    /// </summary>
    public class ProductDeactivationWarnings
    {
        public int Stock { get; }
        public int RecentRedemptions7d { get; }
        public int RecentUniqueUsers7d { get; }
        public int RecentRedemptions30d { get; }
        public int RecentUniqueUsers30d { get; }
        public DateTime? LastRedemptionDate { get; }

        public bool HasWarnings => Stock > 0 || RecentRedemptions7d > 0;

        public ProductDeactivationWarnings(
            int stock,
            int recentRedemptions7d,
            int recentUniqueUsers7d,
            int recentRedemptions30d = 0,
            int recentUniqueUsers30d = 0,
            DateTime? lastRedemptionDate = null)
        {
            Stock = stock;
            RecentRedemptions7d = recentRedemptions7d;
            RecentUniqueUsers7d = recentUniqueUsers7d;
            RecentRedemptions30d = recentRedemptions30d;
            RecentUniqueUsers30d = recentUniqueUsers30d;
            LastRedemptionDate = lastRedemptionDate;
        }
    }
}
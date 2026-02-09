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
    /// Exception thrown when an invalid status transition is attempted.
    /// </summary>
    public class InvalidStatusTransitionException : DomainException
    {
        public string CurrentStatus { get; }
        public string AttemptedTransition { get; }

        public InvalidStatusTransitionException(string currentStatus, string attemptedTransition)
            : base($"Cannot {attemptedTransition} when status is {currentStatus}.")
        {
            CurrentStatus = currentStatus;
            AttemptedTransition = attemptedTransition;
        }
    }

    /// <summary>
    /// Exception thrown when a user has insufficient points.
    /// </summary>
    public class InsufficientPointsException : DomainException
    {
        public decimal Required { get; }
        public decimal Available { get; }

        public InsufficientPointsException(decimal required, decimal available)
            : base($"Insufficient points. Required: {required}, Available: {available}")
        {
            Required = required;
            Available = available;
        }
    }

    /// <summary>
    /// Exception thrown when attempting to register a user who is already registered.
    /// </summary>
    public class DuplicateRegistrationException : DomainException
    {
        public Guid EventId { get; }
        public Guid UserId { get; }

        public DuplicateRegistrationException(Guid eventId, Guid userId)
            : base($"User {userId} is already registered for event {eventId}.")
        {
            EventId = eventId;
            UserId = userId;
        }
    }

    /// <summary>
    /// Exception thrown when event capacity is exceeded.
    /// </summary>
    public class CapacityExceededException : DomainException
    {
        public int MaxCapacity { get; }
        public int CurrentCount { get; }

        public CapacityExceededException(int maxCapacity, int currentCount)
            : base($"Event has reached maximum capacity of {maxCapacity} participants. Current: {currentCount}")
        {
            MaxCapacity = maxCapacity;
            CurrentCount = currentCount;
        }
    }

    /// <summary>
    /// Exception thrown when attempting to award points to a participant who already has points.
    /// </summary>
    public class AlreadyAwardedException : DomainException
    {
        public Guid UserId { get; }
        public decimal CurrentPoints { get; }

        public AlreadyAwardedException(Guid userId, decimal currentPoints)
            : base($"Points have already been awarded to participant {userId}. Current points: {currentPoints}. Cannot award again.")
        {
            UserId = userId;
            CurrentPoints = currentPoints;
        }
    }

    /// <summary>
    /// Exception thrown when attempting to award points to a participant who is not checked-in.
    /// </summary>
    public class NotCheckedInException : DomainException
    {
        public Guid UserId { get; }
        public string AttendanceStatus { get; }

        public NotCheckedInException(Guid userId, string attendanceStatus)
            : base($"Participant {userId} must be checked-in to receive points. Current status: {attendanceStatus}.")
        {
            UserId = userId;
            AttendanceStatus = attendanceStatus;
        }
    }

    /// <summary>
    /// Exception thrown when the event pool has insufficient points.
    /// </summary>
    public class InsufficientPoolException : DomainException
    {
        public decimal Required { get; }
        public decimal Remaining { get; }

        public InsufficientPoolException(decimal required, decimal remaining)
            : base($"Insufficient points in event pool. Requested: {required}, Remaining: {remaining}")
        {
            Required = required;
            Remaining = remaining;
        }
    }

    /// <summary>
    /// Exception thrown when registration deadline has passed.
    /// </summary>
    public class RegistrationClosedException : DomainException
    {
        public DateTime Deadline { get; }

        public RegistrationClosedException(DateTime deadline)
            : base($"Registration deadline has passed. Deadline was {deadline:u}.")
        {
            Deadline = deadline;
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
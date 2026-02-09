namespace WIN.AGDATA.WIN.Domain.ValueObjects;

/// <summary>
/// Value object representing a points quantity. Ensures points are always non-negative
/// and provides arithmetic operations with proper validation and rounding semantics.
/// </summary>
public sealed record Points
{
    private const decimal MinValue = 0m;
    private const int Scale = 2; // Two decimal places for points

    public decimal Value { get; }

    private Points(decimal value)
    {
        Value = Math.Round(value, Scale, MidpointRounding.AwayFromZero);
    }

    public static Points Create(decimal value)
    {
        if (value < MinValue)
            throw new ArgumentException($"Points cannot be negative. Provided: {value}", nameof(value));

        return new Points(value);
    }

    public static Points Create(int value) => Create((decimal)value);

    public static Points Zero => new(0m);

    // Arithmetic operations
    public Points Add(Points other)
    {
        if (other == null) throw new ArgumentNullException(nameof(other));
        return new Points(Value + other.Value);
    }

    public Points Subtract(Points other)
    {
        if (other == null) throw new ArgumentNullException(nameof(other));
        if (Value < other.Value)
            throw new InvalidOperationException($"Cannot subtract {other.Value} from {Value}. Result would be negative.");
        return new Points(Value - other.Value);
    }

    public Points Multiply(decimal factor)
    {
        if (factor < 0)
            throw new ArgumentException("Multiplication factor cannot be negative", nameof(factor));
        return new Points(Value * factor);
    }

    public Points Divide(decimal divisor)
    {
        if (divisor <= 0)
            throw new ArgumentException("Division by zero or negative number is not allowed", nameof(divisor));
        return new Points(Value / divisor);
    }

    // Comparison operators
    public static bool operator >(Points left, Points right) => left.Value > right.Value;
    public static bool operator <(Points left, Points right) => left.Value < right.Value;
    public static bool operator >=(Points left, Points right) => left.Value >= right.Value;
    public static bool operator <=(Points left, Points right) => left.Value <= right.Value;

    // Arithmetic operators
    public static Points operator +(Points left, Points right) => left.Add(right);
    public static Points operator -(Points left, Points right) => left.Subtract(right);
    public static Points operator *(Points points, decimal factor) => points.Multiply(factor);
    public static Points operator /(Points points, decimal divisor) => points.Divide(divisor);

    // Implicit conversion from Points to decimal (for persistence/DTO mapping)
    public static implicit operator decimal(Points points) => points.Value;

    // Explicit conversion from decimal to Points (must be intentional)
    public static explicit operator Points(decimal value) => Create(value);

    public override string ToString() => Value.ToString("F2");

    public bool IsZero() => Value == 0m;
    public bool IsPositive() => Value > 0m;
}

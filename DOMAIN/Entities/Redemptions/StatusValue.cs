namespace WIN.AGDATA.WIN.Domain.Entities.Redemptions
{
    public enum StatusValue
    {
        Pending = 1,    // Request submitted
        Approved = 2,   // Admin approved
        Rejected = 3,   // Admin rejected  
        Delivered = 4   // Product delivered
    }
}
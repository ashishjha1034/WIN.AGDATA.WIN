// WIN.AGDATA.WIN.Application/DTOs/CreateRedemptionRequest.cs

// WIN.AGDATA.WIN.Application/DTOs/CreateRedemptionRequest.cs
using System;

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions
{
    public class CreateRedemptionRequest
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions
{
    public class DeliverRedemptionRequest
    {
        public string? Notes { get; set; }
        public Guid DeliveredBy { get; set; }
    }
}

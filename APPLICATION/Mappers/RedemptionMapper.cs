
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.Application.Mappers;

public static class RedemptionMapper
{
    public static RedemptionDto ToDto(Redemption r)
    {
        if (r == null) return null!;

        return new RedemptionDto
        {
            Id = r.Id,
            EmployeeId = r.EmployeeId,
            ProductId = r.ProductId,
            PointsCost = r.PointsCost,
            Status = r.Status.Value.ToString(),
            RequestedAt = r.RequestedAt
        };
    }
}

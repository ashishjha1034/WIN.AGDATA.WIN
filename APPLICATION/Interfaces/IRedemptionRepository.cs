using System;
using System.Collections.Generic;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IRedemptionRepository
{
    Redemption? GetById(Guid redemptionId);
    List<Redemption> GetByEmployeeId(string employeeId);
    List<Redemption> GetAll();
    void Add(Redemption redemption);
    void Update(Redemption redemption);
    void Delete(Guid redemptionId);
    void ApproveRedemption(Guid redemptionId);
    void RejectRedemption(Guid redemptionId, string reason);
    void MarkRedemptionDelivered(Guid redemptionId);
}

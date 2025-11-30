using AutoMapper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Transactions;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.APPLICATION.Mappers;

public class TransactionProfile : Profile
{
    public TransactionProfile()
    {
        CreateMap<UserPointsTransaction, TransactionDto>()
            .ForMember(d => d.Type, o => o.MapFrom(s => s.Type.ToString()));
    }
}

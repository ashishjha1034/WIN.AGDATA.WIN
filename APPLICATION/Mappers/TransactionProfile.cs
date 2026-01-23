using AutoMapper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Transactions;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.APPLICATION.Mappers;

public class TransactionProfile : Profile
{
    public TransactionProfile()
    {
        CreateMap<UserPointsTransaction, TransactionDto>()
            .ForMember(d => d.Type, o => o.MapFrom(s => s.TransactionType.ToString()))
            .ForMember(d => d.Amount, o => o.MapFrom(s => s.Points))
            .ForMember(d => d.Description, o => o.MapFrom(s => s.Description))
            .ForMember(d => d.Source, o => o.MapFrom(s => s.Source))
            .ForMember(d => d.SourceId, o => o.MapFrom(s => s.SourceId))
            .ForMember(d => d.BalanceAfter, o => o.MapFrom(s => s.BalanceAfter))
            .ForMember(d => d.ProcessedBy, o => o.MapFrom(s => s.ProcessedBy));
    }
}

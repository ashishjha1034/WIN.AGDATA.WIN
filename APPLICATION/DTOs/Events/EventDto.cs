namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

public record EventDto(
    Guid Id,
    string Name,
    DateTime StartDate,
    DateTime EndDate,
    string Description,
    string Status,
    int ParticipantCount
);

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

public record CreateEventRequest(
    string Name,
    DateTime StartDate,
    DateTime EndDate,
    string Description
);

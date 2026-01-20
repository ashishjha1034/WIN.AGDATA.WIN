using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WIN.AGDATA.WIN.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddEventPoolTracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add DistributedPoints column with default value
            migrationBuilder.AddColumn<int>(
                name: "DistributedPoints",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

            // Add RowVersion for optimistic concurrency
            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Events",
                type: "rowversion",
                rowVersion: true,
                nullable: false);

            // Backfill: Set DistributedPoints to sum of all awarded points per event
            migrationBuilder.Sql(@"
                UPDATE e
                SET e.DistributedPoints = ISNULL(awarded.TotalAwarded, 0)
                FROM Events e
                LEFT JOIN (
                    SELECT EventId, SUM(PointsAwarded) AS TotalAwarded
                    FROM EventParticipants
                    WHERE PointsAwarded > 0
                    GROUP BY EventId
                ) AS awarded ON e.Id = awarded.EventId
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DistributedPoints",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Events");
        }
    }
}

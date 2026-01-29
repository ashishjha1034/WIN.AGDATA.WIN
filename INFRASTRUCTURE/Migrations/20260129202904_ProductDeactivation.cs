using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WIN.AGDATA.WIN.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ProductDeactivation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeactivationReason",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeactivationReason",
                table: "Products");
        }
    }
}

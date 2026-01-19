using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WIN.AGDATA.WIN.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class newmigr14 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Used",
                table: "PasswordResetTokens",
                newName: "IsUsed");

            migrationBuilder.RenameIndex(
                name: "IX_PasswordResetTokens_UserId",
                table: "PasswordResetTokens",
                newName: "IX_PasswordResetToken_UserId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "PasswordResetTokens",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETUTCDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<DateTime>(
                name: "UsedAt",
                table: "PasswordResetTokens",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsedAt",
                table: "PasswordResetTokens");

            migrationBuilder.RenameColumn(
                name: "IsUsed",
                table: "PasswordResetTokens",
                newName: "Used");

            migrationBuilder.RenameIndex(
                name: "IX_PasswordResetToken_UserId",
                table: "PasswordResetTokens",
                newName: "IX_PasswordResetTokens_UserId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "PasswordResetTokens",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETUTCDATE()");
        }
    }
}

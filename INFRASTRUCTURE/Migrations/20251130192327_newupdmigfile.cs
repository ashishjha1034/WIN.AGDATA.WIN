using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace INFRASTRUCTURE.Migrations
{
    /// <inheritdoc />
    public partial class newupdmigfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_EmployeeId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_IsActive",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Redemptions_RequestedAt",
                table: "Redemptions");

            migrationBuilder.DropIndex(
                name: "IX_ProductPricing_ProductId_EffectiveFrom",
                table: "ProductPricings");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DeliveryNotes",
                table: "Redemptions");

            migrationBuilder.DropColumn(
                name: "RejectedAt",
                table: "Redemptions");

            migrationBuilder.DropColumn(
                name: "RejectedBy",
                table: "Redemptions");

            migrationBuilder.DropColumn(
                name: "RejectionReason",
                table: "Redemptions");

            migrationBuilder.DropColumn(
                name: "RequestedAt",
                table: "Redemptions");

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedBy",
                table: "Users",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<Guid>(
                name: "AssignedBy",
                table: "UserRoleAssignments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "UserRoleAssignments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedBy",
                table: "UserRoleAssignments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "UserRoleAssignments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "UserRoleAssignments",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedBy",
                table: "UserRoleAssignments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Redemptions",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "Pending",
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedBy",
                table: "Redemptions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdminNotes",
                table: "Redemptions",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedBy",
                table: "Products",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CurrentStock",
                table: "InventoryItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedBy",
                table: "Events",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PointsPerParticipant",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Redemptions_CreatedAt",
                table: "Redemptions",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPricing_ProductId",
                table: "ProductPricings",
                column: "ProductId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Redemptions_CreatedAt",
                table: "Redemptions");

            migrationBuilder.DropIndex(
                name: "IX_ProductPricing_ProductId",
                table: "ProductPricings");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "UserRoleAssignments");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "UserRoleAssignments");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserRoleAssignments");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "UserRoleAssignments");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "UserRoleAssignments");

            migrationBuilder.DropColumn(
                name: "AdminNotes",
                table: "Redemptions");

            migrationBuilder.DropColumn(
                name: "CurrentStock",
                table: "InventoryItems");

            migrationBuilder.DropColumn(
                name: "PointsPerParticipant",
                table: "Events");

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedBy",
                table: "Users",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<Guid>(
                name: "AssignedBy",
                table: "UserRoleAssignments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Redemptions",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldDefaultValue: "Pending");

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedBy",
                table: "Redemptions",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryNotes",
                table: "Redemptions",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RejectedAt",
                table: "Redemptions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RejectedBy",
                table: "Redemptions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RejectionReason",
                table: "Redemptions",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RequestedAt",
                table: "Redemptions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedBy",
                table: "Products",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedBy",
                table: "Events",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EmployeeId",
                table: "Users",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_IsActive",
                table: "Users",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_Redemptions_RequestedAt",
                table: "Redemptions",
                column: "RequestedAt");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPricing_ProductId_EffectiveFrom",
                table: "ProductPricings",
                columns: new[] { "ProductId", "EffectiveFrom" });
        }
    }
}

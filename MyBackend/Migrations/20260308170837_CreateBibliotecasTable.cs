using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class CreateBibliotecasTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Biblioteca",
                table: "Biblioteca");

            migrationBuilder.RenameTable(
                name: "Biblioteca",
                newName: "Bibliotecas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bibliotecas",
                table: "Bibliotecas",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Bibliotecas",
                table: "Bibliotecas");

            migrationBuilder.RenameTable(
                name: "Bibliotecas",
                newName: "Biblioteca");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Biblioteca",
                table: "Biblioteca",
                column: "Id");
        }
    }
}

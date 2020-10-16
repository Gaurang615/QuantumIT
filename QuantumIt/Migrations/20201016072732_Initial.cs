using Microsoft.EntityFrameworkCore.Migrations;

namespace QuantumIt.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SchoolClasses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClassName = table.Column<string>(maxLength: 255, nullable: false),
                    Location = table.Column<string>(maxLength: 500, nullable: false),
                    TeacherName = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolClasses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StudentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClassId = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 255, nullable: false),
                    SurName = table.Column<string>(maxLength: 255, nullable: false),
                    Age = table.Column<int>(nullable: false),
                    GPA = table.Column<decimal>(type: "decimal(2,1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StudentId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SchoolClasses");

            migrationBuilder.DropTable(
                name: "Students");
        }
    }
}

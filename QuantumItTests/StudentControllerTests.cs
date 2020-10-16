using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QuantumIt.Core.Models;
using QuantumIt.ViewModels;
using Xunit;

namespace QuantumItTests
{
    [Collection("Database collection")]
    public class StudentControllerTests: IntegrationTestBase
    {
        public StudentControllerTests(DatabaseFixture fixture) : base(fixture)
        { }

        [Fact]
        public async Task StudentControllerTests_ShouldBeAbleToCreateNew_Student()
        {
            //Arrange 
            var schoolClass = new SchoolClassViewModel
            {
                name = "Science",
                classLocation = "Room B",
                teacherName = "John Smith"
            };
            var result = await CreateSchoolClass(schoolClass);
            var student = new StudentViewModel
            {
                firstName = "ABC",
                surName = "XYZ",
                age = 20,
                gpa = (decimal) 5.5,
                classId = result.classId,
            };
            // Act
            var createdStudent = await CreateStudent(student);

            // Assert
            Assert.NotNull(createdStudent);
            Assert.Equal(student.firstName, createdStudent.firstName);

        }

        [Fact]
        public async Task StudentControllerTests_CreateStudent_ShouldFailIfClassDoesNotExist()
        {
            //Arrange 
            var schoolClass = new SchoolClassViewModel
            {
                name = "Science",
                classLocation = "Room B",
                teacherName = "John Smith"
            };
            var result = await CreateSchoolClass(schoolClass);
            var student = new StudentViewModel
            {
                firstName = "ABC",
                surName = "XYZ",
                age = 20,
                gpa = (decimal)5.5,
                classId = result.classId * 10,
            };
            // Act 
           var outResult = await _studentsController.CreateStudent(student);

            // Assert
            var failedRequest = outResult as BadRequestObjectResult;
           Assert.NotNull(failedRequest);
        }
    }
}
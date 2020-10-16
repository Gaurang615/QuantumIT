using System.Threading.Tasks;
using QuantumIt.ViewModels;
using Xunit;

namespace QuantumItTests
{
    [Collection("Database collection")]
    public class SchoolClassesControllerTests : IntegrationTestBase
    {
        public SchoolClassesControllerTests(DatabaseFixture fixture) : base(fixture)
        {}

        [Fact]
        public async Task SchoolClassesControllerTests_ShouldBeAbleToCreateNew_SchoolClass()
        {
            //Arrange 
            var schoolClass = new SchoolClassViewModel
            {
                name = "Science",
                classLocation = "Room B",
                teacherName = "John Smith"
            };

            // Act
            var result = await CreateSchoolClass(schoolClass);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(schoolClass.name, result.name);

        }
        
        [Fact]
        public async Task SchoolClassesControllerTests_ShouldBeAbleToRemove_SchoolClass()
        {
            //Arrange 
            var schoolClass = new SchoolClassViewModel
            {
                name = "Science",
                classLocation = "Room B",
                teacherName = "John Smith"
            };
            var result = await CreateSchoolClass(schoolClass);

            // Act and assert
            await RemoveSchoolClass(result.classId);
        }
    }
}

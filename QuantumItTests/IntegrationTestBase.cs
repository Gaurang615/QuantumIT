using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using QuantumIt.Controllers;
using QuantumIt.Core;
using QuantumIt.Mapping;
using QuantumIt.Persistence;
using QuantumIt.ViewModels;
using Xunit;

namespace QuantumItTests
{
    /// <summary>
    /// Base test setup
    /// </summary>
    public class IntegrationTestBase
    {
        private readonly ISchoolClassRepository _SchoolClassRepository;
        private readonly IStudentRepository _StudentRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly SchoolClassesController _schoolClassesController;
        private readonly IMapper _mapper;
        protected readonly StudentsController _studentsController;

        protected IntegrationTestBase(DatabaseFixture fixture)
        {
            _SchoolClassRepository = new SchoolClassRepository(fixture._context);
            _StudentRepository = new StudentRepository(fixture._context);
            _unitOfWork =  new UnitOfWork(fixture._context);
            
            // AutoMapping 
            _mapper = new Mapper(
                new MapperConfiguration(
                    configure => { configure.AddProfile<AutoMapping>(); }
                )
            );
            _schoolClassesController =  new SchoolClassesController(_mapper,_unitOfWork, _SchoolClassRepository, fixture._context);
            _studentsController = new StudentsController(_mapper,_unitOfWork, _StudentRepository, _SchoolClassRepository, fixture._context);
        }

        protected async Task<SchoolClassViewModel> GetSchoolClass(int id)
        {
            var result = await _schoolClassesController.GetSchoolClass(id);
            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);
            return okObjectResult.Value as SchoolClassViewModel;
        }

        protected async Task<SchoolClassViewModel> CreateSchoolClass(SchoolClassViewModel studentClass)
        {
            var result =  await _schoolClassesController.CreateSchoolClass(studentClass);
            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);
            return okObjectResult.Value as SchoolClassViewModel;
        }

        protected async Task UpdateSchoolClass(SchoolClassViewModel studentClass)
        {
            var result = await _schoolClassesController.UpdateSchoolClass(studentClass.classId, studentClass);
            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);
        }

        protected async Task RemoveSchoolClass(int id)
        {
            var result = await _schoolClassesController.RemoveSchoolClass(id);
            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);
        }

        protected async Task<StudentViewModel> GetStudent(int id)
        {
            var result = await _studentsController.GetStudent(id);
            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);
            return okObjectResult.Value as StudentViewModel;
        }

        protected async Task<StudentViewModel> CreateStudent(StudentViewModel student)
        {
            var result = await _studentsController.CreateStudent(student);
            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);
            return okObjectResult.Value as StudentViewModel;
        }

        protected async Task UpdateStudent(StudentViewModel student)
        {
            var result = await _studentsController.UpdateStudent(student.studentId, student);
            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);
        }

        protected async Task RemoveStudent(int id)
        {
            var result = await _studentsController.RemoveStudent(id);
            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);
        }
    }
}
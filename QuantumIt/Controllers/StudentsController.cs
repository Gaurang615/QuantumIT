using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuantumIt.Core;
using QuantumIt.Core.Models;
using QuantumIt.Persistence;
using QuantumIt.ViewModels;

namespace QuantumIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IStudentRepository _studentRepository;
        private readonly ISchoolClassRepository _schoolClassRepository;
        private QuantumItDbContext _context { get; }

        public StudentsController(IMapper mapper, IUnitOfWork unitOfWork, IStudentRepository studentRepository, ISchoolClassRepository schoolClassRepository, QuantumItDbContext context)
        {
            _unitOfWork = unitOfWork;
            _schoolClassRepository = schoolClassRepository;
            _studentRepository = studentRepository;
            _context = context;
            _mapper = mapper;
        }

        private bool StudentExist(long id) =>
            _context.Students.Any(e => e.StudentId == id);

        [HttpPost]
        public async Task<IActionResult> CreateStudent([FromBody] StudentViewModel entity)
        {

            // validate model state
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check class exist
            var studentClass = await _schoolClassRepository.GetSchoolClassAsync(entity.classId);
            if (studentClass == null)
            {
                ModelState.AddModelError("classId", "Invalid Class id.");
                return BadRequest(ModelState);
            }

            // Add student
            var student = _mapper.Map<StudentViewModel, Student>(entity);
            _studentRepository.AddStudent(student);

            await _unitOfWork.CompleteAsync();

            student = await _studentRepository.GetStudent(student.StudentId);

            // Return mapped model
            var result = _mapper.Map<Student, StudentViewModel>(student);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] StudentViewModel entity)
        {
            // validate model state
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check class exist
            var studentClass = await _schoolClassRepository.GetSchoolClassAsync(entity.classId);
            if (studentClass == null)
            {
                ModelState.AddModelError("classId", "Invalid Class id.");
                return BadRequest(ModelState);
            }

            var student = _mapper.Map<StudentViewModel, Student>(entity);
            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _unitOfWork.CompleteAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // if student record not exist in DB
                if (!StudentExist(id))
                {
                    return NotFound();
                }

                throw;
            }

            return Ok(id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveStudent(int id)
        {
            // if student record not exist in DB
            var student = await _studentRepository.GetStudent(id);
            if (student == null)
                return NotFound();

            _studentRepository.RemoveStudent(student);

            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent(int id)
        {
            var student = await _studentRepository.GetStudent(id);
            if (student == null)
                return NotFound();

            return Ok(student);
        }

        [HttpGet("StudentsByClass/{classId}")]
        public IActionResult GetStudentsByClass(int classId)
        {
            var students = _studentRepository.GetStudentByClass(classId);
            if (students == null)
                return NotFound();

            var result = _mapper.Map<IEnumerable<Student>, IEnumerable<StudentViewModel>>(students);

            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetStudents()
        {
            var students = _context.Students;

            if (students == null)
                return NotFound();
            var result = _mapper.Map<IEnumerable<Student>, IEnumerable<StudentViewModel>>(students);

            return Ok(result);
        }
    }
}

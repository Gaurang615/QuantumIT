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
    public class SchoolClassesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISchoolClassRepository _schoolClassRepository;
        private QuantumItDbContext _context { get; }

        public SchoolClassesController(IMapper mapper, IUnitOfWork unitOfWork, ISchoolClassRepository schoolClassRepository, QuantumItDbContext context)
        {
            _unitOfWork = unitOfWork;
            _schoolClassRepository = schoolClassRepository;
            _context = context;
            _mapper = mapper;
        }

        private bool SchoolClassExists(long id) =>
            _context.SchoolClasses.Any(e => e.Id == id);

        [HttpPost]
        public async Task<IActionResult> CreateSchoolClass([FromBody] SchoolClassViewModel entity)
        {
            // validate state
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Map view model to DB model
            var schoolClass = _mapper.Map<SchoolClassViewModel, SchoolClass>(entity);
            
            _schoolClassRepository.AddSchoolClass(schoolClass);

            // Save 
            await _unitOfWork.CompleteAsync();

            schoolClass = await _schoolClassRepository.GetSchoolClassAsync(schoolClass.Id);

            // Return mapped model
            var result = _mapper.Map<SchoolClass, SchoolClassViewModel>(schoolClass);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSchoolClass(int id, [FromBody] SchoolClassViewModel entity)
        {
            // validate state
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Map view model to DB model
            var schoolClass = _mapper.Map<SchoolClassViewModel, SchoolClass>(entity);

            _context.Entry(schoolClass).State = EntityState.Modified;

            try
            {
                await _unitOfWork.CompleteAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // if class not exist in database
                if (!SchoolClassExists(id))
                {
                    return NotFound();
                }

                throw;
            }
        
            // Return Id
            return Ok(id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveSchoolClass(int id)
        {
            // if class not exist in database
            var schoolClass = await _schoolClassRepository.GetSchoolClassAsync(id);
            if (schoolClass == null)
                return NotFound();

            _schoolClassRepository.RemoveSchoolClass(schoolClass);

            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSchoolClass(int id)
        {
            var schoolClass = await _schoolClassRepository.GetSchoolClassAsync(id);

            if (schoolClass == null)
                return NotFound();
            var result = _mapper.Map<SchoolClass, SchoolClassViewModel>(schoolClass);
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetSchoolClasses()
        {
            // Get classes 
            var schoolClasses = _context.SchoolClasses;

            if (schoolClasses == null)
                return NotFound();

            // Return mapped model
            var result = _mapper.Map<IEnumerable<SchoolClass>, IEnumerable<SchoolClassViewModel>>(schoolClasses);
            return Ok(result);
        }
    }
}

using AutoMapper;
using QuantumIt.Core.Models;
using QuantumIt.ViewModels;

namespace QuantumIt.Mapping
{
    // Mapping profiles
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            // School Class -> View model
            CreateMap<SchoolClass, SchoolClassViewModel>()
                .ForMember(dest => dest.classId, opts => opts.MapFrom(src => src.Id))
                .ForMember(dest => dest.classLocation, opts => opts.MapFrom(src => src.Location))
                .ForMember(dest => dest.teacherName, opts => opts.MapFrom(src => src.TeacherName))
                .ForMember(dest => dest.name, opts => opts.MapFrom(src => src.ClassName));

            // View model -> School Class
            CreateMap<SchoolClassViewModel, SchoolClass>()
                .ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.classId))
                .ForMember(dest => dest.Location, opts => opts.MapFrom(src => src.classLocation))
                .ForMember(dest => dest.TeacherName, opts => opts.MapFrom(src => src.teacherName))
                .ForMember(dest => dest.ClassName, opts => opts.MapFrom(src => src.name));

            // Student -> View Model
            CreateMap<Student, StudentViewModel>()
                .ForMember(dest => dest.studentId, opts => opts.MapFrom(src => src.StudentId))
                .ForMember(dest => dest.classId, opts => opts.MapFrom(src => src.ClassId))
                .ForMember(dest => dest.firstName, opts => opts.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.surName, opts => opts.MapFrom(src => src.SurName))
                .ForMember(dest => dest.fullName, opts => opts.MapFrom(src => src.FirstName + ' ' + src.SurName))
                .ForMember(dest => dest.age, opts => opts.MapFrom(src => src.Age))
                .ForMember(dest => dest.gpa, opts => opts.MapFrom(src => src.GPA));

            // View Model -> Student
            CreateMap<StudentViewModel, Student>()
                .ForMember(dest => dest.StudentId, opts => opts.MapFrom(src => src.studentId))
                .ForMember(dest => dest.ClassId, opts => opts.MapFrom(src => src.classId))
                .ForMember(dest => dest.FirstName, opts => opts.MapFrom(src => src.firstName))
                .ForMember(dest => dest.SurName, opts => opts.MapFrom(src => src.surName))
                .ForMember(dest => dest.Age, opts => opts.MapFrom(src => src.age))
                .ForMember(dest => dest.GPA, opts => opts.MapFrom(src => src.gpa));
        }
    }
}
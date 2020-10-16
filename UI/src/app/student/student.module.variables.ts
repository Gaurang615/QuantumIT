import { InjectionToken } from '@angular/core';
import { IConfigurableModule, IModuleConfigValues } from '../core/http/models/i-config';
import { IRestHandlerService } from '../core/http/services/rest-handler.service';
import { Student } from './Models/student';

export class StudentModuleVariables implements IModuleConfigValues {
  public classId = 0;
  public studentId = 0;
  setModelId(id: number) {
    this.studentId = id;
  }
}

// Module configuration with rest end points
export const StudentClassModuleConfiguration: IConfigurableModule<StudentModuleVariables> = {
  supportedModels: {
    Student: {
      endPoints: {
        getAll: (input: StudentModuleVariables, baseUrl: string) =>
          `${baseUrl}students/studentsbyclass/${input.classId}`,
        create: (input: StudentModuleVariables, baseUrl: string) =>
          `${baseUrl}students`,
        update: (input: StudentModuleVariables, baseUrl: string) =>
          `${baseUrl}students/${input.studentId}`,
        delete: (input: StudentModuleVariables, baseUrl: string) =>
          `${baseUrl}students/${input.studentId}`

      },
      model: Student
    }
  }
};

 // Injection token - for reset service
export const StudentRestServiceToken =
  new InjectionToken<IRestHandlerService<StudentModuleVariables, Student>>('StudentRestServiceToken');

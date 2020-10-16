import { InjectionToken } from '@angular/core';
import { IConfigurableModule, IModuleConfigValues } from '../core/http/models/i-config';
import { IRestHandlerService } from '../core/http/services/rest-handler.service';
import { SchoolClass } from './models/school-class';

// School class module variables
export class SchoolClassModuleVariables implements IModuleConfigValues {
  public classId = 0;
  setModelId(id: number) {
    this.classId = id;
  }
}

// Module configuration with rest end points
export const SchoolClassModuleConfiguration: IConfigurableModule<SchoolClassModuleVariables> = {
  supportedModels: {
    SchoolClass: {
      endPoints: {
        getAll: (input: SchoolClassModuleVariables, baseUrl: string) =>
                                    `${baseUrl}schoolclasses`,
        create: (input: SchoolClassModuleVariables, baseUrl: string) =>
                                     `${baseUrl}schoolclasses`,
        update: (input: SchoolClassModuleVariables, baseUrl: string) =>
                                     `${baseUrl}schoolclasses/${input.classId}`,
        delete: (input: SchoolClassModuleVariables, baseUrl: string) =>
                                     `${baseUrl}schoolclasses/${input.classId}`

      },
      model: SchoolClass
    }
  }
};

// Injection token for class reset service
export const SchoolClassRestServiceToken =
    new InjectionToken<IRestHandlerService<SchoolClassModuleVariables, SchoolClass>>('SchoolClassRestServiceToken');

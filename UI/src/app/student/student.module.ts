import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentClassModuleConfiguration, StudentRestServiceToken } from './student.module.variables';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RestHandlerService } from '../core/http/services/rest-handler.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../data-table/data-table.module';
import { MaterialInterfaceModule } from '../material-interface.module';



@NgModule({
  declarations: [StudentListComponent, StudentEditComponent],
  imports: [
    CommonModule,
    MaterialInterfaceModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [StudentListComponent],
  entryComponents: [StudentEditComponent],
  providers: [
    {
       // Dependency injection - for reset service
      provide: StudentRestServiceToken,
      useFactory: (http: HttpClient) => new RestHandlerService(http, StudentClassModuleConfiguration.supportedModels.Student),
      deps: [HttpClient]
    }
  ]
})
export class StudentModule { }

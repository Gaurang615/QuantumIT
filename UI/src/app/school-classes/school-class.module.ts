import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialInterfaceModule } from '../material-interface.module';
import { SchoolClassEditComponent } from './school-class-edit/school-class-edit.component';
import { DataTableModule } from '../data-table/data-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolClassesListComponent } from './school-class-list/school-class-list.component';
import { SchoolClassModuleConfiguration, SchoolClassRestServiceToken } from './school-class.module.variable';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RestHandlerService } from '../core/http/services/rest-handler.service';

@NgModule({
  declarations: [SchoolClassesListComponent, SchoolClassEditComponent],
  imports: [
    CommonModule,
    MaterialInterfaceModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule],
  exports: [SchoolClassesListComponent],
  entryComponents: [SchoolClassEditComponent],
  providers: [
    // Dependency injection - for reset service
    {
      provide: SchoolClassRestServiceToken,
      useFactory: (http: HttpClient) => new RestHandlerService(http, SchoolClassModuleConfiguration.supportedModels.SchoolClass),
      deps: [HttpClient]
    }
  ]
})
export class SchoolClassModule { }

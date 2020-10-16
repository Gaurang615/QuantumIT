import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestHandlerService } from '../../core/http/services/rest-handler.service';
import { DataTableModule } from '../../data-table/data-table.module';
import { MaterialInterfaceModule } from '../../material-interface.module';
import { StudentRestServiceToken, StudentClassModuleConfiguration } from '../student.module.variables';
import { StudentListComponent } from './student-list.component';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListComponent ],
      imports: [
        CommonModule,
        MaterialInterfaceModule,
        DataTableModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: StudentRestServiceToken,
          useFactory: (http: HttpClient) => new RestHandlerService(http, StudentClassModuleConfiguration.supportedModels.Student),
          deps: [HttpClient]
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

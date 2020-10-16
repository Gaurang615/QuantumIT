import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../data-table/data-table.module';
import { MaterialInterfaceModule } from '../../material-interface.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SchoolClassesListComponent } from './school-class-list.component';
import { HttpClient } from '@angular/common/http';
import { RestHandlerService } from '../../core/http/services/rest-handler.service';
import { SchoolClassRestServiceToken, SchoolClassModuleConfiguration } from '../school-class.module.variable';

describe('SchoolClassesListComponent', () => {
  let component: SchoolClassesListComponent;
  let fixture: ComponentFixture<SchoolClassesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolClassesListComponent ],
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
          provide: SchoolClassRestServiceToken,
          useFactory: (http: HttpClient) => new RestHandlerService(http, SchoolClassModuleConfiguration.supportedModels.SchoolClass),
          deps: [HttpClient]
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

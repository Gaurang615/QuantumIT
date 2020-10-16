import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRestHandlerService } from '../../core/http/services/rest-handler.service';
import { DataTableColumn } from '../../data-table/models/data-table-column';
import { Student } from '../Models/student';
import { StudentDialogConfig, StudentEditComponent } from '../student-edit/student-edit.component';
import { StudentModuleVariables, StudentRestServiceToken } from '../student.module.variables';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedClassId = 0;
  @ViewChild('confirmationDialog', { static: true }) confirmationDialog: TemplateRef<any>;

  public dataSource: MatTableDataSource<Student>;
  public columnsConfig: DataTableColumn<Student>[];
  public loading = true;
  private currentVariable = new StudentModuleVariables();
  private students: Student[] = [];
  private unsubscribe = new Subject<void>();

  constructor(@Inject(StudentRestServiceToken) private restService: IRestHandlerService<StudentModuleVariables, Student>,
              public dialog: MatDialog) { }

  ngOnInit() {
      // Configure rest service for use
    this.currentVariable.classId = this.selectedClassId;
    this.restService.configureForUse(this.currentVariable);
    // GPA higher than 3.2
    const cellColor = (element: Student) => (element.gpa > 3.2) ? 'red' : '';

    // Data table column config
    this.columnsConfig = [
      { header: 'Student Name', cell: (element: Student) => `${element.fullName}`, cellColor: cellColor.bind(this) },
      { header: 'Age', cell: (element: Student) => `${element.age}` },
      // tslint:disable-next-line: max-line-length
      { header: 'GPA', cell: (element: Student) => `${element.gpa}` },
    ];
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Re configure rest service for use
    this.selectedClassId = changes.selectedClassId.currentValue;
    this.currentVariable.classId = this.selectedClassId;
    this.restService.configureForUse(this.currentVariable);
    // Refresh data
    this.loadData();
  }

   // Get data from API and build data source
  private loadData(): void {
    this.loading = true;
    this.restService.getAll().subscribe(res => {
      if (res) {
        this.students = res;
        this.dataSource = new MatTableDataSource<Student>(res);
        this.loading = false;
      }
    });
  }

  // Add new row
  public addNewRow() {
    const data = new Student();
    data.classId = this.selectedClassId;
    this.showEditDialog(data);
  }

  // Update row
  public updateRow(studentToUpdate: Student) {
    this.showEditDialog(studentToUpdate);
  }

  // delete row
  public deleteRow(studentToDelete: Student) {
    const dialogRef = this.dialog.open(this.confirmationDialog, {
      width: '300px',
      data: studentToDelete
    });

    // subscribe to close dialog
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result !== undefined) {
        if (result === 'yes') {
          // Update module variable and configure rest endpoints values
          this.loading = true;
          this.currentVariable.setModelId(studentToDelete.studentId);
          this.restService.configureForUse(this.currentVariable);
             // Delete student
          this.restService.delete().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
            this.loadData();
          });
        }
      }
    });
  }

  // Show edit dialog for edit or new row
  private showEditDialog(data: Student) {
    const studentDialogConfigData: StudentDialogConfig = {
      student: data,
      currentStudents: this.students
    };
    const dialogRef = this.dialog.open(StudentEditComponent, {
      width: '300px',
      data: studentDialogConfigData
    });

     // subscribe to close dialog
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result) {
        const student = result.data as Student;
        this.currentVariable.classId = student.classId;
        this.currentVariable.setModelId(student.studentId);

         // Update module variable and configure rest endpoints values
        this.restService.configureForUse(this.currentVariable);
        this.loading = true;
        if (student.studentId === 0) {
           // Create new row
          this.restService.create(result.data).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
            this.loadData();
          });
        } else {
           // Update
           this.restService.update(result.data).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
            this.loadData();
          });
        }
      }
    });
  }

   // Unsubscribe all on destroy
   ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

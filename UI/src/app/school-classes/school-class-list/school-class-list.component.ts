import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRestHandlerService } from '../../core/http/services/rest-handler.service';
import { DataTableColumn } from '../../data-table/models/data-table-column';
import { SchoolClass } from '../models/school-class';
import { SchoolClassEditComponent } from '../school-class-edit/school-class-edit.component';
import { SchoolClassModuleVariables, SchoolClassRestServiceToken } from '../school-class.module.variable';


@Component({
  selector: 'app-school-classes-list',
  templateUrl: './school-class-list.component.html',
  styleUrls: ['./school-class-list.component.css']
})
export class SchoolClassesListComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<SchoolClass>;
  public columnsConfig: DataTableColumn<SchoolClass>[];
  public loading = true;
  private currentVariable = new SchoolClassModuleVariables();
  private unsubscribe = new Subject<void>();

  @ViewChild('confirmationDialog', { static: true }) confirmationDialog: TemplateRef<any>;
  @Output() selectedStudentClass = new EventEmitter<SchoolClass>();

  constructor(@Inject(SchoolClassRestServiceToken) private restService: IRestHandlerService<SchoolClassModuleVariables, SchoolClass>,
              public dialog: MatDialog) { }

  ngOnInit() {
    // Configure rest service for use
    this.restService.configureForUse(this.currentVariable);
    // Data table column config
    this.columnsConfig = [
      { header: 'Class Name', cell: (element: SchoolClass) => `${element.name}` },
      { header: 'Location', cell: (element: SchoolClass) => `${element.classLocation}` },
      { header: 'Teacher Name', cell: (element: SchoolClass) => `${element.teacherName}` },
    ];
    this.loadData();
  }

  // Get data from API and build data source
  private loadData(): void {
    this.restService.getAll().subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource<SchoolClass>(res);
        this.loading = false;
      }
    });
  }

  // Add new row
  public addNewRow() {
    this.showEditDialog(new SchoolClass());
  }

  // Update row
  public updateRow(classToUpdate: SchoolClass) {
    this.showEditDialog(classToUpdate);
  }

  // delete row
  public deleteRow(classToDelete: SchoolClass) {
    // show delete dialog
    const dialogRef = this.dialog.open(this.confirmationDialog, {
      width: '300px',
      data: classToDelete
    });
    // subscribe to close dialog
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result !== undefined) {
        if (result === 'yes') {
          // Update module variable and configure rest endpoints values
          this.currentVariable.classId = classToDelete.classId;
          this.restService.configureForUse(this.currentVariable);
          // Delete school class
          this.restService.delete().pipe( takeUntil(this.unsubscribe)).subscribe(res => {
            // Reset selected row
            this.selectedStudentClass.emit(new SchoolClass());
            this.loadData();
          });
        }
      }
    });
  }

  // Selected row
  public selectedRow(data: SchoolClass) {
    this.selectedStudentClass.emit(data);
  }

  // Show edit dialog for edit or new row
  private showEditDialog(data: SchoolClass) {
    const dialogRef = this.dialog.open(SchoolClassEditComponent, {
      width: '350px',
      data
    });

     // subscribe to close dialog
    dialogRef.afterClosed().pipe( takeUntil(this.unsubscribe)).subscribe(result => {
      if (result) {
        const schoolClass = result.data as SchoolClass;
        // Update module variable and configure rest endpoints values
        this.currentVariable.classId = schoolClass.classId;
        this.restService.configureForUse(this.currentVariable);

        if (schoolClass.classId === 0) {
          // Create new row
          this.restService.create(result.data).pipe( takeUntil(this.unsubscribe)).subscribe(res => {
            // Reset selected row
            this.selectedStudentClass.emit(new SchoolClass());
            this.loadData();
          });
        } else {
          // Update row
          this.restService.update(result.data).pipe( takeUntil(this.unsubscribe)).subscribe(res => {
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

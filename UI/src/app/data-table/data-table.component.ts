import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table/typings/table-data-source';
import { DataTableColumn } from './models/data-table-column';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent<Model> implements OnInit {

  // Inputs
  @Input() displayedColumns: DataTableColumn<Model>[];
  @Input() dataSource: MatTableDataSource<Model>;
  @Input() toolbarTemplate: TemplateRef<any>;

  // Outputs
  @Output() newRowAdded = new EventEmitter();
  @Output() rowUpdated = new EventEmitter<Model>();
  @Output() rowDeleted = new EventEmitter<Model>();
  @Output() rowSelected = new EventEmitter<Model>();


  public columnHeaders: string[];
  public selectedRows: Model[] = [];
  constructor() { }

  ngOnInit() {
    if (this.displayedColumns) {
      this.columnHeaders = this.displayedColumns.map(c => c.header);
      // Add action column
      this.columnHeaders.push('action');
    }
  }

  /**
   * Add new row
   */
  addNew($event) {
    this.newRowAdded.emit();
  }

  /**
   * Edit Row
   * @param element Model
   */
  editRow(element: Model) {
    this.rowUpdated.emit(element);
  }

  /**
   * Delete row
   */
  deleteRow(element: Model) {
    this.rowDeleted.emit(element);
  }

  /**
   * Selected row
   * @param element Selected Model
   */
  selectRow(element: Model) {
    this.selectedRows = [];
    this.selectedRows.push(element);
    this.rowSelected.emit(element);
  }

  public getCellColor(column: DataTableColumn<Model>, row: Model): string {
    // if column def has cellColor delegate
    if (column && column.cellColor) {
      return column.cellColor(row);
    }
    return '';
  }
}


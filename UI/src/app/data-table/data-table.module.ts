import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialInterfaceModule } from '../material-interface.module';
import { DataTableComponent } from './data-table.component';

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule, MaterialInterfaceModule],
  providers: [],
  exports: [DataTableComponent]
})
export class DataTableModule { }

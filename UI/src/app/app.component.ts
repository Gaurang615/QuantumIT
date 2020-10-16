import { Component } from '@angular/core';
import { SchoolClass } from './school-classes/models/school-class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QuantumItUI';
  public selectedClassId: number;

  public selectedStudentClass(data: SchoolClass) {
    this.selectedClassId = data.classId;
  }
}

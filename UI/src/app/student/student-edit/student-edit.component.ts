import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Student } from '../Models/student';

export class StudentDialogConfig {
  student: Student;
  currentStudents : Student[];
}
@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  private currentStudents: Student[] = [];
  constructor(public dialogRef: MatDialogRef<StudentEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StudentDialogConfig,
              private fb: FormBuilder) { }

  public form: FormGroup;
  ngOnInit() {
    this.currentStudents = this.data.currentStudents;

    // Build form group
    this.form = this.fb.group({
      classId: new FormControl(this.data.student.classId),
      studentId: new FormControl(this.data.student.studentId),
      firstName: new FormControl(this.data.student.firstName, [Validators.required, Validators.max(255)]),
      surName: new FormControl(this.data.student.surName, [Validators.required,
                                                           Validators.max(255),
                                                           this.uniqueSurNameValidator.bind(this)]),
      fullName: new FormControl(this.data.student.fullName),
      age: new FormControl(this.data.student.age, [Validators.required, Validators.min(1), Validators.max(99)]),
      gpa: new FormControl(this.data.student.gpa, [Validators.required, Validators.min(0), Validators.max(4.0)]),
    });
  }

  // On dialog close
  onClose(): void {
    this.dialogRef.close();
  }
   // close dialog and return form data back to caller
  save(): void {
    this.dialogRef.close({ data: this.form.value});
  }

  // Custom validator for unique surname
  private uniqueSurNameValidator(control: AbstractControl) {
    // Get form value
    const formValue: string = control.value;
    if (control.valid && formValue && control.parent) {
      // Get form group value
      const currentData: Student = control.parent.value;
      // Check surname uniqueness
      const isNameUnique = this.currentStudents
                            .find(st => st.studentId !== currentData.studentId
                                    && st.surName.toLocaleLowerCase() === formValue.toLocaleLowerCase());
      // If not unique
      if (isNameUnique !== undefined) {
       return {notUnique: true};
      }
    }
  }

}

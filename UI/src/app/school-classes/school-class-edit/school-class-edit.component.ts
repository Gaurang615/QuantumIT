import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SchoolClass } from '../models/school-class';

@Component({
  selector: 'app-school-class-edit',
  templateUrl: './school-class-edit.component.html',
  styleUrls: ['./school-class-edit.component.css']
})
export class SchoolClassEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SchoolClassEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SchoolClass,
              private fb: FormBuilder) { }

  public form: FormGroup;
  ngOnInit() {
    // Build form group
    this.form = this.fb.group({
      classId: new FormControl(this.data.classId),
      name: new FormControl(this.data.name, Validators.required),
      classLocation: new FormControl(this.data.classLocation, Validators.required),
      teacherName: new FormControl(this.data.teacherName, Validators.required),
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

}

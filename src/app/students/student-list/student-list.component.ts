import { Component, OnInit } from '@angular/core';
import {MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import { StudentsFormComponent } from '../students-form/students-form.component'

import { 
    StudentModel} from '../models/data-classes'

import { StudentsService } from '../models/students.service'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

	allStudents: StudentModel[];
	filtered: StudentModel[];

	constructor(
	  	private ss: StudentsService,
      public dialog: MdDialog,
      public snackBar: MdSnackBar ) {}

	ngOnInit() {
	  	this.ss.findAllStudents().subscribe(students => this.allStudents = this.filtered = students)

    }

    openDialogStudent() {
    let dialogRef = this.dialog.open(StudentsFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
        });
    }

    search(search:string) {
        this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }

}

import { Component, OnInit, AfterContentInit } from '@angular/core';
import { StudentsSharedService } from '../../../student-shared/student-shared.service'
import { MdSnackBar } from '@angular/material';

import { StudentModel } from '../../../student-shared/data-classes'

@Component({
  	selector: 'app-student-container',
  	templateUrl: './student-container.component.html',
  	styleUrls: ['./student-container.component.css']
})
export class StudentContainerComponent implements OnInit {
  	allStudents: StudentModel[];
  
  	constructor(
  		private ss: StudentsSharedService ,
  		public snackBar: MdSnackBar) { }

  	ngOnInit() {
      this.ss.findAllStudents().subscribe(students => this.allStudents = students)
    }
}

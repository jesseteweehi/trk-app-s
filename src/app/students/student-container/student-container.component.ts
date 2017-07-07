import { Component, OnInit, AfterContentInit } from '@angular/core';
import { StudentsService } from '../models/students.service'
import { MdSnackBar } from '@angular/material';

import { 
    StudentModel,
    StudentGroupModel
    } from '../models/data-classes'

@Component({
  	selector: 'app-student-container',
  	templateUrl: './student-container.component.html',
  	styleUrls: ['./student-container.component.css']
})
export class StudentContainerComponent implements OnInit {
  	allStudents: StudentModel[];
  	allStudentGroups: StudentGroupModel[];
  
  	constructor(
  		private ss: StudentsService,
  		public snackBar: MdSnackBar) { }

  	ngOnInit() {
  		this.ss.findAllStudentGroups().subscribe(students => this.allStudentGroups =  students)
    }

    ngAfterContentInit() {
      this.ss.findAllStudents().subscribe(students => this.allStudents = students)
    }

  	handleStudentForm($event) {
  		this.ss.createStudent($event.value).subscribe(
            () => {
                this.snackBar.open('Student Saved','Awesome',{ duration:2000 })
            },
            err => { 
                this.snackBar.open('Error Saving Student ${err}','Bugger',{ duration:2000 })
            }
        );
  }



	  handleStudentGroupForm($event){
	  	this.ss.createStudentGroup($event.value).subscribe(
	        () => {
	            this.snackBar.open('Student Group Saved','Awesome',{ duration:2000 })
	        },
	        err => { 
	            this.snackBar.open('Error Saving Student Group ${err}','Bugger',{ duration:2000 })
	        }
	    );
	  }

    handleStudent2GroupForm($event){
      this.ss.putStudentsInGroup($event.groupKey, $event.student).subscribe(
          () => {
              this.snackBar.open('Student Group Saved','Awesome',{ duration:2000 })
          },
          err => { 
              this.snackBar.open('Error Saving Student Group ${err}','Bugger',{ duration:2000 })
          }
      );
    }

}

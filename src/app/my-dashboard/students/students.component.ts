import { Component, OnChanges, Input } from '@angular/core';

import { UserModel } from '../../users/models/data-classes'
import { StudentModel } from '../../student-shared/data-classes';

import { MdDialog, MdSnackBar } from '@angular/material';

import { MyDashboardService } from '../my-dashboard.service'



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnChanges {
	@Input() user: UserModel;
	@Input() students: StudentModel[];

	filtered: StudentModel[];

	constructor(
		private ds: MyDashboardService,
		private snackBar: MdSnackBar
		) {

	}

	ngOnChanges() {
	    this.filtered = this.students
	}

	search(search:string) {
	    this.filtered = this.students.filter(student => student.firstName.toLowerCase().includes(search) );
	}

	remove(key) {
    	if (this.students.length > 1) 
      	{
        this.ds.removeStudentFromUser(this.user.$key, key).subscribe(
                     () => {
                         this.snackBar.open('Cohort Removed','Awesome',{ duration:2000 })
                     },
                     err => { 
                         this.snackBar.open('Error removing students ${err}','Bugger',{ duration:2000 })
                     }
                );
      	}
    else {
        this.ds.removeStudentFromUser(this.user.$key, key).subscribe(
                     () => {
                         this.snackBar.open('Cohort Removed','Awesome',{ duration:2000 })
                     },
                     err => { 
                         this.snackBar.open('Error removing students ${err}','Bugger',{ duration:2000 })
                     }
                );
        this.filtered = [];
    	}
	}	
}

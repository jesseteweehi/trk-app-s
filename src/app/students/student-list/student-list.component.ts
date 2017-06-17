import { Component, OnInit } from '@angular/core';

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
	  	) { }

	ngOnInit() {
	  	this.ss.findAllStudents().subscribe(students => this.allStudents = this.filtered = students)

    }

    search(search:string) {

        this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );

    }

}

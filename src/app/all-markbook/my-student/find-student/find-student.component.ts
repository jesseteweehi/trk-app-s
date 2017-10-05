import { Component, OnInit } from '@angular/core';

import { StudentModel } from '../../student-shared/data-classes'
import { StudentsSharedService } from '../../student-shared/student-shared.service'

@Component({
  selector: 'app-find-student',
  templateUrl: './find-student.component.html',
  styleUrls: ['./find-student.component.css']
})
export class FindStudentComponent implements OnInit {
   students: StudentModel[]

  constructor(private sharedservice: StudentsSharedService) { }

  ngOnInit() {
  		this.sharedservice.findAllStudents().subscribe(students => this.students = students)
  }

}

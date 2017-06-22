import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../models/students.service'

import { StudentModel } from '../models/data-classes'

@Component({
  selector: 'app-student-group',
  template:
  `
  <md-card *ngFor="let student of allStudents">
  	<md-card-title>{{student.firstName}} {{student.lastName}}</md-card-title>
  	<md-card-content></md-card-content>
  </md-card>
  `,
  styles: [
  `

  `
  ]
})
export class StudentGroupComponent implements OnInit {
	groupId: string;

  allStudents: StudentModel[];

  	constructor(private route: ActivatedRoute,
                private ss: StudentsService) { }

  	ngOnInit() {
  		this.groupId = this.route.snapshot.params['id'];
      this.ss.findStudentsForGroup(this.groupId).subscribe(
        students => this.allStudents = students)
  	}
}

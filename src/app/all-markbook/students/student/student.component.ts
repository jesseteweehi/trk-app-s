import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../models/students.service'

import { StudentModel, StudentGroupModel } from '../models/data-classes'

@Component({
  selector: 'app-student-group',
  template:
  `
  <md-card>
    <md-card-title>{{group.title}}</md-card-title>
    <md-card-content>{{group.description}}</md-card-content>

  </md-card>

  <div class="wrapper">

    <md-card *ngFor="let student of allStudents">
    	<md-card-title>{{student.firstName}} {{student.lastName}}</md-card-title>
    	<md-card-content></md-card-content>
    </md-card>
  </div>
  `,
  styles: [
  `
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  `
  ]
})
export class StudentGroupComponent implements OnInit {
	groupId: string;
  group: StudentGroupModel;

  allStudents: StudentModel[];

  	constructor(private route: ActivatedRoute,
                private ss: StudentsService) { }

  	ngOnInit() {
  		this.groupId = this.route.snapshot.params['id'];
      this.ss.findStudentsForGroup(this.groupId).subscribe(
        students => this.allStudents = students)

      this.ss.findStudentGroup(this.groupId).subscribe(
        group => this.group = group)
  	}
}

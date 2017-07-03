import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import { StudentsFormComponent, StudentsGroupFormComponent, Student2GroupListComponent
 } from '../students-form/students-form.component'

import { 
    StudentModel,
    StudentGroupModel
    } from '../models/data-classes'

import { StudentsService } from '../models/students.service'

@Component({
  selector: 'app-student-dialog-list',
  template: `
 
  {{allStudents?.length}}


  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>



  <md-list>
    <md-list-item *ngFor="let student of filtered">
    {{student.firstName}} {{student.lastName}} <p>{{student.yrlvl}}</p>
    <button class="right" md-icon-button (click)="removeStudents(student)"><md-icon>add</md-icon></button>
    </md-list-item>

  </md-list>
  `,
  styles: [`
    .right {
      margin-left: auto
    }
    
    md-list-item:not(:last-child) {
        border-bottom: solid 1px lightgrey
    }

    md-list-item p {
      padding-left: 20px;
      color: lightgrey;
    }
  `]
})
export class StudentListDialogComponent {
  @Output() studentsToRemove = new EventEmitter<StudentModel[]>(); 
  @Input() allStudents: StudentModel[];

  filtered: StudentModel[];

  constructor(
      public dialog: MdDialog,
      public snackBar: MdSnackBar ) {}

  ngOnChanges() {
    this.filtered = this.allStudents
  }

  openDialogStudent() {
  let dialogRef = this.dialog.open(StudentsFormComponent);
  dialogRef.afterClosed().subscribe(result => {
    this.formSend.emit(result);
      });
  }

  search(search:string) {
    this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }
}


@Component({
  selector: 'app-student-list',
  template: `
 
  {{allStudents?.length}}


  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>



  <md-list>
    <md-list-item *ngFor="let student of filtered">
    {{student.firstName}} {{student.lastName}} <p>{{student.yrlvl}}</p>
    <button class="right" md-icon-button (click)="addStudents(student)"><md-icon>add</md-icon></button>
    </md-list-item>

  </md-list>
  `,
  styles: [`
    .right {
      margin-left: auto
    }
    
    md-list-item:not(:last-child) {
        border-bottom: solid 1px lightgrey
    }

    md-list-item p {
      padding-left: 20px;
      color: lightgrey;
    }
  `]
})
export class StudentListComponent {
  @Output() formSend = new EventEmitter<any>(); 
	@Input() allStudents: StudentModel[];

  filtered: StudentModel[];

	constructor(
      public dialog: MdDialog,
      public snackBar: MdSnackBar ) {}

  ngOnChanges() {
    this.filtered = this.allStudents
  }

  openDialogStudent() {
  let dialogRef = this.dialog.open(StudentsFormComponent);
  dialogRef.afterClosed().subscribe(result => {
    this.formSend.emit(result);
      });
  }

  search(search:string) {
    this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }
}


@Component({
  selector: 'app-student-group-list',
  template: `
  <br>

 <button md-button (click)="openDialogGroup()">Create Group</button>


 <br>

  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>


  <md-card *ngFor="let group of filtered">

  <md-card-title>{{group.title}}</md-card-title>
  <md-card-content>{{group.description}}</md-card-content>

  <md-card-actions>
      <button md-button color="primary" (click)="openDialogStudent(group)">Add Students</button>
       <a md-raised-button color="primary" routerLink="groups/{{group.$key
       }}">Students</a>
  </md-card-actions>
   
  </md-card>
  `,
  styles: []
})
export class StudentGroupListComponent {
  @Output() formSend = new EventEmitter<any>();
  @Output() student2GroupFormSend = new EventEmitter<any>(); 
  @Input() allStudentGroups: StudentGroupModel[];

  filtered: StudentGroupModel[];

  constructor(public dialog: MdDialog) {}

  ngOnChanges() {
    this.filtered = this.allStudentGroups
  }

    openDialogGroup() {
    let dialogRef = this.dialog.open(StudentsGroupFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.formSend.emit(result);
        });
    }

    openDialogStudent(group) {
    let dialogRef = this.dialog.open(Student2GroupListComponent, {
        data: {
                'studentGroup' : group 
              },
        height: '90%',
        width: '500px'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      this.student2GroupFormSend.emit(result) 
    })
  }


    search(search:string) {
        this.filtered = this.allStudentGroups.filter(group => group.title.toLowerCase().includes(search) );
    }

}

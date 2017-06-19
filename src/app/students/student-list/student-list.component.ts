import { Component, OnInit } from '@angular/core';
import {MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import { StudentsFormComponent, StudentsGroupFormComponent, Student2GroupListComponent
 } from '../students-form/students-form.component'

import { 
    StudentModel,
    StudentGroupModel
    } from '../models/data-classes'

import { StudentsService } from '../models/students.service'

@Component({
  selector: 'app-student-list',
  template: `
  <button md-button (click)="openDialogStudent()">Create Student</button>

  <br>


  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>



  <md-list>
    <md-list-item *ngFor="let student of filtered">
    {{student.firstName}} {{student.lastName}} <p>{{student.yrlvl}}</p>
    </md-list-item>

  </md-list>
  `,
  styles: [`
    md-list-item:not(:last-child) {
        border-bottom: solid 1px lightgrey
    }

    md-list-item p {
      padding-left: 20px;
      color: lightgrey;
    }
  `]
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
      this.saveStudent(result)
        });
    }

    saveStudent(form){
      this.ss.createStudent(form.value).subscribe(
            () => {
                this.snackBar.open('Student Saved','Awesome',{ duration:2000 })
            },
            err => { 
                this.snackBar.open('Error Saving Student ${err}','Bugger',{ duration:2000 })
            }
        );
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
      <button md-button (click)="openDialogStudent(group.$key)">Create Group</button>
  </md-card-actions>
   
  </md-card>
  `,
  styles: []
})
export class StudentGroupListComponent implements OnInit {

  allStudentGroups: StudentGroupModel[];
  filtered: StudentGroupModel[];

  constructor(
      private ss: StudentsService,
      public dialog: MdDialog,
      public snackBar: MdSnackBar ) {}

  ngOnInit() {
      this.ss.findAllStudentGroups().subscribe(students => this.allStudentGroups = this.filtered = students)

    }

    openDialogGroup() {
    let dialogRef = this.dialog.open(StudentsGroupFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.saveStudentGroup(result)
        });
    }

    openDialogStudent(key) {
    let dialogRef = this.dialog.open(Student2GroupListComponent, {
        data: {'allStudentGroups': this.allStudentGroups ,
                'studentGroup' : key
              }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

    saveStudentGroup(form){
      this.ss.createStudentGroup(form.value).subscribe(
            () => {
                this.snackBar.open('Student Group Saved','Awesome',{ duration:2000 })
            },
            err => { 
                this.snackBar.open('Error Saving Student Group ${err}','Bugger',{ duration:2000 })
            }
        );
    }

    search(search:string) {
        this.filtered = this.allStudentGroups.filter(group => group.title.toLowerCase().includes(search) );
    }

}

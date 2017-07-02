import { Component, OnInit, Input, Inject, OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { 
    StudentModel,
    StudentGroupModel
    } from '../models/data-classes';

import { StudentsService } from '../models/students.service'

@Component({
  selector: 'app-students-form',
  template: 
  `
  <h1 md-dialog-title>Create Student</h1>
  <div md-dialog-content>

    <form novalidate [formGroup]="form">

        <md-input-container class="example-full-width">
           <input placeholder="FirstName" type="text" mdInput formControlName="firstName">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input placeholder="Last Name" type="text" mdInput formControlName="lastName">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input placeholder="Identification Code" type="text" mdInput formControlName="id">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input placeholder="Gender" type="text" mdInput formControlName="gender">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input placeholder="Year Level" type="text" mdInput formControlName="yrlvl">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input placeholder="Ethnic Group" type="text" mdInput formControlName="ethnicMain">
        </md-input-container>

    
    </form>  
  </div>
  <div md-dialog-actions>
       <button md-button (click)="dialogRef.close(form)">Create</button>

  </div>
  `
  ,
  styles: []
})
export class StudentsFormComponent {

  	form: FormGroup;

    constructor(public dialogRef: MdDialogRef<StudentsFormComponent>,
    			private fb: FormBuilder,
    			) {

    	this.form = this.fb.group({
    		firstName: [''],
    		lastName: [''],
    		id: [''],
    		gender: [''],
    		yrlvl: [''],
    		ethnicMain: ['']
    		});
    	}
}

@Component({
  selector: 'app-students-group-form',
  template: 
  `
  <h1 md-dialog-title>Create Student Group</h1>
  <div md-dialog-content>

    <form novalidate [formGroup]="form">

        <md-input-container class="example-full-width">
           <input placeholder="Title" type="text" mdInput formControlName="title">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input placeholder="description" type="text" mdInput formControlName="description">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input placeholder="Identification Code" type="text" mdInput formControlName="id">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input placeholder="Year Level" type="text" mdInput formControlName="yrlvl">
        </md-input-container>
    
    </form>  
  </div>
  <div md-dialog-actions>
       <button md-button (click)="dialogRef.close(form)">Create</button>

  </div>
  `
  ,
  styles: []
})
export class StudentsGroupFormComponent {

    form: FormGroup;

    constructor(public dialogRef: MdDialogRef<StudentsGroupFormComponent>,
          private fb: FormBuilder,
          ) {

      this.form = this.fb.group({
        title: [''],
        description: [''],
        id: [''],
        yrlvl: ['']
        });
      }
}

@Component({
  selector: 'app-student2group-list',
  templateUrl: './student2group.component.html',
  styles: [`
    md-dialog-content {
      max-height: 100px;
    }

    .right {
      margin-left: auto
    }

    md-list {
      height: 300px;
      overflow: scroll;
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
export class Student2GroupListComponent implements OnInit{

  allStudents: StudentModel[];
  filtered: StudentModel[];

  group: StudentGroupModel = this.data.studentGroup;

  students2Add: StudentModel[] = []

  constructor(private ss: StudentsService,
              public dialogRef: MdDialogRef<StudentsGroupFormComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    this.ss.findAllStudents().subscribe(students => this.allStudents = this.filtered = students)
  }

  search(search:string) {
        this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }

  addStudents(student){
    if (this.students2Add.includes(student) === false) {
      this.students2Add.push(student) }
    }

  createResult() {
    let result = {
      "groupKey" : this.group.$key,
      "student" : this.students2Add
      }
    this.dialogRef.close(result)
  }

}

@Component({
  selector: 'app-student-edit',
  template: 
  `
  <div md-dialog-title></div>


  <div md-dialog-content>
      <form novalidate [formGroup]="form">

        <md-input-container class="example-full-width">
           <input value="{{student.title}}" type="text" mdInput formControlName="title">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input value="{{student.description}}" placeholder="description" type="text" mdInput formControlName="description">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input value="{{student.id}}" placeholder="Identification Code" type="text" mdInput formControlName="id">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input value="{{student.ethnicMain}}" placeholder="Year Level" type="text" mdInput formControlName="yrlvl">
        </md-input-container>
    
    </form>


  <div md-dialog-actions>
    <button md-button (click)="dialogRef.close(form)">Create</button>
   
  </div>

  `,
  styles: [`
  `]
})
export class StudentComponent implements OnInit{
  form: FormGroup;

  student: StudentModel;
  
 

  constructor(
              public dialogRef: MdDialogRef<StudentComponent>,
              @Inject(MD_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
          ) {

      this.form = this.fb.group({
        firstName: [''],
        lastName: [''],
        id: [''],
        gender: [''],
        yrlvl: [''],
        ethnicMain: ['']
        });
      } 


  ngOnInit() {
   
  }

}



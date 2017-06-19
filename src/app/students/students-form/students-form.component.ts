import { Component, OnInit, Input, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { 
    StudentModel,
    StudentGroupModel
    } from '../models/data-classes'

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
    md-list-item:not(:last-child) {
        border-bottom: solid 1px lightgrey
    }

    md-list-item p {
      padding-left: 20px;
      color: lightgrey;
    }
  `]
})
export class Student2GroupListComponent {

  // Going to have two pieces of data
  // All the students so they can be added to the group
  // Group id so they student list can be added correctly under the right group.
  // the student list with the ability to pick students and pass them to the parent is going
  // to be needed multiple times so may be best to build this first.

  // Maybe we should pass it on from the outside...???? Or build it somewhere else and than inject it here????
  students2add: StudentModel[]

  filtered: StudentModel[]
  allStudents: StudentModel[] = this.data.allStudentGroups;
 

  constructor(public dialogRef: MdDialogRef<StudentsGroupFormComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {}

  search(search:string) {
        this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }

}



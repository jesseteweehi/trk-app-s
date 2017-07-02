import { Component, Inject, OnInit } from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { StudentsService } from '../../students/models/students.service'

import { StudentModel } from '../../students/models/data-classes'


@Component({
  selector: 'learning-piece-student-list',
  template: 
  `
  <app-student-list 
  [allStudents]="allStudents" 
  >
  </app-student-list> 
  `,
  styles:[]
})
export class LEStudentListPieceDialogComponent implements OnInit {

	allStudents: StudentModel[];


    constructor(public dialogRef: MdDialogRef<LEStudentListPieceDialogComponent>,
    			@Inject(MD_DIALOG_DATA) public data: any,
    			private ss: StudentsService
          ) {}

    ngOnInit() {
    	//// This will have to likely moved to a shared module in the future
    // this.ss.findStudentsForLE(this.data.lePiece.$key).subscribe(students => this.allStudents = students)
    this.ss.findStudentsForLP(this.data.lePiece.$key).subscribe(result => this.allStudents = result)
  }    
}

@Component({
  selector: 'learning-block-student-list',
  template: 
  `
  <app-student-list 
  [allStudents]="allStudents" 
  >
  </app-student-list> 
  `,
  styles:[]
})
export class LEStudentListBlockDialogComponent implements OnInit {

  allStudents: StudentModel[];


    constructor(public dialogRef: MdDialogRef<LEStudentListBlockDialogComponent>,
          @Inject(MD_DIALOG_DATA) public data: any,
          private ss: StudentsService
          ) {}

    ngOnInit() {
      //// This will have to likely moved to a shared module in the future
    // this.ss.findStudentsForLE(this.data.lePiece.$key).subscribe(students => this.allStudents = students)
    this.ss.findStudentsForLB(this.data.lePiece.$key).subscribe(result => this.allStudents = result)
  }    
}

@Component({
  selector: 'learning-group-student-list',
  template: 
  `
  <app-student-list 
  [allStudents]="allStudents" 
  >
  </app-student-list> 
  `,
  styles:[]
})
export class LEStudentListGroupDialogComponent implements OnInit {

  allStudents: StudentModel[];


    constructor(public dialogRef: MdDialogRef<LEStudentListGroupDialogComponent>,
          @Inject(MD_DIALOG_DATA) public data: any,
          private ss: StudentsService
          ) {}

    ngOnInit() {
      //// This will have to likely moved to a shared module in the future
    // this.ss.findStudentsForLE(this.data.lePiece.$key).subscribe(students => this.allStudents = students)
    this.ss.findStudentsForLG(this.data.lePiece.$key).subscribe(result => this.allStudents = result)
  }    
}
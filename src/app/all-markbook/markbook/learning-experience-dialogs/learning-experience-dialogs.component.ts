import { Component, Inject, OnInit } from '@angular/core';

import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { StudentsSharedService } from '../../../student-shared/student-shared.service';

import { StudentModel } from '../../../student-shared/data-classes'

///Contains the dialogs for Adding and Removing Students from Learning Pieces
// Contains the dialogs for seeing the students for each Block and Group
// Student Service is used to retrieve data which is in the dialogs view
// Actual changing of data is handled on handed back to original component 
// Likely to use the methods here from the Students Service to be moved to Shared Student Service.

@Component({
  selector: 'cohort-compare-list',
  template: 
  `
  <md-tab-group>
    <md-tab label="Yet to Attain">
      <app-student-list 
      [allStudents]="outStudents">
      </app-student-list>
    </md-tab>

    <md-tab label="Attained">
      <app-student-list 
      [allStudents]="inStudents">
      </app-student-list>
    </md-tab>

    <md-tab label="Cohort">
      <app-student-list 
      [allStudents]="allStudents">
      </app-student-list>
    </md-tab>

  </md-tab-group>
  `,
  styles:[]
})
export class CohortCompareDialogComponent implements OnInit {
  allStudents: StudentModel[];
  inStudents: StudentModel[];
  outStudents: StudentModel[];


    constructor(public dialogRef: MdDialogRef<CohortCompareDialogComponent>,
          @Inject(MD_DIALOG_DATA) public data: any,
          private ss: StudentsSharedService
          ) {}

    ngOnInit() {
    this.ss.findCohortStudentsFromStudentKeys(this.data.all).subscribe(result => this.allStudents = result)
    this.ss.findCohortStudentsFromStudentKeys(this.data.in).subscribe(result => this.inStudents = result)
    this.ss.findCohortStudentsFromStudentKeys(this.data.out).subscribe(result => this.outStudents = result)
  }   
}


@Component({
  selector: 'learning-piece-removestudent-list',
  template: 
  `
  <app-student-remove-list 
  [allStudents]="allStudents"
  (studentsToRemove)="studentsToRemove($event)"
  >
  </app-student-remove-list> 
  `,
  styles:[]
})
export class LEStudentListPieceRemoveDialogComponent implements OnInit {
	allStudents: StudentModel[];


    constructor(public dialogRef: MdDialogRef<LEStudentListPieceRemoveDialogComponent>,
    			@Inject(MD_DIALOG_DATA) public data: any,
    			private ss: StudentsSharedService
          ) {}

    ngOnInit() {
    this.ss.findStudentsForLP(this.data.lePiece.$key).subscribe(result => this.allStudents = result)
  }  

    studentsToRemove($event) {
      this.dialogRef.close($event)
    }  
}

@Component({
  selector: 'learning-piece-addstudent-list',
  template: 
  `
  <app-student-add-list 
  [allStudents]="allStudents"
  (studentsToAdd)="studentsToAdd($event)"
  >
  </app-student-add-list> 
  `,
  styles:[]
})
export class LEStudentListPieceAddDialogComponent implements OnInit {

  allStudents: StudentModel[];


  constructor(public dialogRef: MdDialogRef<LEStudentListPieceAddDialogComponent>,
          @Inject(MD_DIALOG_DATA) public data: any,
          private ss: StudentsSharedService
          ) {}

  ngOnInit() {
  this.ss.findAllStudents().subscribe(result => this.allStudents = result)
  }  

  studentsToAdd($event) {      
    this.dialogRef.close($event)
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
          private ss: StudentsSharedService
          ) {}

    ngOnInit() {
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
          private ss: StudentsSharedService
          ) {}

    ngOnInit() {
    this.ss.findStudentsForLG(this.data.lePiece.$key).subscribe(result => this.allStudents = result)
  }    
}
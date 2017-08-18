import { Component, Inject, OnInit } from '@angular/core';

import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { StudentsSharedService } from '../../student-shared/student-shared.service';
import { CohortsService } from '../models/cohorts.service'

import { StudentModel } from '../../student-shared/data-classes'
import { CohortModel } from '../models/data-classes'

@Component({
  selector: 'cohort-list',
  template: 
  `
  <app-cohorts-list 
  [allCohorts]="allCohorts"
  (cohortChosen)="cohortChosen($event)"
  >
  </app-cohorts-list> 
  `,
  styles:[]
})
export class CohortListDialogComponent implements OnInit {
  allCohorts: CohortModel[];


  constructor(public dialogRef: MdDialogRef<CohortListDialogComponent>,
          @Inject(MD_DIALOG_DATA) public data: any,
          private cs: CohortsService
          ) {}

  ngOnInit() {
  this.cs.findAllCohorts().subscribe(result => this.allCohorts = result)
  }

  cohortChosen($event) {
    this.dialogRef.close($event)
  }
}

@Component({
  selector: 'cohort-addstudent-list',
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
export class CohortStudentListPieceAddDialogComponent implements OnInit {

  allStudents: StudentModel[];


  constructor(public dialogRef: MdDialogRef<CohortStudentListPieceAddDialogComponent>,
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
  selector: 'cohort-piece-removestudent-list',
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

export class CohortStudentListPieceRemoveDialogComponent implements OnInit {
	allStudents: StudentModel[];


    constructor(public dialogRef: MdDialogRef<CohortStudentListPieceRemoveDialogComponent>,
    			@Inject(MD_DIALOG_DATA) public data: any,
    			private ss: StudentsSharedService
          ) {}

    ngOnInit() {
    this.ss.findStudentsForCohort(this.data.lePiece.$key).subscribe(result => this.allStudents = result)
  }  

    studentsToRemove($event) {
      this.dialogRef.close($event)
    }  
}
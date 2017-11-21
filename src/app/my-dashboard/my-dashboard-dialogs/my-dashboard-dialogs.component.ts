import { Component, Inject, OnInit } from '@angular/core';

import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { StudentsSharedService } from '../../student-shared/student-shared.service';
import { CohortsService } from '../../all-students/cohorts/models/cohorts.service'
import { LearningExperienceService } from '../../all-markbook/markbook/models/learning-experience.service';

import { StudentModel } from '../../student-shared/data-classes';
import { LearningAssessmentGroupModel } from '../../all-markbook/markbook/models/data-classes'
import { CohortModel } from '../../all-students/cohorts/models/data-classes'


@Component({
  selector: 'student-add-dialog',
  template: 
  `
  <app-student-add-list 
  [allStudents]="allItems"
  (studentsToAdd)="itemsToAdd($event)"
  >
  </app-student-add-list> 
  `,
  styles:[]
})
export class MyDashBoardStudentAddDialogComponent implements OnInit {

  allItems: StudentModel[];


  constructor(public dialogRef: MdDialogRef<MyDashBoardStudentAddDialogComponent>,
          @Inject(MD_DIALOG_DATA) public data: any,
          private ss: StudentsSharedService
          ) {}

  ngOnInit() {
  this.ss.findAllStudents().subscribe(result => this.allItems = result)
  }  

  itemsToAdd($event) {      
    this.dialogRef.close($event)
  }  
}

@Component({
  selector: 'cohort-add-dialog',
  template: 
  `
  <app-cohort-add-list
  [allItems]="allItems"
  (itemsToAdd)="itemsToAdd($event)"
  >
  </app-cohort-add-list>
 
  `,
  styles:[]
})
export class MyDashBoardCohortAddDialogComponent implements OnInit {

  allItems: CohortModel[];


  constructor(public dialogRef: MdDialogRef<MyDashBoardCohortAddDialogComponent>,
          @Inject(MD_DIALOG_DATA) public data: any,
          private cs: CohortsService
          ) {}

  ngOnInit() {

    this.cs.findAllCohorts().subscribe(items => this.allItems = items)
  }  

  itemsToAdd($event) {      
    this.dialogRef.close($event)
  }  
}

@Component({
  selector: 'learningGroup-add-dialog',
  template: 
  `
  <app-learningGroup-add-list
  [allItems]="allItems"
  (itemsToAdd)="itemsToAdd($event)"
  >
  </app-learningGroup-add-list>
 
  `,
  styles:[]
})
export class MyDashBoardlearningGroupAddDialogComponent implements OnInit {

  allItems: LearningAssessmentGroupModel[];


  constructor(public dialogRef: MdDialogRef<MyDashBoardlearningGroupAddDialogComponent>,
          @Inject(MD_DIALOG_DATA) public data: any,
          private ls: LearningExperienceService
          ) {}

  ngOnInit() {
    this.ls.findAllLearningExperienceGroups().subscribe(items => this.allItems = items)
  }  

  itemsToAdd($event) {      
    this.dialogRef.close($event)
  }  
}


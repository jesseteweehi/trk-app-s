import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs/Rx";

import {MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import { LearningExperienceService } from '../models/learning-experience.service';
import { LearningExperienceFormGroupComponent, LearningExperienceFormBlockComponent, LearningExperienceFormPieceComponent, LearningExperienceFormHeaderComponent } from '../learning-experience-form/learning-experience-form.component';

import { LearningAssessmentGroupModel, LearningAssessmentBlockModel, LearningAssessmentPieceModel } from '../models/data-classes';

import { LEStudentListPieceRemoveDialogComponent,
         LEStudentListPieceAddDialogComponent,
         LEStudentListBlockDialogComponent,
         LEStudentListGroupDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs.component';

import { LePieceCreateDialogComponent,
         LePieceEditDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs-forms.component';

import { StudentModel } from '../../students/models/data-classes';

@Component({
  selector: 'app-learning-experience-group-list',
  template: 
  `
  <button md-button (click)="openDialogGroup()">Create Assessment Group</button>

  <div class="wrapper">

  <md-card class="grid-item" *ngFor="let group of groups">
  	<md-card-title>{{group.title}}</md-card-title>
  	<md-card-subtitle>{{group.learningArea}} | {{group.learningLevel}}</md-card-subtitle>
  	<md-card-content>{{group.description}}</md-card-content>
  	<md-card-actions>
  	    <a md-button color="primary" routerLink="{{group.$key}}">Assessment Blocks</a>
        <button md-button color="primary" (click)="openDialogFindStudent(group)">Students</button>
  	  </md-card-actions>
  </md-card>

  </div>

  <router-outlet></router-outlet>

  `,
  styles: [`
  	.wrapper {
  		display: grid;
  	  	height: auto;
  	  	grid-template-columns : repeat( 5, 1fr)
  	}

  	.grid-item {
  	  grid-column: auto;
  	  grid-row: auto;
  	}
  `]
})

export class LearningExperienceGroupListComponent implements OnInit {

	groups: LearningAssessmentGroupModel[];

  	constructor(
  		private ls: LearningExperienceService,
  		public dialog: MdDialog,
        public snackBar: MdSnackBar ) {}

    ngOnInit() {
    	this.ls.findAllLearningExperienceGroups().subscribe(groups => this.groups = groups)
    }

    openDialogGroup() {
    let dialogRef = this.dialog.open(LearningExperienceFormGroupComponent);
    dialogRef.afterClosed().subscribe(result => {
    	this.firebaseLearningExperienceGroup(result)
        });
    }

    openDialogFindStudent(group) {
    let dialogRef = this.dialog.open(LEStudentListGroupDialogComponent, {
        data: {
                'lePiece' : group 
              },
        height: '90%',
        width: '500px'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      })
    }

    firebaseLearningExperienceGroup(form) {
    	this.ls.createNewLearningExperienceGroup(form.value).subscribe(
    		    () => {
    		        this.snackBar.open('Lesson Group Saved','Awesome',{ duration:2000 })
    		    },
    		    err => { 
    		        this.snackBar.open('Error Saving Lesson Group ${err}','Bugger',{ duration:2000 })
    		    }
    		);
    }
};

@Component({
  selector: 'app-learning-experience-block-list',
  template: 
  `
 

  <button md-button (click)="openDialogBlock()">Create Assessment Block</button>

  <div class="wrapper">

  <md-card class="grid-item" *ngFor="let group of groups">
  	<md-card-title>{{group.title}}</md-card-title>
  	<md-card-subtitle>{{group.learningArea}} | {{group.learningLevel}}</md-card-subtitle>
  	<md-card-content>{{group.description}}</md-card-content>
  	<md-card-actions>
  	    <a md-button color="primary" routerLink="{{group.$key}}">Assessments</a>
        <button md-button color="primary" (click)="openDialogFindStudent(group)">Students</button>
  	  </md-card-actions>
  </md-card>

  </div>

  <router-outlet></router-outlet>

  `,
  styles: [`
  	.wrapper {
  		display: grid;
  	  	height: auto;
  	  	grid-template-columns : repeat( 5, 1fr)
  	}

  	.grid-item {
  	  grid-column: auto;
  	  grid-row: auto;
  	}
  `]
})

export class LearningExperienceBlockListComponent implements OnInit {


	groups: LearningAssessmentBlockModel[];
	groupId: string;

  	constructor(
  		private route: ActivatedRoute,
  		private ls: LearningExperienceService,
  		public dialog: MdDialog,
        public snackBar: MdSnackBar ) {}

    ngOnInit() {
    	this.groupId = this.route.snapshot.params['groupid']
    	this.ls.findBlocksForGroup(this.groupId).subscribe(groups => this.groups = groups);   	
    }

    openDialogFindStudent(group) {
    let dialogRef = this.dialog.open(LEStudentListBlockDialogComponent, {
        data: {
                'lePiece' : group 
              },
        height: '90%',
        width: '500px'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      })
    }

    openDialogBlock() {
    let dialogRef = this.dialog.open(LearningExperienceFormGroupComponent);
    dialogRef.afterClosed().subscribe(result => {
    	this.firebaseLearningExperienceBlock(result)
        });
    }



    firebaseLearningExperienceBlock(form) {
    	this.ls.createNewLearningExperienceBlockUnderGroup(this.groupId, form.value).subscribe(
    		    () => {
    		        this.snackBar.open('Lesson Group Saved','Awesome',{ duration:2000 })
    		    },
    		    err => { 
    		        this.snackBar.open('Error Saving Lesson Group ${err}','Bugger',{ duration:2000 })
    		    }
    		);
    }

}



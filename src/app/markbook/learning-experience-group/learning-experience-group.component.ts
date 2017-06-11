import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import { LearningExperienceService } from '../models/learning-experience.service';
import { LearningExperienceFormGroupComponent, LearningExperienceFormBlockComponent, LearningExperienceFormPieceComponent } from '../learning-experience-form/learning-experience-form.component';

import { LearningAssessmentGroupModel, LearningAssessmentBlockModel, LearningAssessmentPieceModel } from '../models/data-classes'

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
  	    <a md-raised-button color="primary" routerLink="{{group.$key}}">Raised button</a>
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
  {{ groupId }}

  <button md-button (click)="openDialogBlock()">Create Assessment Block</button>

  <div class="wrapper">

  <md-card class="grid-item" *ngFor="let group of groups">
  	<md-card-title>{{group.title}}</md-card-title>
  	<md-card-subtitle>{{group.learningArea}} | {{group.learningLevel}}</md-card-subtitle>
  	<md-card-content>{{group.description}}</md-card-content>
  	<md-card-actions>
  	    <a md-raised-button color="primary" routerLink="{{group.$key}}">Raised button</a>
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

@Component({
  selector: 'app-learning-experience-piece-list',
  templateUrl: './learning-experience-piece.component.html',
  styleUrls: ['./learning-experience-piece.component.css'],
})

export class LearningExperiencePieceListComponent implements OnInit {
  showtitlex: string = ''

  data: any = {}
  
  groups: LearningAssessmentPieceModel[];
	blockId: string;

  xheaders: string[] = [];
  yheaders: string[] = [];

  	constructor(
  		private route: ActivatedRoute,
  		private ls: LearningExperienceService,
  		public dialog: MdDialog,
        public snackBar: MdSnackBar) {
  	}

    ngOnInit() {
    	this.blockId = this.route.snapshot.params['blockid']
    	this.ls.findPiecesForBlocks(this.blockId).subscribe(groups => this.groups = groups);    	
    }

    xheader(i) {
    // grid Area : row-start,row-end, column-start, column-end
      let styles = {
          'grid-row': + (i+1) + '/' + (i+2),
          'grid-column': '1 / 2',
          // 'text-align': 'center',

      }
      return styles
    }

    yheader(i) {
      let styles = {
          'grid-column': + (i+1) + '/' + (i+2),
          'grid-row': '1 / 2',
      }
      return styles
    }

    template() { 
    if (this.data.columns > 1)    	
      {     
        let styles = {
              'grid-template-columns' : 'repeat(' + (this.data.columns+1) + ', 1fr)' 
            }
            return styles
       }
    else {
          let styles = {
            'grid-template-columns' : '25% 75%'
          }
          return styles
         }
    }

    getForm($event) {
      this.data = $event;
      this.templateChange()
    }

    templateChange() {
      this.xheaders = Array.apply(null, Array(Math.ceil(this.groups.length/this.data.columns))).map((x,i) => { return 'x' + (i + 1).toString() });
      this.yheaders = Array.apply(null, Array(this.data.columns)).map((x,i) => { return 'y' +(i + 1).toString() });
    }

    unhide(header:string) {
      this.showtitlex = header
    }


    convertToObject(a) {
        return a.reduce(function(result, item){
        result[item] = item;
        return result;
      }, {})
    }

    saveTitle(i, title) {
      const header:string = 'x'+ (i+1)
      this.ls.updateTemplateTitle(this.blockId, header, title )
      console.log(i)
      console.log(title)
      this.showtitlex = ''
    }

    saveTemplate() {
      const id:string = this.blockId;
      const xheaders = this.convertToObject(this.xheaders)
      const yheaders = this.convertToObject(this.yheaders)

      const template = Object.assign({'yheaders': yheaders,'xheaders': xheaders});

      this.ls.saveTemplate(id, template)
    }

    openDialogPiece() {
    let dialogRef = this.dialog.open(LearningExperienceFormPieceComponent);
    dialogRef.afterClosed().subscribe(result => {
    	this.firebaseLearningExperienceBlock(result)
        });
    }

    firebaseLearningExperienceBlock(form) {
    	this.ls.createNewLearningExperiencePieceUnderBlock(this.blockId, form.value).subscribe(
    		    () => {
    		        this.snackBar.open('Lesson Group Saved','Awesome',{ duration:2000 })
                this.templateChange()
    		    },
    		    err => { 
    		        this.snackBar.open('Error Saving Lesson Group ${err}','Bugger',{ duration:2000 })
    		    }
    		);
    }
}

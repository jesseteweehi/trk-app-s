import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import { LearningExperienceService } from '../models/learning-experience.service';

import { LearningAssessmentGroupModel, LearningAssessmentBlockModel } from '../models/data-classes';

import { LEStudentListBlockDialogComponent,
         LEStudentListGroupDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs.component';

import { LearningLevelListDialogComponent,
        LearningAreaListDialogComponent,
        LearningLevelCreateDialogComponent,
        LearningLevelEditDialogComponent,
        LearningAreaCreateDialogComponent,
        LearningAreaEditDialogComponent } from '../learning-experience-dialogs/le-support-dialog-forms-lists.component';

import { GroupCreateDialogComponent,
         GroupEditDialogComponent,
         BlockCreateDialogComponent,
         BlockEditDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs-forms.component'


@Component({
  selector: 'app-learning-experience-group-list',
  templateUrl: './learning-experience-group.html',
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

    .right  {
      position: absolute;
      top: 8px;
      right: 16px;
    }

    .md-fab-bottom-right2 {
        top: auto !important;
        right: 20px !important;
        bottom: 10px !important;
        left: auto !important;
        position: fixed !important;
    }
  `]
})

export class LearningExperienceGroupListComponent implements OnInit {  
  filtered: LearningAssessmentGroupModel[];
	groups: LearningAssessmentGroupModel[];
  normalState: boolean = true;

  	constructor(
  		private ls: LearningExperienceService,
  		public dialog: MdDialog,
        public snackBar: MdSnackBar ) {}

    ngOnInit() {
    	this.ls.findAllLearningExperienceGroups().subscribe(groups => {
        this.groups = this.filtered = groups;
        if (this.normalState){this.normal()}
      });
     }
      

   
    remove(key) {
      this.ls.removeGroup(key).subscribe(
           () => {
               this.snackBar.open('Lesson Group Deleted','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error Deleting Lesson Group ${err}','Bugger',{ duration:2000 })
           });
           if (!this.normalState) {
             this.showArchived()
           }
    }

    normal() {
      this.filtered = this.groups.filter(group => !group.archived)
      this.normalState=true
    }

    showArchived() {
      this.filtered = this.groups
      this.normalState=false
    }

    lock(key) {
      this.ls.lockGroup(key).subscribe(
           () => {
               this.snackBar.open('Lesson Group Locked','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error Locking Lesson Group ${err}','Bugger',{ duration:2000 })
           }
      );
    }

    archive(key) {  
      this.ls.archiveGroup(key).subscribe(
           () => {
               this.snackBar.open('Lesson Group Archived','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error Archiving Lesson Group ${err}','Bugger',{ duration:2000 })
           }
      );
    }

    unarchive(key) {    
      this.ls.unarchiveGroup(key).subscribe(
           () => {
               this.snackBar.open('Lesson group unarchived','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error unarchiving Lesson Group ${err}','Bugger',{ duration:2000 })
           }
      );
    }

    openLearningLevelList() {
    let dialogRef = this.dialog.open(LearningLevelListDialogComponent,{
      height: '90%',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
    }

    openLearningAreaList() {
    let dialogRef = this.dialog.open(LearningAreaListDialogComponent,{
      height: '90%',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
    }

    createLearningLevel() {
    let dialogRef = this.dialog.open(LearningLevelCreateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
        if(result)
        {this.ls.createLearningLevel(result.value).subscribe(
                        () => {
                                this.snackBar.open('Lesson Level Saved','Awesome',{ duration:2000 })
                            },
                            err => { 
                                this.snackBar.open('Error Saving Lesson Level ${err}','Bugger',{ duration:2000 })
                            }
                        );
                }});
    }

    createLearningArea() {
    let dialogRef = this.dialog.open(LearningAreaCreateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
        if(result)
        {this.ls.createLearningArea(result.value).subscribe(
                        () => {
                                this.snackBar.open('Lesson Area Saved','Awesome',{ duration:2000 })
                            },
                            err => { 
                                this.snackBar.open('Error Saving Lesson Area ${err}','Bugger',{ duration:2000 })
                            }
                        );
                }});
    }

    openDialogGroup() {
    let dialogRef = this.dialog.open(GroupCreateDialogComponent);
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
  templateUrl: './learning-experience-block.html',
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

    .right  {
      position: absolute;
      top: 8px;
      right: 16px;
    }

    .md-fab-bottom-right2 {
        top: auto !important;
        right: 20px !important;
        bottom: 10px !important;
        left: auto !important;
        position: fixed !important;
    }
  `]
})

export class LearningExperienceBlockListComponent implements OnInit {
	groups: LearningAssessmentBlockModel[];
	groupId: string;
  filter: boolean = false;

  	constructor(
  		private route: ActivatedRoute,
  		private ls: LearningExperienceService,
  		public dialog: MdDialog,
        public snackBar: MdSnackBar ) {}

    ngOnInit() {
    	this.groupId = this.route.snapshot.params['groupid']
    	this.ls.findBlocksForGroup(this.groupId)
      
      .subscribe(groups => this.groups = groups);   	
    }

    normal() {
      this.filter = false
    }

    lock(key) {
      this.ls.lockBlock(key).subscribe(
           () => {
               this.snackBar.open('Lesson Block Locked','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error Locking Lesson Block ${err}','Bugger',{ duration:2000 })
           }
      );
    }

    archive(key) {
      console.log(key)
      this.ls.archiveBlock(key).subscribe(
           () => {
               this.snackBar.open('Lesson Block Archived','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error Archiving Lesson Block ${err}','Bugger',{ duration:2000 })
           }
      );
    }

    unarchive(key) {    
      this.ls.unarchiveGroup(key).subscribe(
           () => {
               this.snackBar.open('Lesson Group unarchived','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error unarchiving Lesson Group ${err}','Bugger',{ duration:2000 })
           }
      );
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
    /// could create area change back to group or define type
    let dialogRef = this.dialog.open(BlockCreateDialogComponent);
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



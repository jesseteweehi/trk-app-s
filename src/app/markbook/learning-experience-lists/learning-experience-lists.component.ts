import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms'
import {Observable, Subject} from "rxjs/Rx";

import {MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import { LearningExperienceService } from '../models/learning-experience.service';

import { LearningAssessmentGroupModel, 
         LearningAssessmentBlockModel,
         LearningAreaModel,
         LearningLevelModel } from '../models/data-classes';

import { LEStudentListBlockDialogComponent,
         LEStudentListGroupDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs.component';

import {LearningYearListDialogComponent,
        LearningYearCreateDialogComponent,
        LearningYearEditDialogComponent, 
        LearningLevelListDialogComponent,
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
  `]
})

export class LearningExperienceGroupListComponent implements OnInit {
  filtered: LearningAssessmentGroupModel[];
	groups: LearningAssessmentGroupModel[];
  
  years: object = {};
  areas: object = {};
  levels: object = {};
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
      // reWrite this so it creates the object from the list below: Then doesn't call same data twice.
      this.ls.findAllLearningAreaObject().subscribe(areas => {
        this.areas = areas;
        });
      this.ls.findAllLearningYearObject().subscribe(years => {
        this.years = years;
        });
      this.ls.findAllLearningLevelObject().subscribe(levels => {
        this.levels = levels;
        });
    }
    
    edit(key) {
       let dialogRef = this.dialog.open(GroupEditDialogComponent, {
         data: {
           'key': key
         },
         width: '500px'
       });
       dialogRef.afterClosed().subscribe(result => {
           if(result)
           { console.log(result);
             this.ls.editGroup(key, result.value).subscribe(
                           () => {
                                   this.snackBar.open('Group Saved','Awesome',{ duration:2000 })
                               },
                               err => { 
                                   this.snackBar.open('Error Saving Group ${err}','Bugger',{ duration:2000 })
                               }
                           );
                   }});
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

    openLearningYearList() {
      let dialogRef = this.dialog.open(LearningYearListDialogComponent,{
        height: '90%',
        width: '500px'
      });
      dialogRef.afterClosed()
    }

    openLearningAreaList() {
      let dialogRef = this.dialog.open(LearningAreaListDialogComponent,{
        height: '90%',
        width: '500px'
      });
      dialogRef.afterClosed()
    }

    openLearningLevelList() {
      let dialogRef = this.dialog.open(LearningLevelListDialogComponent,{
        height: '90%',
        width: '500px'
      });
      dialogRef.afterClosed()
    }

    openDialogGroup() {
      let dialogRef = this.dialog.open(GroupCreateDialogComponent);
      dialogRef.afterClosed().subscribe(result => {if(result)
      	{this.firebaseLearningExperienceGroup(result)}
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
      
      dialogRef.afterClosed()
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
  `]
})

export class LearningExperienceBlockListComponent implements OnInit {
  learningGroup: LearningAssessmentGroupModel

	groups: LearningAssessmentBlockModel[];
  filtered: LearningAssessmentBlockModel[];
	groupId: string;
 
  areas: object = {};
  levels: object = {};
  years: object = {};

  normalState: boolean = true;

  	constructor(
  		private route: ActivatedRoute,
  		private ls: LearningExperienceService,
  		public dialog: MdDialog,
        public snackBar: MdSnackBar ) {}

    ngOnInit() {
    	this.groupId = this.route.snapshot.params['groupid'];
      this.ls.findGroupForKey(this.groupId).subscribe(group => this.learningGroup = group);
    	this.ls.findBlocksForGroup(this.groupId).subscribe(groups => {
          this.groups = this.filtered = groups;
          if (this.normalState){
              this.normal()}
              });
      this.ls.findAllLearningAreaObject().subscribe(areas => {
        this.areas = areas;
        });
      this.ls.findAllLearningLevelsObject().subscribe(levels => {
        this.levels = levels;
        }); 
      this.ls.findAllLearningYearObject().subscribe(years => {
        this.years = years;
        });   	
    }

    // Working
    edit(key) {
      let dialogRef = this.dialog.open(BlockEditDialogComponent, {
        data: {
          'key': key
        },
        width: '500px'
      });
      dialogRef.afterClosed().subscribe(result => {
          if(result)
          {this.ls.editBlock(key, result.value).subscribe(
                          () => {
                                  this.snackBar.open('Block Saved','Awesome',{ duration:2000 })
                              },
                              err => { 
                                  this.snackBar.open('Error Saving Block ${err}','Bugger',{ duration:2000 })
                              }
                          );
                  }});
    }

    // Working
    remove(key) {
      if (this.groups.length === 1){
        this.ls.removeBlock(this.groupId, key).subscribe(
                     () => {
                         this.snackBar.open('Lesson Block Deleted','Awesome',{ duration:2000 })
                     },
                     err => { 
                         this.snackBar.open('Error Deleting Lesson Block ${err}','Bugger',{ duration:2000 })
                     });
                     if (!this.normalState) {
                       this.showArchived();
                     }
        this.groups = [];
      }
      else {
        this.ls.removeBlock(this.groupId, key).subscribe(
                     () => {
                         this.snackBar.open('Lesson Block Deleted','Awesome',{ duration:2000 })
                     },
                     err => { 
                         this.snackBar.open('Error Deleting Lesson Block ${err}','Bugger',{ duration:2000 })
                     });
                     if (!this.normalState) {
                       this.showArchived()
                     }
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
      this.ls.unarchiveBlock(key).subscribe(
           () => {
               this.snackBar.open('Lesson Block unarchived','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error unarchiving Lesson Block ${err}','Bugger',{ duration:2000 })
           }
      );
    }


    openDialogBlock() {
      /// could create area change back to group or define type
      let dialogRef = this.dialog.open(BlockCreateDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
        this.firebaseLearningExperienceBlock(result)
          }});
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



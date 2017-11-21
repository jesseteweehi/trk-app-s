import { Component, OnInit, OnChanges, Input } from '@angular/core';

import {MdDialog, MdSnackBar } from '@angular/material';

import { LearningExperienceService } from '../../all-markbook/markbook/models/learning-experience.service'
import { MyDashboardService } from '../my-dashboard.service'

import { UserModel } from '../../users/models/data-classes'

import { LearningAssessmentGroupModel, 
         LearningAssessmentBlockModel,
         LearningAreaModel,
         LearningLevelModel } from '../../all-markbook/markbook/models/data-classes';

import { LEStudentListBlockDialogComponent,
         LEStudentListGroupDialogComponent } from '../../all-markbook/markbook/learning-experience-dialogs/learning-experience-dialogs.component';

import {LearningYearListDialogComponent,
        LearningYearCreateDialogComponent,
        LearningYearEditDialogComponent, 
        LearningLevelListDialogComponent,
        LearningAreaListDialogComponent,
        LearningLevelCreateDialogComponent,
        LearningLevelEditDialogComponent,
        LearningAreaCreateDialogComponent,
        LearningAreaEditDialogComponent } from '../../all-markbook/markbook/learning-experience-dialogs/le-support-dialog-forms-lists.component';

import { GroupCreateDialogComponent,
         GroupEditDialogComponent,
         BlockCreateDialogComponent,
         BlockEditDialogComponent } from '../../all-markbook/markbook/learning-experience-dialogs/learning-experience-dialogs-forms.component'

@Component({
  selector: 'app-markbook-groups',
  templateUrl: './markbook-groups.component.html',
  styleUrls: ['./markbook-groups.component.css']
})
export class MarkbookGroupsComponent implements OnInit, OnChanges {
  @Input() user: UserModel;
  @Input() groups: LearningAssessmentGroupModel[];
  
  filtered: LearningAssessmentGroupModel[];
	 
	years: object = {};
	areas: object = {};
	levels: object = {};
	normalState: boolean = true;

	constructor(
		private ls: LearningExperienceService,
    private ds: MyDashboardService,
		public dialog: MdDialog,
    public snackBar: MdSnackBar ) {}

  ngOnInit() {
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

  ngOnChanges() {
     this.filtered = this.groups
  }
    
      
  remove(key) {
      if (this.groups.length > 1) 
        {
          this.ds.removeGroupsFromUser(this.user.$key, key).subscribe(
                       () => {
                           this.snackBar.open('Assessment Removed','Awesome',{ duration:2000 })
                       },
                       err => { 
                           this.snackBar.open('Error removing Assessment ${err}','Bugger',{ duration:2000 })
                       }
                  );
        }
      else {
          this.ds.removeGroupsFromUser(this.user.$key, key).subscribe(
                       () => {
                           this.snackBar.open('Assessment Removed','Awesome',{ duration:2000 })
                       },
                       err => { 
                           this.snackBar.open('Error removing Assessment ${err}','Bugger',{ duration:2000 })
                       }
                  );
          this.filtered = [];
      }
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
}

import { Component, Inject, OnInit, Input } from '@angular/core';
import {
	LearningAssessmentGroupModel, 
    LearningAreaModel,
    LearningLevelModel,
	LearningYearModel} from '../models/data-classes';

import { CohortModel } from '../../../all-students/cohorts/models/data-classes';

import { MdDialog } from '@angular/material';

import { CohortCompareDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs.component';

@Component({
	selector: 'group-item',
	template:
	`
	<div class="mat-subheading-2">
	<span><group-support-item [area]="area"
	                    [year]="year"
	                    [level]="level"

	></group-support-item></span>	
    <span ><h4 class="grey">{{group?.title}} | {{group?.description}}</h4></span>
    <div>
	`,
	styles:[`
		h4 {
			color: grey;
		}
	`]
})

export class GroupItemComponent {
	@Input() group: LearningAssessmentGroupModel;
	@Input() year: object = {};
  	@Input() area: object = {};
  	@Input() level: object = {};

}




@Component({
	selector: 'cohort-item',
	template:
	`
	<span mdTooltipPosition="right" mdTooltip="{{cohort?.description}}">{{cohort?.title}}</span>
	<p *ngIf="cohortData">{{ cohortData['cohortinpiece'].length/cohortData['all'].length * 100 | number:'.0-0' }}% | {{ cohortData['cohortinpiece'].length }} Completed </p>
	<p *ngIf="cohortData">{{ cohortData['cohortoutpiece'].length/cohortData['all'].length * 100 | number:'.0-0' }}% | {{ cohortData['cohortoutpiece'].length }} Yet to do </p>
	<button *ngIf="cohortData" md-icon-button color="primary" (click)="openCohortDialog()"><md-icon>face</md-icon></button>
	`,
	styles:[`
	:host {
		display: block;
		min-width: 50px;
		text-overflow: ellipsis;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: solid 1px grey;
	}
	p {
		line-height: 10%;
	}
	span {
		font-size: 20px;
	}
	.title {
		font-size: 12px;
		text-decoration: underline
	}
	`]
})

export class CohortItemComponent {
	@Input() cohortData: object;
	@Input() cohort: CohortModel;

	constructor(
    	public dialog: MdDialog) {
    	  }

	 openCohortDialog() {
      let dialogRef = this.dialog.open(CohortCompareDialogComponent, {
              data: {
                      'all' : this.cohortData['all'],
                      'in': this.cohortData['cohortinpiece'],
                      'out': this.cohortData['cohortoutpiece']
                    },
              position: {
                  top: '0',
                },
                height: '90%',
                width: '500px'
            });
            dialogRef.afterClosed().subscribe(result => {
                 console.log(result)                  
                      });
    }

}

@Component({
	selector: 'group-area-item',
	template:
	`
	<span mdTooltipPosition="right" mdTooltip="{{area?.description}}">{{area?.title}}</span>	
	`,
	styles:[`
	:host {
		display: block;
		min-width: 50px;
		text-overflow: ellipsis;
	}
	p {
		line-height: 10%;
	}
	span {
		font
	}
	.title {
		font-size: 12px;
		text-decoration: underline
	}
	`]
})
export class AreaItemComponent {
	@Input() area: LearningAreaModel
}

@Component({
	selector: 'group-level-item',
	template:
	`
	{{level?.level}}	
	`,
	styles:[`
	:host {
		display: block;
		min-width: 50px;
		text-overflow: ellipsis;
	}
	`]
})
export class LevelItemComponent {
	@Input() level: LearningLevelModel
}

@Component({
	selector: 'group-year-item',
	template:
	`
	{{year?.year}}
	`,
	styles:[`
	:host {
		display: block;
		min-width: 50px;
		text-overflow: ellipsis;
	}
	`]
})
export class YearItemComponent {
	@Input() year: LearningYearModel
}


@Component({
	selector: 'group-support-item',
	template:
	`
	<h3>{{year?.year}} | {{area?.title}} | <span *ngIf="level.level">{{level?.level}}</span> <span *ngIf="!level.level">{{level?.description}}</span></h3>
	`,
	styles:[` 

	`]
})

export class SupportItemComponent {
	@Input() area: LearningAreaModel;
	@Input() year: LearningYearModel;
	@Input() level: LearningLevelModel;




}

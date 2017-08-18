import { Component, Inject, OnInit, Input } from '@angular/core';
import { 
    LearningAreaModel,
    LearningLevelModel} from '../models/data-classes';

import { CohortModel } from '../../cohorts/models/data-classes';

import { MdDialog } from '@angular/material';

import { CohortCompareDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs.component';


@Component({
	selector: 'cohort-item',
	template:
	`
	<span mdTooltipPosition="right" mdTooltip="{{cohort?.description}}">{{cohort?.title}}</span>
	<p *ngIf="cohortData">{{ cohortData['cohortinpiece'].length/cohortData['all'].length * 100 | number:'.0-0' }}% | {{ cohortData['cohortinpiece'].length }} Completed </p>
	<p *ngIf="cohortData">{{ cohortData['cohortoutpiece'].length/cohortData['all'].length * 100 | number:'.0-0' }}% | {{ cohortData['cohortoutpiece'].length }} Yet to Complete </p>
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
	selector: 'group-level-item',
	template:
	`
	<p><span mdTooltipPosition="right" mdTooltip="{{level?.description}}">{{level?.title}}</span></p>
	<p class="title">{{level?.level}} <span *ngIf="level?.qualifier">{{level?.qualifier}}</span></p>	
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

// transfer loading to parent container
export class LevelItemComponent {
	@Input() level: LearningLevelModel

}

@Component({
	selector: 'group-area-item',
	template:
	`
	<h3><span mdTooltipPosition="right" mdTooltip="{{area?.description}}">{{area?.title}}</span></h3>
	`,
	styles:[`

	`]
})

export class AreaItemComponent {
	@Input() area: LearningAreaModel;

}

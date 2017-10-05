import { Component, Inject, OnInit } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { LearningAssessmentPieceModel,
		 LearningAssessmentBlockModel,
		 LearningAssessmentGroupModel } from '../../markbook/models/data-classes'

import { LearningExperienceService } from '../../markbook/models/learning-experience.service'



@Component({
  selector: 'app-overview-dialogs',
  template:
  `
  <app-overview-lists
  [allGroups]="allGroups">
  </app-overview-lists>
  `,
  styles: [`

  `]
})
export class OverviewGroupsListDialogsComponent implements OnInit{
	allGroups: LearningAssessmentGroupModel[];

  	constructor(public dialogRef: MdDialogRef<OverviewGroupsListDialogsComponent>,
          @Inject(MD_DIALOG_DATA) public data: any,
          private ls: LearningExperienceService,
          ) {}

  	ngOnInit() {
  		this.ls.findAllLearningExperienceGroups().subscribe(result => this.allGroups = result)
  	}
}

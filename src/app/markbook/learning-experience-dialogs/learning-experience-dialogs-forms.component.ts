import { Component, Inject, OnInit } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { StudentsSharedService } from '../../student-shared/student-shared.service';
import { LearningExperienceService } from '../models/learning-experience.service'

///Contains the dialogs for creating and editing
// - Learning Pieces
// - Learning Blocks
// - Learning Groups

@Component({
	selector: 'learning-piece-form-dialog',
	template:
	`
	<app-learning-experience-piece-create></app-learning-experience-piece-create>
	`
})

export class LePieceCreateDialogComponent {

	constructor(public dialogRef: MdDialogRef<LePieceCreateDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}
}



import { Component, Inject, OnInit } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { StudentsSharedService } from '../../student-shared/student-shared.service';
import { LearningExperienceService } from '../models/learning-experience.service'

///Contains the dialogs for creating and editing
// - Learning Pieces
// - Learning Blocks
// - Learning Groups

@Component({
	selector: 'learning-piece-formcreate-dialog',
	template:
	`
	<app-learning-experience-piece-create
	(formToSend)="handleForm($event)"
	></app-learning-experience-piece-create>
	`
})

export class LePieceCreateDialogComponent {

	constructor(public dialogRef: MdDialogRef<LePieceCreateDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}

@Component({
	selector: 'learning-piece-formedit-dialog',
	template:
	`
	<app-learning-experience-piece-edit
	(formToSend)="handleForm($event)"
	[key]="data.key"
	></app-learning-experience-piece-edit>
	`
})

export class LePieceEditDialogComponent {

	constructor(public dialogRef: MdDialogRef<LePieceEditDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}



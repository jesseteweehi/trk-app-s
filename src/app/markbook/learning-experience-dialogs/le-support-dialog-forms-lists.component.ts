import { Component, Inject, OnInit } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { LearningExperienceService } from '../models/learning-experience.service'

import { LearningLevelModel,
	     LearningAreaModel} from'../models/data-classes'


// Contains dialogs for creating and editing LearningLevels and Learning Areas.
// LearningLevel and Learning Area Lists may go here also.

@Component({
	selector: 'learning-level-list-dialog',
	template:
	`
	<app-learning-level-list>
	</app-learning-level-list>

	`,
	styles:[`

	`]
})

export class LearningLevelListDialogComponent implements OnInit {
	
	constructor(public dialogRef: MdDialogRef<LearningLevelListDialogComponent >,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	ngOnInit(){

	}
}

@Component({
	selector: 'learning-area-list-dialog',
	template:
	`
	<app-learning-area-list>
	</app-learning-area-list>

	`,
	styles:[`

	`]
})

export class LearningAreaListDialogComponent implements OnInit {
	
	constructor(public dialogRef: MdDialogRef<LearningAreaListDialogComponent >,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	ngOnInit(){

	}
}


@Component({
	selector: 'learning-level-formcreate-dialog',
	template:
	`
	<app-learning-level-create-form
	(formToSend)="handleForm($event)"
	></app-learning-level-create-form>
	`
})

export class LearningLevelCreateDialogComponent {

	constructor(public dialogRef: MdDialogRef<LearningLevelCreateDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}

@Component({
	selector: 'learning-level-formedit-dialog',
	template:
	`
	<app-learning-level-edit-form
	(formToSend)="handleForm($event)"
	[key]="data.key"
	></app-learning-level-create-form>
	`
})

export class LearningLevelEditDialogComponent {

	constructor(public dialogRef: MdDialogRef<LearningLevelEditDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}

@Component({
	selector: 'learning-area-formcreate-dialog',
	template:
	`
	<app-learning-area-create-form
	(formToSend)="handleForm($event)"
	></app-learning-area-create-form>
	`
})

export class LearningAreaCreateDialogComponent {

	constructor(public dialogRef: MdDialogRef<LearningAreaCreateDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}

@Component({
	selector: 'learning-area-formedit-dialog',
	template:
	`
	<app-learning-area-edit-form
	(formToSend)="handleForm($event)"
	[key]="data.key"
	></app-learning-area-create-form>
	`
})

export class LearningAreaEditDialogComponent {

	constructor(public dialogRef: MdDialogRef<LearningAreaEditDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}
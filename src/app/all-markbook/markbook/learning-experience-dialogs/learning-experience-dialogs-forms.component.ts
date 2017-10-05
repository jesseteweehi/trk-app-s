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
	[blockId]="data.block"
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
	[blockId]="data.block"
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

@Component({
	selector: 'header-formcreate-dialog',
	template:
	`
	<app-header-create
	(formToSend)="handleForm($event)"
	></app-header-create>
	`
})

export class HeaderCreateDialogComponent {

	constructor(public dialogRef: MdDialogRef<HeaderCreateDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}

@Component({
	selector: 'header-formedit-dialog',
	template:
	`
	<app-header-edit
	(formToSend)="handleForm($event)"
	[blockId]="data.block"
	[key]="data.key"
	[axis]="data.axis"
	></app-header-edit>
	`
})

export class HeaderEditDialogComponent {

	constructor(public dialogRef: MdDialogRef<HeaderCreateDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}

@Component({
	selector: 'group-formcreate-dialog',
	template:
	`
	<app-learning-group-create
	(formToSend)="handleForm($event)"
	></app-learning-group-create>	
	`,
	styles:[`

	`]
})

export class GroupCreateDialogComponent {
	
	constructor(public dialogRef: MdDialogRef<GroupCreateDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}

@Component({
	selector: 'group-formedit-dialog',
	template:
	`
	<app-learning-group-edit
	(formToSend)="handleForm($event)"
	[key]="data.key"
	></app-learning-group-edit>	
	`,
	styles:[`

	`]
})

export class GroupEditDialogComponent {
	
	constructor(public dialogRef: MdDialogRef<GroupCreateDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}

@Component({
	selector: 'block-formcreate-dialog',
	template:
	`
	<app-learning-block-create
	(formToSend)="handleForm($event)"
	></app-learning-block-create>
	
	`,
	styles:[`

	`]
})

export class BlockCreateDialogComponent {
	
	constructor(public dialogRef: MdDialogRef<BlockCreateDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}

@Component({
	selector: 'block-formedit-dialog',
	template:
	`
	<app-learning-block-edit
	(formToSend)="handleForm($event)"
	[key]="data.key"
	></app-learning-block-edit>
	
	`,
	styles:[`

	`]
})

export class BlockEditDialogComponent {
	
	constructor(public dialogRef: MdDialogRef<BlockEditDialogComponent>,
		@Inject(MD_DIALOG_DATA) public data: any,
		) {}

	handleForm($event){
		this.dialogRef.close($event)
	}
}




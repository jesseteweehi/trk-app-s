import { Component, Inject, } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'app-cohorts-formcreate-dialog',
  template: `
  <app-cohorts-create
  (formToSend)="handleForm($event)">
  </app-cohorts-create> 
  `
})
export class CohortsCreateDialogComponent {

  	constructor(public dialogRef: MdDialogRef<CohortsCreateDialogComponent>,
  		@Inject(MD_DIALOG_DATA) public data: any,
  		) {}

 	handleForm($event){
  		this.dialogRef.close($event)
  	}
}

@Component({
  selector: 'app-cohorts-formedit-dialog',
  template: `
  <app-cohorts-edit
  (formToSend)="handleForm($event)"
  [key]="data.key">
  </app-cohorts-edit>
  `
})
export class CohortsEditDialogComponent {

  	constructor(public dialogRef: MdDialogRef<CohortsEditDialogComponent>,
  		@Inject(MD_DIALOG_DATA) public data: any,
  		) {}

 	handleForm($event){
  		this.dialogRef.close($event)
  	}
}

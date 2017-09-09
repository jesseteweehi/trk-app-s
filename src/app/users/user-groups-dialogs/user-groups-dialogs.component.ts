import { Component, Inject, OnInit } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'user-groups-formcreate-dialog',
  	template:
  	`
  	<user-groups-createform
  	(formToSend)="handleForm($event)"
  	>
  	</user-groups-createform>
  	`
})

export class UserGroupsCreateDialogComponent {

  constructor(public dialogRef: MdDialogRef<UserGroupsCreateDialogComponent >,
  	@Inject(MD_DIALOG_DATA) public data: any,
  	) {}

  handleForm($event){
  	this.dialogRef.close($event)
  }

}

@Component({
  selector: 'user-groups-formedit-dialog',
  	template:
  	`
  	<user-groups-editform
  	(formToSend)="handleForm($event)"
  	[key]="data.key"
  	>
  	</user-groups-editform>
  	`
})

export class UserGroupsEditDialogComponent {

  constructor(public dialogRef: MdDialogRef<UserGroupsEditDialogComponent>,
  	@Inject(MD_DIALOG_DATA) public data: any,
  	) {}

  handleForm($event){
  	this.dialogRef.close($event)
  }

}

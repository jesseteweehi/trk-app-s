import { Component, Inject, OnInit } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { UserModel } from '../models/data-classes'

import { UsersService } from '../models/users.service'

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

@Component({
  selector: 'users-addstudent-list',
  template:
  `
  <users-add-list
    [allStudents]="allStudents"
    (studentsToAdd)="studentsToAdd($event)"    
  >
  </users-add-list>

  `,
  styles:[`

  `]
})

export class UsersListAddDialog implements OnInit {
  
    allStudents: UserModel[];


    constructor(public dialogRef: MdDialogRef<UsersListAddDialog>,
            @Inject(MD_DIALOG_DATA) public data: any,
            private us: UsersService
            ) {}

    ngOnInit() {
    this.us.findAllUsers().subscribe(result => this.allStudents = result)
    }  

    studentsToAdd($event) {      
      this.dialogRef.close($event)
    }  
  }

  @Component({
    selector: 'users-removestudent-list',
    template: 
    `
    <users-remove-list 
    [allStudents]="allStudents"
    (studentsToRemove)="studentsToRemove($event)"
    >
    </users-remove-list> 
    `,
    styles:[]
  })
  export class UsersListRemoveDialog implements OnInit {
    allStudents: UserModel[];


      constructor(public dialogRef: MdDialogRef<UsersListRemoveDialog>,
            @Inject(MD_DIALOG_DATA) public data: any,
            private us: UsersService
            ) {}

      ngOnInit() {
        this.us.findUsersForGroup(this.data.lePiece.$key).subscribe(result => this.allStudents = result)
    }  

      studentsToRemove($event) {
        this.dialogRef.close($event)
      }  
  }

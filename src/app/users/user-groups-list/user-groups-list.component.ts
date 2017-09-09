import { Component, OnInit } from '@angular/core';
import { MdDialog,  MdSnackBar } from '@angular/material';

import { UsersService } from '../models/users.service'
import { UserGroupModel } from '../models/data-classes'


import { UserGroupsCreateDialogComponent , UserGroupsEditDialogComponent} from '../user-groups-dialogs/user-groups-dialogs.component'


@Component({
  selector: 'app-user-groups-list',
  templateUrl: './user-groups-list.component.html',
  styleUrls: ['./user-groups-list.component.css']
})
export class UserGroupsListComponent implements OnInit {
	groups: UserGroupModel[];

  constructor(private us:UsersService,
  			public snackBar: MdSnackBar,
  			public dialog: MdDialog) {}

  ngOnInit() {
  	this.us.findAllUserGroups().subscribe(groups => this.groups = groups)
  }

  	createUserGroup(){
		let dialogRef = this.dialog.open(UserGroupsCreateDialogComponent);
		dialogRef.afterClosed().subscribe(result => {
		    if(result)
		    {this.us.createUserGroup(result.value).subscribe(
		                    () => {
		                            this.snackBar.open('User Group Saved','Awesome',{ duration:2000 })
		                        },
		                        err => { 
		                            this.snackBar.open('Error Saving User Group','Bugger',{ duration:2000 })
		                        }
		                    );
		            }});
	}

	edit(key){
		let dialogRef = this.dialog.open(UserGroupsEditDialogComponent, {
		  data: {
		    'key': key
		  },
		  width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
		    if(result)
		    { console.log(result);
		      this.us.editUserGroup(key, result.value).subscribe(
		                    () => {
		                            this.snackBar.open('User Group Saved','Awesome',{ duration:2000 })
		                        },
		                        err => { 
		                            this.snackBar.open('Error Saving User Group ${err}','Bugger',{ duration:2000 })
		                        }
		                    );
		            }});
	}

}



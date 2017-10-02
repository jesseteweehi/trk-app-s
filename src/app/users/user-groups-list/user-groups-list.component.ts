import { Component, OnInit } from '@angular/core';
import { MdDialog,  MdSnackBar } from '@angular/material';

import { UsersService } from '../models/users.service'
import { UserModel } from '../models/data-classes'


import { UserGroupsCreateDialogComponent, 
		 UserGroupsEditDialogComponent,
		 UsersListAddDialog,
		 UsersListRemoveDialog} from '../user-groups-dialogs/user-groups-dialogs.component'


@Component({
  selector: 'app-user-groups-list',
  templateUrl: './user-groups-list.component.html',
  styleUrls: ['./user-groups-list.component.css']
})
export class UserGroupsListComponent implements OnInit {
	admin: UserModel[];
	teachers: UserModel[];

  constructor(private us:UsersService,
  			public snackBar: MdSnackBar,
  			public dialog: MdDialog) {}

  ngOnInit() {
  	this.us.findAllAdmin().subscribe(groups => this.admin = groups)
  	this.us.findAllTeachers().subscribe(groups => this.teachers = groups)
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

	openDialogAddStudent(group, path:string='teacher') {
	  let dialogRef = this.dialog.open(UsersListAddDialog, {
	      data: {
	              'studentGroup' : group 
	            },
	      position: {
	        top: '0',

	      }
	      ,
	      height: '90%',
	      width: '500px'
	    });
	  
	  dialogRef.afterClosed().subscribe(result => {
	    if (result&&path==='teacher') {
	    	this.us.putUsersIn(true, 'teacher', result).subscribe(
		                    () => {
		                            this.snackBar.open('Users placed in Teacher Group','Awesome',{ duration:2000 })
		                        },
		                        err => { 
		                            this.snackBar.open('Error placing users in Teacher Group ${err}','Bugger',{ duration:2000 })
		                        }
		                    );
	    		}
	   	else if (result&&path==="admin") {
	   		this.us.putUsersIn(true, 'admin', result).subscribe(
		                    () => {
		                            this.snackBar.open('Users placed in Admin Group','Awesome',{ duration:2000 })
		                        },
		                        err => { 
		                            this.snackBar.open('Error placing users in Admin Group ${err}','Bugger',{ duration:2000 })
		                        }
		                    );	   		
	   			}
	    })
	}

	remove(key, path:string = 'admin') {
		if (path==='admin')
			{
				if (this.admin.length > 1)
				{
					this.us.removeUserByKey(key, 'admin').subscribe(
				                    () => {
				                            this.snackBar.open('User removed from Admin Group','Awesome',{ duration:2000 })
				                        },
				                        err => { 
				                            this.snackBar.open(`Error removing user from Admin Group ${err}`,'Bugger',{ duration:2000 })
				                        }
				                    );
				}
				else
				{
					this.us.removeUserByKey(key, 'admin').subscribe(
								                    () => {
								                            this.snackBar.open('User removed from Admin Group','Awesome',{ duration:2000 })
								                        },
								                        error => { 
								                            this.snackBar.open(`Error removing user from Admin Group ${{error}}` , 'Bugger' , { duration:2000 })
								                        }
								                    );
					this.admin = [];
				}
			}
		else if (path==="teacher")
			{
				if (this.teachers.length > 1)
				{
				this.us.removeUserByKey(key, 'teacher').subscribe(
				                    () => {
				                            this.snackBar.open('User removed from Teacher Group','Awesome',{ duration:2000 })
				                        },
				                        err => { 
				                            this.snackBar.open('Error removing user from Teacher Group ${err}','Bugger',{ duration:2000 })
				                        }
				                    );	
				}
				else
				{
				this.us.removeUserByKey(key, 'teacher').subscribe(
				                    () => {
				                            this.snackBar.open('User removed from Teacher Group','Awesome',{ duration:2000 })
				                        },
				                        err => { 
				                            this.snackBar.open('Error removing user from Teacher Group ${err}','Bugger',{ duration:2000 })
				                        }
				                    );	
				this.teachers = [];
				}  		
			}
	}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

// External Modules
import { MyMaterialModule } from '../my-material/my-material.module'
import { UsersRoutingModule } from './users.routing.module'
// Services
import { UsersService } from './models/users.service';
// List Components
import { UsersListComponent } from './users-list/users-list.component';
import { UserGroupsListComponent } from './user-groups-list/user-groups-list.component';

// Dialog Components
import { UserGroupsCreateDialogComponent,
		 UserGroupsEditDialogComponent } from './user-groups-dialogs/user-groups-dialogs.component';

// Form Components
import { UserGroupsFormComponent,
		 UserGroupsCreateFormComponent,
		 UserGroupsEditFormComponent } from './user-groups-forms/user-groups-forms.component'



@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MyMaterialModule,
    UsersRoutingModule
  ],
  entryComponents: [
  	UserGroupsCreateDialogComponent,
  	UserGroupsEditDialogComponent
  ],
  declarations: [
  	// Dialogs
  	UserGroupsCreateDialogComponent,
  	UserGroupsEditDialogComponent,
  	// Lists
  	UsersListComponent, 
  	UserGroupsListComponent,
  	// Forms
  	UserGroupsFormComponent,
  	UserGroupsCreateFormComponent,
  	UserGroupsEditFormComponent
	],
  providers: [UsersService]
})
export class UsersModule { }

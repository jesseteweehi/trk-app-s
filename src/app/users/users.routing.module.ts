import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserGroupsListComponent } from './user-groups-list/user-groups-list.component'



const UsersAppRoutes: Routes = [
	{
  	path: '',
  	component: UsersListComponent,
  	},
  	{
  	path: 'groups',
  	component: UserGroupsListComponent,
  	}
];


@NgModule({
  imports: [RouterModule.forChild(UsersAppRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}


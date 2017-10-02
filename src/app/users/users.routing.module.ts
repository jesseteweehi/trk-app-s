import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';

const UsersAppRoutes: Routes = [
	{
  	path: '',
  	component: UsersListComponent,
  	}
];


@NgModule({
  imports: [RouterModule.forChild(UsersAppRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}


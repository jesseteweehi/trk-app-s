import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentContainerComponent } from './student-container/student-container.component';

import { StudentListComponent, StudentGroupListComponent } from './student-list/student-list.component'




const StudentsAppRoutes: Routes = [
	{
  		path: '',
  		component: StudentContainerComponent,
	},
	{
		path: 'groups',
		component: StudentGroupListComponent,
		pathMatch: 'full'
	}		
];


@NgModule({
  imports: [RouterModule.forChild(StudentsAppRoutes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
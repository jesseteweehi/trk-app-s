import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentContainerComponent } from './student-container/student-container.component';

import { StudentGroupListComponent } from './student-list/student-list.component'

import { StudentGroupComponent } from './student/student.component'




const StudentsAppRoutes: Routes = [
	{
  		path: '',
  		component: StudentContainerComponent,
	},
	{
		path: 'groups',
		children: [
      {
        path: '',
        component: StudentGroupListComponent
      },
      {
        path: ':id',
        component: StudentGroupComponent
      }
    ]
	},

];


@NgModule({
  imports: [RouterModule.forChild(StudentsAppRoutes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
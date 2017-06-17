import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentListComponent } from './student-list/student-list.component';




const StudentsAppRoutes: Routes = [
	{
  	path: '',
  	component: StudentListComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(StudentsAppRoutes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
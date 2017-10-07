import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentContainerComponent } from './student-container/student-container.component';


const StudentsAppRoutes: Routes = [
	{
  		path: '',
  		component: StudentContainerComponent,
	}
];


@NgModule({
  imports: [RouterModule.forChild(StudentsAppRoutes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
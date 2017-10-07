import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStudentContainerComponent } from './my-student-container/my-student-container.component';



const MyStudentAppRoutes: Routes = [
  	{
  	path: ':studentid',
  	component: MyStudentContainerComponent
    }
];


@NgModule({
  imports: [RouterModule.forChild(MyStudentAppRoutes)],
  exports: [RouterModule]
})
export class MyStudentRoutingModule {}



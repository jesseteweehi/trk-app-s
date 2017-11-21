import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStudentContainerComponent } from './my-student-container/my-student-container.component';
import { MyStudentLearningPieceComponent } from './my-student-learning-piece/my-student-learning-piece.component';



const MyStudentAppRoutes: Routes = [
  	{
  	path: ':studentid',
  	component: MyStudentContainerComponent
    },
    {
  	path: ':studentid/input/:groupid/:blockid',
  	component: MyStudentLearningPieceComponent
    }
];


@NgModule({
  imports: [RouterModule.forChild(MyStudentAppRoutes)],
  exports: [RouterModule]
})
export class MyStudentRoutingModule {}



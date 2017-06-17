import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningExperienceGroupListComponent, LearningExperienceBlockListComponent, LearningExperiencePieceListComponent } from './learning-experience-lists/learning-experience-lists.component';




const MarkbookAppRoutes: Routes = [
	{
  	path: '',
  	component: LearningExperienceGroupListComponent,
  },
  {
    path: ':groupid',
    children: [
      {
        path: '',
        component: LearningExperienceBlockListComponent
      },
      {
        path: ':blockid',
        component: LearningExperiencePieceListComponent
      }
    ]
    
  }
];


@NgModule({
  imports: [RouterModule.forChild(MarkbookAppRoutes)],
  exports: [RouterModule]
})
export class MarkbookRoutingModule {}


// children: [
//       {
//         path: '',
//         component: CrisisListComponent,
//         children: [
//           {
//             path: ':id',
//             component: CrisisDetailComponent
//           },
//           {
//             path: '',
//             component: CrisisCenterHomeComponent
//           }
//         ]
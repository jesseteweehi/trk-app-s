import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningExperienceGroupListComponent, LearningExperienceBlockListComponent } from './learning-experience-group/learning-experience-group.component';
import { LearningExperienceBlockComponent } from './learning-experience-block/learning-experience-block.component';




const MarkbookAppRoutes: Routes = [
	{
  	path: '',
  	component: LearningExperienceGroupListComponent,
  },
  {
    path: ':id',
    component: LearningExperienceBlockListComponent
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
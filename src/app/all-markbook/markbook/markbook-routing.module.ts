import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningExperienceGroupListComponent, LearningExperienceBlockListComponent } from './learning-experience-lists/learning-experience-lists.component';

import { LearningExperienceContainerComponent } from './learning-experience-container/learning-experience-container.component'


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
        component: LearningExperienceContainerComponent
      }
    ]
    
  }
];


@NgModule({
  imports: [RouterModule.forChild(MarkbookAppRoutes)],
  exports: [RouterModule]
})
export class MarkbookRoutingModule {}


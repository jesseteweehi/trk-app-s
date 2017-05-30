import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningExperienceBlockComponent } from './learning-experience-block/learning-experience-block.component';




const MarkbookAppRoutes: Routes = [
	{
  		path: '',
  		component: LearningExperienceBlockComponent
	}
];


@NgModule({
  imports: [RouterModule.forChild(MarkbookAppRoutes)],
  exports: [RouterModule]
})
export class MarkbookRoutingModule {}
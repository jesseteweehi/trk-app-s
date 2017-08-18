import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import  { CohortsContainerComponent } from './cohorts-container/cohorts-container.component'

const CohortsAppRoutes: Routes = [
	{
		path: '',
		component: CohortsContainerComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(CohortsAppRoutes)],
  exports: [RouterModule]
})
export class CohortsRoutingModule {}
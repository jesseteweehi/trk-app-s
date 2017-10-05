import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { OverviewContainerComponent } from './overview-container/overview-container.component';
import { OverviewContainerVerticalComponent } from './overview-container-vertical/overview-container-vertical.component';

const OverviewRoutes: Routes = [
	{
		path: ':groupid',
		component: OverviewContainerVerticalComponent
	}  
];

@NgModule({
  imports: [RouterModule.forChild(OverviewRoutes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule {}

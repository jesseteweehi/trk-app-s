import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { OverviewContainerComponent } from './overview-container/overview-container.component';

const OverviewRoutes: Routes = [
	{ 
		path: '', 
    component: OverviewContainerComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(OverviewRoutes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule {}

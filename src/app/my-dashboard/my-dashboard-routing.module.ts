import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";
import { MyDashboardContainerComponent } from './my-dashboard-container/my-dashboard-container.component';

import {StudentDashboardGuard} from './student-dashboard.guard'


const MyDashboardRoutes: Routes = [
	{ 
		path: '',
		component: MyDashboardContainerComponent,
		canActivate: [StudentDashboardGuard]
	}
];

@NgModule({
  imports: [RouterModule.forChild(MyDashboardRoutes)],
  exports: [RouterModule]
})
export class MyDashboardRoutingModule {}
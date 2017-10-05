import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";
import { MyDashboardContainerComponent } from './my-dashboard-container/my-dashboard-container.component';


const MyDashboardRoutes: Routes = [
	{ 
		path: '',
		component: MyDashboardContainerComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(MyDashboardRoutes)],
  exports: [RouterModule]
})
export class MyDashboardRoutingModule {}
import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const CohortsAppRoutes: Routes = [
	{
    }
];

@NgModule({
  imports: [RouterModule.forChild(CohortsAppRoutes)],
  exports: [RouterModule]
})
export class CohortsRoutingModule {}
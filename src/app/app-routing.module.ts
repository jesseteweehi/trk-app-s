import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { MarkbookModule } from './markbook/markbook.module';
import { StudentsModule } from './students/students.module';



const appRoutes: Routes = [
	{ 
		path: '',
		redirectTo: 'individual',
		pathMatch: 'full'

	},
  {
    path: 'assessment',
    loadChildren: 'app/markbook/markbook.module#MarkbookModule'
  },
  {
    path: 'cohorts',
    loadChildren: 'app/cohorts/cohorts.module#CohortsModule'
  },
  {
    path: 'individual',
    loadChildren: 'app/my-student/my-student.module#MyStudentModule'
  },
  {
    path: 'overview',
    loadChildren: 'app/overview/overview.module#OverviewModule'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

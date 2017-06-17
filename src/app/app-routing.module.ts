import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { MarkbookModule } from './markbook/markbook.module';
import { StudentsModule } from './students/students.module';



const appRoutes: Routes = [
	{ 
		path: '',
		redirectTo: 'students',
		pathMatch: 'full'

	},
  {
    path: 'assessment',
    loadChildren: 'app/markbook/markbook.module#MarkbookModule'
  },
  {
    path: 'students',
    loadChildren: 'app/students/students.module#StudentsModule'
  },

];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

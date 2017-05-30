import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { MarkbookModule } from './markbook/markbook.module';



const appRoutes: Routes = [
	{ 
		path: '',
		redirectTo: 'assessment',
		pathMatch: 'full'

	},
    {
        path: 'assessment',
        loadChildren: 'app/markbook/markbook.module#MarkbookModule'
    }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

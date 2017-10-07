import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { LandingPageComponent } from './landing-page/landing-page.component'

//Guards
import { TeacherGuard } from './shared-security/teacher.guard'



const appRoutes: Routes = [
 
	{ 
		path: 'markbook',
		loadChildren: 'app/all-markbook/markbook-root/markbook-root.module#MarkbookRootModule' 
	},
  {
    path: 'dashboard',
    loadChildren: 'app/my-dashboard/my-dashboard.module#MyDashboardModule',
  },
  {
    path: 'students',
    loadChildren: 'app/all-students/student-root/student-root.module#StudentRootModule',
  },   
  {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule',
  },
  {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

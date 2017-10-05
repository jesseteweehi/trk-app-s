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
  // {
  //   path: 'markbook/assessment',
  //   loadChildren: 'app/all-markbook/markbook/markbook.module#MarkbookModule',
  //   canLoad: [TeacherGuard]
  // },
  // {
  //   path: 'markbook/cohorts',
  //   loadChildren: 'app/all-markbook/cohorts/cohorts.module#CohortsModule',
  //   canLoad: [TeacherGuard]
  // },
  // {
  //   path: 'markbook/students',
  //   loadChildren: 'app/all-markbook/my-student/my-student.module#MyStudentModule',
  //   canLoad: [TeacherGuard]
  // },
  // {
  //   path: 'markbook/overview',
  //   loadChildren: 'app/all-markbook/overview/overview.module#OverviewModule',
  //   canLoad: [TeacherGuard]
  // },   
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

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { LandingPageComponent } from './landing-page/landing-page.component'

//Guards
import { TeacherGuard } from './shared-security/teacher.guard'
import { AdminGuard } from './shared-security/admin.guard'
import { StudentGuard } from './shared-security/student.guard'


const appRoutes: Routes = [
  // {
  //   path: '', redirectTo: 'dashboard', pathMatch: 'full'
  // },
  {
    path: '',
    component: LandingPageComponent
  },
	{ 
		path: 'markbook',
		loadChildren: 'app/all-markbook/markbook-root/markbook-root.module#MarkbookRootModule',
    // Student Guard
    // canLoad: [StudentGuard] 
	},
  {
    path: 'dashboard',
    loadChildren: 'app/my-dashboard/my-dashboard.module#MyDashboardModule',
    // canLoad: [StudentGuard]
  },
  {
    path: 'students',
    loadChildren: 'app/all-students/student-root/student-root.module#StudentRootModule',
    // canLoad: [TeacherGuard] 
  },   
  {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule',
    // canLoad: [AdminGuard] 
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

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { MarkbookModule } from './markbook/markbook.module';
import { StudentsModule } from './students/students.module';
import { LandingPageComponent } from './landing-page/landing-page.component'

//Guards
import { TeacherGuard } from './shared-security/teacher.guard'



const appRoutes: Routes = [
	{ 
		path: '',
		component: LandingPageComponent
	},
  {
    path: 'assessment',
    loadChildren: 'app/markbook/markbook.module#MarkbookModule',
    canLoad: [TeacherGuard]
  },
  {
    path: 'cohorts',
    loadChildren: 'app/cohorts/cohorts.module#CohortsModule',
    canLoad: [TeacherGuard]
  },
  {
    path: 'individual',
    loadChildren: 'app/my-student/my-student.module#MyStudentModule',
    canLoad: [TeacherGuard]
  },
  {
    path: 'overview',
    loadChildren: 'app/overview/overview.module#OverviewModule',
    canLoad: [TeacherGuard]
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

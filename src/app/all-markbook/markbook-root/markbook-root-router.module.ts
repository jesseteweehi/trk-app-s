import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuToolbarMarkbookComponent } from './menu/menu.component'

import { TeacherGuard } from '../../shared-security/teacher.guard'
import { StudentGuard } from '../../shared-security/student.guard'

const MarkbookRootRoutes: Routes = [
  {
    path: '', redirectTo: 'assessment', pathMatch: 'full'
  },
	{
  	path: '',
  	component: MenuToolbarMarkbookComponent,
    children: [
      {
        path: 'assessment',
        loadChildren: 'app/all-markbook/markbook/markbook.module#MarkbookModule',
        // canLoad: [TeacherGuard]
      },
      {
        path: 'cohorts',
        loadChildren: 'app/all-students/cohorts/cohorts.module#CohortsModule',
        // canLoad: [TeacherGuard]
      },
      {
        path: 'overview',
        loadChildren: 'app/all-markbook/overview/overview.module#OverviewModule',
        // canLoad: [TeacherGuard]
      },
      {
        path: 'my-student',
        loadChildren: 'app/all-markbook/my-student/my-student.module#MyStudentModule',
        // canLoad: [StudentGuard]
      },
      {
        path: 'student-view',
        loadChildren: 'app/all-markbook/student-view-markbook/student-view-markbook.module#StudentViewMarkbookModule',
        // canLoad: [StudentGuard]
      }
    ]
  }
]; 


@NgModule({
  imports: [RouterModule.forChild(MarkbookRootRoutes)],
  exports: [RouterModule]
})
export class MarkbookRootRoutingModule {}


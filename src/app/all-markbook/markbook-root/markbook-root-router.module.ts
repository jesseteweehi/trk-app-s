import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component'

import { TeacherGuard } from '../../shared-security/teacher.guard'

const MarkbookRootRoutes: Routes = [
  {
    path: '', redirectTo: 'students', pathMatch: 'full'
  },
	{
  	path: '',
  	component: MenuComponent,
    children: [
      {
        path: 'assessment',
        loadChildren: 'app/all-markbook/markbook/markbook.module#MarkbookModule',
      },
      {
        path: 'cohorts',
        loadChildren: 'app/all-markbook/cohorts/cohorts.module#CohortsModule',
      },
      {
        path: 'students',
        loadChildren: 'app/all-markbook/my-student/my-student.module#MyStudentModule',
      },
      {
        path: 'overview',
        loadChildren: 'app/all-markbook/overview/overview.module#OverviewModule',
      }
    ],

  }

];


@NgModule({
  imports: [RouterModule.forChild(MarkbookRootRoutes)],
  exports: [RouterModule]
})
export class MarkbookRootRoutingModule {}


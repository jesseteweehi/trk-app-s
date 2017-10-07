import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuToolbarMarkbookComponent } from './menu/menu.component'

import { TeacherGuard } from '../../shared-security/teacher.guard'

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
      },
      {
        path: 'cohorts',
        loadChildren: 'app/all-students/cohorts/cohorts.module#CohortsModule',
      },
      {
        path: 'overview',
        loadChildren: 'app/all-markbook/overview/overview.module#OverviewModule',
      },
      {
        path: 'my-student',
        loadChildren: 'app/all-markbook/my-student/my-student.module#MyStudentModule',
      }
    ]
  }
]; 


@NgModule({
  imports: [RouterModule.forChild(MarkbookRootRoutes)],
  exports: [RouterModule]
})
export class MarkbookRootRoutingModule {}


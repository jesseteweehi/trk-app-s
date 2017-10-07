import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuToolbarStudentComponent } from './menu-toolbar/menu-toolbar.component'



const StudentRootRoutes: Routes = [
  {
    path: '', redirectTo: 'all', pathMatch: 'full'
  },
	{
  	path: '',
  	component: MenuToolbarStudentComponent,
    children: [
      {
        path: 'all',
        loadChildren: 'app/all-students/students/students.module#StudentsModule',
      },
      {
        path: 'groups',
        loadChildren: 'app/all-students/cohorts/cohorts.module#CohortsModule',
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(StudentRootRoutes)],
  exports: [RouterModule]
})
export class StudentRootRoutingModule {}
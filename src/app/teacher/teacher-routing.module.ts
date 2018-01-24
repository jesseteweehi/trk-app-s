import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningGroupListComponent } from './learning-group-list/learning-group-list.component';
import { LearningAreaListComponent } from './learning-area-list/learning-area-list.component';


const teacherRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'grouplist' },
    { path: 'arealist', component: LearningAreaListComponent },
    { path: 'grouplist', component: LearningGroupListComponent },
];


@NgModule({
  imports: [RouterModule.forChild(teacherRoutes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}

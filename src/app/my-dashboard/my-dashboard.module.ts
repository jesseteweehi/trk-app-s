import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentSharedModule } from '../student-shared/student-shared.module';
import { MyDashboardRoutingModule } from './my-dashboard-routing.module';
import { MyMaterialModule } from '../my-material/my-material.module';

import { MyDashboardContainerComponent } from './my-dashboard-container/my-dashboard-container.component';
import { StudentsComponent } from './students/students.component';
import { MarkbookGroupsComponent } from './markbook-groups/markbook-groups.component';
import { CohortsComponent } from './cohorts/cohorts.component';

@NgModule({
  imports: [
    CommonModule,
    MyDashboardRoutingModule,
    StudentSharedModule
  ],
  declarations: [MyDashboardContainerComponent, StudentsComponent, MarkbookGroupsComponent, CohortsComponent]
})
export class MyDashboardModule { }

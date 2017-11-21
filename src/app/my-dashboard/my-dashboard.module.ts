import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentSharedModule } from '../student-shared/student-shared.module';
import { MarkbookModule } from '../all-markbook/markbook/markbook.module'
import { CohortsModule } from '../all-students/cohorts/cohorts.module'
import { MyDashboardRoutingModule } from './my-dashboard-routing.module';
import { MyMaterialModule } from '../my-material/my-material.module'

import { MyDashboardService } from './my-dashboard.service'

import {StudentDashboardGuard} from './student-dashboard.guard'

import { MyDashBoardCohortAddDialogComponent, MyDashBoardStudentAddDialogComponent, MyDashBoardlearningGroupAddDialogComponent} from './my-dashboard-dialogs/my-dashboard-dialogs.component';
import { CohortListAddComponent, LearningGroupListAddComponent} from './my-dashboard-lists/my-dashboard-lists.component';

import { MyDashboardContainerComponent } from './my-dashboard-container/my-dashboard-container.component';
import { StudentsComponent } from './students/students.component';
import { MarkbookGroupsComponent } from './markbook-groups/markbook-groups.component';
import { CohortsComponent } from './cohorts/cohorts.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    MyDashboardRoutingModule,
    StudentSharedModule,
    CohortsModule,
    MarkbookModule
  ],
  declarations: [
  	// Containers
  	MyDashboardContainerComponent, 
  	StudentsComponent, 
  	MarkbookGroupsComponent, 
  	CohortsComponent,
  	// Lists
  	CohortListAddComponent,
  	LearningGroupListAddComponent,
  	// Dialogs
  	MyDashBoardCohortAddDialogComponent,
  	MyDashBoardStudentAddDialogComponent,
  	MyDashBoardlearningGroupAddDialogComponent
  	],
  entryComponents: [
  	MyDashBoardCohortAddDialogComponent,
  	MyDashBoardStudentAddDialogComponent,
  	MyDashBoardlearningGroupAddDialogComponent
  ],
  providers: [MyDashboardService,StudentDashboardGuard]
})
export class MyDashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CohortsRoutingModule } from './cohorts-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

// Shared Module
import { MyMaterialModule } from '../../my-material/my-material.module';
import { StudentSharedModule} from '../../student-shared/student-shared.module'

import { CohortsService } from './models/cohorts.service';
import { CohortsContainerComponent } from './cohorts-container/cohorts-container.component';


import { 
         CohortsCreateDialogComponent,
		     CohortsEditDialogComponent } from './cohorts-dialogs/cohorts-dialogs-forms.component';

import { CohortsFormComponent,
		     CohortsCreateComponent,
		     CohortsEditComponent } from './cohorts-forms/cohorts-forms.component'

import { CohortListDialogComponent,
         CohortStudentListPieceAddDialogComponent,
         CohortStudentListPieceRemoveDialogComponent } from './cohorts-dialogs/cohorts-dialogs.component' 

import { CohortsList } from './cohorts-lists/cohorts-lists.component'

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    StudentSharedModule,
    AngularFireDatabaseModule,
    CohortsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CohortsService],
  
  declarations: [
  	CohortsContainerComponent,
  	CohortsCreateDialogComponent,
    CohortsEditDialogComponent, 
    CohortsFormComponent,
	  CohortsCreateComponent,
	  CohortsEditComponent,
    CohortStudentListPieceAddDialogComponent,
    CohortStudentListPieceRemoveDialogComponent,
    CohortsList,
    CohortListDialogComponent],

  entryComponents: [
  	CohortsCreateDialogComponent,
  	CohortsEditDialogComponent,
    CohortStudentListPieceAddDialogComponent,
    CohortStudentListPieceRemoveDialogComponent,
    CohortListDialogComponent
  ]
})
export class CohortsModule { }

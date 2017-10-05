import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MarkbookRoutingModule } from './markbook-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

//Shared Module
import { MyMaterialModule } from '../../my-material/my-material.module';
import { StudentsModule } from '../students/students.module'
import { StudentSharedModule} from '../student-shared/student-shared.module'
import { CohortsModule} from '../cohorts/cohorts.module'


// Autofocus directive not used. Needs Clean up
import { AutofocusDirective } from './models/custom-directives';

import { LearningExperienceService } from './models/learning-experience.service';

import { YearItemComponent,
         AreaItemComponent,
         LevelItemComponent, 
         SupportItemComponent, 
         CohortItemComponent,
         GroupItemComponent } from './learning-experience-items/learning-experience-items.component';

import { LearningYearListDialogComponent,
         LearningYearCreateDialogComponent,
         LearningYearEditDialogComponent,
         LearningLevelListDialogComponent,
         LearningAreaListDialogComponent,
         LearningLevelCreateDialogComponent,
         LearningLevelEditDialogComponent,
         LearningAreaCreateDialogComponent,
         LearningAreaEditDialogComponent} from './learning-experience-dialogs/le-support-dialog-forms-lists.component';

import { learningLevelListComponent,
         learningAreaListComponent,
         learningYearListComponent} from './learning-experience-lists/le-support-lists.component';

import { LearningYearFormComponent,
         LearningYearCreateFormComponent,
         LearningYearEditFormComponent,
         LearningLevelFormComponent,
         LearningLevelCreateFormComponent,
         LearningLevelEditFormComponent,
         LearningAreaFormComponent,
         LearningAreaCreateFormComponent,
         LearningAreaEditFormComponent
         } from  './learning-experience-form/le-support-form.component';

import { LearningExperienceFormPieceComponent, 
         LearningExperienceCreatePieceComponent, 
         LearningExperienceEditPieceComponent,         
         HeaderFormPieceComponent,
         HeaderFormCreateComponent,
         HeaderFormEditComponent,
         BlockFormComponent,
         BlockFormCreateComponent,
         BlockFormEditComponent,
         GroupFormComponent,
         GroupFormCreateComponent,
         GroupFormEditComponent
          } from './learning-experience-form/learning-experience-form.component';

import { LearningExperienceGroupListComponent, 
         LearningExperienceBlockListComponent } from './learning-experience-lists/learning-experience-lists.component';

import { CohortCompareDialogComponent,
         LEStudentListPieceAddDialogComponent,
         LEStudentListPieceRemoveDialogComponent,
         LEStudentListBlockDialogComponent,
         LEStudentListGroupDialogComponent} from './learning-experience-dialogs/learning-experience-dialogs.component';

import { LePieceCreateDialogComponent,
         LePieceEditDialogComponent,
         HeaderCreateDialogComponent,
         HeaderEditDialogComponent,
         GroupCreateDialogComponent,
         GroupEditDialogComponent,
         BlockCreateDialogComponent,
         BlockEditDialogComponent} from './learning-experience-dialogs/learning-experience-dialogs-forms.component';
         
import { LearningExperienceContainerComponent } from './learning-experience-container/learning-experience-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MyMaterialModule,
    MarkbookRoutingModule,
    AngularFireDatabaseModule,
    StudentsModule,
    StudentSharedModule,
    CohortsModule
  ],
  declarations: [
  // ------Forms-------
  //Piece
  LearningExperienceFormPieceComponent,
  LearningExperienceCreatePieceComponent, 
  LearningExperienceEditPieceComponent,
  // Block  // Group
  LearningExperienceGroupListComponent,
  LearningExperienceBlockListComponent,
  BlockFormComponent,
  BlockFormCreateComponent,
  BlockFormEditComponent,
  GroupFormComponent,
  GroupFormCreateComponent,
  GroupFormEditComponent,
  GroupCreateDialogComponent,
  GroupEditDialogComponent,
  BlockCreateDialogComponent,
  BlockEditDialogComponent,
  GroupItemComponent, 
  // Header
  HeaderFormPieceComponent,
  HeaderFormCreateComponent,
  HeaderFormEditComponent, 
  // Main Assessment Component
  LearningExperienceContainerComponent, 
  // Create and Edit Dialog Components
  LePieceCreateDialogComponent,
  LePieceEditDialogComponent,
  HeaderCreateDialogComponent,
  HeaderEditDialogComponent,

  CohortCompareDialogComponent,
  LEStudentListPieceAddDialogComponent,
  LEStudentListPieceRemoveDialogComponent,
  LEStudentListBlockDialogComponent,
  LEStudentListGroupDialogComponent,

  // Learning Support Lists
  learningYearListComponent,
  learningLevelListComponent,
  learningAreaListComponent,
  YearItemComponent,
  AreaItemComponent,
  LevelItemComponent, 
  SupportItemComponent,
  CohortItemComponent,

  // Learning Support Forms
  LearningYearFormComponent,
  LearningYearCreateFormComponent,
  LearningYearEditFormComponent,
  LearningLevelFormComponent,
  LearningLevelCreateFormComponent,
  LearningLevelEditFormComponent,
  LearningAreaFormComponent,
  LearningAreaCreateFormComponent,
  LearningAreaEditFormComponent,

  // Learning Support Dialogs
  LearningYearListDialogComponent,
  LearningYearCreateDialogComponent,
  LearningYearEditDialogComponent,
  LearningLevelListDialogComponent,
  LearningAreaListDialogComponent,
  LearningLevelCreateDialogComponent,
  LearningLevelEditDialogComponent,
  LearningAreaCreateDialogComponent,
  LearningAreaEditDialogComponent,
  
  AutofocusDirective
  ],
  
  exports:[
  YearItemComponent,
  AreaItemComponent,
  LevelItemComponent, 
  SupportItemComponent],

  providers: [LearningExperienceService],
  
  entryComponents: [ 
  LEStudentListPieceAddDialogComponent,
  LePieceCreateDialogComponent,
  LePieceEditDialogComponent,
  HeaderCreateDialogComponent,
  HeaderEditDialogComponent,
  LEStudentListPieceRemoveDialogComponent,
  LEStudentListBlockDialogComponent,
  LEStudentListGroupDialogComponent,

  // Groups and Blocks Dialogs
  GroupCreateDialogComponent,
  GroupEditDialogComponent,
  BlockCreateDialogComponent,
  BlockEditDialogComponent,

  // Learning Support Dialogs
  LearningYearListDialogComponent,
  LearningYearCreateDialogComponent,
  LearningYearEditDialogComponent,
  CohortCompareDialogComponent,
  LearningLevelListDialogComponent,
  LearningAreaListDialogComponent,
  LearningLevelCreateDialogComponent,
  LearningLevelEditDialogComponent,
  LearningAreaCreateDialogComponent,
  LearningAreaEditDialogComponent
  ]

})
export class MarkbookModule { }

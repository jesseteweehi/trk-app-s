import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MarkbookRoutingModule } from './markbook-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

//Shared Module
import { MyMaterialModule } from '../my-material/my-material.module';
import { StudentsModule } from '../students/students.module'
import { StudentSharedModule} from '../student-shared/student-shared.module'

import { AutofocusDirective } from './models/custom-directives';

import { LearningExperienceService } from './models/learning-experience.service';
import { LearningExperienceFormPieceComponent, 
         LearningExperienceCreatePieceComponent, 
         LearningExperienceEditPieceComponent, 
         LearningExperienceFormBlockComponent, 
         LearningExperienceFormGroupComponent, 
         LearningExperienceFormHeaderComponent } from './learning-experience-form/learning-experience-form.component';

import { LearningExperienceGroupListComponent, 
         LearningExperienceBlockListComponent } from './learning-experience-lists/learning-experience-lists.component';

import { LEStudentListPieceAddDialogComponent,
         LEStudentListPieceRemoveDialogComponent,
         LEStudentListBlockDialogComponent,
         LEStudentListGroupDialogComponent} from './learning-experience-dialogs/learning-experience-dialogs.component';

import { LePieceCreateDialogComponent,
         LePieceEditDialogComponent } from './learning-experience-dialogs/learning-experience-dialogs-forms.component';
         
import { LearningExperienceContainerComponent } from './learning-experience-container/learning-experience-container.component';
import { LearningExperiencePieceItemComponent } from './learning-experience-container/learning-experience-piece-item/learning-experience-piece-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MyMaterialModule,
    MarkbookRoutingModule,
    AngularFireDatabaseModule,
    StudentsModule,
    StudentSharedModule
  ],
  declarations: [
  // ------Forms-------
  //Piece
  LearningExperienceFormPieceComponent,
  LearningExperienceCreatePieceComponent, 
  LearningExperienceEditPieceComponent,
  // Block
  LearningExperienceFormBlockComponent,
  // Group
  LearningExperienceFormGroupComponent,
  // Header
  LearningExperienceFormHeaderComponent,

  LearningExperienceGroupListComponent,
  LearningExperienceBlockListComponent,
  // Main Assessment Component
  LearningExperienceContainerComponent,

  LePieceCreateDialogComponent,
  LePieceEditDialogComponent,

  LEStudentListPieceAddDialogComponent,
  LEStudentListPieceRemoveDialogComponent,
  LEStudentListBlockDialogComponent,
  LEStudentListGroupDialogComponent,
  AutofocusDirective,
  LearningExperiencePieceItemComponent,
  ],
  
  exports:[],

  providers: [LearningExperienceService],
  
  entryComponents: [ 
  LearningExperienceFormBlockComponent,
  LearningExperienceFormGroupComponent,
  LearningExperienceFormHeaderComponent,
  LEStudentListPieceAddDialogComponent,
  LePieceCreateDialogComponent,
  LePieceEditDialogComponent,
  LEStudentListPieceRemoveDialogComponent,
  LEStudentListBlockDialogComponent,
  LEStudentListGroupDialogComponent]

})
export class MarkbookModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MarkbookRoutingModule } from './markbook-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

//Shared Module
import { MyMaterialModule } from '../my-material/my-material.module';
import { StudentsModule } from '../students/students.module'
import { StudentSharedModule} from '../student-shared/student-shared.module'

import { LearningExperienceService } from './models/learning-experience.service';
import { LearningExperienceFormPieceComponent, LearningExperienceFormBlockComponent, LearningExperienceFormGroupComponent, LearningExperienceFormHeaderComponent } from './learning-experience-form/learning-experience-form.component';
import { LearningExperienceBlockTemplateFormComponent, BlockTemplateFormComponent, BlockTemplateListFormComponent } from  './learning-experience-form/learning-experience-template-form.component'

import { LearningExperienceGroupListComponent, LearningExperienceBlockListComponent, LearningExperiencePieceListComponent } from './learning-experience-lists/learning-experience-lists.component';

import { LEStudentListPieceAddDialogComponent,
         LEStudentListPieceRemoveDialogComponent,
         LEStudentListBlockDialogComponent,
         LEStudentListGroupDialogComponent} from './learning-experience-dialogs/learning-experience-dialogs.component'



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
  LearningExperienceFormPieceComponent,
  LearningExperienceFormBlockComponent,
  LearningExperienceFormGroupComponent,
  LearningExperienceFormHeaderComponent,   
  LearningExperienceGroupListComponent,
  LearningExperienceBlockListComponent,
  LearningExperiencePieceListComponent,
  LearningExperienceBlockTemplateFormComponent,
  BlockTemplateFormComponent,
  BlockTemplateListFormComponent,
  LEStudentListPieceAddDialogComponent,
  LEStudentListPieceRemoveDialogComponent,
  LEStudentListBlockDialogComponent,
  LEStudentListGroupDialogComponent],
  
  exports:[],

  providers: [LearningExperienceService],
  
  entryComponents: [
  LearningExperienceFormPieceComponent, 
  LearningExperienceFormBlockComponent,
  LearningExperienceFormGroupComponent,
  LearningExperienceFormHeaderComponent,
  LEStudentListPieceAddDialogComponent,
  LEStudentListPieceRemoveDialogComponent,
  LEStudentListBlockDialogComponent,
  LEStudentListGroupDialogComponent]

})
export class MarkbookModule { }

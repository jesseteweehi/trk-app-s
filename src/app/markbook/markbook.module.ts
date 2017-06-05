import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MarkbookRoutingModule } from './markbook-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

//Shared Module
import { MyMaterialModule } from '../my-material/my-material.module';

import { LearningExperienceService } from './models/learning-experience.service';
import { LearningExperienceFormPieceComponent, LearningExperienceFormBlockComponent, LearningExperienceFormGroupComponent, } from './learning-experience-form/learning-experience-form.component';
import { LearningExperienceBlockTemplateFormComponent } from  './learning-experience-form/learning-experience-template-form.component'

import { LearningExperienceGroupListComponent, LearningExperienceBlockListComponent, LearningExperiencePieceListComponent } from './learning-experience-group/learning-experience-group.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MyMaterialModule,
    MarkbookRoutingModule,
    AngularFireDatabaseModule
  ],
  declarations: [
  LearningExperienceFormPieceComponent,
  LearningExperienceFormBlockComponent,
  LearningExperienceFormGroupComponent,   
  LearningExperienceGroupListComponent,
  LearningExperienceBlockListComponent,
  LearningExperiencePieceListComponent,
  LearningExperienceBlockTemplateFormComponent ],
  
  exports:[],

  providers: [LearningExperienceService],
  
  entryComponents: [
  LearningExperienceFormPieceComponent, 
  LearningExperienceFormBlockComponent,
  LearningExperienceFormGroupComponent]

})
export class MarkbookModule { }

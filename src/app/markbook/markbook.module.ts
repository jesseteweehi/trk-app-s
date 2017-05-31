import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MarkbookRoutingModule } from './markbook-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

//Shared Module
import { MyMaterialModule } from '../my-material/my-material.module';

import { LearningExperienceService } from './models/learning-experience.service';
import { LearningExperienceFormPieceComponent, LearningExperienceFormBlockComponent, LearningExperienceFormGroupComponent, } from './learning-experience-form/learning-experience-form.component';

import { LearningExperienceBlockComponent } from './learning-experience-block/learning-experience-block.component';
import { LearningExperiencePieceComponent } from './learning-experience-piece/learning-experience-piece.component'
import { LearningExperienceGroupListComponent, LearningExperienceBlockListComponent } from './learning-experience-group/learning-experience-group.component';



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
  LearningExperienceBlockComponent, 
  LearningExperiencePieceComponent, 
  LearningExperienceGroupListComponent,
  LearningExperienceBlockListComponent],
  
  exports:[],

  providers: [LearningExperienceService],
  
  entryComponents: [
  LearningExperienceFormPieceComponent, 
  LearningExperienceFormBlockComponent,
  LearningExperienceFormGroupComponent]

})
export class MarkbookModule { }

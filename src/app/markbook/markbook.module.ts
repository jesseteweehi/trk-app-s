import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkbookRoutingModule } from './markbook-routing.module';

import { LearningExperienceService } from './models/learning-experience.service';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { MyMaterialModule } from '../my-material/my-material.module';


import { LearningExperienceBlockComponent } from './learning-experience-block/learning-experience-block.component';
import { LearningExperiencePieceComponent } from './learning-experience-piece/learning-experience-piece.component'
import { LearningExperienceFormPieceComponent, LearningExperienceFormBlockComponent, LearningExperienceFormGroupComponent, } from './learning-experience-form/learning-experience-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MyMaterialModule,
    MarkbookRoutingModule
  ],
  declarations: [
  LearningExperienceFormPieceComponent,
  LearningExperienceFormBlockComponent,
  LearningExperienceFormGroupComponent,   
  LearningExperienceBlockComponent, 
  LearningExperiencePieceComponent],
  
  exports:[],

  providers: [LearningExperienceService],
  
  entryComponents: [
  LearningExperienceFormPieceComponent, 
  LearningExperienceFormBlockComponent,
  LearningExperienceFormGroupComponent]

})
export class MarkbookModule { }

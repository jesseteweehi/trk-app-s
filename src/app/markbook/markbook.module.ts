import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningExperienceService } from './models/learning-experience.service';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { MyMaterialModule } from '../my-material/my-material.module';

import { LearningExperienceBlockComponent } from './learning-experience-block/learning-experience-block.component';
import { LearningExperiencePieceComponent } from './learning-experience-piece/learning-experience-piece.component'
import { LearningExperienceFormComponent } from './learning-experience-form/learning-experience-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MyMaterialModule
  ],
  declarations: [LearningExperienceFormComponent,  LearningExperienceBlockComponent, LearningExperiencePieceComponent],
  exports:[LearningExperienceFormComponent, LearningExperienceBlockComponent,],
  providers: [LearningExperienceService],
  entryComponents: [LearningExperienceFormComponent],

})
export class MarkbookModule { }

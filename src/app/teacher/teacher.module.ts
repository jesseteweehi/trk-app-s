import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from './teacher.service';
import { MyMaterialModule } from './../global/my-material/my-material.module';
import { TeacherRoutingModule } from './teacher-routing.module';
import { LearningGroupListComponent } from './learning-group-list/learning-group-list.component';
import { LearningAreaListComponent } from './learning-area-list/learning-area-list.component';

import { LearningAreaDialogComponent,
         LearningAreaCreateFormComponent,
         } from './forms/learning-area-forms.component';

import { LearningGroupCreateFormComponent,
         LearningGroupDialogComponent
         } from './forms/learning-group-forms.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  declarations: [
    // Lists
    LearningGroupListComponent,
    LearningAreaListComponent,
    // Forms
    // Area
    LearningAreaDialogComponent,
    LearningAreaCreateFormComponent,
    // Groups
    LearningGroupDialogComponent,
    LearningGroupCreateFormComponent
],
  exports: [LearningGroupListComponent],
  providers: [TeacherService],
  entryComponents: [
    LearningAreaDialogComponent,
    LearningGroupDialogComponent
   ]
})
export class TeacherModule {}

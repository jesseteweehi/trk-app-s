import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from '../my-material/my-material.module';

import {StudentListComponent} from './student-shared-list.component'

import { StudentsService } from './student-shared.service'


@NgModule({
  imports: [
  CommonModule,
  MyMaterialModule
 
  ],
  exports: [
      StudentListComponent

  ],

  providers: [StudentsService],

  declarations: [
      StudentListComponent
  ],
  entryComponents: [
      StudentListComponent
  ]
})
export class StudentSharedModule { }



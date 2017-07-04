import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from '../my-material/my-material.module';

import {StudentListRemoveComponent, StudentListAddComponent} from './student-shared-list.component'

import { StudentsService } from './student-shared.service'


@NgModule({
  imports: [
  CommonModule,
  MyMaterialModule
 
  ],
  exports: [
      StudentListRemoveComponent,
      StudentListAddComponent
  ],

  providers: [StudentsService],

  declarations: [
      StudentListRemoveComponent,
      StudentListAddComponent
  ],
  entryComponents: [
  ]
})
export class StudentSharedModule { }



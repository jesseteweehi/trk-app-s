import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from '../my-material/my-material.module';
import { Routes, RouterModule } from "@angular/router";

import {StudentListRemoveComponent, StudentListAddComponent, StudentListComponent} from './student-shared-list.component'

import { StudentsService } from './student-shared.service'


@NgModule({
  imports: [
  CommonModule,
  MyMaterialModule,
  RouterModule
 
  ],
  exports: [
      StudentListRemoveComponent,
      StudentListAddComponent,
      StudentListComponent
  ],

  providers: [StudentsService],

  declarations: [
      StudentListRemoveComponent,
      StudentListAddComponent,
      StudentListComponent
  ],
  entryComponents: [
  ]
})
export class StudentSharedModule { }



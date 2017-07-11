import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from '../my-material/my-material.module';
import { Routes, RouterModule } from "@angular/router";

import {StudentListCardComponent, StudentListRemoveComponent, StudentListAddComponent, StudentListComponent} from './student-shared-list.component'

import { StudentsSharedService } from './student-shared.service'


@NgModule({
  imports: [
  CommonModule,
  MyMaterialModule,
  RouterModule
 
  ],
  exports: [
      StudentListRemoveComponent,
      StudentListAddComponent,
      StudentListComponent,
      StudentListCardComponent
  ],

  providers: [StudentsSharedService],

  declarations: [
      StudentListRemoveComponent,
      StudentListAddComponent,
      StudentListComponent,
      StudentListCardComponent
  ],
  entryComponents: [
  ]
})
export class StudentSharedModule { }



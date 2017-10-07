import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { MyMaterialModule } from '../my-material/my-material.module';

import { StudentsSharedService } from './student-shared.service'

import {StudentListCardComponent, StudentListRemoveComponent, StudentListAddComponent, StudentListComponent} from './student-shared-list.component'


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



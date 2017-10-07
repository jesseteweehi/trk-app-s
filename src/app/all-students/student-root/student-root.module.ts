import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRootRoutingModule} from  './student-root-routing.module'
import { MyMaterialModule } from '../../my-material/my-material.module'

import { MenuToolbarStudentComponent } from './menu-toolbar/menu-toolbar.component'


@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    StudentRootRoutingModule,
  ],
  declarations: [MenuToolbarStudentComponent]
})
export class StudentRootModule { }

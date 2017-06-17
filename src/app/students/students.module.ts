import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyMaterialModule } from '../my-material/my-material.module';

import { StudentsRoutingModule } from './students-routing.module';

import { StudentsService} from './models/students.service'

import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    StudentsRoutingModule,
    AngularFireDatabaseModule
  ],

  providers: [StudentsService],

  declarations: [StudentListComponent]
})
export class StudentsModule { }

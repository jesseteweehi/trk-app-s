import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

// Shared Module
import { MyMaterialModule } from '../my-material/my-material.module';

import { StudentsService} from './models/students.service'

import { StudentListComponent } from './student-list/student-list.component';


import { StudentsFormComponent } from './students-form/students-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    StudentsRoutingModule,
    AngularFireDatabaseModule
  ],

  providers: [StudentsService],

  declarations: [StudentListComponent, StudentsFormComponent],

  entryComponents: [
  	StudentsFormComponent
  ]
})
export class StudentsModule { }

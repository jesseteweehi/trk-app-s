import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

// Shared Module
import { MyMaterialModule } from '../my-material/my-material.module';

import { StudentsService} from './models/students.service'

import { StudentListComponent, StudentGroupListComponent } from './student-list/student-list.component';


import { StudentsFormComponent, StudentsGroupFormComponent, Student2GroupListComponent } from './students-form/students-form.component';
import { StudentContainerComponent } from './student-container/student-container.component';
import { StudentGroupComponent } from './student/student.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    StudentsRoutingModule,
    AngularFireDatabaseModule
  ],

  exports: [
    StudentListComponent,
    StudentGroupListComponent,
    Student2GroupListComponent 
  ],

  providers: [StudentsService],

  declarations: [
    StudentListComponent, 
    StudentGroupListComponent,  
    StudentsFormComponent,
    StudentsGroupFormComponent, 
    StudentContainerComponent,
    Student2GroupListComponent,
    StudentGroupComponent
  ],
  entryComponents: [
  	StudentsFormComponent, StudentsGroupFormComponent, Student2GroupListComponent
  ]
})
export class StudentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

// Shared Module
import { MyMaterialModule } from '../../my-material/my-material.module';
import { StudentSharedModule} from '../student-shared/student-shared.module'


import { StudentsService} from './models/students.service'

import {  StudentGroupListComponent } from './student-list/student-list.component';


import { StudentsFormComponent, StudentsGroupFormComponent} from './students-form/students-form.component';
import { StudentContainerComponent } from './student-container/student-container.component';
import { StudentGroupComponent } from './student/student.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    StudentsRoutingModule,
    AngularFireDatabaseModule,
    StudentSharedModule
  ],

  exports: [   
    StudentGroupListComponent
  ],

  providers: [StudentsService],

  declarations: [    
    StudentGroupListComponent,  
    StudentsFormComponent,
    StudentsGroupFormComponent, 
    StudentContainerComponent,  
    StudentGroupComponent
  ],
  entryComponents: [
  	StudentsFormComponent, StudentsGroupFormComponent  ]
})
export class StudentsModule { }

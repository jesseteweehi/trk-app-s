import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

// Shared Module
import { MyMaterialModule } from '../../my-material/my-material.module';
import { StudentSharedModule} from '../../student-shared/student-shared.module'

import { StudentContainerComponent } from './student-container/student-container.component';


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
  exports: [],
  providers: [],
  declarations: [StudentContainerComponent],
  entryComponents: []
})
export class StudentsModule { }

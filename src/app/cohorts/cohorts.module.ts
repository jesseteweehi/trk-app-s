import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CohortsRoutingModule } from './cohorts-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';

// Shared Module
import { MyMaterialModule } from '../my-material/my-material.module';
import { StudentSharedModule} from '../student-shared/student-shared.module'

import { CohortsService } from './models/cohorts.service'

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [CohortsService],
  declarations: []
})
export class CohortsModule { }

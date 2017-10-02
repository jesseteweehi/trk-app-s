import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


// Services
import { AuthenticationService} from './authentication.service'

//Guards
import { TeacherGuard } from './teacher.guard';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [],
  providers: [    
  	AuthenticationService,
   	TeacherGuard]
})
export class SharedSecurityModule { }

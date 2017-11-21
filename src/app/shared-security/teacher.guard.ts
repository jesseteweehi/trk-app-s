import { Injectable } from '@angular/core';
import { CanLoad, Route, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from './authentication.service'

import { UserModel } from '../users/models/data-classes'


@Injectable()
export class TeacherGuard implements CanLoad {
  user: UserModel
  
  constructor(
  			  private as: AuthenticationService,
  			  private router: Router){
 
  }

  canLoad(
    route: Route): Observable<boolean> | Promise<boolean> | boolean {

    let go: boolean = false

    this.as.user.subscribe(user => {
        this.user = user;
        if (this.user.role.teacher === true || this.user.role.admin === true) { 
            console.log('teacher or admin')
            go = true 
          }
        else {
            console.log('Not Teacher')
            go = false 
            }    
    })

    return go
  }
}

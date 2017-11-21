import { Injectable } from '@angular/core';
import { CanLoad, Route, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from './authentication.service'

import { UserModel } from '../users/models/data-classes'


@Injectable()
export class AdminGuard implements CanLoad {
  user: UserModel
  
  constructor(
          private as: AuthenticationService,
          private router: Router){
 
  }

  canLoad(
    route: Route): Observable<boolean> | Promise<boolean> | boolean {

    let go: boolean = false

    this.as.user.subscribe(user => {
        if (user)
        {
          this.user = user;
                  if (this.user.role.admin === true) { 
                      console.log('Admin')
                      go = true 
                    }
                  else {
                      console.log('Not Admin')
                      go = false 
                      }  
        }          
    })

    return go
  }
}

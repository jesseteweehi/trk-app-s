import { Injectable } from '@angular/core';
import { CanActivate, Route, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from '../shared-security/authentication.service'


@Injectable()
export class StudentDashboardGuard implements CanActivate{  
  constructor(
  			  private as: AuthenticationService,
  			  private router: Router){
 
  }

  canActivate(
  ): any {

    console.log('working Student DashBoard')

    return this.as.user.map(user => {
        console.log(user)
        if (user.role.student === true) {
            console.log('student')
            this.router.navigate(['/', 'markbook', 'my-student', Object.keys(user.approved)[0]])
            return true
          }
        else {
          console.log('not student')
          return true
        }
        })
      
     
  }
}

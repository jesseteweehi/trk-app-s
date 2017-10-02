import { Injectable } from '@angular/core';
import { CanLoad, Route, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from './authentication.service'


@Injectable()
export class TeacherGuard implements CanLoad {

  
  constructor(private afAuth: AngularFireAuth,
  			  private as: AuthenticationService,
  			  private router: Router){
 
  }

  canLoad(
    route: Route): Observable<boolean> | Promise<boolean> | boolean {

    return true
  	// if(this.isTeacher)
  	// 	{
  	// 	console.log(this.isTeacher)
  	// 	return true
  	// 	}
  	// else {
  	// 	this.router.navigate(['/'])
  	// }
  	
  }
}

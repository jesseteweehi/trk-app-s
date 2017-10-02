import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';



import { AuthenticationService } from './shared-security/authentication.service'

import { UserModel} from './users/models/data-classes'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  user: UserModel;

  constructor(
     private as: AuthenticationService,
     private router: Router
               ) {
  }

  ngOnInit() {
    this.as.user.subscribe(user => this.user = user);    
  }

  login() {
    this.as.login()
    this.router.navigateByUrl('/individual')

  }

  logout() {
    this.as.logout()
    this.router.navigateByUrl('/')
  }
}

  


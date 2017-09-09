import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: Observable<firebase.User>;

  sdkDb:any;

   constructor(
     private db: AngularFireDatabase,
     public afAuth: AngularFireAuth,
               ) {
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.newUser()
  }


  logout() {
    this.afAuth.auth.signOut();
  }

  newUser() {
    this.afAuth.authState.subscribe(result => {
      const data = this.db.object(`users/${result.uid}`);
      data.set(result)
      console.log(result)
    })       
  }


  navLinks = [
  {
    link: 'individual',
    label: 'Students'
  },
  {
  	link: 'assessment',
  	label: 'Assessment'
  },
  {
    link: 'cohorts',
    label: 'Cohorts'
  },
  {
    link: 'overview',
    label: 'Overview'
  },
  {
    link: 'users',
    label: 'Users'
  }

  ]


}

// <a routerLink="assessment">Assessment</a>
// <a routerLink="individual">Individual Student</a>
// <a routerLink="students">Students</a>

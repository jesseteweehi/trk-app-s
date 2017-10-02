import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'

import { UserModel} from '../users/models/data-classes'


@Injectable()
export class AuthenticationService {
	
	user: BehaviorSubject<UserModel> = new BehaviorSubject(null)

	constructor(

	    private db: AngularFireDatabase,
	    private afAuth: AngularFireAuth) {

		this.afAuth.authState
		        .switchMap(auth => {
		          if (auth) {
		            /// signed in
		            return this.db.object('users/' + auth.uid)
		          } else {
		            /// not signed in
		            return Observable.of(null)
		          }
		        })
		        .subscribe(user => {
		          this.user.next(user)
		        })
	}

	login() {
	  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	}


	logout() {
	  this.afAuth.auth.signOut();
	}
}

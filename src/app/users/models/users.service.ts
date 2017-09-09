import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';

import { environment } from '../../../environments/environment';

import * as firebase from 'firebase'

import { UserModel, UserGroupModel } from './data-classes'

@Injectable()
export class UsersService {

  sdkDb:any;

  emailType: object = {
    		'admin': 'emails/admin',
    		'teacher' : 'emails/teachers',
    		'student': 'emails/students'
    	}

    constructor(
        @Inject(FirebaseApp) public fb : firebase.app.App,
        private db: AngularFireDatabase) {

    	this.sdkDb = this.fb.database().ref();	
    }

  findUserGroupByKey(key:string) : Observable<UserGroupModel> {
    return this.db.object(`/userGroups/${key}`)
            .map(UserGroupModel.fromJson)
  } 

  findAllUserGroups(): Observable<UserGroupModel[]> {
    return this.db.list(`/userGroups`).map(UserGroupModel.fromJsonList)
  }

  createUserGroup(form: any): Observable<any> {
    const UserGroupToSave = Object.assign({}, form);
    const UserGroupToSaveKey = this.sdkDb.child('userGroups').push().key;
    let dataToSave = {}

    dataToSave[`userGroups/${UserGroupToSaveKey}/`] = UserGroupToSave

    return this.firebaseUpdate(dataToSave)
  }

  editUserGroup(key:string, form:any): Observable<any> {
    const formToSave = Object.assign({}, form);
    let dataToSave = {};
    dataToSave[`userGroups/${key}/`] = formToSave

    return this.firebaseUpdate(dataToSave)
  }



  findAllUsers(): Observable<UserModel[]> {
    return this.db.list(`/users`).map(UserModel.fromJsonList)
  }

    findAllEmails(type:string): Observable<any> {
    	const path = this.emailType[type]
    	return this.db.list(path)
   }

    createEmail(type:string, form:any): Observable<any> {
    	const encodedForm = this.encodeAsFirebaseKey(this.trim(form))
    	const path = this.emailType[type]
    	let dataToSave = {};
    	dataToSave[path + `/${encodedForm}`] = true

    	return this.firebaseUpdate(dataToSave)
   	}

   	removeEmail(type:string, email:string) {
   		const path = this.emailType[type]
   		const itemToRemove = this.db.object(path + `/${email}`);
   		itemToRemove.remove()
   	}

   	encodeAsFirebaseKey(string) {
  		return string.replace(/\%/g, '%25')
    		.replace(/\./g, '%2E')
    		.replace(/\#/g, '%23')
    		.replace(/\$/g, '%24')
    		.replace(/\//g, '%2F')
    		.replace(/\[/g, '%5B')
    		.replace(/\]/g, '%5D');
	};

	trim(string) {
		return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
	}


    firebaseUpdate(dataToSave) {
        const subject = new Subject();

        this.sdkDb.update(dataToSave)
            .then(
                val => {
                    subject.next(val);
                    subject.complete();

                },
                err => {
                    subject.error(err);
                    subject.complete();
                }
        );

        return subject.asObservable();
    }



}

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

  paths: object = {
    'admin':'admin/',
    'teacher' : 'teachers/',
  }

  roles: Array<string> = [
  'admin',
  'teacher',
  'student'
  ]


  constructor(
    @Inject(FirebaseApp) public fb : firebase.app.App,
    private db: AngularFireDatabase) {
      this.sdkDb = this.fb.database().ref();	
      }




  changeUserRole(add:boolean, key:string , role: string): Observable<any> {
    console.log(add)
    
    if (add)
      {
        console.log('in')
        let dataToSave = {}
        dataToSave[`users/${key}/role/${role}`] = true
        return this.firebaseUpdate(dataToSave)
      }

    else if (!add && this.roles.includes(role))

      {

        let dataToSave = {}
        dataToSave[`users/${key}/role/${role}`] = null
        return this.firebaseUpdate(dataToSave)
    }
            
    
  }


  putUsersIn(add:boolean=true, path:string='teacher', users: UserModel[]): Observable<any> {
      let dataToSave = {}
      const pathToUse = this.paths[path]
        if (add) {
          users.forEach(user => {   
            dataToSave[pathToUse + user.$key] = true;
            })
          }
        else{
          users.forEach(user => {   
            dataToSave[pathToUse + user.$key] = null;
            })
        }
      return this.firebaseUpdate(dataToSave)
  }

  removeUserByKey(key, path:string='teacher'): Observable<any> {
    let dataToSave = {}
    const pathToUse = this.paths[path]
    dataToSave[pathToUse + '/' + key] = null;
    return this.firebaseUpdate(dataToSave)
  }

  findUserKeysForObservable(userkeys$: Observable<any[]>) :Observable<any> {
      return userkeys$
          .map(splp => splp.map(users => this.db.object('users/' + users.$key)))
          .flatMap(fbojs => Observable.combineLatest(fbojs))
  }

  findAllAdmin(): Observable<UserModel[]> {
    return this.findUserKeysForObservable(this.db.list(`admin`)).map(UserModel.fromJsonList)
  }

  findAllTeachers(): Observable<UserModel[]> {
    return this.findUserKeysForObservable(this.db.list(`teachers`)).map(UserModel.fromJsonList)
  }

  findAllUsers(): Observable<UserModel[]> {
    return this.findUserKeysForObservable(this.db.list(`users`)).map(UserModel.fromJsonList)
  }


  ////// User Groups /////// Future Implementation

  putUsersInUserGroup(userGroupKey: string, users: UserModel[]): Observable<any> {
      let dataToSave = {}
      users.forEach(user => {
          dataToSave["usersForUserGroup/" + userGroupKey + "/" + user.$key] = true;
      })

      return this.firebaseUpdate(dataToSave)
  }

  removeUsersFromUserGroup(userGroupKey: string, users: UserModel[]): Observable<any> {
      let dataToSave = {}
      users.forEach(user => {
          dataToSave["usersForUserGroup//" + userGroupKey + "/" + user.$key] = null;
      })

      return this.firebaseUpdate(dataToSave)
  }  

  findUsersForGroup(key:string): Observable<any> {
      return this.findUserKeysForObservable(this.db.list(`usersForUserGroup/${key}`))
          .map(UserModel.fromJsonList)
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

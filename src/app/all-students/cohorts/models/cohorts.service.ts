import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { 
    CohortModel } from '../models/data-classes'

import { StudentModel } from '../../../student-shared/data-classes';

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';

import { environment } from '../../../../environments/environment';

import * as firebase from 'firebase'

@Injectable()
export class CohortsService {

  	sdkDb:any;

  	constructor(
      	@Inject(FirebaseApp) public fb : firebase.app.App,
      	private db: AngularFireDatabase) {

  		this.sdkDb = this.fb.database().ref();	
  	}

  	findAllCohorts(): Observable<CohortModel[]> {
  		return this.db.list('cohorts')
  			.map(CohortModel.fromJsonList)
  	}

  	findCohortByKey(key): Observable<CohortModel> {
  		return this.db.object('cohorts/' + key)
  			.map(CohortModel.fromJson)
  	}

  	createCohort(form:any): Observable<any> {
  		const toSave = Object.assign({}, form);
  		const toSaveKey = this.sdkDb.child('cohorts').push().key;
  		let dataToSave = {};
  		dataToSave["cohorts/" + toSaveKey] = toSave;

  		return this.firebaseUpdate(dataToSave)
  	}

  	editCohort(key:string, form:any): Observable<any> {
  		const toSave = Object.assign({},form);
  		let dataToSave = {};
  		dataToSave["cohorts/" + key] = form;
  		return this.firebaseUpdate(dataToSave)
  	}

  	removeCohort(key:string): Observable<any> {
  		let dataToSave = {}
  		dataToSave['cohorts/' + key] = null;
  		return this.firebaseUpdate(dataToSave)
  	}

  	archiveCohort(key:string): Observable<any> {
  		let dataToSave = {};
  		dataToSave['cohorts/' + key + '/archived'] = true;
  		return this.firebaseUpdate(dataToSave) 
  	}

  	unarchiveCohort(key:string): Observable<any> {
  		let dataToSave = {};
  		dataToSave['cohorts/' + key + '/archived'] = false;
  		return this.firebaseUpdate(dataToSave) 
  	}

    lockCohort(key:string): Observable<any> {
      let dataToSave = {};
      dataToSave['cohorts/' + key + '/locked'] = true;
      return this.firebaseUpdate(dataToSave)
    }

  	putStudentsInCohort(cohortKey:string, students: StudentModel[]): Observable<any> {
  		let dataToSave = {}
  		students.forEach(student => {
  				dataToSave['studentsForCohort/' + cohortKey + "/" + student.$key] = true;
  			});
  		return this.firebaseUpdate(dataToSave)
  	}

  	removeStudentsFromCohort(cohortKey:string, students: StudentModel[]): Observable<any> {
  		let dataToSave = {}
  		students.forEach(student => {
  				dataToSave['studentsForCohort/' + cohortKey + "/" + student.$key] = null;
  			});
  		return this.firebaseUpdate(dataToSave)

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

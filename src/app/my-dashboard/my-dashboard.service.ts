import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";

import { StudentModel } from '../student-shared/data-classes';
import { LearningAssessmentGroupModel } from '../all-markbook/markbook/models/data-classes'
import { CohortModel } from '../all-students/cohorts/models/data-classes'


import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';

import { environment } from '../../environments/environment';

import * as firebase from 'firebase'

@Injectable()
export class StudentsSharedService {
	sdkDb:any;

	constructor(
	    @Inject(FirebaseApp) public fb : firebase.app.App,
	    private db: AngularFireDatabase) {

		this.sdkDb = this.fb.database().ref();	
	}

	//////// Students /////////

	findStudentKeysForObservableList(studentsKeys$: Observable<any[]>) : Observable<any> {
        return studentsKeys$
            .map(splp =>splp.map(student => this.db.object('students/' + student.$key)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs))
    }

    findStudentsForUser(userKey:string): Observable<any> {
        return this.findStudentKeysForObservableList(this.db.list(`studentsForUser/${userKey}`))
            .map(StudentModel.fromJsonList)
    }

	putStudentsForUser(userKey: string, students: StudentModel[]): Observable<any> {
		let dataToSave = {}
		students.forEach(student => {
			dataToSave["studentsForUser/" + userKey + "/" + student.$key] = true;
		})

		return this.firebaseUpdate(dataToSave)
	}

	removeStudentsFromUser(userKey: string, students: StudentModel[]): Observable<any> {
		let dataToSave = {}
		students.forEach(student => {
			dataToSave["studentsForUser/" + userKey + "/" + student.$key] = null;
		})
		return this.firebaseUpdate(dataToSave)
	}

	//////// Groups /////////

	findGroupKeysForObservableList(groupKeys$: Observable<any>) : Observable<any> {
		return groupKeys$
			.map(gpu => gpu.map(group => this.db.object('learningExperienceGroup' + group.$key)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs))
	}

	findGroupsForUser(userKey:string): Observable<any> {
		return this.findGroupKeysForObservableList(this.db.list(`learningGroupsForUser/${userKey}`))
			.map(LearningAssessmentGroupModel.fromJsonList)
	}

	putGroupsForUser(userKey: string, groups: LearningAssessmentGroupModel[]): Observable<any> {
		let dataToSave = {}
		groups.forEach(groups => {
			dataToSave[`learningGroupsForUser/${userKey}/groups.$key`] = true
		})
		return this.firebaseUpdate(dataToSave)

	}

	removeGroupsFromUser(userKey: string, groups: LearningAssessmentGroupModel[]): Observable<any> {
		let dataToSave = {}
		groups.forEach(groups => {
			dataToSave[`learningGroupsForUser/${userKey}/groups.$key`] = null
		})
		return this.firebaseUpdate(dataToSave)
	}

	//////// Cohorts /////////

	findCohortsKeysForObservableList(cohortKeys$: Observable<any>) : Observable<any> {
		return cohortKeys$
			.map(cpu => cpu.map(cohort => this.db.object('cohorts' + cohort.$key)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs))
	}

	findCohortsForUser(userKey:string): Observable<any> {
		return this.findCohortsKeysForObservableList(this.db.list(`cohortsForUser/${userKey}`))
			.map(CohortModel.fromJsonList)
	}

	putCohortForUser(userKey: string, groups: CohortModel[]): Observable<any> {
		let dataToSave = {}
		groups.forEach(groups => {
			dataToSave[`CohortsForUser/${userKey}/groups.$key`] = true
		})
		return this.firebaseUpdate(dataToSave)

	}

	removeCohortFromUser(userKey: string, groups: CohortModel[]): Observable<any> {
		let dataToSave = {}
		groups.forEach(groups => {
			dataToSave[`CohortsForUser/${userKey}/groups.$key`] = null
		})
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
import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { 
    StudentModel,
    StudentGroupModel} from '../models/data-classes'

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';

import { environment } from '../../../environments/environment';

import * as firebase from 'firebase'

@Injectable()
export class StudentsService {

	sdkDb:any;

	constructor(
	    @Inject(FirebaseApp) public fb : firebase.app.App,
	    private db: AngularFireDatabase) {

		this.sdkDb = this.fb.database().ref();	
	}

	findAllStudents():Observable<StudentModel[]> {

        return this.db.list('students')
            .map(StudentModel.fromJsonList);

    }


    findAllStudentGroups(): Observable<StudentGroupModel[]> {
        return this.db.list('groups')
            .map(StudentGroupModel.fromJsonList);

    }

    createStudent(student:any): Observable<any> {
        const studentToSave = Object.assign({}, student)
        const studentToSaveKey = this.sdkDb.child('students').push().key;
        let dataToSave = {};
        dataToSave['students/' + studentToSaveKey] = studentToSave;
        return this.firebaseUpdate(dataToSave)
    }

    createStudentGroup(group:any): Observable<any> {
        const groupToSave = Object.assign({}, group)
        const groupToSaveKey = this.sdkDb.child('groups').push().key;
        let dataToSave = {};
        dataToSave['groups/' + groupToSaveKey] = groupToSave;
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

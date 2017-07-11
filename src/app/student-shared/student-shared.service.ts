import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { 
    StudentModel,
    StudentGroupModel} from './data-classes'

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

	findAllStudents():Observable<StudentModel[]> {
        return this.db.list('students')
            .map(StudentModel.fromJsonList)

    }

}
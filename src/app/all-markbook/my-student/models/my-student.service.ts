import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';


import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel} 
    							from '../../markbook/models/data-classes'

import { StudentModel } from '../../../student-shared/data-classes'

import { environment } from '../../../../environments/environment';

import * as firebase from 'firebase'

@Injectable()
export class MyStudentsService {

	sdkDb:any;

	constructor(
	    @Inject(FirebaseApp) public fb : firebase.app.App,
	    private db: AngularFireDatabase) {

		this.sdkDb = this.fb.database().ref();	
	}

	findStudentForKey(studentKey:string): Observable<any> {
		return this.db.object(`students/${studentKey}`)
			.map(StudentModel.fromJson)
	}

	findPieceKeysForStudent(keys$: Observable<any[]>): Observable<any> {
		return keys$
			.map(keys => keys.map(key => this.db.object('learningExperiencePiece/' + key.$key)))
			.flatMap(fbojs => Observable.combineLatest(fbojs))
	}

	findPiecesForStudent(studentKey:string): Observable<any> {
		return this.findPieceKeysForStudent(this.db.list(`studentLearning/${studentKey}/pieces/`))
			.map((LearningAssessmentPieceModel.fromJsonList))
	}

	findPiecesForStudentObject(studentKey:string): Observable<any> {
		return this.findPieceKeysForStudent(this.db.list(`studentLearning/${studentKey}/pieces/`))
			.map((LearningAssessmentPieceModel.fromJsonToObject))
	}

	
	findBlockKeysForStudent(keys$: Observable<any[]>): Observable<any> {
		return keys$
			.map(keys => keys.map(key => this.db.object('learningExperienceBlock/' + key.$key)))
			.flatMap(fbojs => Observable.combineLatest(fbojs))
	}

	findBlocksForStudent(studentKey:string): Observable<any> {
		return this.findBlockKeysForStudent(this.db.list(`studentLearning/${studentKey}/blocks/`))
			.map((LearningAssessmentBlockModel.fromJsonToObject))
	}

	findEnrolledBlocksForStudent(studentKey:string): Observable<any> {
		return this.findBlockKeysForStudent(this.db.list(`studentLearning/${studentKey}/enrolled`))
			.map((LearningAssessmentBlockModel.fromJsonList))
	}


	findGroupKeysForStudent(groupKeys$: Observable<any[]>): Observable<any> {
		return groupKeys$
			.map(keys => keys.map(key => this.db.object('learningExperienceGroup/' + key.$key)))
			.flatMap(fbojs => Observable.combineLatest(fbojs))
	}

	findGroupsForStudent(studentKey:string): Observable<any> {
		return this.findGroupKeysForStudent(this.db.list(`studentLearning/${studentKey}/groups/`))
			.map((LearningAssessmentGroupModel.fromJsonToObject))
	}

	findGroupForKey(key:string): Observable<any> {
		return this.db.object(`learningExperienceGroup/${key}`)
			.map(LearningAssessmentGroupModel.fromJson)
	}

	findBlockForKey(key:string): Observable<any> {
		return this.db.object(`learningExperienceBlock/${key}`)
			.map(LearningAssessmentBlockModel.fromJson)
	}

	findPieceForKey(key:string): Observable<any> {
		return this.db.object(`learningExperiencePiece/${key}`)
			.map(LearningAssessmentPieceModel.fromJson)
	}
}
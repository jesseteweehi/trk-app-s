import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';


import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel} 
    							from '../../markbook/models/data-classes'

import { StudentModel } from '../../students/models/data-classes'

import { environment } from '../../../environments/environment';

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

	// USe student Key retrieve info.
	// Use Info to retreive group info, Block Info and Piece Info
	// Return this how?

	// findStudentPiecesForKey(studentKey:string): Observable<any> {
	// 	return this.db.list(`studentLearning/${studentKey}`)
	// 		.map(results => results.map(result => {
	// 			let data = {}
	// 			data['group'] = this.findGroupForKey(result.group);
	// 			data['block'] = this.findBlockForKey(result.block);
	// 			data['piece'] = this.findPieceForKey(result.piece);
	// 			return data			
	// 		}) 
	// 		)
	// 		.flatMap(results => Observable.combineLatest(results))
	// 		.do(x => console.log(x))
			
	// }

	findStudentPiecesForKey(studentKey:string): Observable<any> {
		return this.db.list(`studentLearning/${studentKey}`)
			.map(results => results.map(result => {
				let data = {}
				data['group'] = this.findGroupForKey(result.group);
				data['block'] = this.findBlockForKey(result.block);
				data['piece'] = this.findPieceForKey(result.piece);
				data['pieceKey'] = result.piece
				return data}))
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
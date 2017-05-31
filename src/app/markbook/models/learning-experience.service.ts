import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { 
    LearningAssessmentParameterModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel

 } from '../models/data-classes'

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';

import { environment } from '../../../environments/environment';

import * as firebase from 'firebase'



@Injectable()
export class LearningExperienceService {

    sdkDb:any;

    constructor(
        @Inject(FirebaseApp) public fb : firebase.app.App,
        private db: AngularFireDatabase) {

    	this.sdkDb = this.fb.database().ref();	
    }

    findAllLearningExperienceGroups():Observable<LearningAssessmentGroupModel[]> {

        return this.db.list('learningExperienceGroup')
            .do(console.log)
            .map(LearningAssessmentGroupModel.fromJsonList);

    }

    findAllLearningExperienceBlocks ():Observable<LearningAssessmentBlockModel[]> {

        return this.db.list('learningExperienceBlock')
            .do(console.log)
            .map(LearningAssessmentGroupModel.fromJsonList);

    }

    createNewLearningExperiencePiece(le:any): Observable<any> {

        const learningExperiencePieceToSave = Object.assign({}, le);

        const learningExperiencePieceToSaveKey = this.sdkDb.child('learningExperiencePiece').push().key;

        let dataToSave = {};

        dataToSave["learningExperiencePiece/" + learningExperiencePieceToSaveKey] = learningExperiencePieceToSave;

        return this.firebaseUpdate(dataToSave);
    }

    createNewLearningExperienceBlock(le:any, ): Observable<any> {

        const learningExperienceBlockToSave = Object.assign({}, le);

        const learningExperienceBlockToSaveKey = this.sdkDb.child('learningExperienceBlock').push().key;

        let dataToSave = {};

        dataToSave['learningExperienceBlock/' + learningExperienceBlockToSaveKey] = learningExperienceBlockToSave;

        return this.firebaseUpdate(dataToSave);
    }

    createNewLearningExperienceGroup(le:any): Observable<any> {

        const learningExperienceGroupToSave = Object.assign({}, le);

        const learningExperienceGroupToSaveKey = this.sdkDb.child('learningExperienceGroup').push().key;

        let dataToSave = {};

        dataToSave['learningExperienceGroup/' + learningExperienceGroupToSaveKey] = learningExperienceGroupToSave;

        return this.firebaseUpdate(dataToSave);
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

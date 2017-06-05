import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel} from '../models/data-classes'

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

    findTemplate(learningBlock:string) {
        return this.db.object('blocktemplate/' + learningBlock)
    }

    ///// Need to update to return an observable
    saveTemplate(learningBlock:string, template:any) {
        const itemObservable = this.db.object('blocktemplate/' + learningBlock);
        itemObservable.update( template );     
    }

    findAllLearningExperienceGroups():Observable<LearningAssessmentGroupModel[]> {

        return this.db.list('learningExperienceGroup')
            .map(LearningAssessmentGroupModel.fromJsonList);

    }

    findAllLearningExperienceBlocks ():Observable<LearningAssessmentBlockModel[]> {

        return this.db.list('learningExperienceBlock')
            .do(console.log)
            .map(LearningAssessmentGroupModel.fromJsonList);

    }

    createNewLearningExperiencePieceUnderBlock(blockKey: string, le:any): Observable<any> {
        
        const learningExperiencePieceToSave = Object.assign({}, le);
        const learningExperiencePieceToSaveKey = this.sdkDb.child('learningExperiencePiece').push().key;       
        let dataToSave = {};
        dataToSave["learningExperiencePiece/" + learningExperiencePieceToSaveKey] = learningExperiencePieceToSave;
        dataToSave["learningExperiencePieceForBlock/" + blockKey + "/" + learningExperiencePieceToSaveKey] = true

        return this.firebaseUpdate(dataToSave);

    }

    createNewLearningExperiencePiece(le:any): Observable<any> {

        const learningExperiencePieceToSave = Object.assign({}, le);
        const learningExperiencePieceToSaveKey = this.sdkDb.child('learningExperiencePiece').push().key;
        let dataToSave = {};
        dataToSave["learningExperiencePiece/" + learningExperiencePieceToSaveKey] = learningExperiencePieceToSave;

        return this.firebaseUpdate(dataToSave);
    }

    createNewLearningExperienceBlockUnderGroup(groupKey: string, le:any): Observable<any> {
        
        const learningExperienceBlockToSave = Object.assign({}, le);
        const learningExperienceBlockToSaveKey = this.sdkDb.child('learningExperienceBlock').push().key;       
        let dataToSave = {};
        dataToSave["learningExperienceBlock/" + learningExperienceBlockToSaveKey] = learningExperienceBlockToSave;
        dataToSave["learningExperienceBlockForGroup/" + groupKey + "/" + learningExperienceBlockToSaveKey] = true

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

    //////////////////////////////// JOINS ////////////////////////////

    findBlockKeysForGroups(blockKeys$: Observable<any[]>) : Observable<any> {
        return blockKeys$
            .map(bpg => bpg.map(blockKey => this.db.object('learningExperienceBlock/' + blockKey.$key)))
            .flatMap(fbojs => Observable.combineLatest(fbojs))

    }

    findBlocksForGroup(groupKey:string): Observable<any> {
        console.log(groupKey)
        return this.findBlockKeysForGroups(this.db.list(`learningExperienceBlockForGroup/${groupKey}`))
            .map(LearningAssessmentBlockModel.fromJsonList)
    }

    findPieceKeysForBlock(pieceKeys$: Observable<any[]>) : Observable<any> {
        return pieceKeys$
            .map(ppb => ppb.map(pieceKey => this.db.object('learningExperiencePiece/' + pieceKey.$key)))
            .flatMap(fbojs => Observable.combineLatest(fbojs))

    }

    findPiecesForBlocks(blockKey:string): Observable<any> {
        console.log(blockKey)
        return this.findPieceKeysForBlock(this.db.list(`learningExperiencePieceForBlock/${blockKey}`))
            .map(LearningAssessmentPieceModel.fromJsonList)
    }

}

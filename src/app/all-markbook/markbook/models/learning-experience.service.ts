import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel,
    LearningAssessmentHeaderModel,
    LearningAreaModel,
    LearningLevelModel,
    LearningYearModel} from '../models/data-classes'

import { StudentModel } from '../../students/models/data-classes';

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';

import { environment } from '../../../../environments/environment';

import * as firebase from 'firebase'



@Injectable()
export class LearningExperienceService {

    sdkDb:any;

    constructor(
        @Inject(FirebaseApp) public fb : firebase.app.App,
        private db: AngularFireDatabase) {

    	this.sdkDb = this.fb.database().ref();	
    }

    /////// Student Placement for Learning Piece /////////

    findStudentKeysForLearningPiece(studentsKeys$: Observable<any[]>) : Observable<any> {
        return studentsKeys$
            .map(splp =>splp.map(student => this.db.object('students/' + student.$key)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs))
    }

    findStudentsForLearningPiece(lpkey:string): Observable<any> {
        return this.findStudentKeysForLearningPiece(this.db.list(`studentsForLearningPiece/${lpkey}`))
            .map(StudentModel.fromJsonList)
    }

    putStudentsInLearningPiece(groupKey: string, blockKey:string, pieceKey: string, students: StudentModel[]): Observable<any> {
        let dataToSave = {}
        students.forEach(student => {
            dataToSave["studentsForLearningPiece/" + pieceKey + "/" + student.$key] = true;
            dataToSave[`studentLearning/${student.$key}/groups/${groupKey}`] = true;
            dataToSave[`studentLearning/${student.$key}/blocks/${blockKey}`] = true;
            dataToSave[`studentLearning/${student.$key}/pieces/${pieceKey}`] = true;
        })

        return this.firebaseUpdate(dataToSave)
    }

    removeStudentsFromLearningPiece(pieceKey: string, students: StudentModel[]): Observable<any> {
        let dataToSave = {}
        students.forEach(student => {
            dataToSave["studentsForLearningPiece/" + pieceKey + "/" + student.$key] = null;
            dataToSave[`studentLearning/${student.$key}/pieces/${pieceKey}`] = null;
        })

        return this.firebaseUpdate(dataToSave)
    }

    //////////// Learning Piece Container /////////////////////

    //Headers//

    findHeaderUnderBlock(blockKey:string, axis:string, headerKey:string): Observable<any> {
        return this.db.object(`header/${blockKey}/${axis}/${headerKey}`)
            .map(LearningAssessmentHeaderModel.fromJson)
    }

  
    findXHeadersForBlocks(blockKey:string): Observable<any> {
        return this.db.list('header/' + blockKey + '/x')
    }

    findYHeadersForBlocks(blockKey:string): Observable<any> {
        return this.db.list('header/' + blockKey + '/y')
    }

    createHeadingUnderBlock(blockKey: string, header:any): Observable<any> {
        const HeaderToSave = Object.assign({}, header);
        const HeaderToSaveKey = this.sdkDb.child('header').push().key;       
        let dataToSave = {};
        if (header.header === 'x'){
            dataToSave["header/" + blockKey + '/x/' + HeaderToSaveKey + '/' ] = HeaderToSave;
        }
        else {   
            dataToSave["header/" + blockKey + '/y/' + HeaderToSaveKey + '/'] = HeaderToSave;
        }      
        return this.firebaseUpdate(dataToSave);

    }

    editHeader(blockKey:string, axis:string, headerKey:string, form:any): Observable<any> {
        const formToSave = Object.assign({}, form); 
        let dataToSave = {};
        dataToSave[`header/${blockKey}/${axis}/${headerKey}/`] = formToSave

        return this.firebaseUpdate(dataToSave)
    }

    removeXHeaderUnderBlock(blockKey: string, headerKey:any): Observable<any> {      
        let dataToSave = {};
        dataToSave["header/" + blockKey + "/x/"  + headerKey] = null
        return this.firebaseUpdate(dataToSave);
    }

    removeYHeaderUnderBlock(blockKey: string, headerKey:any): Observable<any> {      
        let dataToSave = {};
        dataToSave["header/" + blockKey + "/y/"  + headerKey] = null
        return this.firebaseUpdate(dataToSave);
    }

    lockHeader(blockKey:string, axis:string, headerKey:string): Observable<any> {
        let dataToSave = {};
        dataToSave[`header/${blockKey}/${axis}/${headerKey}/locked`] = true
        return this.firebaseUpdate(dataToSave)
    }

    //Learning Piece//
   
    findLearningPiecesForStudent(studentKey:string): Observable<any[]> {
        return this.db.list(`studentLearning/${studentKey}`)
    }

    findLearningPieceForKey(lpKey:string): Observable<LearningAssessmentPieceModel> {
        return this.db.object(`learningExperiencePiece/${lpKey}`)
            .map(LearningAssessmentPieceModel.fromJson)
    }

    createNewLearningExperiencePieceUnderBlock(blockKey: string, le:any): Observable<any> {        
        const learningExperiencePieceToSave = Object.assign({'parent':blockKey}, le);
        const learningExperiencePieceToSaveKey = this.sdkDb.child('learningExperiencePiece').push().key;       
        let dataToSave = {};
        dataToSave["learningExperiencePiece/" + learningExperiencePieceToSaveKey] = learningExperiencePieceToSave;
        dataToSave["learningExperiencePieceForBlock/" + blockKey + "/" + learningExperiencePieceToSaveKey] = true


        return this.firebaseUpdate(dataToSave);

    }

    editLearningExperiencePiece(blockKey:string, pieceKey: string, le:any): Observable<any> {
        const learningExperiencePieceToSave = Object.assign({'parent': blockKey}, le);      
        let dataToSave = {};
        dataToSave["learningExperiencePiece/" + pieceKey] = learningExperiencePieceToSave;
        return this.firebaseUpdate(dataToSave);
    }

    removeLearningExperiencePieceUnderBlock(blockKey: string, pieceKey:any): Observable<any> {      
        let dataToSave = {};
        dataToSave["learningExperiencePiece/" + pieceKey] = null;
        dataToSave["learningExperiencePieceForBlock/" + blockKey + "/" + pieceKey] = null

        return this.firebaseUpdate(dataToSave);
    }

    lockLearningPiece(pieceKey:string): Observable<any> {
        let dataToSave = {};
        dataToSave["learningExperiencePiece/" + pieceKey +'/' + 'locked'] = true;
        return this.firebaseUpdate(dataToSave)
    }   



   
    //////////////// Learning Support ///////////////////////////


    findStudentKeysForCohort(key:string): Observable<any> {
      return this.db.list(`studentsForCohort/${key}`)
    }

    findAllLearningLevelsObject(): Observable<any> {
        return this.db.object('learningLevel')
    }
    
    findLearningLevelByKey(key:string): Observable<LearningLevelModel> {
        return this.db.object(`learningLevel/${key}`)
            .map(LearningLevelModel.fromJson)
    }

    findAllLearningLevels(): Observable<LearningLevelModel[]> {
        return this.db.list('learningLevel')
            .map(LearningLevelModel.fromJsonList);

    }

    findLearningYearByKey(key:string): Observable<LearningYearModel> {
        return this.db.object(`learningYear/${key}`)
            .map(LearningYearModel.fromJson)
    }

    findAllLearningYears(): Observable<LearningYearModel[]> {
      return this.db.list('learningYear')
        .map(LearningYearModel.fromJsonList)
    }

    findAllLearningAreaObject(): Observable<any> {
        return this.db.object('learningArea')
    }

    findAllLearningLevelObject(): Observable<any> {
        return this.db.object('learningLevel')
    }

    findAllLearningYearObject(): Observable<any> {
        return this.db.object('learningYear')
    }
    
    findLearningAreaByKey(key): Observable<LearningAreaModel> {
        return this.db.object(`learningArea/${key}`)
            .map(LearningAreaModel.fromJson)
    }

    findAllLearningAreas(): Observable<LearningAreaModel[]> {
        return this.db.list('learningArea')
            .map(LearningAreaModel.fromJsonList)
    }

    createLearningYear(form:any): Observable<any> {
      const yearToSave = Object.assign({},form );
      const key = this.sdkDb.child('learningyear').push().key;
      let dataToSave = {};
      dataToSave['learningYear/' + key] = yearToSave;

      return this.firebaseUpdate(dataToSave)
    }

    createLearningLevel(form:any): Observable<any> {
        const levelToSave = Object.assign({}, form);
        const key = this.sdkDb.child('learningLevel').push().key;
        let dataToSave = {};
        dataToSave['learningLevel/' + key] = levelToSave;

        return this.firebaseUpdate(dataToSave);
    }

    createLearningArea(form:any): Observable<any> {
        const areaToSave = Object.assign({}, form);
        const key = this.sdkDb.child('learningArea').push().key;
        let dataToSave = {};
        dataToSave['learningArea/' + key] = areaToSave;

        return this.firebaseUpdate(dataToSave);
    }

    editLearningYear(key:string, ly:any): Observable<any> {
        const form = Object.assign({}, ly);      
        let dataToSave = {};
        dataToSave["learningYear/" + key] = form;
        return this.firebaseUpdate(dataToSave);
    }

    editLearningLevel(key: string, le:any): Observable<any> {
        const form = Object.assign({}, le);      
        let dataToSave = {};
        dataToSave["learningLevel/" + key] = form;
        return this.firebaseUpdate(dataToSave);
    }

    editLearningArea(key: string, le:any): Observable<any> {
        const form = Object.assign({}, le);      
        let dataToSave = {};
        dataToSave["learningArea/" + key] = form;
        return this.firebaseUpdate(dataToSave);
    }

    removeLearningYearByKey(key:string):Observable<any> {
        let dataToSave = {};
        dataToSave['learningYear/' + key] = null;
        return this.firebaseUpdate(dataToSave)
    } 

    removeLearningLevelByKey(key:string): Observable<any> {
        let dataToSave = {};
        dataToSave['learningLevel/' + key] = null;
        return this.firebaseUpdate(dataToSave)
    }

    removeLearningAreaByKey(key:string): Observable<any> {
        let dataToSave = {};
        dataToSave['learningArea/' + key] = null;
        return this.firebaseUpdate(dataToSave)
    }

    archiveLearninglevel(key): Observable<any> {
        let dataToSave = {};
        dataToSave[`learningLevel/${key}/archived`] = true
        return this.firebaseUpdate(dataToSave)
    }

    archiveLearningArea(key): Observable<any> {
        let dataToSave = {};
        dataToSave[`learningArea/${key}/archived`] = true
        return this.firebaseUpdate(dataToSave)
    }

    unarchiveLearninglevel(key): Observable<any> {
        let dataToSave = {};
        dataToSave[`learningLevel/${key}/archived`] = false
        return this.firebaseUpdate(dataToSave)
    }

    unarchiveLearningArea(key): Observable<any> {
        let dataToSave = {};
        dataToSave[`learningArea/${key}/archived`] = false
        return this.firebaseUpdate(dataToSave)
    }

    lockLearninglevel(key:string){
        let dataToSave = {};
        dataToSave[`learningLevel/${key}/locked`] = true
        return this.firebaseUpdate(dataToSave)
    }

    lockLearningArea(key:string){
        let dataToSave = {};
        dataToSave[`learningArea/${key}/locked`] = true
        return this.firebaseUpdate(dataToSave)
    }

   
   /////////// Learning Group and Block ///////////////

    findAllLearningExperienceGroups(): Observable<LearningAssessmentGroupModel[]> {
        return this.db.list('learningExperienceGroup')
            .map(LearningAssessmentGroupModel.fromJsonList)
    } 

    findGroupForKey(groupKey:string): Observable<LearningAssessmentGroupModel> {
           return this.db.object(`learningExperienceGroup/${groupKey}`)
               .map(LearningAssessmentGroupModel.fromJson)
       }

    findBlockForKey(blockKey:string): Observable<LearningAssessmentBlockModel> {
           return this.db.object(`learningExperienceBlock/${blockKey}`)
               .map(LearningAssessmentBlockModel.fromJson)
       }

    createNewLearningExperienceBlockUnderGroup(groupKey: string, le:any): Observable<any> {
       
       const learningExperienceBlockToSave = Object.assign({'parent':groupKey}, le);
       const learningExperienceBlockToSaveKey = this.sdkDb.child('learningExperienceBlock').push().key;       
       let dataToSave = {};
       dataToSave["learningExperienceBlock/" + learningExperienceBlockToSaveKey] = learningExperienceBlockToSave;
       dataToSave["learningExperienceBlockForGroup/" + groupKey + "/" + learningExperienceBlockToSaveKey] = true

       return this.firebaseUpdate(dataToSave);

    }

    createNewLearningExperienceGroup(le:any): Observable<any> {

       const learningExperienceGroupToSave = Object.assign({}, le);
       const learningExperienceGroupToSaveKey = this.sdkDb.child('learningExperienceGroup').push().key;
       let dataToSave = {};
       dataToSave['learningExperienceGroup/' + learningExperienceGroupToSaveKey] = learningExperienceGroupToSave;

       return this.firebaseUpdate(dataToSave);
    }

    editGroup(groupKey: string, le:any): Observable<any> {
       const form = Object.assign({}, le);      
       let dataToSave = {};
       dataToSave["learningExperienceGroup/" + groupKey] = form;
       return this.firebaseUpdate(dataToSave);
    }

   editBlock(blockKey: string, le:any): Observable<any> {
       const form = Object.assign({}, le);      
       let dataToSave = {};
       dataToSave["learningExperienceBlock/" + blockKey] = form;
       return this.firebaseUpdate(dataToSave);
   }

   removeGroup(groupKey): Observable<any> {
       let dataToSave = {};
       dataToSave[`learningExperienceGroup/${groupKey}`] = null
       return this.firebaseUpdate(dataToSave)
   }
   removeBlock(groupKey, key): Observable<any> {
       let dataToSave = {};
       dataToSave[`learningExperienceBlock/${key}`] = null
       dataToSave[`learningExperienceBlockForGroup/${groupKey}/${key}`] = null
       return this.firebaseUpdate(dataToSave)
   }

   lockGroup(key:string){
       let dataToSave = {};
       dataToSave[`learningExperienceGroup/${key}/locked`] = true
       return this.firebaseUpdate(dataToSave)
   }

   lockBlock(blockKey:string){
           let dataToSave = {};
           dataToSave[`learningExperienceBlock/${blockKey}/locked`] = true
           return this.firebaseUpdate(dataToSave)
   }

   archiveGroup(groupKey): Observable<any> {
       let dataToSave = {};
       dataToSave[`learningExperienceGroup/${groupKey}/archived`] = true
       return this.firebaseUpdate(dataToSave)
   }

   unarchiveGroup(groupKey): Observable<any> {
       let dataToSave = {};
       dataToSave[`learningExperienceGroup/${groupKey}/archived`] = false
       return this.firebaseUpdate(dataToSave)
   }

   archiveBlock(blockKey): Observable<any> {
       let dataToSave = {};
       dataToSave[`learningExperienceBlock/${blockKey}/archived`] = true
       return this.firebaseUpdate(dataToSave)
   }

   unarchiveBlock(blockKey): Observable<any> {
       let dataToSave = {};
       dataToSave[`learningExperienceBlock/${blockKey}/archived`] = false
       return this.firebaseUpdate(dataToSave)
   }
    

    //////////////////////////////// JOINS ////////////////////////////

    // Blocks for Groups //

    findBlockKeysForGroups(blockKeys$: Observable<any[]>) : Observable<any> {
        return blockKeys$
            .map(bpg => bpg.map(blockKey => this.db.object('learningExperienceBlock/' + blockKey.$key)))
            .flatMap(fbojs => Observable.combineLatest(fbojs))

    }

    findBlocksForGroup(groupKey:string): Observable<any> {
        return this.findBlockKeysForGroups(this.db.list(`learningExperienceBlockForGroup/${groupKey}`))
            .map(LearningAssessmentBlockModel.fromJsonList)
    }

    findBlockObjectForGroup(groupKey:string): Observable<any> {
        return this.findBlockKeysForGroups(this.db.list(`learningExperienceBlockForGroup/${groupKey}`))
            .map(LearningAssessmentBlockModel.ObjectwithChildren)
    }

    // Pieces for Blocks //

    findPieceKeysForBlock(pieceKeys$: Observable<any[]>) : Observable<any> {
        return pieceKeys$
            .map(ppb => ppb.map(pieceKey => this.db.object('learningExperiencePiece/' + pieceKey.$key)))
            .flatMap(fbojs => Observable.combineLatest(fbojs))

    }


    findPiecesForBlocks(blockKey:string): Observable<any> {
        return this.findPieceKeysForBlock(this.db.list(`learningExperiencePieceForBlock/${blockKey}`))
            .map(LearningAssessmentPieceModel.fromJsonList)

    }

    findStudentKeysForObservable(studentkeys$: Observable<any[]>) :Observable<any> {
        return studentkeys$
            .map(splp => splp.map(students => this.db.object('students/' + students.$key)))
            .flatMap(fbojs => Observable.combineLatest(fbojs))
    }

    findStudentsForLP(lpKey:string): Observable<any> {
        return this.findStudentKeysForObservable(this.db.list(`studentsForLearningPiece/${lpKey}`))
            .map(StudentModel.fromJsonList)
    }

    findPiecesForPieceKeys(pieceKeys$: Observable<any[]>): Observable<any> {
        return pieceKeys$
          .map(ppb => ppb.map(pieceKey => this.db.object('learningExperiencePiece/' + pieceKey)))
          .flatMap(next => Observable.combineLatest(next))
    }

    findStudentsForPieceKeys(pieceKeys$: Observable<any[]>): Observable<any> {
      return pieceKeys$
        .map(arrayofpieceKeys => arrayofpieceKeys.map(pieceKey => this.db.list(`studentsForLearningPiece/${pieceKey.$key}`))) 
        .flatMap(next => Observable.combineLatest(next))
    }

    findStudentsForPiecesForBlock(blockKey: string): Observable<any> {
        return this.findStudentsForPieceKeys(this.db.list(`learningExperiencePieceForBlock/${blockKey}`))
    }

 


    ///////////// Long Joins ////////////

    findLPForLBKeys(lpKey$: Observable<any[]> ): Observable<any> {
        return lpKey$.map(x=> x.map(next => this.db.list(`learningExperiencePieceForBlock/${next.$key}`)))
                           .flatMap(next => Observable.combineLatest(next))
                           .map(arrayofobjects => {
                               let result = []
                               let a = [].concat.apply([], arrayofobjects)
                               a.forEach(value => {
                                   if (!result.includes(value.$key)) {
                                           result.push(value.$key)
                                        }
                                   
                               })
                               return result
                               })
    }

    findLPiecesForLG(groupKey: string) : Observable<any> {
       return this.findPiecesForPieceKeys(
              this.findLPForLBKeys(
              this.db.list(`learningExperienceBlockForGroup/${groupKey}`)))
         .map(LearningAssessmentPieceModel.fromJsonList)
    }

    // Update // 

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

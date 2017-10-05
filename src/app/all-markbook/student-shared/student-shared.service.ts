import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { 
    StudentModel,
    StudentGroupModel} from './data-classes'

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';

import { environment } from '../../../environments/environment';

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

    findStudentKeysForObservable(studentkeys$: Observable<any[]>) :Observable<any> {
        return studentkeys$
            .map(splp => splp.map(students => this.db.object('students/' + students.$key)))
            .flatMap(fbojs => Observable.combineLatest(fbojs))
    }

    findStudentsForLP(lpKey:string): Observable<any> {
        return this.findStudentKeysForObservable(this.db.list(`studentsForLearningPiece/${lpKey}`))
            .map(StudentModel.fromJsonList)
    }


    findStudentsForCohort(lpKey:string): Observable<any> {
        return this.findStudentKeysForObservable(this.db.list(`studentsForCohort/${lpKey}`))
            .map(StudentModel.fromJsonList)
    }

    findStudentsFromStudentKeys(studentKeys$: Observable<any[]> ) : Observable<any> {
        return studentKeys$
            .map(studentkeys => studentkeys.map(key => this.db.object('students/' + key)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs))
    }

    findCohortStudentsFromStudentKeys(studentKeys: Array<any> ): Observable<StudentModel[]> {
        let studentKeys$: Observable<any> = Observable.of(studentKeys)
          return studentKeys$
                    .map(keys => keys.map(key => (this.db.object('students/' + key.$key))))
                    .flatMap(fbojs => Observable.combineLatest(fbojs))
                    .map(StudentModel.fromJsonList)
    }

    findLPForLB(lpKey$: Observable<any[]> ): Observable<any> {
        return lpKey$.map(x=> x.map(next => this.db.list(`studentsForLearningPiece/${next.$key}`)))
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

    findLPForLBKeys(lpKey$: Observable<any[]> ): Observable<any> {
        return lpKey$.map(x=> x.map(next => this.db.list(`studentsForLearningPiece/${next}`)))
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


    FindLBForLG(lgKeys$: Observable<any[]>): Observable<any> {
        return lgKeys$.map(x=> x.map(next => this.db.list(`learningExperiencePieceForBlock/${next.$key}`)))
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

    findStudentsForLB(lbKey:string) : Observable<any> {
        return this.findStudentsFromStudentKeys(this.findLPForLB(this.db.list(`learningExperiencePieceForBlock/${lbKey}`)))
            .map(StudentModel.fromJsonList)
    }

    findStudentsForLG(lgKey:string) : Observable<any> {
        // Returns a list of LG keys
        return this.findStudentsFromStudentKeys(this.findLPForLBKeys(this.FindLBForLG(this.db.list(`learningExperienceBlockForGroup/${lgKey}`))))
            .map(StudentModel.fromJsonList)
    }

}
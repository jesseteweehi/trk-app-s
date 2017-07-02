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

    findStudentKeysForObservable(studentkeys$: Observable<any[]>) :Observable<any> {
        return studentkeys$
            .map(splp => splp.map(students => this.db.object('students/' + students.$key)))
            .flatMap(fbojs => Observable.combineLatest(fbojs))
  
    }

    findStudentsForLP(lpKey:string): Observable<any> {
        return this.findStudentKeysForObservable(this.db.list(`studentsForLearningPiece/${lpKey}`))
            .map(StudentModel.fromJsonList)
    }


    findStudentsFromStudentKeys(studentKeys$: Observable<any[]> ) : Observable<any> {
        return studentKeys$
            .map(studentkeys => studentkeys.map(key => this.db.object('students/' + key)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs))
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

	findAllStudents():Observable<StudentModel[]> {
        return this.db.list('students')
            .map(StudentModel.fromJsonList)

    }

    findAllStudentGroups(): Observable<StudentGroupModel[]> {
        return this.db.list('groups')
            .map(StudentGroupModel.fromJsonList);

    }

    findStudentGroup(groupKey:string): Observable<StudentGroupModel> {
        return this.db.object('groups/' + groupKey)
            .map(StudentGroupModel.fromJson)
    }


    findStudentKeysForGroup(studentkeys$: Observable<any[]>) :Observable<any> {
        return studentkeys$
                .map(spg => spg.map(student => this.db.object('students/' + student.$key)) )
                .flatMap(fbojs => Observable.combineLatest(fbojs))
    }

    findStudentsForGroup(studentkey:string): Observable<any> {
        return this.findStudentKeysForObservable(this.db.list(`studentsForGroup/${studentkey}`))
            .map(StudentModel.fromJsonList)
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

    putStudentsInGroup(groupKey: string, students: StudentModel[]): Observable<any> {
        let dataToSave = {}
        students.forEach(student => {
            dataToSave["studentsForGroup/" + groupKey + "/" + student.$key] = true
        })

        return this.firebaseUpdate(dataToSave)
    }

    
    createSubjectForGroup( groupkey:string, subjectkey:string): Observable<any>{
        let dataToSave = {};

        dataToSave[`subjectsforsubjectgroups/${groupkey}/${subjectkey}`] = true

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

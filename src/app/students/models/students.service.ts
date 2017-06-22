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

    // findSubjectGroupKeysForStudentKeys(subjectgroupkeys$: Observable<any[]>) :Observable<any> {
    //     return subjectgroupkeys$
    //         .map(sgps => sgps.map(subjectgroupkey => this.db.object('subjectgroups/' + subjectgroupkey.$key)) )
    //         .flatMap(fbojs => Observable.combineLatest(fbojs))
    // }

    // findSubjectGroupForStudent(studentkey:string) :Observable<any> {
    //     return this.findSubjectGroupKeysForStudentKeys(this.db.list(`subjectgroupsforstudent/${studentkey}`))
    //         .map(SubjectGroupModel.fromJsonList)

    // }




    findStudentKeysForGroup(studentkeys$: Observable<any[]>) :Observable<any> {
        return studentkeys$
                .map(spg => spg.map(student => this.db.object('students/' + student.$key)) )
                .flatMap(fbojs => Observable.combineLatest(fbojs))
    }

    findStudentsForGroup(studentkey:string): Observable<any> {
        return this.findStudentKeysForGroup(this.db.list(`studentsForGroup/${studentkey}`))
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

import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { PostModel } from '../models/data-classes'

import { StudentModel } from '../../student-shared/data-classes';

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';

import { environment } from '../../../environments/environment';

import * as firebase from 'firebase'



@Injectable()
export class PostsService {

    sdkDb:any;

    constructor(
        @Inject(FirebaseApp) public fb : firebase.app.App,
        private db: AngularFireDatabase) {

    	this.sdkDb = this.fb.database().ref();	
    }

    //////// Posts ///////////
    findPostsForBlock(blockKey: string): Observable<PostModel[]> {
        return this.db.list(`posts/${blockKey}`)

    }

    createPostsForBlock(blockKey:string, form:any): Observable<any> {
        const postToSave = Object.assign({}, form);
        const postToSaveKey = this.sdkDb.child('resource').push().key;
        let dataToSave = {};
        dataToSave[`posts/${blockKey}/${postToSaveKey}`] = postToSave;

        return this.firebaseUpdate(dataToSave)
    }

    editPostsForBlock(blockKey:string, postKey: string, form:any){
        const postToSave = Object.assign({}, form);
        let dataToSave = {};
        dataToSave[`posts/${blockKey}/${postKey}`] = postToSave;

        return this.firebaseUpdate(dataToSave)
    }

    removePostsForBlock(blockKey:string, postKey: string){
        let dataToSave = {};
        dataToSave[`posts/${blockKey}/${postKey}`] = null;

        return this.firebaseUpdate(dataToSave)
    }

    findPostsForStudent(studentKey:string): Observable<PostModel[]> {
        return this.db.list(`posts/${studentKey}/student`)
    }

    findPostsForStudentForBlock(studentKey: string, blockKey: string): Observable<PostModel[]> {
        return this.db.list(`posts/${studentKey}/${blockKey}`)
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

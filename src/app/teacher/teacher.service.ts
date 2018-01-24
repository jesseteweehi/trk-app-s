import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/subject';

@Injectable()
export class TeacherService {

constructor(
    private db: AngularFireDatabase) {}

    findList(path: string): Observable<any[]> {
        return this.db.list(path);
    }

    findObject(path: string, key: string): Observable<any> {
        return this.db.object(path);
    }

    changeObject(path: string,  data?: any): Promise<any> {
        const dataToSave = {};
        if (data) {
            const itemToSave = Object.assign({}, data);
            dataToSave[path] = itemToSave;
        } else {
            dataToSave[path] = null;
        }
        return this.fireBaseUpdate(dataToSave);
    }

    createLearningGroup(data: any): Promise<any> {
        const itemToSave = Object.assign({}, data);
        const itemRefKey = this.db.list('/learningGroup').push(data).key;
        const dataToSave = {};
        dataToSave[`learningGroup/${itemRefKey}`] = itemToSave;

        return this.fireBaseUpdate(dataToSave);
    }

    createLearningArea(data: any): Promise<any> {
        const itemToSave = Object.assign({}, data);
        const itemRefKey = this.db.list('/learningArea').push(data).key;
        const dataToSave = {};
        dataToSave[`learningArea/${itemRefKey}`] = itemToSave;

        return this.fireBaseUpdate(dataToSave);
    }

    fireBaseUpdate(dataToSave) {
        return this.db.object('/').update(dataToSave);
    }
}

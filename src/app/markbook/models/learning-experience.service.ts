import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { LearningAssessmentParameterModel } from '../models/data-classes'

import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';

import { environment } from '../../../environments/environment';

import * as firebase from 'firebase'



@Injectable()
export class LearningExperienceService {

  sdkDb:any;

  constructor(@Inject(FirebaseApp) public fb : firebase.app.App ) {

  	this.sdkDb = this.fb.database().ref();	
  }

  createNewLearningExperiencePiece(le:any): Observable<any> {

  	  console.log(le)

      const learningExperiencePieceToSave = Object.assign({}, le);

      const learningExperiencePieceToSaveKey = this.sdkDb.child('learningExperiencePiece').push().key;

      let dataToSave = {};

      dataToSave["learningExperiencePiece/" + learningExperiencePieceToSaveKey] = learningExperiencePieceToSave;

      console.log(dataToSave)
   
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

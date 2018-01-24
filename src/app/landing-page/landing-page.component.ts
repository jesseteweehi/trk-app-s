import { Component, OnInit, Inject } from '@angular/core';
// import { Students }  from '../mock-data/students';
// import { AngularFireDatabase} from 'angularfire2/database';
// import { FirebaseApp } from 'angularfire2';
// import * as firebase from 'firebase' 

import { Router } from '@angular/router'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  // user: UserModel

  constructor(){
  }
	// students: any
	// sdkDb: any;
 //  constructor(
 //      @Inject(FirebaseApp) public fb : firebase.app.App,
 //      private db: AngularFireDatabase,
 //      ) {

 //  	this.students = Students
 //  	this.sdkDb = this.fb.database().ref();	
 //  }

  ngOnInit() {
  }


  // createStudents() {
  // 	this.students.forEach(student => {
  // 		const data = this.db.list('/students')
  // 		data.push({
  // 			'firstName': student.firstName,
  // 			'lastName' : student.lastName,
  // 			'yrlvl' : student.yrlvl,
  // 			'ethnicMain' : student.ethnicMain,
  // 			'gender' : student.gender,
  // 			'id' : student.id,
  // 			'email' : `${student.id}@fraser.school.nz`,
  // 		}).then(stuff => {
  // 			console.log(stuff)
  // 		})

  // 	})
  // }

}

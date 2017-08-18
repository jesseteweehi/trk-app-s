import { Component, Inject } from '@angular/core';
import { students }  from './mock-data/students';
import { FirebaseApp } from 'angularfire2';

import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sdkDb:any;

  constructor(
      @Inject(FirebaseApp) private fb : firebase.app.App)
  {  
    this.sdkDb = this.fb.database().ref();  
  }


  navLinks = [
  {
  	link: 'assessment',
  	label: 'Assessment'
  },
  // {
  // 	link: 'students',
  // 	label: 'Students'
  // },
  {
    link: 'individual',
    label: 'Students'
  },
  {
    link: 'cohorts',
    label: 'Cohorts'
  },
  {
    link: 'overview',
    label: 'Overview'
  }

  ]

    students(){
    students.forEach( student => {
      console.log('adding student')

      this.sdkDb.child('students').push({
        id:student.id,
        firstName:student.firstName,
        lastName:student.lastName,
        gender:student.gender,
        yrlvl:student.yrlvl,
        ethnicMain:student.ethnicMain
      })
    })
  }

}

// <a routerLink="assessment">Assessment</a>
// <a routerLink="individual">Individual Student</a>
// <a routerLink="students">Students</a>

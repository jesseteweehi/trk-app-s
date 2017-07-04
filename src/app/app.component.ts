import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navLinks = [
  {
  	link: 'assessment',
  	label: 'Assessment'
  },
  {
  	link: 'students',
  	label: 'Students'
  }
  	

  ]
}

// <a routerLink="assessment">Assessment</a>
// <a routerLink="individual">Individual Student</a>
// <a routerLink="students">Students</a>

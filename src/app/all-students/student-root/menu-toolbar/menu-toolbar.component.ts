import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-student-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.css']
})
export class MenuToolbarStudentComponent {

    linksArray: Array<object> = [
                {
                  link: 'all',
                  label: 'All Students'
                },
                {
                  link: 'groups',
                  label: 'Cohorts'
                }
                ] 
}

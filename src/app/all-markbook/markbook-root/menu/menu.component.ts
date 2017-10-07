import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-markbook-toolbar',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuToolbarMarkbookComponent {

    linksArray: Array<object> = [
                  {
                    link: 'assessment',
                    label: 'Assessment'
                  },
                  {
                    link: 'cohorts',
                    label: 'Cohorts'
                  }
                  ] 
}



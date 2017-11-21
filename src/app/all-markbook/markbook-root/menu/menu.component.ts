import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../shared-security/authentication.service'
import { UserModel } from '../../../users/models/data-classes'
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-menu-markbook-toolbar',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuToolbarMarkbookComponent implements OnInit {

  user: UserModel

  constructor(private as: AuthenticationService) {}

  ngOnInit() {
    this.as.user.subscribe(user => this.user = user)
  }

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



import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { UserModel} from '../users/models/data-classes'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnChanges{

  @Input() user : UserModel;

  linksArray: Array<object>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.user) 
  	 {this.links()}
  }


    links() { 
      console.log('in')
      if(this.user.role.student === true){
        this.linksArray = [
          {
            link: 'profile/' + this.user.$key,
            label: 'Me'
          },
          {
            link: 'individual/' + this.user.$key,
            label: 'My Learning'
          }
          ]
        }
      else if (this.user.role.teacher === true && !this.user.role.admin){
              this.linksArray = [
                {
                  link: 'individual',
                  label: 'Students'
                },
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
      else if ((this.user.role.admin === true && this.user.role.teacher === true) || (this.user.role.admin === true && !this.user.role.teacher)){
              this.linksArray = [
                {
                  link: 'individual',
                  label: 'Students'
                },
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
      else {
        this.linksArray = [
          ]
        }
      }
  
  }



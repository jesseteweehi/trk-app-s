import { Component, Input, OnChanges  } from '@angular/core';
import { Router } from '@angular/router';

import { LearningAssessmentPieceModel,
		 LearningAssessmentBlockModel,
		 LearningAssessmentGroupModel } from '../../markbook/models/data-classes'

@Component({
  selector: 'app-overview-lists',
  template:
  `
  <md-input-container>
    <input class="full-width" mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>

  <md-list>
    <md-list-item *ngFor="let group of filtered">
    {{group.title}} {{group.description}}
    <button class="right" md-icon-button md-dialog-close (click)="chooseGroup(group)"><md-icon>add</md-icon></button> 
    </md-list-item>
  </md-list>
  `,
  styles: [`
  .full-width {
    width: 100%;
  }
  
  md-list-item:not(:last-child) {
      border-bottom: solid 1px lightgrey
  }

  md-list-item p {
    padding-left: 20px;
    color: lightgrey;
  }

  .right {
    margin-left: auto
  }
  `]
})
export class OverviewListsComponent implements OnChanges{
  @Input() allGroups: LearningAssessmentGroupModel[];

  filtered: LearningAssessmentGroupModel[];

  constructor(private router: Router) { }

  ngOnChanges() {
  	this.filtered = this.allGroups
  }

  chooseGroup(group) {
    this.router.navigateByUrl(`/overview/${group.$key}`)
  }

  search(search:string) {
    this.filtered = this.allGroups.filter(group => group.title.toLowerCase().includes(search) );
    }
}

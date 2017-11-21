import { Component, Inject, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdDialogConfig, MdSnackBar } from '@angular/material';

import { StudentModel } from '../../student-shared/data-classes';
import { LearningAssessmentGroupModel } from '../../all-markbook/markbook/models/data-classes'
import { CohortModel } from '../../all-students/cohorts/models/data-classes'

@Component({
  selector: 'app-cohort-add-list',
  template: `
 

  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>



  <md-list>
    <md-list-item *ngFor="let item of filtered">
    {{item.title}} <p>{{item.description}}</p>
    <button class="right" md-icon-button (click)="addToList(item)"><md-icon>add</md-icon></button>
    </md-list-item>
  </md-list>

  <br>

  <md-chip-list>
    <md-chip *ngFor="let item of itemList">{{item.title}}
    <button class="right" md-icon-button (click)="removeItemFromList(item)"><md-icon>close</md-icon></button>
    </md-chip>
  </md-chip-list>

   <br>

  <button md-button md-dialog-close color="primary" *ngIf="itemList.length > 0" (click)="sendItemList()">Add Cohorts</button>



  `,
  styles: [`
    .right {
      margin-left: auto
    }

    md-list {
      height: 60%;
      overflow: scroll;
    }
    
    md-list-item:not(:last-child) {
        border-bottom: solid 1px lightgrey
    }

    md-list-item p {
      padding-left: 20px;
      color: lightgrey;
    }
  `]
})

export class CohortListAddComponent {
  itemList: CohortModel[] = []
  @Output() itemsToAdd = new EventEmitter(); 
  @Input() allItems: CohortModel[];

  filtered: CohortModel[];

  constructor(
      public snackBar: MdSnackBar ) {}

  ngOnChanges() {
    this.filtered = this.allItems
  }

  addToList(item) {
    if (!this.itemList.includes(item)) {
      this.itemList.push(item)
    }    
  }

  removeItemFromList(item) {
    const index = this.itemList.indexOf(item); 
    if (index > -1) {
      this.itemList.splice(index, 1);
    }  
  }

  sendItemList() {
    this.itemsToAdd.emit(this.itemList)
  }

  search(search:string) {
    this.filtered = this.allItems.filter(item => item.title.toLowerCase().includes(search) );
    }
}


@Component({
  selector: 'app-learningGroup-add-list',
  template: `
 

  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>



  <md-list>
    <md-list-item *ngFor="let item of filtered">
         {{item.title}} <p>{{item.description}}</p>
    <button class="right" md-icon-button (click)="addToList(item)"><md-icon>add</md-icon></button>
    </md-list-item>
  </md-list>

  <br>

  <md-chip-list>
    <md-chip *ngFor="let item of itemList">{{item.title}}
    <button class="right" md-icon-button (click)="removeItemFromList(item)"><md-icon>close</md-icon></button>
    </md-chip>
  </md-chip-list>

   <br>

  <button md-button md-dialog-close color="primary" *ngIf="itemList.length > 0" (click)="sendItemList()">Add Assessment</button>



  `,
  styles: [`
    .right {
      margin-left: auto
    }

    md-list {
      height: 60%;
      overflow: scroll;
    }
    
    md-list-item:not(:last-child) {
        border-bottom: solid 1px lightgrey
    }

    md-list-item p {
      padding-left: 20px;
      color: lightgrey;
    }
  `]
})

export class LearningGroupListAddComponent {
  itemList: LearningAssessmentGroupModel[] = []
  @Output() itemsToAdd = new EventEmitter(); 
  @Input() allItems: LearningAssessmentGroupModel[];

  filtered: LearningAssessmentGroupModel[];

  constructor(
      public snackBar: MdSnackBar ) {}

  ngOnChanges() {
    this.filtered = this.allItems
  }

  addToList(item) {
    if (!this.itemList.includes(item)) {
      this.itemList.push(item)
    }    
  }

  removeItemFromList(item) {
    const index = this.itemList.indexOf(item); 
    if (index > -1) {
      this.itemList.splice(index, 1);
    }  
  }

  sendItemList() {
    this.itemsToAdd.emit(this.itemList)
  }

  search(search:string) {
    this.filtered = this.allItems.filter(item => item.title.toLowerCase().includes(search) );
    }
}
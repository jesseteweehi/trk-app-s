import { Component, Input, Output, EventEmitter, OnInit, AfterContentChecked } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { HeaderModel } from '../models/data-classes';


@Component({
    selector: 'app-learning-experience-block-template-form',
    template: 
    `
    <form [formGroup]="form">

    <md-input-container>
        <input (keyup)="saveTemplate()" formControlName="columns" mdInput type="number" placeholder="Columns">
    </md-input-container>
    `,
  styles:[]
})

export class LearningExperienceBlockTemplateFormComponent implements OnInit {
    form: FormGroup;
    blockId: string;
    @Output() formSend: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder
        ) {

        this.form = this.fb.group({
            columns: ['']
        })
    }

    ngOnInit() {
        this.blockId = this.route.snapshot.params['blockid']
    }

    /// Creates an error to check
    // ngAfterContentChecked() {
    //     this.saveTemplate()
    // }

    saveTemplate() {
        this.formSend.emit(this.form.value)
    }


}


@Component({
    selector: 'app-block-header-form',
    template: 
    `
    <form [formGroup]="form">
    <md-card-header *ngIf="showForm!==key" (click)="unhide(key)">{{template.title}}</md-card-header>

        <md-card-header *ngIf="showForm===key">
            <md-input-container class="formwidth">  
                <input formControlName="title" mdInput value="{{template.title}}" (keyup.enter)="saveForm(form)">
            </md-input-container>
        <md-card-header>

    <md-card-content *ngIf="showForm!==key" (click)="unhide(key)">{{template.description}}</md-card-content>
            
        <md-card-content> *ngIf="showform===key">
            <md-input-container class="formwidth">      
                  <textarea formControlName="description" mdInput (keyup.enter)="saveForm(form)">{{template.description}}</textarea>
            </md-input-container>
        </md-card-content>
    </md-card-header>
    <form>
    `,
  styles:[
  `
  .formwidth {
      min-width: 200px;
      width: 400px;
  }
  `
   ]
})

export class BlockTemplateFormComponent implements OnInit {
    form: FormGroup

    showForm: string = ''
  
    @Input() template: string;

    @Output() formSend: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    constructor(
        private fb: FormBuilder,
        ) {

        this.form = this.fb.group({
            title: ['template'],
            description: ['']

        })
    }

    ngOnInit() {
    }

    unhide(s:string) {
      this.showForm = s
    }

    saveForm() {
        this.formSend.emit(this.form.value)
        this.showForm = ''
    }


}

@Component({
    selector: 'app-block-header-list-form',
    template: 
    `
    <md-list>
        <md-list-item dense *ngFor="let record of recordslist"> 
                   
            <h5 *ngIf="showtitle!==record.$key" (click)="unhide(record.$key)"><span mdTooltipPosition="right" mdTooltip="{{record.description }}">{{record.title }}</span></h5> 
      
            <form [formGroup]="form" *ngIf="showtitle===record.$key">
                <md-input-container class="formwidth">
                      <input formControlName="title" mdInput value="{{record.title}}" (keyup.enter)="saveForm(form)">
                </md-input-container>

                <md-input-container class="formwidth">
                      <textarea formControlName="description" mdInput (keyup.enter)="saveForm(form)">{{record.description}}</textarea>
                </md-input-container>
            </form>
         
            <button class="right" md-icon-button><md-icon>delete</md-icon></button> 
            
            <button md-icon-button><md-icon>file_upload</md-icon></button>
            
            <button md-icon-button><md-icon>save</md-icon></button>
            
            <span class="modified"><h5> Will put in date here </h5> </span>
        </md-list-item>
    </md-list>
    `,
  styles:[
    `
    .formwidth {
      min-width: 200px;
      width: 400px;
    }

    md-icon {
      color: grey;
    }

    .editor {
      min-height: 500px;
    }

    .md-list-icon {
      margin-right: 20px;
    }

    .modified {
      margin-left: 10px
    }

    .right {
      margin-left: auto
    }

    h5, md-input-container {
      margin-left: 0px
    }

    md-list-item:not(:last-child) {
      border-bottom: solid 1px lightgrey
    }
    `
    ]})

export class BlockTemplateListFormComponent implements OnInit {   
    form: FormGroup

    recordslist: Array<object> = [
        {
            '$key': 1,
            'title': 'No 1',
            'description': 'No1 Description which is extremely long probably about two sentences well eventually anyway does this may an enormous problem for the tool tip?'
        },
        {
            '$key': 2,
            'title': 'No 2',
            'description': 'No2 Description'
        }

    ]
    constructor(
        private fb: FormBuilder,
        ) {

        this.form = this.fb.group({
            title: ['template'],
            description: ['']

        })
    }

    ngOnInit() {
    }
}



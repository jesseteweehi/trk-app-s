import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { LearningExperienceService } from '../models/learning-experience.service';


@Component({
    selector: 'app-learning-experience-block-template-form',
    template: 
    `
    {{blockId}}
    <form [formGroup]="form">

    <md-input-container>
        <input formControlName="columns" mdInput type="number" placeholder="Columns">
    </md-input-container>

    <br>

    <md-input-container>
        <input formControlName="header" mdInput type="number" placeholder="Header">
    </md-input-container>

    </form>

    <button md-button (click)="saveTemplate()">Save Form</button>

    `,
  styles:[]
})

export class LearningExperienceBlockTemplateFormComponent implements OnInit {
    form: FormGroup;
    blockId: string;
    @Output() formSend: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private ls: LearningExperienceService
        ) {

        this.form = this.fb.group({
            columns: [''],
            header: ['']

        })
    }

    ngOnInit() {
        this.blockId = this.route.snapshot.params['blockid']
    }

    saveTemplate() {
        this.formSend.emit(this.form.value)
    }


}


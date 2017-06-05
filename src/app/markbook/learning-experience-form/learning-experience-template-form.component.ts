import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { LearningExperienceService } from '../models/learning-experience.service';


@Component({
    selector: 'app-learning-experience-block-template-form',
    template: 
    `
    {{ blockId }}
    <form [formGroup]="form">

    <md-input-container>
        <input (keyup)="saveTemplate(form)" formControlName="columns" mdInput type="number">
    </md-input-container>

    </form>
    `,
  styles:[]
})

export class LearningExperienceBlockTemplateFormComponent implements OnInit {
    form: FormGroup;
    blockId: string;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private ls: LearningExperienceService
        ) {

        this.form = this.fb.group({
            columns: ['']
        })
    }

    ngOnInit() {
        this.blockId = this.route.snapshot.params['blockid']
    }

    saveTemplate(form) {
        console.log(form.value)
        this.ls.saveTemplate(this.blockId, form.value)
        // .subscribe(
        //         () => {
        //             this.snackBar.open('Template Saved','Awesome',{ duration:2000 })
        //         },
        //         err => { 
        //             this.snackBar.open('Error Saving Lesson Group ${err}','Bugger',{ duration:2000 })
        //         }
        //     );
    }


}


import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-learning-experience-piece-form',
  template: 
  `
  <h1 md-dialog-title>Create Assessment Parameter</h1>
  <div md-dialog-content>

    <form novalidate [formGroup]="form">

        <md-input-container class="example-full-width">
           <input placeholder="Subject Code" type="text" mdInput formControlName="title">
        </md-input-container>

            <md-input-container class="example-full-width">
               <textarea mdInput placeholder="Subject Description" formControlName="description"></textarea> 
            </md-input-container>
    
    </form>  
  </div>
  <div md-dialog-actions>
       <button md-button (click)="dialogRef.close(form)">Create</button>

  </div>
  `,
  styles:[]
})

export class LearningExperienceFormPieceComponent  {

	form: FormGroup;

  	constructor(public dialogRef: MdDialogRef<LearningExperienceFormPieceComponent>,
  				private fb: FormBuilder,
  				) {

  		this.form = this.fb.group({
  		    title: [''],
  		    description: ['']
  			});
  	}
}

@Component({
  selector: 'app-learning-experience-block-form',
  template: 
  `
  <h1 md-dialog-title>Create Assessment Block </h1>
  <div md-dialog-content>

    <form novalidate [formGroup]="form">

        <md-input-container class="example-full-width">
           <input placeholder="Subject Code" type="text" mdInput formControlName="title">
        </md-input-container>

            <md-input-container class="example-full-width">
               <textarea mdInput placeholder="Subject Description" formControlName="description"></textarea> 
            </md-input-container>
    
    </form>  
  </div>
  <div md-dialog-actions>
       <button md-button (click)="dialogRef.close(form)">Create</button>

  </div>
  `,
  styles:[]
})
export class LearningExperienceFormBlockComponent  {

  form: FormGroup;

    constructor(public dialogRef: MdDialogRef<LearningExperienceFormBlockComponent>,
          private fb: FormBuilder,
          ) {

      this.form = this.fb.group({
          title: [''],
          description: ['']
        });
    }
}

@Component({
  selector: 'app-learning-experience-group-form',
  template: 
  `
  <h1 md-dialog-title>Create Assessment Group </h1>
  <div md-dialog-content>

    <form novalidate [formGroup]="form">

        <md-input-container class="example-full-width">
           <input placeholder="Group Title" type="text" mdInput formControlName="title">
        </md-input-container>

        <md-input-container class="example-full-width">
           <textarea mdInput placeholder="Group Description" formControlName="description"></textarea> 
        </md-input-container>

        <md-input-container class="example-full-width">
           <input placeholder="Learning Area" type="text" mdInput formControlName="learningArea">
        </md-input-container>

        <md-input-container class="example-full-width">
           <input placeholder="Learning level" type="text" mdInput formControlName="learningLevel">
        </md-input-container>
    
    </form>  
  </div>
  <div md-dialog-actions>
       <button md-raised-button color="primary" (click)="dialogRef.close(form)">Create</button>

  </div>
  `,
  styles:[]
})
export class LearningExperienceFormGroupComponent  {

  form: FormGroup;

    constructor(public dialogRef: MdDialogRef<LearningExperienceFormGroupComponent>,
          private fb: FormBuilder,
          ) {

      this.form = this.fb.group({
          title: [''],
          description: [''],
          learningArea: [''],
          learningLevel: ['']

        });
    }
}



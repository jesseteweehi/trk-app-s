import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';


// Learning Experience Piece Common Form
@Component({
  selector: 'app-learning-experience-piece-form',
  template: 
  `
  <h1>{{heading}}</h1>

  <div [formGroup]="formGroup">

    <md-input-container class="example-full-width">
      <input placeholder="Subject Code" type="text" mdInput formControlName="title">
    </md-input-container>

    <md-input-container class="example-full-width">
      <textarea mdInput placeholder="Subject Description" formControlName="description"></textarea> 
    </md-input-container>
    
  </div>
  `
})

export class LearningExperienceFormPieceComponent {
  @Input() formGroup: FormGroup;
  @Input() heading: string;
}

//Learning Experience Piece Create Form
@Component({
  selector: 'app-learning-experience-piece-create',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-learning-experience-piece-form
    [formGroup]="form"
    [heading]="heading">
    </app-learning-experience-piece-form>
  </form>
  `
})

export class LearningExperienceCreatePieceComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  constructor(private fb:FormBuilder) {}

  heading: string = 'Create Learning Experience Piece'
 
  ngOnInit(){
    this.form = this.fb.group({
      title: '',
      description: ''
    });
  }


}

//Learning Experience Edit Form NEEED TO COMPLETE
@Component({
  selector: 'app-learning-experience-piece-edit',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-learning-experience-piece-form
    [formGroup]="form"
    [heading]="heading">
    </app-learning-experience-piece-form>
  </form>
  `
})

  export class LearningExperienceEditPieceComponent implements OnInit {
    // Type likely to be an LearningExperiencePieceModel may need changing
    @Input() currentPiece: any;

    form: FormGroup;
    constructor(private fb:FormBuilder) {}
 
  ngOnInit(){
    this.form = this.fb.group({
      title: '',
      description: ''
    });

    this.form.setValue(this.currentPiece);
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

@Component({
  selector: 'app-learning-experience-header-form',
  template: 
  `
  <h1 md-dialog-title>Create Assessment Group </h1>
  <div md-dialog-content>

    <form novalidate [formGroup]="form">

        <md-input-container class="example-full-width">
           <input placeholder="Header Title" type="text" mdInput formControlName="title">
        </md-input-container>

        <md-input-container class="example-full-width">
           <textarea mdInput placeholder="Header Description" formControlName="description"></textarea> 
        </md-input-container>

        <md-select placeholder="Axis" name="food" formControlName="header">
            <md-option *ngFor="let choice of headerChoice" [value]="choice.value">
              {{choice.viewValue}}
            </md-option>
        </md-select>

    </form>  
  </div>
  <div md-dialog-actions>
       <button md-raised-button color="primary" (click)="dialogRef.close(form)">Create</button>
  </div>
  `,
  styles:[]
})
export class LearningExperienceFormHeaderComponent  {

  form: FormGroup;

  headerChoice = [
    {value: 'x', viewValue: 'X'},
    {value: 'y', viewValue: 'Y'}
  ];

    constructor(public dialogRef: MdDialogRef<LearningExperienceFormHeaderComponent>,
          private fb: FormBuilder,
          ) {

      this.form = this.fb.group({
          title: [''],
          description: [''],
          header: ['']  
        });
    }
}



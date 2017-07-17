import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { LearningExperienceService } from '../models/learning-experience.service';
import { 
    LearningAssessmentPieceModel,
    } from '../models/data-classes'

// Learning Experience Piece Common Form
@Component({
  selector: 'app-learning-experience-piece-form',
  template: 
  `
  <h1>{{heading}}</h1>

  <div [formGroup]="formGroup">

    <md-input-container class="full-width">
      <input placeholder="Subject Code" type="text" mdInput formControlName="title">
    </md-input-container>

    <md-input-container class="full-width">
      <textarea mdInput placeholder="Subject Description" formControlName="description"></textarea> 
    </md-input-container>

    <md-select class="full-width" placeholder="Headers X Axis" formControlName="xheader">
        <md-option *ngFor="let choice of xheaders" [value]="choice.value">
          {{choice.viewValue}}
        </md-option>
    </md-select> 

    <br>
    <br>

    <md-select class="full-width" placeholder="Headers Y Axis" formControlName="yheader">
        <md-option *ngFor="let choice of yheaders" [value]="choice.value">
          {{choice.viewValue}}
        </md-option>
    </md-select>   
  </div>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})



export class LearningExperienceFormPieceComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() heading: string;
  @Input() blockId: string;

  xheaders: Array<object> = [];
  yheaders: Array<object> = [];

  constructor(private ls:LearningExperienceService){}

  // need block Id
  ngOnInit(){
    this.ls.findXHeadersForBlocks(this.blockId).subscribe(xheaders => {
       xheaders.forEach(each => {
         this.xheaders.push({value: each.title, viewValue: each.title})
       })
      });
    this.ls.findYHeadersForBlocks(this.blockId).subscribe(xheaders => {
       xheaders.forEach(each => {
         this.yheaders.push({value: each.title, viewValue: each.title})
       })
      });
  }

}

//Learning Experience Piece Create Form
@Component({
  selector: 'app-learning-experience-piece-create',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-learning-experience-piece-form
    [formGroup]="form"
    [heading]="heading"
    [blockId]="blockId">
    </app-learning-experience-piece-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `
})

export class LearningExperienceCreatePieceComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  @Input() blockId: string;
  form: FormGroup;
  constructor(private fb:FormBuilder) {}

  heading: string = 'Create Learning Experience Piece'
 
  ngOnInit(){
    this.form = this.fb.group({
      title: '',
      description: '',
      xheader:'',
      yheader:''
    });
  }

  save(form){
    this.formToSend.emit(form)
  }
}

@Component({
  selector: 'app-learning-experience-piece-edit',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-learning-experience-piece-form
    [formGroup]="form"
    [blockId]="blockId">
    </app-learning-experience-piece-form>
    <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `
})

  export class LearningExperienceEditPieceComponent implements OnInit {
    @Output() formToSend = new EventEmitter();
    @Input() key: string;
    @Input() blockId: string;

    currentFormValues: LearningAssessmentPieceModel;

    form: FormGroup;
    constructor(private fb:FormBuilder,
                private ls: LearningExperienceService) {}
 
    ngOnInit() {
      this.ls.findLearningPieceForKey(this.key).subscribe(
          result => this.currentFormValues = result
        )

    this.form = this.fb.group({
      title: '',
      description: '',
      xheader:'',
      yheader:''
      });

    this.form.setValue({
        title: this.currentFormValues.title,
        description: this.currentFormValues.description,
        xheader: this.currentFormValues.xheader,
        yheader: this.currentFormValues.yheader
      });
    }

    save(form){
      this.formToSend.emit(form)
    }

}

// Header Piece Common Form
@Component({
  selector: 'app-header-form',
  template: 
  `
  <h1>{{heading}}</h1>
  
  <div [formGroup]="formGroup">
    <md-input-container class="example-full-width">
       <input placeholder="Header Title" type="text" mdInput formControlName="title">
    </md-input-container>

    <md-input-container class="example-full-width">
       <textarea mdInput placeholder="Header Description" formControlName="description"></textarea> 
    </md-input-container>

    <md-select placeholder="Purpose" formControlName="purpose">
        <md-option *ngFor="let choice of headerFunction" [value]="choice.value">
          {{choice.viewValue}}
        </md-option>
    </md-select>
  
    <md-select placeholder="Axis" formControlName="header">
        <md-option *ngFor="let choice of headerAxis" [value]="choice.value">
          {{choice.viewValue}}
        </md-option>
    </md-select>    
    
    <p></p>
  </div>

  `
})

export class HeaderFormPieceComponent {
  @Input() formGroup: FormGroup;
  @Input() heading: string;

  headerAxis = [
    {value: 'y', viewValue: 'X'},
    {value: 'x', viewValue: 'Y'}
  ];

  headerFunction = [
    {value: 'descriptor' , viewValue: 'Descriptor' },
    {value: 'qualifier', viewValue: 'Qualifier'}
  ];
}

//Header Piece Create Form
@Component({
  selector: 'app-header-create',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-header-form
    [formGroup]="form"
    [heading]="heading">
    </app-header-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `
})

export class HeaderFormCreateComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  constructor(private fb:FormBuilder) {}

  heading: string = 'Create Header'
 
  ngOnInit(){
    this.form = this.fb.group({
        title: [''],
        description: [''],
        header: [''],
        purpose: ['']
      });
    }
  
  save(form){
    this.formToSend.emit(form)
  }
}

//Header Edit Form NEEED TO COMPLETE
@Component({
  selector: 'app-header-edit',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-header-form
    [formGroup]="form"
    [heading]="heading">
    </app-header-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `
})

  export class HeaderFormEditComponent implements OnInit {
    @Output() formToSend = new EventEmitter();
    @Input() blockId;
    @Input() key: string;
    @Input() axis: string;

    currentFormValues: any;

    form: FormGroup;
    constructor(private fb:FormBuilder,
                private ls: LearningExperienceService) {}
 
    ngOnInit() {
      this.ls.findHeaderUnderBlock(this.blockId,this.axis,this.key).subscribe(
          result => {
            this.currentFormValues = result
          }
        )    
      
      this.form = this.fb.group({
          title: [''],
          description: [''],
          header: [''],
          purpose: ['']   
        });

      this.form.setValue({
          title: this.currentFormValues.title,
          description: this.currentFormValues.description,
          header: this.currentFormValues.header,
          purpose: this.currentFormValues.purpose
        });
      }

    save(form){
      this.formToSend.emit(form)
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





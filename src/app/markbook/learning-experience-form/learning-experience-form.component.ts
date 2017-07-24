import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { LearningExperienceService } from '../models/learning-experience.service';
import { 
    LearningAssessmentPieceModel,
    LearningAreaModel,
    LearningLevelModel
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

// Block Common Form
@Component({
  selector: 'app-learning-block-form',
  template:
  `
  <h1>{{heading}}</h1>

    <div [formGroup]="formGroup">

      <md-input-container class="example-full-width">
        <input placeholder="Block Title" type="text" mdInput formControlName="title">
      </md-input-container>

      <md-input-container class="example-full-width">
        <textarea mdInput placeholder="Block Description" formControlName="description"></textarea> 
      </md-input-container>
      <br>
      <br>  
    </div>
  `,
  styles:[`

  `]
})
export class BlockFormComponent {
  @Input() formGroup: FormGroup;
  @Input() heading: string;
  
}
// Block Create Form 
@Component({
  selector: 'app-learning-block-create',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-learning-block-form
    [formGroup]="form"
    [heading]="heading">
    </app-learning-block-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `,
  styles:[`

  `]
})

export class BlockFormCreateComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  constructor(private fb:FormBuilder) {}

  heading: string = 'Create Learning Block'
  
  ngOnInit(){
    this.form = this.fb.group({
        title: [''],
        description: ['']
      });
    }
  
  save(form){
    this.formToSend.emit(form)
  }
}
// Block Edit Form
@Component({
  selector: 'app-learning-block-edit',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-learning-block-form
    [formGroup]="form">
    </app-learning-block-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>

  `,
  styles:[`

  `]
})

export class BlockFormEditComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  @Input() key: string;

  currentFormValues: any;

  constructor(private fb:FormBuilder,
              private ls: LearningExperienceService) {}
  
  ngOnInit(){
    this.ls.findblockForKey(this.key).subscribe(result => this.currentFormValues = result)

    this.form = this.fb.group({
        title: [''],
        description: ['']
      });

    this.form.setValue({
        title: this.currentFormValues.title,
        description: this.currentFormValues.description
      });

    }
  
  save(form){
    this.formToSend.emit(form)
  }
}
// Group Common Form
@Component({
  selector: 'app-learning-group-form',
  template:
  `
  <h1>{{heading}}</h1>

    <div [formGroup]="formGroup">

      <md-input-container>
         <input placeholder="Group Title" type="text" mdInput formControlName="title">
      </md-input-container>

      <br>

      <md-input-container>
         <textarea mdInput placeholder="Group Description" formControlName="description"></textarea> 
      </md-input-container>

      <br>

      <md-select class="full-width" placeholder="Learning Level" formControlName="learningLevel">
          <md-option *ngFor="let choice of learningLevels" [value]="choice.value">
            {{choice.viewValue}}
          </md-option>
      </md-select>

      <br>
      <br>

      <md-select class="full-width" placeholder="Learning Area" formControlName="learningArea">
          <md-option *ngFor="let choice of learningAreas" [value]="choice.value">
            {{choice.viewValue}}
          </md-option>
      </md-select> 

      <br>
      <br> 
    </div>
  `,
  styles:[`
    .full-width {
      width: 100%;
    }
  `]
})
export class GroupFormComponent implements OnInit{
  @Input() formGroup: FormGroup;
  @Input() heading: string;

  learningAreas: Array<object> = [];
  learningLevels: Array<object> = [];

  constructor(private ls: LearningExperienceService){}

  ngOnInit() {
    this.ls.findAllLearningAreas().subscribe(results => {
      results.forEach(each => {
        this.learningAreas.push({value: each.$key, viewValue: each.title})
      })
    });
    this.ls.findAllLearningLevels().subscribe(results => {
      results.forEach(each => {
        this.learningLevels.push({value: each.$key, viewValue: each.title})
      })
    });
  }  
}
// Group Create Form 
@Component({
  selector: 'app-learning-group-create',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-learning-group-form
    [formGroup]="form"
    [heading]="heading">
    </app-learning-group-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `,
  styles:[`

  `]
})

export class GroupFormCreateComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  constructor(private fb:FormBuilder) {}

  heading: string = 'Create Learning Group'
  
  ngOnInit(){
    this.form = this.fb.group({
        title: [''],
        description: [''],
        learningArea: [''],
        learningLevel: ['']
      });
    }
  
  save(form){
    this.formToSend.emit(form)
  }
}
// Group Edit Form
@Component({
  selector: 'app-learning-group-edit',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-learning-group-form
    [formGroup]="form">
    </app-learning-group-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>

  `,
  styles:[`

  `]
})

export class GroupFormEditComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  @Input() key: string;

  currentFormValues: any;

  constructor(private fb:FormBuilder,
              private ls: LearningExperienceService) {}
  
  ngOnInit(){
    this.ls.findblockForKey(this.key).subscribe(result => this.currentFormValues = result)

    this.form = this.fb.group({
        title: [''],
        description: [''],
        learningArea: [''],
        learningLevel: ['']
      });

    this.form.setValue({
        title: this.currentFormValues.title,
        description: this.currentFormValues.description,
        learningArea: this.currentFormValues.learningArea,
        learningLevel: this.currentFormValues.learningLevel
      });

    }
  
  save(form){
    this.formToSend.emit(form)
  }
}








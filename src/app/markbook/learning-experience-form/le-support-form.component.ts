import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { LearningExperienceService } from '../models/learning-experience.service';
import { 
    LearningLevelModel,
	  LearningAreaModel
    } from '../models/data-classes';

// Overall Learning Level Model

@Component({
  selector: 'app-learning-level-form',
  template: 
  `
  <h1>{{heading}}</h1>

  <div [formGroup]="formGroup">

    <md-input-container class="full-width">
      <input placeholder="Title" type="text" mdInput formControlName="title">
    </md-input-container>

    <md-input-container class="full-width">
      <textarea mdInput placeholder="Description" formControlName="description"></textarea> 
    </md-input-container>

    <md-select class="full-width" placeholder="Levels" formControlName="level">
        <md-option *ngFor="let choice of levels" [value]="choice.value">
          {{choice.viewValue}}
        </md-option>
    </md-select>

    <md-input-container class="full-width">
      <input placeholder="Qualifier" type="text" mdInput formControlName="qualifier">
    </md-input-container>

  </div>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})

export class LearningLevelFormComponent {
  @Input() formGroup: FormGroup;
  @Input() heading: string;
 	
  levels = [
    {value: '1', viewValue: 'Level 1'},
    {value: '2', viewValue: 'Level 2'},
    {value: '3', viewValue: 'Level 3'},
    {value: '4', viewValue: 'Level 4'},
    {value: '5', viewValue: 'Level 5'},
    {value: '6', viewValue: 'Level 6'},
    {value: '7', viewValue: 'Level 7'},
    {value: '8', viewValue: 'Level 8'},
  ];
}


// Create Learning Level Model

@Component({
  selector: 'app-learning-level-create-form',
  template: 
  `
  <form novalidate [formGroup]="form">
    <app-learning-level-form
    [formGroup]="form"
    [heading]="heading"
    </app-learning-level-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})

export class LearningLevelCreateFormComponent implements OnInit {
  @Output() formToSend = new EventEmitter();

  form: FormGroup;
  heading: string = "Create Level for Assessments"

  constructor(private fb:FormBuilder){}

  ngOnInit() {
  	this.form = this.fb.group({
  		title: '',
  		description: '',
  		level: '',
  		qualifier: ''
  	});
  }

  save(form){
    this.formToSend.emit(form)
  }
}

// Edit Learning Level Model

@Component({
	selector: 'app-learning-level-edit-form',
	template:
	`
  <form novalidate [formGroup]="form">
    <app-learning-level-form
    [formGroup]="form"
    [heading]="heading"
    </app-learning-level-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>	
	`,
	styles:[`

	`]
})

export class LearningLevelEditFormComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  @Input() key: string;

  currentFormValues: LearningLevelModel;

  form: FormGroup;
	
	constructor(private ls:LearningExperienceService,
				private fb: FormBuilder) {}

	ngOnInit() {
    this.ls.findLearningLevelByKey(this.key).subscribe(levels => this.currentFormValues = levels)

    this.form = this.fb.group({
      title: '',
      description: '',
      level: '',
      qualifier: ''
    });

    this.form.setValue({
      title: this.currentFormValues.title,
      description: this.currentFormValues.description,
      level: this.currentFormValues.level,
      qualifier: this.currentFormValues.qualifier
    })    
  }

  save(form){
    this.formToSend.emit(form)
  }
}
	
//--------------------------//
// Overall Learning Area Model

@Component({
  selector: 'app-learning-area-form',
  template: 
  `
  <h1>{{heading}}</h1>

  <div [formGroup]="formGroup">

    <md-input-container class="full-width">
      <input placeholder="Title" type="text" mdInput formControlName="title">
    </md-input-container>

    <md-input-container class="full-width">
      <textarea mdInput placeholder="Description" formControlName="description"></textarea> 
    </md-input-container>
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

export class LearningAreaFormComponent {  
  @Input() formGroup: FormGroup;
  @Input() heading: string;

}

// Create learning Area Model

@Component({
  selector: 'app-learning-area-create-form',
  template: 
  `
  <form novalidate [formGroup]="form">
    <app-learning-area-form
    [formGroup]="form"
    </app-learning-area-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})

export class LearningAreaCreateFormComponent implements OnInit { 
  form: FormGroup;	
  @Output() formToSend = new EventEmitter();
  
  constructor(private ls:LearningExperienceService,
  			  private fb:FormBuilder){}

  
  ngOnInit(){
 	this.form = this.fb.group({
 	  title: '',
 	  description: ''
 	});
  }

  save(form){
    this.formToSend.emit(form)
  }

}

// Edit learning Area Model

@Component({
	selector: 'app-learning-area-edit-form',
	template:
	`
  <form novalidate [formGroup]="form">
    <app-learning-area-form
    [formGroup]="form"
    </app-learning-area-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
	
	`,
	styles:[`

	`]
})

export class LearningAreaEditFormComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  @Input() key: string;

  currentFormValues: LearningAreaModel;
	
	constructor(private ls:LearningExperienceService,
		        private fb:FormBuilder) {}

	ngOnInit(){
    this.ls.findLearningAreaByKey(this.key).subscribe(areas => this.currentFormValues = areas)

    this.form = this.fb.group({
      title: '',
      description: ''
    });

    this.form.setValue({
      title: this.currentFormValues.title,
      description: this.currentFormValues.description
    }) 
	}
}


import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { LearningExperienceService } from '../models/learning-experience.service';
import { 
    LearningLevelModel,
	  LearningAreaModel,
    LearningYearModel
    } from '../models/data-classes';

// Overall Year

@Component({
  selector: 'app-learning-year-form',
  template: 
  `
  <h1>{{heading}}</h1>

  <div [formGroup]="formGroup">

    <md-select class="full-width" placeholder="Year" formControlName="year">
        <md-option *ngFor="let choice of years" [value]="choice.value">
          {{choice.viewValue}}
        </md-option>
    </md-select>

    <br>
    <br>

    <md-select class="full-width" placeholder="Semester" formControlName="semester">
        <md-option *ngFor="let choice of semesters" [value]="choice.value">
          {{choice.viewValue}}
        </md-option>
    </md-select>
  </div>
  <br>
  <br>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})

export class LearningYearFormComponent {
  @Input() formGroup: FormGroup;
  @Input() heading: string;
   
  years = [
    {value: '2017', viewValue: '2017'},
    {value: '2018', viewValue: '2018'},
    {value: '2019', viewValue: '2019'},
    {value: '2020', viewValue: '2020'}
  ];

  semesters = [
    {value: '0', viewValue: 'Not Applicab'},
    {value: '1', viewValue: 'Term 1'},
    {value: '2', viewValue: 'Term 2'},
    {value: '3', viewValue: 'Term 3'},
    {value: '4', viewValue: 'Term 4'}
  ];
}


// Create Year

@Component({
  selector: 'app-learning-year-create-form',
  template: 
  `
  <form novalidate [formGroup]="form">
    <app-learning-year-form
    [formGroup]="form"
    [heading]="heading">
    </app-learning-year-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})

export class LearningYearCreateFormComponent implements OnInit {
  @Output() formToSend = new EventEmitter();

  form: FormGroup;
  heading: string = "Create Year"

  constructor(private fb:FormBuilder){}

  ngOnInit() {
    this.form = this.fb.group({
      year: '',
      semester: '',
    });
  }

  save(form){
    this.formToSend.emit(form)
  }
}

// Edit Year

@Component({
  selector: 'app-learning-year-edit-form',
  template:
  `
  <form novalidate [formGroup]="form">
    <app-learning-year-form
    [formGroup]="form"
    [heading]="heading">
    </app-learning-year-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>  
  `,
  styles:[`

  `]
})

export class LearningYearEditFormComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  @Input() key: string;

  currentFormValues: LearningYearModel;

  form: FormGroup;
  
  constructor(private ls:LearningExperienceService,
        private fb: FormBuilder) {}

  ngOnInit() {
    this.ls.findLearningYearByKey(this.key).subscribe(years => this.currentFormValues = years);

    this.form = this.fb.group({
          year: '',
          semester: '',
        });

    this.form.setValue({
      year: this.currentFormValues.year,
      semester: this.currentFormValues.semester,
    });    
  }

  save(form){
    this.formToSend.emit(form)
  }
}


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
    <br>
    <md-select class="full-width" placeholder="Qualifier" formControlName="qualifier">
        <md-option *ngFor="let choice of qualifiers" [value]="choice.value">
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

  qualifiers = [
    {value: 'Not Applicable', viewValue: 'Not Applicable'},
    {value: 'Needs Support', viewValue: 'Needs Support'},
    {value: 'Emerging', viewValue: 'Emerging'},
    {value: 'Developing', viewValue: 'Developing'},
    {value: 'Proficient', viewValue: 'Proficient'},
    {value: 'Exemplary', viewValue: 'Exemplary'},
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
    [heading]="heading">
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
    [heading]="heading">
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
    [formGroup]="form">
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
    [formGroup]="form">
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


import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel,
    LearningAssessmentHeaderModel} from '../../markbook/models/data-classes'

import { LearningExperienceService } from '../../markbook/models/learning-experience.service'


@Component({
	selector: 'my-student-group',
	template:
	`
	<span mdTooltipPosition="right" mdTooltip="{{group?.description}}">{{group?.title}}</span>
	`,
	styles:[`

	`]
})

export class MyStudentLearningGroupItemComponent {
	@Input() group: LearningAssessmentGroupModel 
}

@Component({
	selector: 'my-student-block',
	template:
	`
	<span mdTooltipPosition="right" mdTooltip="{{block?.description}}">{{block?.title}}</span>
	`,
	styles:[`

	`]
})

export class MyStudentLearningBlockItemComponent {
	@Input() block: LearningAssessmentBlockModel 
}


@Component({
	selector: 'learning-area',
	template:
	`
	<form novalidate [formGroup]="form">
	<md-select placeholder="Learning Area" formControlName="learningArea">
	    <md-option *ngFor="let choice of learningAreas" [value]="choice.value">
	      {{choice.viewValue}}
	    </md-option>
	</md-select> 

	<md-select placeholder="Learning Level" formControlName="learningLevel">
	    <md-option *ngFor="let choice of learningLevels" [value]="choice.value">
	      {{choice.viewValue}}
	    </md-option>
	</md-select> 

	<md-select placeholder="Learning Year" formControlName="learningYear">
	    <md-option *ngFor="let choice of learningYears" [value]="choice.value">
	      {{choice.viewValue}}
	    </md-option>
	</md-select>
	</form>
	`,
	styles:[`
		form {
			margin-top: 20px;
			margin-bottom: 20px;
		}
	`]
})

export class LearningAreaItemComponent implements OnInit{
	@Input() block: LearningAssessmentBlockModel
	@Output() formToSend = new EventEmitter();

	form: FormGroup; 

	learningLevels: Array<object> = [];
	learningAreas: Array<object> = [];
	learningYears: Array<object> = [];


	constructor(private ls: LearningExperienceService,
				private fb: FormBuilder){}

	ngOnInit() {
	  	this.ls.findAllLearningAreas().subscribe(results => {
	  	  results.forEach(each => {
	  	    this.learningAreas.push({value: each.$key, viewValue: each.title})
	  	  });
	  	 });
	  	 this.ls.findAllLearningYears().subscribe(results => {
	  	   results.forEach(each => {
	  	     this.learningYears.push({value: each.$key, viewValue: each.year})
	  	   })
	  	 });
	  	 this.ls.findAllLearningLevels().subscribe(results => {
	  	   results.forEach(each => {
	  	     this.learningLevels.push({value: each.$key, viewValue: each.title})
	  	   })
	  	 });

	  	this.form = this.fb.group({
	    learningArea: [''],
	    learningLevel: [''],
	    learningYear: [''],

	  	});

	  	this.form.valueChanges.subscribe(data =>
	  		{
	  		this.formToSend.emit(data)	
	  		})
	}	 
}  


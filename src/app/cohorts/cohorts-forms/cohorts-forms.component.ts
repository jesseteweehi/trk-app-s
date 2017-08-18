import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CohortModel } from '../models/data-classes'
import { CohortsService } from '../models/cohorts.service'


@Component({
  selector: 'app-cohorts-form',
  template: `
  	<h1>{{heading}}</h1>

    <div [formGroup]="formGroup">

       <md-input-container class="full-width">
         <input placeholder="Cohort Title" type="text" mdInput formControlName="title">
       </md-input-container>

       <md-input-container class="full-width">
         <textarea mdInput placeholder="Cohort Description" formControlName="description"></textarea> 
       </md-input-container>      
    </div>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})
export class CohortsFormComponent {
	@Input() formGroup: FormGroup;
	@Input() heading: string;

}

@Component({
  selector: 'app-cohorts-create',
  template: `
  	<form novalidate [formGroup]="form">
    <app-cohorts-form
      [formGroup]="form"
      [heading]="heading">
    </app-cohorts-form>
       <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
    </form>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})
export class CohortsCreateComponent implements OnInit {
	@Output() formToSend = new EventEmitter();
	@Input() blockId: string;
	form: FormGroup;
	constructor(private fb:FormBuilder) {}

	heading: string = 'Create Cohort'
	
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

@Component({
  selector: 'app-cohorts-edit',
  template: `
  	<form novalidate [formGroup]="form">
    <app-cohorts-form
      [formGroup]="form"
      [heading]="heading">
      </app-cohorts-form>
         <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
    </form>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})
export class CohortsEditComponent implements OnInit {
	@Output() formToSend = new EventEmitter();
	@Input() key: string;
	form: FormGroup;

	currentFormValues: CohortModel;

	constructor(private fb:FormBuilder,
				private cs: CohortsService) {}

	heading: string = 'Create Cohort'
	
	ngOnInit(){

		this.cs.findCohortByKey(this.key).subscribe(
				result => this.currentFormValues = result
			)

	  	this.form = this.fb.group({
	    	title: '',
	    	description: ''
	  	});

	  	this.form.setValue({
	  		title: this.currentFormValues.title,
	  		description: this.currentFormValues.description
	  	})
	}

	save(form){
	  this.formToSend.emit(form)
	}
}

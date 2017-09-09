import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UsersService } from '../models/users.service';
import { UserGroupModel } from '../models/data-classes'



@Component({
  selector: 'user-groups-form',
  template: `
  <h1>{{heading}}</h1>

  <div [formGroup]="formGroup">

  <md-input-container class="full-width">
      <input placeholder="Title" type="text" mdInput formControlName="title">
  </md-input-container>

  <md-input-container class="full-width">
      <textarea mdInput placeholder="Description" formControlName="description"></textarea> 
  </md-input-container>

  </div>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})
export class UserGroupsFormComponent {
	@Input() formGroup: FormGroup;
	@Input() heading: string;
}

@Component({
  selector: 'user-groups-createform',
  template: `
  <form novalidate [formGroup]="form">
    <user-groups-form
    [formGroup]="form"
    [heading]="heading">
    </user-groups-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})
export class UserGroupsCreateFormComponent implements OnInit {
	@Output() formToSend = new EventEmitter();

	form: FormGroup;
	heading: string =" Create Group of Users"

	constructor(private fb:FormBuilder){}

	ngOnInit() {
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
  selector: 'user-groups-editform',
  template: `
  <form novalidate [formGroup]="form">
    <user-groups-form
    [formGroup]="form"
    [heading]="heading">
    </user-groups-form>
     <button md-dialog-close md-button color="primary" (click)="save(form)">Save</button>
  </form>
  `,
  styles:[`
  .full-width {
    width: 100%;
  }
  `]
})
export class UserGroupsEditFormComponent implements OnInit {
	@Output() formToSend = new EventEmitter();
	@Input() key: string;

	currentFormValues: UserGroupModel;

	form: FormGroup;

	constructor(private fb:FormBuilder,
				private us:UsersService){}

	ngOnInit() {
		this.us.findUserGroupByKey(this.key).subscribe(group => this.currentFormValues = group)

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



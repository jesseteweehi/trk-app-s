import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-learning-experience-form',
  templateUrl: './learning-experience-form.component.html',
  styleUrls: ['./learning-experience-form.component.css']
})
export class LearningExperienceFormComponent  {

	form: FormGroup;

  	constructor(public dialogRef: MdDialogRef<LearningExperienceFormComponent>,
  				private fb: FormBuilder,
  				@Inject(MD_DIALOG_DATA) public data: any) {

  		this.form = this.fb.group({
  		    title: [''],
  		    description: ['']
  			});

  	}


  	create(form) {
  		console.log(form.value)

  	}

}



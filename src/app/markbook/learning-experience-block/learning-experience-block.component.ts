import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialog} from '@angular/material';

import { LearningExperienceService } from '../models/learning-experience.service';
import { LearningExperienceFormComponent } from '../learning-experience-form/learning-experience-form.component';



@Component({
  selector: 'app-learning-experience-block',
  templateUrl: './learning-experience-block.component.html',
  styleUrls: ['./learning-experience-block.component.css']
})
export class LearningExperienceBlockComponent implements OnInit {

	selectedOption: string;

   	form: FormGroup;
  	examples: object;

  	templateproperty: boolean = true;

  	num: number = 10
  	x_axis: string[] = [];
  	y_axis: string[] = [];

   	
   	constructor(private fb:FormBuilder,
   				private ls: LearningExperienceService,
   				public dialog: MdDialog ) {

   	    this.form = this.fb.group({
             field: ['']
   		})

   		this.examples = this.ls.examples
   	}

   	ngOnInit() {

   	}

   	add() {
   		this.x_axis.push('box' + (this.x_axis.length + 1).toString());
   	}

   	template() {
   		let styles = {
   			'grid-template-columns' : 'repeat(' + this.num + ', 1fr)' 
   		}
   		return styles
   	}

   	setColumn(value) {
   		this.num = value;
   	}

   	openDialog() {
    let dialogRef = this.dialog.open(LearningExperienceFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    	});
  	}

}

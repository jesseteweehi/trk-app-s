import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialog, MdDialogConfig } from '@angular/material';

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

  	num: number = 10
  	x_axis: string[] = [];
  	y_axis: string[] = [];

    config: MdDialogConfig = {
    disableClose: false,
    hasBackdrop: false,
    backdropClass: '',
    width: '500px',
    data: {
      message: ''
    }
  };

   	
   	constructor(private fb:FormBuilder,
   				private ls: LearningExperienceService,
   				public dialog: MdDialog ) {

   	    this.form = this.fb.group({
             field: ['']
   		})

   		
   	}

   	ngOnInit() {

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
    let dialogRef = this.dialog.open(LearningExperienceFormComponent, this.config);
    dialogRef.afterClosed().subscribe(result => {
      this.FireBaseLearningExperiencePiece(result)
    	});
  	}

    FireBaseLearningExperiencePiece(form) {
      this.ls.createNewLearningExperiencePiece(form.value).subscribe(
              () => {
                  alert("lesson saved succesfully.");
              },
              err => alert(`error saving lesson ${err}`)
          );

    }

}

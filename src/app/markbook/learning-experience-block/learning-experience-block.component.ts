import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';

import { LearningExperienceService } from '../models/learning-experience.service';
import { LearningExperienceFormPieceComponent, LearningExperienceFormBlockComponent, LearningExperienceFormGroupComponent } from '../learning-experience-form/learning-experience-form.component';



@Component({
  selector: 'app-learning-experience-block',
  templateUrl: './learning-experience-block.component.html',
  styleUrls: ['./learning-experience-block.component.css']
})
export class LearningExperienceBlockComponent implements OnInit {



   	form: FormGroup;
  	num: number = 10
   	
   	constructor(private fb:FormBuilder,
   				private ls: LearningExperienceService,
   				public dialog: MdDialog,
          public snackBar: MdSnackBar ) {

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

   	openDialogPiece() {
    let dialogRef = this.dialog.open(LearningExperienceFormPieceComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.fireBaseLearningExperiencePiece(result)
    	});
  	}

    openDialogBlock() {
    let dialogRef = this.dialog.open(LearningExperienceFormBlockComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      });
    }

    openDialogGroup() {
    let dialogRef = this.dialog.open(LearningExperienceFormGroupComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      });
    }

    fireBaseLearningExperiencePiece(form) {
      this.ls.createNewLearningExperiencePiece(form.value).subscribe(
              () => {
                  this.snackBar.open('Lesson Piece Saved','Awesome',{ duration:2000 })
              },
              err => { 
                  this.snackBar.open('Error Saving Lesson Piece ${err}','Bugger',{ duration:2000 })
              }
          );

    }

}

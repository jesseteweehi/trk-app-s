import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-learning-experience-form',
  templateUrl: './learning-experience-form.component.html',
  styleUrls: ['./learning-experience-form.component.css']
})
export class LearningExperienceFormComponent  {

  	constructor(public dialogRef: MdDialogRef<LearningExperienceFormComponent>) {}
}

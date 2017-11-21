import { Component, Input, OnInit } from '@angular/core';

import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel,
    LearningAssessmentHeaderModel,
	MyStudentLearningGroupModel} from '../../markbook/models/data-classes'

@Component({
  selector: 'app-my-student-enrolled',
  templateUrl: './my-student-enrolled.component.html',
  styleUrls: ['./my-student-enrolled.component.css']
})
export class MyStudentEnrolledComponent implements OnInit {
	  @Input() groups: object;
	  @Input() enrolledBlocks: LearningAssessmentBlockModel[];
	  @Input() areas: object;
	  @Input() levels: object;
	  @Input() years: object;

    highlightKey: string = '';

    resourceKey: string = '';	

    studentLearningGroups: MyStudentLearningGroupModel[] = []
  	
    constructor() { }

    ngOnInit(){
      this.enrolledBlocks.map(block => {
          console.log(block)
          this.studentLearningGroups.push(
            new MyStudentLearningGroupModel (
                block.$key,
                this.groups[block.parent].learningYear,
                this.groups[block.parent].learningArea,
                this.groups[block.parent].learningLevel,
                block.parent,
                block
                )
          )
      })
    }

    choose(key:string) {
      this.resourceKey = key
      this.highlightKey = key
    }

    close(){
    this.resourceKey = ''
    this.highlightKey = ''
  }

}

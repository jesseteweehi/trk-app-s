import { Component, Input, OnInit } from '@angular/core';

import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel,
    LearningAssessmentHeaderModel,
	MyStudentLearningGroupModel} from '../../markbook/models/data-classes'

@Component({
  selector: 'app-my-student-enrolled-exp-panel',
  templateUrl: './my-student-enrolled-exp-panel.component.html',
  styleUrls: ['./my-student-enrolled-exp-panel.component.css']
})
export class MyStudentEnrolledExpPanelComponent implements OnInit {
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

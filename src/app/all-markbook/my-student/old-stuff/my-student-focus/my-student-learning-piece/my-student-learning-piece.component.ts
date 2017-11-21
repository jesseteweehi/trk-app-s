import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { LearningExperienceService } from '../../../markbook/models/learning-experience.service';
import { LearningAssessmentPieceModel } from '../../../markbook/models/data-classes'

@Component({
  selector: 'app-my-student-learning-piece',
  templateUrl: './my-student-learning-piece.component.html',
  styleUrls: ['./my-student-learning-piece.component.css']
})
export class MyStudentLearningPieceComponent implements OnChanges{
  @Input() learningPieceMatrix: object;
	@Input() learningBlock;
  @Input() learningPieceKeys: string[];

	groups: LearningAssessmentPieceModel[];
	xheaders: any[];
  yheaders: any[];

  	constructor(private ls: LearningExperienceService,
                private cdr: ChangeDetectorRef) { }

  	ngOnChanges(changes: SimpleChanges) {
      if (changes['learningPieceMatrix']) {
      this.groups = this.learningPieceMatrix[this.learningBlock.$key]['pieces']
  		this.xheaders = this.learningPieceMatrix[this.learningBlock.$key]['xheaders']
  		this.yheaders = this.learningPieceMatrix[this.learningBlock.$key]['yheaders']
      }
    } 
  	

    highlight(key) {
      if (this.learningPieceKeys.includes(key)){
        return true
      }
      else {
        return false
      }
    }

  	xheader(i) {
    // grid Area : row-start,row-end, column-start, column-end
      let styles = {
          'grid-row': + (i+1) + '/' + (i+2),
          'grid-column': '1 / 2',
          // 'text-align': 'center',

      }
      return styles
    }

    yheader(i) {
      let styles = {
          'grid-column': + (i+1) + '/' + (i+2),
          'grid-row': '1 / 2',
      }
      return styles
    }

    template() { 
    if (this.yheaders){
      if (this.yheaders.length > 1)      
        {     
          let styles = {
                'grid-template-columns' : 'repeat(' + (this.yheaders.length + 1) + ', 1fr)' 
              }
              return styles
         }
      else {
            let styles = {
              'grid-template-columns' : '25% 75%'
            }
            return styles
           }
      }

    }

}

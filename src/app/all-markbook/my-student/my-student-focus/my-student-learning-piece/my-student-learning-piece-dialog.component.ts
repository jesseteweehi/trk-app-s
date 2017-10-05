import { Component, Inject, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LearningExperienceService } from '../../../markbook/models/learning-experience.service';
import { LearningAssessmentPieceModel, LearningAssessmentBlockModel } from '../../../markbook/models/data-classes'
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-my-student-learning-piece-dialog',
  templateUrl: './my-student-learning-piece.component.html',
  styleUrls: ['./my-student-learning-piece.component.css']
})
export class MyStudentLearningPieceDialogComponent implements OnInit {
	learningBlock: LearningAssessmentBlockModel  = this.data.learningBlock;
  learningPieceKeys: string[] = this.data.learningPieceKeys

	groups: LearningAssessmentPieceModel[];
	xheaders: any[];
  yheaders: any[];

  	constructor(public dialogRef: MdDialogRef<MyStudentLearningPieceDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private ls: LearningExperienceService) { }

  	ngOnInit() {
  		this.ls.findPiecesForBlocks(this.learningBlock.$key).subscribe(groups => this.groups = groups);
  		this.ls.findXHeadersForBlocks(this.learningBlock.$key).subscribe(xheaders => this.xheaders = xheaders);
  		this.ls.findYHeadersForBlocks(this.learningBlock.$key).subscribe(yheaders => this.yheaders = yheaders);
      
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


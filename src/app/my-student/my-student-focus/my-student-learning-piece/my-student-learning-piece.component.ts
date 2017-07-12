import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LearningExperienceService } from '../../../markbook/models/learning-experience.service';
import { LearningAssessmentPieceModel } from '../../../markbook/models/data-classes'

@Component({
  selector: 'app-my-student-learning-piece',
  templateUrl: './my-student-learning-piece.component.html',
  styleUrls: ['./my-student-learning-piece.component.css']
})
export class MyStudentLearningPieceComponent {
	@Input() learningPiece;
	@Input() learningBlock;
  @Input() student;

	groups: LearningAssessmentPieceModel[];
	xheaders: any[];
  yheaders: any[];
  allStudentPieces: any;
  unique: any[];

  	constructor(private ls: LearningExperienceService) { }

  	ngOnChanges() {
  		this.ls.findPiecesForBlocks(this.learningBlock.$key).subscribe(groups => this.groups = groups);
  		this.ls.findXHeadersForBlocks(this.learningBlock.$key).subscribe(xheaders => this.xheaders = xheaders);
  		this.ls.findYHeadersForBlocks(this.learningBlock.$key).subscribe(yheaders => this.yheaders = yheaders);
      /// I think I have this already. May not need this call????  Check
      this.ls.findLearningPiecesForStudent(this.student.$key).subscribe(lps => this.allStudentPieces = lps)

      // this.highlightAttainedPieces() 
  	}

    highlightAttainedPieces(){
       let groups = [];
       this.groups.forEach(element => {
          groups.push(element.$key)    
       })
       this.allStudentPieces.forEach(element => {
         if (groups.includes(element.piece)) {
           this.unique.push(element.piece)
         }
       })
    }

    // highlight(key) {
    //   if (this.unique.includes(key)){
    //     return true
    //   }
    //   else {
    //     return false
    //   }
    // }

    // [class.highlight]="highlight(group.$key)"



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


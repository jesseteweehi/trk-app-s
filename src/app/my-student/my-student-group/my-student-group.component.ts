import { Component, Input, Output, EventEmitter } from '@angular/core';
import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel,
    LearningAssessmentHeaderModel} from '../../markbook/models/data-classes'


@Component({
  selector: 'app-my-student-group',
  templateUrl: './my-student-group.component.html',
  styleUrls: ['./my-student-group.component.css']
})
export class MyStudentGroupComponent {
	@Input() studentFirebase: LearningAssessmentPieceModel[];
	@Input() groups: object;
	@Input() blocks: object;
	@Input() areas: object;
	@Input() levels: object;	
	@Output() sendData = new EventEmitter();
	highlightKey: string;


	choose(key, block, group) {
	  const dataToSend = {
	    'group': group,
	    'block': block,
	  };
	  this.sendData.emit(dataToSend);
	  this.highlightKey = key
	}
}

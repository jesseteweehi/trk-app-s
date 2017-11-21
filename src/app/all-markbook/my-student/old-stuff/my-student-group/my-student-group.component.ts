import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel,
    LearningAssessmentHeaderModel,
	MyStudentLearningPieceModel} from '../../markbook/models/data-classes'


@Component({
  selector: 'app-my-student-group',
  templateUrl: './my-student-group.component.html',
  styleUrls: ['./my-student-group.component.css']
})
export class MyStudentGroupComponent implements OnInit {
	@Input() studentFirebase: LearningAssessmentPieceModel[];
	@Input() learningPieceKeys: Array<string>;
	@Input() groups: object;
	@Input() blocks: object;
	@Input() areas: object;
	@Input() levels: object;
	@Input() years: object;	
	@Output() sendData = new EventEmitter();
	highlightKey: string = '';

	filtered : MyStudentLearningPieceModel[]; 

	studentLearningPieces: MyStudentLearningPieceModel[] = [];

	chosenBlock: LearningAssessmentBlockModel;
	chosenGroup: LearningAssessmentGroupModel;


	public resourceKey : string = '' 

	ngOnInit() {
		{this.studentFirebase.map(piece => {
				this.studentLearningPieces.push(
						new MyStudentLearningPieceModel (
						piece.$key,
						this.groups[this.blocks[piece.parent].parent].learningYear,
						this.groups[this.blocks[piece.parent].parent].learningArea,
						this.groups[this.blocks[piece.parent].parent].learningLevel,
						this.blocks[piece.parent].parent,
						piece.parent,
						piece.xheader,
						piece.yheader,
						piece.qualifier))
					
				})}
	}


	// choose(key, block, group) {
	//   const dataToSend = {
	//     'group': group,
	//     'block': block,
	//   };
	//   this.sendData.emit(dataToSend);
	//   this.highlightKey = key
	// }

	choose(key, block) {
		this.chosenBlock = block;
		this.resourceKey = key
		this.highlightKey = key
	}

	close(){
		this.resourceKey = ''
		this.highlightKey = ''
	}

	// choose(key){
	// 	this.resourceKey = key
	// }

	ngOnChanges() {
		this.filtered = this.studentLearningPieces
	}

	recievedForm($event) {
		console.log($event)
		this.filtered = this.studentLearningPieces.filter(lp => 
			{
				return lp.year === $event.learningYear&&lp.area === $event.learningArea&&lp.level == $event.learningLevel
			}
	)}


}

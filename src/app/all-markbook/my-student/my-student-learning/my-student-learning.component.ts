import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel,
    LearningAssessmentHeaderModel,
	MyStudentLearningPieceModel} from '../../markbook/models/data-classes'

  import { StudentModel } from '../../../student-shared/data-classes'


import * as _ from 'lodash';

@Component({
  selector: 'app-my-student-learning',
  templateUrl: './my-student-learning.component.html',
  styleUrls: ['./my-student-learning.component.css']
})
export class MyStudentLearningComponent implements OnChanges {
  @Input() student: StudentModel;
	// Learning Pieces
  @Input() studentLearningObject: object;
  // Enrolled Data
	@Input() enrolledBlocks: LearningAssessmentBlockModel[];
  // Learning Group Data
	@Input() groups: object;
  // Learning Block Data
	@Input() blocks: object;
  // Learning Items.
	@Input() areas: object;
	@Input() levels: object;
	@Input() years: object;


	learningPieceKeys: Array<string>;
  groupKeys: Array<string>;
	status: object = {};
	groupBlock: object = {};
  blockPiece: object = {}


  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
  
  		// Go through student learning. Create an array of parent keys. This will be the blocks were progress is being made.
  		// Create an array of Enrolled Block Keys. This will be keys where they are enrolled.
  		// Compare both arrays if Key in both then. in progress
  		// If in student learning but not in Enrolled. Highlight Finished.
  	if (changes['studentLearningObject'] || changes['groups'] ||  changes['enrolledBlocks'] || changes['blocks']) {

      // Make up all other things needed

      this.learningPieceKeys = Object.keys(this.studentLearningObject);
      this.groupKeys = Object.keys(this.groups);
      this.groupKeys.forEach(key => {
        this.groupBlock[key] = []
      })

      // Create All Block Keys
  		const progressBlockKeys: Array<string> = [];
  		const enrolledBlockKeys: Array<string> = []
  		this.learningPieceKeys.forEach(piece => {
  			progressBlockKeys.push(this.studentLearningObject[piece].parent)
  		});
  		this.enrolledBlocks.forEach(blockobj => {
  			enrolledBlockKeys.push(blockobj.$key)
  		})
  		// Create the object of GroupKeys with an Array
  		const allBlockKeys: Array<string> = _.union(progressBlockKeys,enrolledBlockKeys)


  	  // Create Status Object
  		allBlockKeys.forEach(blockkey => {
  		// Create the block to Group Relationship by placing the block in its group array.
      this.blockPiece[blockkey] = []  
  		this.groupBlock[this.blocks[blockkey].parent].push(blockkey);			
  		
  		if (_.includes(progressBlockKeys, blockkey) && _.includes(enrolledBlockKeys, blockkey)) 
  				{this.status[blockkey] = 'In Progress'}
  		if (_.includes(enrolledBlockKeys, blockkey) == true && _.includes(progressBlockKeys, blockkey) == false)
  				{this.status[blockkey] = 'Not Started'}

  		if (_.includes(enrolledBlockKeys, blockkey) == false && _.includes(progressBlockKeys, blockkey) == true)
				{this.status[blockkey] = 'Attained'}
  		})
  		
      // Create the block to piece Relationship by placing the piece in its group array.
      this.learningPieceKeys.forEach(piecekey => {
        this.blockPiece[this.studentLearningObject[piecekey].parent].push(piecekey)
      })
    }
	}
}

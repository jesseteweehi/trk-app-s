import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';


import { AuthenticationService } from '../../../shared-security/authentication.service'

import { MyStudentsService } from '.././models/my-student.service'
import { LearningExperienceService } from '../../markbook/models/learning-experience.service'
import { StudentModel } from '../../../student-shared/data-classes'
import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel,
    LearningAssessmentHeaderModel} from '../../markbook/models/data-classes'

import { UserModel } from '../../../users/models/data-classes'

import { MyStudentLearningPieceDialogComponent } from '../my-student-focus/my-student-learning-piece/my-student-learning-piece-dialog.component';


@Component({
  selector: 'app-my-student-container',
  templateUrl: './my-student-container.component.html',
  styleUrls: ['./my-student-container.component.css']
})
export class MyStudentContainerComponent implements OnInit {
  studentInfo: StudentModel;
  user: UserModel;
	studentId : string;

  enrolledBlocks: LearningAssessmentBlockModel[];

  studentLearningObject: object = {};

  groups: object = {};
  blocks: object = {};

  areas: object = {};
  levels: object = {}; 
  years: object = {};

  	constructor(private route: ActivatedRoute,
  				private ms: MyStudentsService,
          private ls: LearningExperienceService,
          public dialog: MdDialog,
          private as: AuthenticationService) { }

  	ngOnInit() {
      // Needed this component
      this.route.params.subscribe(p => {this.studentId = p['studentid']})
  		this.ms.findStudentForKey(this.studentId).subscribe(student => this.studentInfo = student);
      this.as.user.subscribe(user => this.user = user)

      
      // Learning Component

      this.ms.findPiecesForStudentObject(this.studentId).subscribe(item => this.studentLearningObject = item)

      this.ms.findGroupsForStudent(this.studentId).subscribe(
        items => this.groups = items
        );

      this.ms.findBlocksForStudent(this.studentId).subscribe(
        items => {
          this.blocks = items;
          // const keys = Object.keys(items)    
          // keys.forEach(block => {
          //   this.learningPieceMatrix[block] = {};
          //   this.ls.findPiecesForBlocks(block).subscribe(pieces => this.learningPieceMatrix[block]['pieces'] = pieces);
          //   this.ls.findXHeadersForBlocks(block).subscribe(pieces => this.learningPieceMatrix[block]['xheaders'] = pieces);
          //   this.ls.findYHeadersForBlocks(block).subscribe(pieces => this.learningPieceMatrix[block]['yheaders'] = pieces);           
          // })
          }
        );

      this.ms.findEnrolledBlocksForStudent(this.studentId).subscribe(blocks => {
          this.enrolledBlocks = blocks;
        })

      this.ls.findAllLearningAreaObject().subscribe(areas => {
        this.areas = areas;
        });

      this.ls.findAllLearningLevelsObject().subscribe(levels => {
        this.levels = levels
      })

      this.ls.findAllLearningYearObject().subscribe(years => {
        this.years = years
      })
      

  	}

 

    recievedForm($event){
      console.log($event)
    }

}

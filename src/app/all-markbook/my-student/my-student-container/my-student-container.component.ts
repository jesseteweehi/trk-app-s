import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';


import { AuthenticationService } from '../../../shared-security/authentication.service'

import { MyStudentsService } from '.././models/my-student.service'
import { LearningExperienceService } from '../../markbook/models/learning-experience.service'
import { StudentModel } from '../../students/models/data-classes'
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

  user: UserModel;

	studentInfo: StudentModel
	studentId : string;
	studentLearning: LearningAssessmentPieceModel[];

  groups: object;
  blocks: object;

  areas: object;
  levels: object; 
  years: object;

  learningPieceKeys: string[] = [];

  chosenGroup: any = {};
  chosenBlock: any = {};

  	constructor(private route: ActivatedRoute,
  				private ms: MyStudentsService,
          private ls: LearningExperienceService,
          public dialog: MdDialog,
          private as: AuthenticationService) { }

  	ngOnInit() {
      this.route.params.subscribe(p => {this.studentId = p['studentid']})
  		this.ms.findStudentForKey(this.studentId).subscribe(student => this.studentInfo = student);

      this.ms.findPiecesForStudent(this.studentId).subscribe(
        items => {
          this.studentLearning = items;
          items.forEach(element => {
          this.learningPieceKeys.push(element.$key) 
          });
         });
      this.ms.findGroupsForStudent(this.studentId).subscribe(
        items => this.groups = items
        );
      this.ms.findBlocksForStudent(this.studentId).subscribe(
        items => {
          this.blocks = items
        }
        );
      this.ls.findAllLearningAreaObject().subscribe(areas => {
        this.areas = areas;
        });
      this.ls.findAllLearningLevelsObject().subscribe(levels => {
        this.levels = levels
      })
      this.ls.findAllLearningYearObject().subscribe(years => {
        this.years = years
      })

      this.as.user.subscribe(user => this.user = user)

  	}

    openLearningPiece() {
      let dialogRef = this.dialog.open(MyStudentLearningPieceDialogComponent, {
        data: {
          'learningBlock': this.chosenBlock,
          'learningPieceKeys': this.learningPieceKeys   
              }
        // position: {
        //     top: '0',
        //     left: '0',
        //     right: '0'
        //   },
        //   height: '90%',
        //   width: '100%',
      });
    }

    handleData($event){
      this.chosenGroup = $event.group
      this.chosenBlock = $event.block
      this.openLearningPiece()
    }

    recievedForm($event){
      console.log($event)
    }

}

import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'

import { AuthenticationService } from '../../../shared-security/authentication.service'
import { LearningExperienceService } from '../../markbook/models/learning-experience.service';
import { MyStudentsService } from '.././models/my-student.service'

import { LearningAssessmentPieceModel } from '../../markbook/models/data-classes'
import { StudentModel } from '../../../student-shared/data-classes'
import { UserModel } from '../../../users/models/data-classes'


@Component({
  selector: 'app-my-student-learning-piece',
  templateUrl: './my-student-learning-piece.component.html',
  styleUrls: ['./my-student-learning-piece.component.css']
})
export class MyStudentLearningPieceComponent implements OnInit{ 
    user: UserModel;

    studentInfo: StudentModel

    blockId: string;
    groupId: string;
    studentId : string;

    groups: LearningAssessmentPieceModel[];

    xheaders: any[];
    yheaders: any[];
    learningPieceKeys: Array<string> = [];

  	constructor(private route: ActivatedRoute,
                private ls: LearningExperienceService,
                private ms: MyStudentsService,
                private as: AuthenticationService,
                private loc: Location) { }

  	ngOnInit() {
      this.blockId = this.route.snapshot.params['blockid'];
      this.groupId = this.route.snapshot.params['groupid'];
      this.studentId = this.route.snapshot.params['studentid'];
      this.ls.findPiecesForBlocks(this.blockId).subscribe(groups => this.groups = groups)
      this.ls.findXHeadersForBlocks(this.blockId).subscribe(xheaders => this.xheaders = xheaders);
      this.ls.findYHeadersForBlocks(this.blockId).subscribe(yheaders => this.yheaders = yheaders);

      this.ms.findPiecesForStudentObject(this.studentId).subscribe(item => 
          {
          this.learningPieceKeys = Object.keys(item)
          })
      this.ms.findStudentForKey(this.studentId).subscribe(student => this.studentInfo = student);
      this.as.user.subscribe(user => this.user = user)


    }

    backClicked() {
        this.loc.back();
    }

    addStudent(key) {
       this.ls.putStudentInLearningPiece(this.groupId,this.blockId,key,this.studentId)
    }

    removeStudent(key) {
      if (this.learningPieceKeys.length > 1)
        {
        this.ls.removeStudentFromLearningPiece(key,this.studentId)
        }
      else 
        {
        this.ls.removeStudentFromLearningPiece(key,this.studentId)
        this.learningPieceKeys = []
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


import { Component, OnInit, Input } from '@angular/core';

import { LearningExperienceService } from '../../models/learning-experience.service';


import { LearningAssessmentPieceModel } from '../../models/data-classes';
import { StudentModel } from '../../../student-shared/data-classes';


import { LEStudentListPieceRemoveDialogComponent,
         LEStudentListPieceAddDialogComponent } from '../../learning-experience-dialogs/learning-experience-dialogs.component';

import { LePieceCreateDialogComponent,
         LePieceEditDialogComponent } from '../../learning-experience-dialogs/learning-experience-dialogs-forms.component';

import { MdDialog, MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-learning-experience-piece-item',
  templateUrl: './learning-experience-piece-item.component.html',
  styleUrls: ['./learning-experience-piece-item.component.css']
})
export class LearningExperiencePieceItemComponent implements OnInit {
  @Input() group: LearningAssessmentPieceModel;
  @Input() groupId: string;
  @Input() blockId: string;

  constructor(public dialog: MdDialog,
        	  public snackBar: MdSnackBar,
        	  private ls: LearningExperienceService) { }

  ngOnInit() {
  }

  	openDialogAddStudent(group) {
      	let dialogRef = this.dialog.open(LEStudentListPieceAddDialogComponent, {
          	data: {
                  'studentGroup' : group 
                },
          	position: {
            	top: '0',
			},
          	height: '90%',
          	width: '500px'
        	});
      	dialogRef.afterClosed().subscribe(result => {
        if (result) {
        	this.addStudent2LearningBlock(this.groupId, this.blockId, group.$key, result) 
        	}
        })
    }

    openDialogRemoveStudent(group) {
      	let dialogRef = this.dialog.open(LEStudentListPieceRemoveDialogComponent, {
          	data: {
                  'lePiece' : group 
                },
    		position: {
            top: '0',
			},
          	height: '90%',
          	width: '500px'
        	});
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          	this.removeStudent2LearningBlock(this.groupId, this.blockId, group.$key, result)
        	}	    
      	})
    }

    openDialogEditPiece(key) {
      let dialogRef = this.dialog.open(LePieceEditDialogComponent, {  
        data: {
           'key': key
        	}
       	});
      
        dialogRef.afterClosed().subscribe(result => {
      		if (result) {
      			this.editLearningPiece(key, result)
      		}
        });
    }


    addStudent2LearningBlock(groupKey:string, blockKey:string, pieceKey:string, students: StudentModel[]){
      this.ls.putStudentsInLearningPiece(groupKey, blockKey, pieceKey, students).subscribe(
              () => {
                  this.snackBar.open('Students Saved','Awesome',{ duration:2000 })
              },
              err => { 
                  this.snackBar.open('Error Saving Lesson Students ${err}','Bugger',{ duration:2000 })
              }
          );
    }

    removeStudent2LearningBlock(groupKey:string, blockKey:string, pieceKey:string, students: StudentModel[]){
      this.ls.removeStudentsFromLearningPiece(groupKey, blockKey, pieceKey, students).subscribe(
              () => {
                  this.snackBar.open('Students Deleted','Awesome',{ duration:2000 })
              },
              err => { 
                  this.snackBar.open('Error Deleting Students ${err}','Bugger',{ duration:2000 })
              }
          );
    }

    removePiece(){
    	this.ls.removeLearningExperiencePieceUnderBlock(this.blockId, this.group.$key).subscribe(
            () => {
                this.snackBar.open('Learning Piece Deleted','Awesome',{ duration:2000 })
            },
            err => { 
                this.snackBar.open('Error Deleting Learning Piece ${err}','Bugger',{ duration:2000 })
            }
        );

    }

    editLearningPiece(key, form) {
      this.ls.editLearningExperiencePiece(key, form.value).subscribe(
              () => {
                this.snackBar.open('Lesson Group Saved','Awesome',{ duration:2000 })
              },
              err => { 
                this.snackBar.open('Error Saving Lesson Group ${err}','Bugger',{ duration:2000 })
              }
          );
    }
}

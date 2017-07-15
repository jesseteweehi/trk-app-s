import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable, Subject} from "rxjs/Rx";

import { MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import { LearningExperienceService } from '../models/learning-experience.service';

import { LearningAssessmentPieceModel } from '../models/data-classes';

import { LEStudentListPieceRemoveDialogComponent,
         LEStudentListPieceAddDialogComponent,
         LEStudentListBlockDialogComponent,
         LEStudentListGroupDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs.component';

import { LePieceCreateDialogComponent,
         LePieceEditDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs-forms.component';

import { LearningExperienceFormHeaderComponent } from '../learning-experience-form/learning-experience-form.component'

import { StudentModel } from '../../student-shared/data-classes';

@Component({
  selector: 'app-learning-experience-container',
  templateUrl: './learning-experience-container.component.html',
  styleUrls: ['./learning-experience-container.component.css']
})

export class LearningExperienceContainerComponent implements OnInit {    
    groups: LearningAssessmentPieceModel[];
  	blockId: string;
    groupId: string;


    xheaders: any[];
    yheaders: any[];

    	constructor(
    		private route: ActivatedRoute,
    		private ls: LearningExperienceService,
    		public dialog: MdDialog,
        public snackBar: MdSnackBar) {
    	}

      ngOnInit() {
      	this.blockId = this.route.snapshot.params['blockid'];
        this.groupId = this.route.snapshot.params['groupid']
      	this.ls.findPiecesForBlocks(this.blockId).subscribe(groups => this.groups = groups);
        this.ls.findXHeadersForBlocks(this.blockId).subscribe(xheaders => this.xheaders = xheaders);
        this.ls.findYHeadersForBlocks(this.blockId).subscribe(yheaders => this.yheaders = yheaders);
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

      lock(key) {
        this.ls.lockLearningPiece(key).subscribe(
                      () => {
                          this.snackBar.open('Learning Piece Locked','Awesome',{ duration:2000 })
                      },
                      err => { 
                          this.snackBar.open('Error Locking Learning Piece ${err}','Bugger',{ duration:2000 })
                      }
                  );
      }


      removePiece(key){
        if (this.groups.length === 1) { 
          this.ls.removeLearningExperiencePieceUnderBlock(this.blockId, key).subscribe(
                      () => {
                          this.snackBar.open('Learning Piece Deleted','Awesome',{ duration:2000 })
                      },
                      err => { 
                          this.snackBar.open('Error Deleting Learning Piece ${err}','Bugger',{ duration:2000 })
                      }
                  );
          this.groups = []
          }
        else {
          this.ls.removeLearningExperiencePieceUnderBlock(this.blockId, key).subscribe(
                      () => {
                          this.snackBar.open('Learning Piece Deleted','Awesome',{ duration:2000 })
                      },
                      err => { 
                          this.snackBar.open('Error Deleting Learning Piece ${err}','Bugger',{ duration:2000 })
                      }
                  );
        }
      }

      openDialogEditPiece(key) {
        let dialogRef = this.dialog.open(LePieceEditDialogComponent, {  
          data: {
            'key': key
          }
         });
        
        dialogRef.afterClosed().subscribe(result => {
           if (result)
             {this.editLearningPiece(key, result)}
        });
      }
      
      openDialogCreatePiece() {
      let dialogRef = this.dialog.open(LePieceCreateDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result)
      	{this.firebaseLearningExperienceBlock(result)}
          });
      }

      openDialogHeader() {
      let dialogRef = this.dialog.open(LearningExperienceFormHeaderComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result)
        {this.firebaseHeader(result)}
          });
      }

      openDialogAddStudent(group) {
      let dialogRef = this.dialog.open(LEStudentListPieceAddDialogComponent, {
          data: {
                  'studentGroup' : group 
                },
          position: {
            top: '0',

          }
          ,
          height: '90%',
          width: '500px'
        });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        this.createStudent2LearningBlock(this.groupId, this.blockId, group.$key, result) 
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

          }
          ,
          height: '90%',
          width: '500px'
        });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.removeStudent2LearningBlock(this.groupId, this.blockId, group.$key, result)
        }    
      })
    }

    createStudent2LearningBlock(groupKey:string, blockKey:string, pieceKey:string, students: StudentModel[]){
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
    
    firebaseLearningExperienceBlock(form) {
      this.ls.createNewLearningExperiencePieceUnderBlock(this.blockId, form.value).subscribe(
      	      () => {
      		      this.snackBar.open('Lesson Group Saved','Awesome',{ duration:2000 })
      		    },
      		    err => { 
      		      this.snackBar.open('Error Saving Lesson Group ${err}','Bugger',{ duration:2000 })
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
    
    firebaseHeader(form) {
        
        this.ls.createHeadingUnderBlock(this.blockId, form.value).subscribe(
              () => {
                  this.snackBar.open('Header Saved','Awesome',{ duration:2000 })
              },
              err => { 
                  this.snackBar.open('Error Saving Header ${err}','Bugger',{ duration:2000 })
              }
          );
    }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable, Subject} from "rxjs/Rx";

import { MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';
import { LearningExperienceService } from '../models/learning-experience.service';
import { StudentsSharedService } from '../../../student-shared/student-shared.service';
import { LearningAssessmentPieceModel } from '../models/data-classes';
import { CohortModel } from '../../../all-students/cohorts/models/data-classes'

import { CohortListDialogComponent } from '../../../all-students/cohorts/cohorts-dialogs/cohorts-dialogs.component'

import { CohortCompareDialogComponent,
         LEStudentListPieceRemoveDialogComponent,
         LEStudentListPieceAddDialogComponent,
         LEStudentListBlockDialogComponent,
         LEStudentListGroupDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs.component';

import { LePieceCreateDialogComponent,
         LePieceEditDialogComponent,
         HeaderCreateDialogComponent,
         HeaderEditDialogComponent } from '../learning-experience-dialogs/learning-experience-dialogs-forms.component';

import { StudentModel } from '../../../student-shared/data-classes';

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

    cohortData: object = {};
    students: any[];

    cohort: CohortModel;


    constructor(
    		private route: ActivatedRoute,
    		private ls: LearningExperienceService,
        private ss: StudentsSharedService,
    		public dialog: MdDialog,
        public snackBar: MdSnackBar) {
    	  }

    ngOnInit() {
      this.blockId = this.route.snapshot.params['blockid'];
      this.groupId = this.route.snapshot.params['groupid']
      this.ls.findPiecesForBlocks(this.blockId).subscribe(groups => this.groups = groups)
      this.ls.findStudentsForPiecesForBlock(this.blockId).subscribe(students => this.students = students)
      this.ls.findXHeadersForBlocks(this.blockId).subscribe(xheaders => this.xheaders = xheaders);
      this.ls.findYHeadersForBlocks(this.blockId).subscribe(yheaders => this.yheaders = yheaders);
      }

 

    openCohorts() {
      let dialogRef = this.dialog.open(CohortListDialogComponent, {
        position: {
            top: '0',
          },
          height: '90%',
          width: '500px'
      });
      dialogRef.afterClosed().subscribe(result => {
           if (result)
              this.cohort = result;
              this.cohortData = {}                     
                });
    }

    compare(cohortK, pieceK, pieceA){
      this.ls.findStudentKeysForCohort(cohortK).subscribe(cohort => {

        let output: object = {}

         output = {}

         let tablepiece: Object = {};
         pieceA.map(object => {
           tablepiece[object.$key] = object})
         
         let inside = cohort.filter(obj => {
           return (obj.$key in tablepiece)
         })

         let difference: Object= {};
         inside.map(object => {
           difference[object.$key] = object})
         
         let outside = cohort.filter(obj => {
            return !(obj.$key in difference) 
         })

         output['cohortinpiece'] = inside
         output['cohortoutpiece'] = outside
         output['all'] = cohort
         this.cohortData[pieceK] = output
      })      
    }
   

    yheader(i) {
      // grid Area : row-start,row-end, column-start, column-end
        let styles = {
            'grid-row': + (i+1) + '/' + (i+2),
            'grid-column': '1 / 2',
            // 'text-align': 'center',

        }
        return styles
      }

    xheader(i) {
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
                 // this.xheader.length + 1
                  'grid-template-columns' : 'repeat(' + (this.yheaders.length+1) + ', 1fr)' 
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

    lockPiece(key) {
      this.ls.lockLearningPiece(key).subscribe(
                      () => {
                          this.snackBar.open('Learning Piece Locked','Awesome',{ duration:2000 })
                      },
                      err => { 
                          this.snackBar.open('Error Locking Learning Piece ${err}','Bugger',{ duration:2000 })
                      }
                  );
      }

    lockHeader(key,axis) {
        this.ls.lockHeader(this.blockId, axis, key).subscribe(
               () => {
                   this.snackBar.open('Header locked','Awesome',{ duration:2000 })
               },
               err => { 
                   this.snackBar.open('Error locking Header ${err}','Bugger',{ duration:2000 })
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
          this.groups = [];
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

    removeXHeader(key) {
      if (this.xheaders.length === 1) {
        this.ls.removeXHeaderUnderBlock(this.blockId, key).subscribe(
                      () => {
                          this.snackBar.open('Header Deleted','Awesome',{ duration:2000 })
                      },
                      err => { 
                          this.snackBar.open('Error Deleting Header ${err}','Bugger',{ duration:2000 })
                      }
                  );
        this.xheaders = [];
        }
      else {
        this.ls.removeXHeaderUnderBlock(this.blockId, key).subscribe(
                      () => {
                          this.snackBar.open('Header Deleted','Awesome',{ duration:2000 })
                      },
                      err => { 
                          this.snackBar.open('Error Deleting Header ${err}','Bugger',{ duration:2000 })
                      }
                  );
        }
      }

    removeYHeader(key) {
      if (this.yheaders.length === 1) {
        this.ls.removeYHeaderUnderBlock(this.blockId, key).subscribe(
                      () => {
                          this.snackBar.open('Header Deleted','Awesome',{ duration:2000 })
                      },
                      err => { 
                          this.snackBar.open('Error Deleting Header ${err}','Bugger',{ duration:2000 })
                      }
                  );
        this.yheaders = [];
        }
        else {
        this.ls.removeYHeaderUnderBlock(this.blockId, key).subscribe(
                      () => {
                          this.snackBar.open('Header Deleted','Awesome',{ duration:2000 })
                      },
                      err => { 
                          this.snackBar.open('Error Deleting Header ${err}','Bugger',{ duration:2000 })
                      }
                  );
        }
      }

    openDialogEditPiece(key) {
      let dialogRef = this.dialog.open(LePieceEditDialogComponent, {  
          data: {
            'key': key,
            'block': this.blockId
          }
         });
        
        dialogRef.afterClosed().subscribe(result => {
           if (result)
             {this.editLearningPiece(key, result)}
        });
      }
      
    openDialogCreatePiece() {
      let dialogRef = this.dialog.open(LePieceCreateDialogComponent,{
        data: {
          'block': this.blockId
        }       
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result)
      	{this.firebaseLearningExperienceBlock(result)}
          });
      }

    openDialogHeader() {
      let dialogRef = this.dialog.open(HeaderCreateDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result)
        {this.addHeader(result)}
          });
      }

    openDialogEditHeader(key, axis) {
        let dialogRef = this.dialog.open(HeaderEditDialogComponent, {
          data: {
            'key':key,
            'block': this.blockId,
            'axis' : axis
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result)
            {
              this.editHeader(axis, key, result)
            }
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
          this.removeStudent2LearningBlock(group.$key, result)
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

    removeStudent2LearningBlock(pieceKey:string, students: StudentModel[]){
      this.ls.removeStudentsFromLearningPiece(pieceKey, students).subscribe(
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
      		      this.snackBar.open('Lesson Piece Saved','Awesome',{ duration:2000 })
      		    },
      		    err => { 
      		      this.snackBar.open('Error Saving Lesson Piece ${err}','Bugger',{ duration:2000 })
      		    }
      		);
      }

    editLearningPiece(key, form) {
      this.ls.editLearningExperiencePiece(this.blockId, key, form.value).subscribe(
              () => {
                this.snackBar.open('Lesson Group Saved','Awesome',{ duration:2000 })
              },
              err => { 
                this.snackBar.open('Error Saving Lesson Group ${err}','Bugger',{ duration:2000 })
              }
          );
      }
    
    addHeader(form) {
        
      this.ls.createHeadingUnderBlock(this.blockId, form.value).subscribe(
              () => {
                  this.snackBar.open('Header Saved','Awesome',{ duration:2000 })
              },
              err => { 
                  this.snackBar.open('Error Saving Header ${err}','Bugger',{ duration:2000 })
              }
          );
      }

    
    editHeader(axis, key, form) {     
      this.ls.editHeader(this.blockId, axis, key, form.value).subscribe(
              () => {
                  this.snackBar.open('Header Saved','Awesome',{ duration:2000 })
              },
              err => { 
                  this.snackBar.open('Error Saving Header ${err}','Bugger',{ duration:2000 })
              }
          );
      }

}

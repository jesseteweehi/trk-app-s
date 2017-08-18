import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CohortModel } from '../models/data-classes';
import { CohortsService } from '../models/cohorts.service';
import {Observable, Subject} from "rxjs/Rx";
import {MdDialogModule, MdDialog, MdDialogConfig, MdSnackBar } from '@angular/material';

import { 
     CohortsCreateDialogComponent,
		 CohortsEditDialogComponent } from '../cohorts-dialogs/cohorts-dialogs-forms.component'

import { CohortListDialogComponent,
         CohortStudentListPieceAddDialogComponent ,
         CohortStudentListPieceRemoveDialogComponent} from '../cohorts-dialogs/cohorts-dialogs.component'

@Component({
  selector: 'app-cohorts-container',
  templateUrl: './cohorts-container.component.html',
  styleUrls: ['./cohorts-container.component.css']
})
export class CohortsContainerComponent implements OnInit {
	filtered: CohortModel[];
	cohorts: CohortModel[];

	normalState: boolean = true;


  	constructor(
  		private cs: CohortsService,
  		private dialog: MdDialog,
  		private snackBar: MdSnackBar) { }

  	ngOnInit() {
  		this.cs.findAllCohorts().subscribe(cohorts => {
  			this.cohorts = this.filtered = cohorts;
  		})
  	}

  	create() {
  	  let dialogRef = this.dialog.open(CohortsCreateDialogComponent);
  	  dialogRef.afterClosed().subscribe(result => {
  	      if(result)
  	      {this.cs.createCohort(result.value).subscribe(
  	                      () => {
  	                              this.snackBar.open('Cohort Saved','Awesome',{ duration:2000 })
  	                          },
  	                          err => { 
  	                              this.snackBar.open('Error Saving Cohort ${err}','Bugger',{ duration:2000 })
  	                          }
  	                      );
  	              }});
  	}

  	edit(key) {
  	   let dialogRef = this.dialog.open(CohortsEditDialogComponent, {
  	     data: {
  	       'key': key
  	     },
  	     width: '500px'
  	   });
  	   dialogRef.afterClosed().subscribe(result => {
  	       if(result)
  	       { console.log(result);
  	         this.cs.editCohort(key, result.value).subscribe(
  	                       () => {
  	                               this.snackBar.open('Cohort Saved','Awesome',{ duration:2000 })
  	                           },
  	                           err => { 
  	                               this.snackBar.open('Error Saving Cohort ${err}','Bugger',{ duration:2000 })
  	                           }
  	                       );
  	               }});
  	}

  	remove(key) {
  	  this.cs.removeCohort(key).subscribe(
  	       () => {
  	           this.snackBar.open('Cohort Deleted','Awesome',{ duration:2000 })
  	       },
  	       err => { 
  	           this.snackBar.open('Error Deleting Cohort ${err}','Bugger',{ duration:2000 })
  	       });
  	       if (!this.normalState) {
  	         this.showArchived()
  	       }
  	}

  	normal() {
  	  this.filtered = this.cohorts.filter(group => !group.archived)
  	  this.normalState=true
  	}

  	showArchived() {
  	  this.filtered = this.cohorts
  	  this.normalState=false
  	}

  	archive(key) {  
  	  this.cs.archiveCohort(key).subscribe(
  	       () => {
  	           this.snackBar.open('Lesson Group Archived','Awesome',{ duration:2000 })
  	       },
  	       err => { 
  	           this.snackBar.open('Error Archiving Lesson Group ${err}','Bugger',{ duration:2000 })
  	       }
  	  );
  	}

  	unarchive(key) {    
  	  this.cs.unarchiveCohort(key).subscribe(
  	       () => {
  	           this.snackBar.open('Cohort unarchived','Awesome',{ duration:2000 })
  	       },
  	       err => { 
  	           this.snackBar.open('Error unarchiving Cohort ${err}','Bugger',{ duration:2000 })
  	       }
  	  );
  	}

    lock(key) {
      this.cs.lockCohort(key).subscribe(
           () => {
               this.snackBar.open('Lesson Group Locked','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error Locking Lesson Group ${err}','Bugger',{ duration:2000 })
           }
      );
    }

    openDialogAddStudent(group) {
      let dialogRef = this.dialog.open(CohortStudentListPieceAddDialogComponent, {
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
            this.cs.putStudentsInCohort(group.$key, result).subscribe(
               () => {
                   this.snackBar.open('Students added','Awesome',{ duration:2000 })
               },
               err => { 
                   this.snackBar.open('Error adding students ${err}','Bugger',{ duration:2000 })
               }
          );
        }
      })
    }

    openDialogRemoveStudent(group) {
      let dialogRef = this.dialog.open(CohortStudentListPieceRemoveDialogComponent, {
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
          this.cs.removeStudentsFromCohort(group.$key, result).subscribe(
                         () => {
                             this.snackBar.open('Students deleted','Awesome',{ duration:2000 })
                         },
                         err => { 
                             this.snackBar.open('Error deleting students ${err}','Bugger',{ duration:2000 })
                         }
                    );
        }    
      })
    }
}

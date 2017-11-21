import { Component, OnChanges, Input } from '@angular/core';

import { UserModel } from '../../users/models/data-classes'
import { CohortModel } from '../../all-students/cohorts/models/data-classes'

import { MyDashboardService } from '../my-dashboard.service'
import { CohortsService } from '../../all-students/cohorts/models/cohorts.service';
import { MdDialog, MdSnackBar } from '@angular/material';

import { CohortStudentListPieceAddDialogComponent , CohortStudentListPieceRemoveDialogComponent} from '../../all-students/cohorts/cohorts-dialogs/cohorts-dialogs.component'

@Component({
  selector: 'app-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: ['./cohorts.component.css']
})
export class CohortsComponent implements OnChanges{
  @Input() user : UserModel;
 	@Input() cohorts : CohortModel[]
	filtered: CohortModel[];

  	constructor(
  		private cs: CohortsService,
      private ds: MyDashboardService,
  		private dialog: MdDialog,
  		private snackBar: MdSnackBar) { }

  	ngOnChanges() {
  		this.filtered = this.cohorts
  	}

  	remove(key) {
      if (this.cohorts.length > 1) 
        {
          this.ds.removeCohortFromUser(this.user.$key, key).subscribe(
                       () => {
                           this.snackBar.open('Cohort Removed','Awesome',{ duration:2000 })
                       },
                       err => { 
                           this.snackBar.open('Error removing students ${err}','Bugger',{ duration:2000 })
                       }
                  );
        }
      else {
          this.ds.removeCohortFromUser(this.user.$key, key).subscribe(
                       () => {
                           this.snackBar.open('Cohort Removed','Awesome',{ duration:2000 })
                       },
                       err => { 
                           this.snackBar.open('Error removing students ${err}','Bugger',{ duration:2000 })
                       }
                  );
          this.filtered = [];
      }
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


import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';

import { UserModel } from '../../users/models/data-classes'
import { CohortModel } from '../../all-students/cohorts/models/data-classes'
import { LearningAssessmentGroupModel } from '../../all-markbook/markbook/models/data-classes'
import { StudentModel } from '../../student-shared/data-classes';



import { MyDashboardService } from '../my-dashboard.service'
import { AuthenticationService } from '../../shared-security/authentication.service'

import { MyDashBoardCohortAddDialogComponent, MyDashBoardStudentAddDialogComponent, MyDashBoardlearningGroupAddDialogComponent} from '../my-dashboard-dialogs/my-dashboard-dialogs.component';


@Component({
  selector: 'app-my-dashboard-container',
  templateUrl: './my-dashboard-container.component.html',
  styleUrls: ['./my-dashboard-container.component.css']
})
export class MyDashboardContainerComponent implements OnInit {

  user: UserModel;
  cohorts: CohortModel[];
  groups: LearningAssessmentGroupModel[];
  students: StudentModel[];

  constructor(
  	public dialog: MdDialog,
  	public snackBar: MdSnackBar,
  	private ds : MyDashboardService,
    private as : AuthenticationService
  	) { }

  	ngOnInit() {
      this.as.user.subscribe(user=>{
        if (user)
        {
          this.user = user
          this.ds.findCohortsForUser(user.$key).subscribe(cohorts => this.cohorts = cohorts)
          this.ds.findGroupsForUser(user.$key).subscribe(groups => this.groups = groups)
          this.ds.findStudentsForUser(user.$key).subscribe(students => this.students = students)}
      })
      }

  	openStudentList()	{
	let dialogRef = this.dialog.open(MyDashBoardStudentAddDialogComponent, {
      position: {
          top: '0',
        },
        height: '90%',
        width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
         if (result)
              	{
                  this.ds.putStudentsForUser(this.user.$key, result).subscribe(
               () => {
                   this.snackBar.open('Students Saved','Awesome',{ duration:2000 })
               },
               err => { 
                   this.snackBar.open('Error Saving Students ${err}','Bugger',{ duration:2000 })
               }
            );
              	}                     
              });
  	}

  	openLearningGroupList()  {
	let dialogRef = this.dialog.open(MyDashBoardlearningGroupAddDialogComponent, {
      position: {
          top: '0',
        },
        height: '90%',
        width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
         if (result)
                {
                  this.ds.putGroupsForUser(this.user.$key, result).subscribe(
               () => {
                   this.snackBar.open('Learning Groups Saved','Awesome',{ duration:2000 })
               },
               err => { 
                   this.snackBar.open('Error Saving Learning Groups ${err}','Bugger',{ duration:2000 })
               }
            );
                }                     
              });

  	}

  	openCohortList()	{
  	let dialogRef = this.dialog.open(MyDashBoardCohortAddDialogComponent, {
        position: {
            top: '0',
          },
          height: '90%',
          width: '500px'
      });
      dialogRef.afterClosed().subscribe(result => {
         if (result)
                {
                  this.ds.putCohortForUser(this.user.$key, result).subscribe(
               () => {
                   this.snackBar.open('Cohorts Saved','Awesome',{ duration:2000 })
               },
               err => { 
                   this.snackBar.open('Error Saving Cohorts ${err}','Bugger',{ duration:2000 })
               }
            );
                }                     
              });
  	}

}

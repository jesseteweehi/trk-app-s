import { Component, OnInit } from '@angular/core';
import { LearningExperienceService } from '../models/learning-experience.service'
import { LearningLevelModel,
	     LearningAreaModel,
	 	 LearningYearModel} from'../models/data-classes'

import { MdDialog,  MdSnackBar } from '@angular/material';
import { LearningYearCreateDialogComponent,
		 LearningYearEditDialogComponent,
         LearningLevelCreateDialogComponent,
         LearningLevelEditDialogComponent,
         LearningAreaCreateDialogComponent,
         LearningAreaEditDialogComponent } from '../learning-experience-dialogs/le-support-dialog-forms-lists.component';


@Component({
	selector: 'app-learning-year-list',
	template:
	`
	<button md-icon-button color="primary" (click)="createLearningLevel()"><md-icon>add</md-icon></button> 

	<md-list>
	 	<md-list-item *ngFor="let year of years">
	 		<h3 md-line>{{year.year}}</h3>
	 	
	 	<button class="right" (click)="edit(year.$key)"md-icon-button><md-icon>edit</md-icon></button>	
	 	<button class="right" (click)="remove(year.$key)" md-icon-button><md-icon>delete</md-icon></button>	
	 	</md-list-item>
	</md-list>
	`,
	styles:[`
	md-list-item:not(:last-child) {
	    border-bottom: solid 1px lightgrey
	}=

	.right {
		margin-left: auto;
	}
	.grey {
		font-size: 15px;
		color: grey;
	}

	`]
})

export class learningYearListComponent implements OnInit {
	years: LearningYearModel[]
	
	constructor(private ls:LearningExperienceService,
				public snackBar: MdSnackBar,
				public dialog: MdDialog) {}

	ngOnInit(){
		this.ls.findAllLearningYears().subscribe(years => this.years = years)
	}

	remove(key){
		console.log(key)
		this.ls.removeLearningYearByKey(key).subscribe(
           () => {
               this.snackBar.open('Year Deleted','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error Deleting Year ${err}','Bugger',{ duration:2000 })
           });
	}

	createLearningLevel(){
		let dialogRef = this.dialog.open(LearningYearCreateDialogComponent);
		dialogRef.afterClosed().subscribe(result => {
		    if(result)
		    {this.ls.createLearningYear(result.value).subscribe(
		                    () => {
		                            this.snackBar.open('Year Saved','Awesome',{ duration:2000 })
		                        },
		                        err => { 
		                            this.snackBar.open('Error Saving Year ${err}','Bugger',{ duration:2000 })
		                        }
		                    );
		            }});
	}

	edit(key){
		let dialogRef = this.dialog.open(LearningYearEditDialogComponent, {
		  data: {
		    'key': key
		  },
		  width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
		    if(result)
		    { console.log(result);
		      this.ls.editLearningYear(key, result.value).subscribe(
		                    () => {
		                            this.snackBar.open('Year Saved','Awesome',{ duration:2000 })
		                        },
		                        err => { 
		                            this.snackBar.open('Error Saving Year ${err}','Bugger',{ duration:2000 })
		                        }
		                    );
		            }});
	}
}


@Component({
	selector: 'app-learning-level-list',
	template:
	`
	<button md-icon-button color="primary" (click)="createLearningLevel()"><md-icon>add</md-icon></button> 

	<md-list>
	 	<md-list-item *ngFor="let level of levels">
	 		<h3 md-line>{{level.level}}{{level.qualifier}}</h3>
	 			<p md-line>
	 				<span class="grey">{{level.title}}</span>
	 			
	 		  		<span class="right">{{level.description}}</span>
	 		  	</p>
	 	<button class="right" (click)="edit(level.$key)"md-icon-button><md-icon>edit</md-icon></button>	
	 	<button class="right" (click)="remove(level.$key)" md-icon-button><md-icon>delete</md-icon></button>	
	 	</md-list-item>
	</md-list>
	`,
	styles:[`
	md-list-item:not(:last-child) {
	    border-bottom: solid 1px lightgrey
	}=

	.right {
		margin-left: auto;
	}
	.grey {
		font-size: 15px;
		color: grey;
	}

	`]
})

export class learningLevelListComponent implements OnInit {
	levels: LearningLevelModel[]
	
	constructor(private ls:LearningExperienceService,
				public snackBar: MdSnackBar,
				public dialog: MdDialog) {}

	ngOnInit(){
		this.ls.findAllLearningLevels().subscribe(levels => this.levels = levels)
	}

	remove(key){
		console.log(key)
		this.ls.removeLearningLevelByKey(key).subscribe(
           () => {
               this.snackBar.open('Lesson Group Deleted','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error Deleting Lesson Group ${err}','Bugger',{ duration:2000 })
           });
	}

	createLearningLevel(){
		let dialogRef = this.dialog.open(LearningLevelCreateDialogComponent);
		dialogRef.afterClosed().subscribe(result => {
		    if(result)
		    {this.ls.createLearningLevel(result.value).subscribe(
		                    () => {
		                            this.snackBar.open('Lesson Level Saved','Awesome',{ duration:2000 })
		                        },
		                        err => { 
		                            this.snackBar.open('Error Saving Lesson Level ${err}','Bugger',{ duration:2000 })
		                        }
		                    );
		            }});
	}

	edit(key){
		let dialogRef = this.dialog.open(LearningLevelEditDialogComponent, {
		  data: {
		    'key': key
		  },
		  width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
		    if(result)
		    { console.log(result);
		      this.ls.editLearningLevel(key, result.value).subscribe(
		                    () => {
		                            this.snackBar.open('Learning Level Saved','Awesome',{ duration:2000 })
		                        },
		                        err => { 
		                            this.snackBar.open('Error Saving Learning Level ${err}','Bugger',{ duration:2000 })
		                        }
		                    );
		            }});
	}
}

@Component({
	selector: 'app-learning-area-list',
	template:
	`
	<button md-icon-button color="primary" (click)="create()"><md-icon>add</md-icon></button> 
	<md-list>
	 	<md-list-item *ngFor="let area of areas">
	 		<h3 md-line>{{area.title}}</h3>
	 			<p md-line>
	 		  		{{area.description}} 
	 			</p>
	 	<button class="right" (click)="edit(area.$key)"md-icon-button><md-icon>edit</md-icon></button>
	 	<button class="right" (click)="remove(area.$key)" md-icon-button><md-icon>delete</md-icon></button>	
	
	 	</md-list-item>
	</md-list>
	`,
	styles:[`
	md-list-item:not(:last-child) {
	    border-bottom: solid 1px lightgrey
	}
	.right {
		margin-left: auto;
	}
	.grey {
		font-size: 15px;
		color: grey;
	}
	`]
})

export class learningAreaListComponent implements OnInit {
	areas: LearningAreaModel[]
	
	constructor(private ls:LearningExperienceService,
				public snackBar: MdSnackBar,
				public dialog: MdDialog) {}

	ngOnInit(){
		this.ls.findAllLearningAreas().subscribe(areas => this.areas = areas)
	}

	remove(key){
		this.ls.removeLearningAreaByKey(key).subscribe(
           () => {
               this.snackBar.open('Lesson Area Deleted','Awesome',{ duration:2000 })
           },
           err => { 
               this.snackBar.open('Error Deleting Lesson Area ${err}','Bugger',{ duration:2000 })
           });
	}

	create(){
		let dialogRef = this.dialog.open(LearningAreaCreateDialogComponent);
		dialogRef.afterClosed().subscribe(result => {
		    if(result)
		    {this.ls.createLearningArea(result.value).subscribe(
		                    () => {
		                            this.snackBar.open('Learning Area Saved','Awesome',{ duration:2000 })
		                        },
		                        err => { 
		                            this.snackBar.open('Error Saving Learning Area ${err}','Bugger',{ duration:2000 })
		                        }
		                    );
		            }});
	}

	edit(key){
		let dialogRef = this.dialog.open(LearningAreaEditDialogComponent, {
		  data: {
		    'key': key
		  },
		  width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
		    if(result)
		    { console.log(result);
		      this.ls.editLearningLevel(key, result.value).subscribe(
		                    () => {
		                            this.snackBar.open('Learning Area Saved','Awesome',{ duration:2000 })
		                        },
		                        err => { 
		                            this.snackBar.open('Error Saving Learning Area ${err}','Bugger',{ duration:2000 })
		                        }
		                    );
		            }});
	}
}

import { Component, OnInit } from '@angular/core';
import { LearningExperienceService } from '../models/learning-experience.service'
import { LearningLevelModel,
	     LearningAreaModel} from'../models/data-classes'

@Component({
	selector: 'app-learning-level-list',
	template:
	`
	<md-list>
	 	<md-list-item *ngFor="let level of levels">
	 		<h3 md-line>{{level.level}}{{level.qualifier}}</h3>
	 			<p md-line>
	 				<span class="grey">{{level.title}}</span>
	 			
	 		  		<span class="right">{{level.description}}</span>
	 		  	</p> 
	 	<button class="right" md-icon-button><md-icon>edit</md-icon></button>	
	 	<button class="right" md-icon-button><md-icon>delete</md-icon></button>	
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

export class learningLevelListComponent implements OnInit {
	levels: LearningLevelModel[]
	
	constructor(private ls:LearningExperienceService) {}

	ngOnInit(){
		this.ls.findAllLearningLevels().subscribe(levels => this.levels = levels)
	}
}

@Component({
	selector: 'app-learning-area-list',
	template:
	`
	<md-list>
	 	<md-list-item *ngFor="let area of areas">
	 		<h3 md-line>{{area.title}}</h3>
	 			<p md-line>
	 		  		{{area.description}} 
	 			</p>
	 	</md-list-item>
	</md-list>
	`,
	styles:[`
	md-list-item:not(:last-child) {
	    border-bottom: solid 1px lightgrey
	}
	p {
		color: grey;
	}
	`]
})

export class learningAreaListComponent implements OnInit {
	areas: LearningAreaModel[]
	
	constructor(private ls:LearningExperienceService) {}

	ngOnInit(){
		this.ls.findAllLearningAreas().subscribe(areas => this.areas = areas)
	}
}

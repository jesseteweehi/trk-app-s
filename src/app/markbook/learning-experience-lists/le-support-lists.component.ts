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
	 		<h3 md-line>{{level.level}} | {{level.qualifier}}</h3>
	 			<p md-line>
	 				{{level.title}}
	 			</p>
	 			<p md-line>
	 		  		{{level.description}} 
	 			</p>
	 	</md-list-item>
	</md-list>
	`,
	styles:[`

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
	 		<h3 md-line>{{level.title</h3>
	 			<p md-line>
	 		  		{{level.description}} 
	 			</p>
	 	</md-list-item>
	</md-list>
	`,
	styles:[`

	`]
})

export class learningAreaListComponent implements OnInit {
	areas: LearningAreaModel[]
	
	constructor(private ls:LearningExperienceService) {}

	ngOnInit(){
		this.ls.findAllLearningAreas().subscribe(areas => this.areas = areas)
	}
}

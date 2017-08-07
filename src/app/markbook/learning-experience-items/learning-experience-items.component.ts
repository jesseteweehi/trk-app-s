import { Component, Inject, OnInit, Input } from '@angular/core';
import { LearningExperienceService } from '../models/learning-experience.service';
import { 
    LearningAreaModel,
    LearningLevelModel} from '../models/data-classes'

@Component({
	selector: 'group-level-item',
	template:
	`
	<p><span mdTooltipPosition="right" mdTooltip="{{level?.description}}">{{level?.title}}</span></p>
	<p class="title">{{level?.level}} <span *ngIf="level?.qualifier">{{level?.qualifier}}</span></p>	
	`,
	styles:[`
	:host {
		display: block;
		min-width: 50px;
		text-overflow: ellipsis;
	}
	p {
		line-height: 10%;
	}
	span {
		font
	}
	.title {
		font-size: 12px;
		text-decoration: underline
	}
	`]
})

// transfer loading to parent container
export class LevelItemComponent {
	@Input() level: LearningLevelModel

}

@Component({
	selector: 'group-area-item',
	template:
	`
	<h3><span mdTooltipPosition="right" mdTooltip="{{area?.description}}">{{area?.title}}</span></h3>
	`,
	styles:[`

	`]
})

export class AreaItemComponent {
	@Input() area: LearningAreaModel;

}

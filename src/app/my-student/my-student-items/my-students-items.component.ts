import { Component, Input } from '@angular/core';
import { 
    LearningAssessmentPieceModel,
    LearningAssessmentGroupModel,
    LearningAssessmentBlockModel,
    LearningAssessmentHeaderModel} from '../../markbook/models/data-classes'

@Component({
	selector: 'my-student-group',
	template:
	`
	<span mdTooltipPosition="right" mdTooltip="{{group?.description}}">{{group?.title}}</span>
	`,
	styles:[`

	`]
})

export class MyStudentLearningGroupItemComponent {
	@Input() group: LearningAssessmentGroupModel 
}

@Component({
	selector: 'my-student-block',
	template:
	`
	<span mdTooltipPosition="right" mdTooltip="{{block?.description}}">{{block?.title}}</span>
	`,
	styles:[`

	`]
})

export class MyStudentLearningBlockItemComponent {
	@Input() block: LearningAssessmentBlockModel 
}

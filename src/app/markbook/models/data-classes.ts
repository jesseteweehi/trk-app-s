export class LearningAssessmentParameterModel {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string,
		){}
	static fromJsonList(array): LearningAssessmentParameterModel[] {
		return array.map( LearningAssessmentParameterModel.fromJson);
		}
	static fromJson({$key, created, title, description}): LearningAssessmentParameterModel {
		return new LearningAssessmentParameterModel(
			$key,
			created,
			title,
			description
			)
		}
	}
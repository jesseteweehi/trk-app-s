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

export class LearningAssessmentBlockModel {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string,
		public learningArea: string,
		public learningLevel: string,
		public rows: number,
		public x_headers: String[],
		public y_headers: String[],

		){}
	static fromJsonList(array): LearningAssessmentBlockModel[] {
		return array.map( LearningAssessmentBlockModel.fromJson);
		}
	static fromJson({$key, created, title, description, learningArea, LearningLevel, rows, x_headers, y_headers}): LearningAssessmentBlockModel {
		return new LearningAssessmentBlockModel(
			$key,
			created,
			title,
			description,
			learningArea,
			LearningLevel,
			rows,
			x_headers,
			y_headers
			)
		}
	}

export class LearningAssessmentGroupModel {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string,
		public learningArea: string,
		public learningLevel: string,
		){}
	static fromJsonList(array): LearningAssessmentGroupModel[] {
		return array.map( LearningAssessmentGroupModel.fromJson);
		}
	static fromJson({$key, created, title, description, learningArea, learningLevel}): LearningAssessmentGroupModel {
		return new LearningAssessmentGroupModel(
			$key,
			created,
			title,
			description,
			learningArea,
			learningLevel
			)
		}
	}
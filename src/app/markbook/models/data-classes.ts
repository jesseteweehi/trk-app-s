export class LearningAssessmentBlockTemplateModel {
	constructor(
		public $key: string,
		public created: string,
		public columns: number,
		) {}
	static fromJson({$key, created, columns}): LearningAssessmentBlockTemplateModel {
		return new LearningAssessmentBlockTemplateModel(
			$key,
			created,
			columns)
	    }
	}


export class LearningAssessmentPieceModel {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string,
		){}
	static fromJsonList(array): LearningAssessmentPieceModel[] {
		return array.map( LearningAssessmentPieceModel.fromJson);
		}
	static fromJson({$key, created, title, description}): LearningAssessmentPieceModel {
		return new LearningAssessmentPieceModel(
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
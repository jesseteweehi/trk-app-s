export class LearningAssessmentPieceModel {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string,
		public locked: Boolean,
		public xheader: string,
		public yheader: string
		){}
	static fromJsonList(array): LearningAssessmentPieceModel[] {
		return array.map( LearningAssessmentPieceModel.fromJson);
		}
	static fromJson({$key, created, title, description, locked, xheader, yheader}): LearningAssessmentPieceModel {
		return new LearningAssessmentPieceModel(
			$key,
			created,
			title,
			description,
			locked,
			xheader,
			yheader
			)
		}
	}

// Need to fix the X headers and Y headers
export class LearningAssessmentBlockModel {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string,
		public learningArea: string,
		public learningLevel: string,


		){}
	static fromJsonList(array): LearningAssessmentBlockModel[] {
		return array.map( LearningAssessmentBlockModel.fromJson);
		}
	static fromJson({$key, created, title, description, learningArea, LearningLevel}): LearningAssessmentBlockModel {
		return new LearningAssessmentBlockModel(
			$key,
			created,
			title,
			description,
			learningArea,
			LearningLevel,
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
		public archive: boolean
		){}
	static fromJsonList(array): LearningAssessmentGroupModel[] {
		return array.map( LearningAssessmentGroupModel.fromJson);
		}
	static fromJson({$key, created, title, description, learningArea, learningLevel, archive}): LearningAssessmentGroupModel {
		return new LearningAssessmentGroupModel(
			$key,
			created,
			title,
			description,
			learningArea,
			learningLevel,
			archive
			)
		}
	}

export class LearningAssessmentHeaderModel {
	constructor(
		public $key:string,
		public created: string,
		public title: string,
		public description: string,
		//Axis
		public header: string,
		public purpose: string,
		){}
	static fromJsonList(array): LearningAssessmentHeaderModel[] {
		return array.map( LearningAssessmentGroupModel.fromJson);
		}
	static fromJson({$key, created, title, description, header, purpose}): LearningAssessmentHeaderModel {
		return new LearningAssessmentHeaderModel(
			$key,
			created,
			title,
			description,
			header,
			purpose	
			)
	}

}
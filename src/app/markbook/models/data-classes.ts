export class LearningLevelModel {
	constructor(
		public $key: string,
		public create: string,
		public title: string,
		public description: string,
		public level: string,
		public qualifier: string,
		public archived: boolean,
		public locked: boolean
		){}
	static fromJsonList(array): LearningLevelModel[] {
		return array.map(LearningLevelModel.fromJson);
	}

	static fromJson({$key, created, title, description, level, qualifier, archived, locked}): LearningLevelModel{
		return new LearningLevelModel(
			$key,
			created,
			title,
			description,
			level,
			qualifier,
			archived,
			locked
			);
	}
}

export class LearningAreaModel {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string,
		public archived: string,
		public locked: string
		){}
	static  fromJsonList(array): LearningAreaModel[] {
		return array.map(LearningAreaModel.fromJson);
	}
	static fromJson({$key, created, title, description, archived, locked }): LearningAreaModel {
		return new LearningAreaModel(
			$key,
			created,
			title,
			description,
			archived,
			locked)
	}
}

export class LearningAssessmentPieceModel {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string,
		public locked: boolean,
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
		public parentKey: string,
		public learningLevel: string,
		public archived: boolean,
		public locked: boolean,
		){}
	static fromJsonList(array): LearningAssessmentBlockModel[] {
		return array.map( LearningAssessmentBlockModel.fromJson);
		}
	static fromJson({$key, created, title, description, parentKey, learningLevel, archived, locked}): LearningAssessmentBlockModel {
		return new LearningAssessmentBlockModel(
			$key,
			created,
			title,
			description,
			parentKey,
			learningLevel,
			archived,
			locked
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
		public archived: boolean,
		public locked: boolean,
		){}
	static fromJsonList(array): LearningAssessmentGroupModel[] {
		return array.map( LearningAssessmentGroupModel.fromJson);
		}
	static fromJson({$key, created, title, description, learningArea, archived, locked }): LearningAssessmentGroupModel {
		return new LearningAssessmentGroupModel(
			$key,
			created,
			title,
			description,
			learningArea,
			archived,
			locked
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
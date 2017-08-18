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
		public parent: string,
		public locked: boolean,
		public xheader: string,
		public yheader: string,
		public qualifier: string
		){}
	static fromJsonList(array): LearningAssessmentPieceModel[] {
		return array.map(LearningAssessmentPieceModel.fromJson);
		}
	static fromJson({$key, 
				     created, 
				     title, 
				     description,
				     parent,
				     locked,
				     xheader, 
				     yheader, 
				     qualifier}): LearningAssessmentPieceModel {
		return new LearningAssessmentPieceModel(
			$key, 
		    created, 
		    title, 
		    description,
		    parent,
		    locked,  
		    xheader,
		    yheader,
		    qualifier)
		}

	static fromJsonToObject(array) : object {
		let final = {};
		array.map(each => {
			const key = each.$key;
			const value = new LearningAssessmentPieceModel(
				each.$key,
				each.created,
				each.title,
				each.description,
				each.parent,
				each.locked,
				each.xheader,
				each.yheader,
				each.qualifier);
			final[key]=value
			});
		return final	
		}
	}

// Need to fix the X headers and Y headers
export class LearningAssessmentBlockModel {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string,
		public parent: string,
		public learningLevel: string,
		public archived: boolean,
		public locked: boolean,
		){}
	static fromJsonList(array): LearningAssessmentBlockModel[] {
		return array.map( LearningAssessmentBlockModel.fromJson);
		}
	static fromJson({$key, created, title, description, parent, learningLevel, archived, locked}): LearningAssessmentBlockModel {
		return new LearningAssessmentBlockModel(
			$key,
			created,
			title,
			description,
			parent,
			learningLevel,
			archived,
			locked
			)
		}
	static fromJsonToObject(array) : object {
		let final = {};
		array.map(each => {
			const key = each.$key;
			const value = new LearningAssessmentBlockModel(
				each.$key,
				each.created,
				each.title,
				each.description,
				each.parent,
				each.learningLevel,
				each.archived,
				each.locked);
			final[key]=value
			});
		return final	
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
	static fromJsonToObject(array) : object {
		let final = {};
		array.map(each => {
			const key = each.$key;
			const value = new LearningAssessmentGroupModel(
				each.$key,
				each.created,
				each.title,
				each.description,
				each.learningArea,
				each.archived,
				each.locked);
			final[key]=value
			});
		return final	
		}
}
	

export class LearningAssessmentHeaderModel {
	constructor(
		public $key:string,
		public created: string,
		public title: string,
		public description: string,
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
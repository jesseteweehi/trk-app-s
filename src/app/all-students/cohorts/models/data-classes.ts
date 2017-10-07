export class CohortModel {
	constructor(
		public $key: string,
		public create: string,
		public title: string,
		public description: string,
		public archived: boolean,
		public locked: boolean
		){}
	static fromJsonList(array): CohortModel[] {
		return array.map(CohortModel.fromJson);
	}

	static fromJson({$key, created, title, description, archived, locked}): CohortModel{
		return new CohortModel(
			$key,
			created,
			title,
			description,
			archived,
			locked
			);
	}
}
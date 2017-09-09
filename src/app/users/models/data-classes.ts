export class BaseModel {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string
		) {}
	static fromJsonList(array): BaseModel[] {
		return array.map(BaseModel.fromJson)
	}

	static fromJson({
		$key,
		created,
		title,
		description}): BaseModel {
		return new BaseModel(
			$key,
			created,
			title,
			description
			);
	}
}


export class UserModel {
	constructor(
		public $key: string,
		public created: string,
		public email: string,
		public photoUrl: string
		){}
	static fromJsonList(array): UserModel[] {
		return array.map(UserModel.fromJson)
	}
	static fromJson({
		 $key,
		 created,
		 email,
		 photoUrl}): UserModel {
		return new UserModel(
		 $key,
		 created,
		 email,
		 photoUrl
			);
	}
}

export class UserGroupModel extends BaseModel {
}
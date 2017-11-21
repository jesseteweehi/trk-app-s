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

interface Roles {
	admin?: boolean;
	teacher?: boolean;
	student?: boolean;

}

interface Profile {
	email: string,
	photoUrl: string,
}

export class UserModel {
	constructor(
		public $key: string,
		public created: string,
		public profile: Profile,
		public role: Roles,
		public approved: object

		){}
	static fromJsonList(array): UserModel[] {
		return array.map(UserModel.fromJson)
	}
	static fromJson({
		 $key,
		 created,
		 profile,
		 role,
		 approved}): UserModel {
		return new UserModel(
		 $key,
		 created,
		 profile,
		 role,
		 approved	
			);
	}
}

export class UserGroupModel extends BaseModel {
}
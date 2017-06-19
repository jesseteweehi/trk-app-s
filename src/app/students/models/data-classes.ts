export class StudentModel {
	constructor(
		public $key: string,
		public firstName: string,
		public lastName: string,
		public id: string,
        public gender: string,
        public yrlvl: string,
        public ethnicMain: string,
		){}

	static fromJsonList(array): StudentModel[] {
        return array.map( StudentModel.fromJson);
    }

    static fromJson({$key, firstName, lastName, id, gender, yrlvl, ethnicMain}): StudentModel {
        return new StudentModel(
            $key,
            firstName,
            lastName,
            id,
            gender,
            yrlvl,
            ethnicMain);
    }
}

export class StudentGroupModel {
    constructor(
        public $key: string,
        public title: string,
        public description: string,
        public id: string,
        public yrlvl: string
        ){}

    static fromJsonList(array): StudentGroupModel[] {
        return array.map( StudentGroupModel.fromJson);
    }

    static fromJson({$key, title, description, id, yrlvl}): StudentGroupModel {
        return new StudentGroupModel(
            $key,
            title,
            description,
            id,
            yrlvl);
    }
}

export class LearningExperience {
	constructor(
		public $key: string,
		public created: string,
		public title: string,
		public description: string,
		public xPosition: number,
		public yPosition: number,
		){}
}



// export class StudentModel {
// 	constructor(
// 		public $key: string,
// 		public firstName: string,
// 		public lastName: string,
// 		public id: string,
//         public gender: string,
//         public yrlvl: string,
//         public ethnicMain: string,
// 		// public imageUrl: string, 
// 		){}

// 	static fromJsonList(array): StudentModel[] {
//         return array.map( StudentModel.fromJson);
//     }

//     static fromJson({$key, firstName, lastName, id, gender, yrlvl, ethnicMain}): StudentModel {
//         return new StudentModel(
//             $key,
//             firstName,
//             lastName,
//             id,
//             gender,
//             yrlvl,
//             ethnicMain);
//     }
// }

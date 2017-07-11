import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyStudentsService } from '.././models/my-student.service'
import { StudentModel } from '../../students/models/data-classes'

@Component({
  selector: 'app-my-student-container',
  templateUrl: './my-student-container.component.html',
  styleUrls: ['./my-student-container.component.css']
})
export class MyStudentContainerComponent implements OnInit {

	dummy_data = [
		{'title':'Reading',
		 'current_description':'Stage 1 (Qualifier description)',
		 'current_date_completed': new Date("February 4, 2016 10:13:00"),
		 'goal_description':'Stage 2 (Qualifier description)',
		 'goal_date_completed': new Date("February 4, 2016 10:13:00"),
		},
		{'title':'Writing',
		 'current_description':'Stage 3 (Qualifier description)',
		 'current_date_completed': new Date("February 4, 2016 10:13:00"),
		 'goal_description':'Stage 4 (Qualifier description)',
		 'goal_date_completed': new Date("February 4, 2016 10:13:00"),
		},
		{'title':'Literacy',
		 'current_description':'Emerging (Qualifier description)',
		 'current_date_completed': new Date("February 4, 2016 10:13:00"),
		 'goal_description':'Proficient (Qualifier description)',
		 'goal_date_completed': new Date("February 4, 2016 10:13:00"),
		},
		{'title':'Another',
		 'current_description':'Emerging (Qualifier description)',
		 'current_date_completed': new Date("February 4, 2016 10:13:00"),
		 'goal_description':'Proficient (Qualifier description)',
		 'goal_date_completed': new Date("February 4, 2016 10:13:00"),
		},
	]

	studentInfo: StudentModel
	studentId : string;
	studentLearning: any;

  	constructor(private route: ActivatedRoute,
  				private ms: MyStudentsService) { }

  	ngOnInit() {
  		this.studentId = this.route.snapshot.params['studentid']
  		this.ms.findStudentForKey(this.studentId).subscribe(student => this.studentInfo = student)
  		this.ms.findStudentPiecesForKey(this.studentId).subscribe(studentLearning => this.studentLearning = studentLearning)		
  	}



}

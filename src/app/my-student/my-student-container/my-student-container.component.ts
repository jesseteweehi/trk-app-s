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

	studentInfo: StudentModel
	studentId : string;
	studentLearning: any;

  chosenGroup: any;
  chosenBlock: any;
  chosenPiece: any;

  	constructor(private route: ActivatedRoute,
  				private ms: MyStudentsService) { }

  	ngOnInit() {
  		this.studentId = this.route.snapshot.params['studentid']
  		this.ms.findStudentForKey(this.studentId).subscribe(student => this.studentInfo = student)
  		this.ms.findStudentPiecesForKey(this.studentId).subscribe(studentLearning => this.studentLearning = studentLearning)		
  	}

    handleData($event){
      this.chosenGroup = $event.group
      this.chosenBlock = $event.block
      this.chosenPiece = $event.piece
    }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-student-container',
  templateUrl: './my-student-container.component.html',
  styleUrls: ['./my-student-container.component.css']
})
export class MyStudentContainerComponent implements OnInit {

	studentId : string;
  	constructor(private route: ActivatedRoute) { }

  	ngOnInit() {
  		this.studentId = this.route.snapshot.params['studentid']
  	}

}

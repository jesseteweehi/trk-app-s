import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-my-student-group',
  templateUrl: './my-student-group.component.html',
  styleUrls: ['./my-student-group.component.css']
})
export class MyStudentGroupComponent {
	@Input() studentFirebase: any;
	@Output() sendData = new EventEmitter();

	handleData($event){
		this.sendData.emit($event)
	}
}

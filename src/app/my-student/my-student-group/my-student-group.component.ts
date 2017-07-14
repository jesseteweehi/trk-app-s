import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-my-student-group',
  templateUrl: './my-student-group.component.html',
  styleUrls: ['./my-student-group.component.css']
})
export class MyStudentGroupComponent {
	@Input() studentFirebase: any;
	@Output() sendData = new EventEmitter();


	// creates error as its changed on check due to being first a string then loading
	// child component which then changes the key. And the orders its checked thows up an error.
	key: string;
	
	handleData($event){
		this.sendData.emit($event);
	}

	handleKey($event){
		this.key = $event;
	}
}

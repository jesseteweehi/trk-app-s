import { Component, OnInit, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'app-my-student-group',
  templateUrl: './my-student-group.component.html',
  styleUrls: ['./my-student-group.component.css']
})
export class MyStudentGroupComponent {
	@Input() studentData: any;
	@Input() studentFirebase: any;

	ngOnChanges() {
		// this.studentFirebase[1].piece.subscribe(x => console.log(x))
	}

}

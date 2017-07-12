import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-student-focus',
  templateUrl: './my-student-focus.component.html',
  styleUrls: ['./my-student-focus.component.css']
})
export class MyStudentFocusComponent {
  @Input() group;
  @Input() block;
  @Input() piece;

  constructor() { }

}

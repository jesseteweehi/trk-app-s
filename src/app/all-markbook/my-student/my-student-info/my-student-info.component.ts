import { Component, OnInit, Input } from '@angular/core';
import { StudentModel } from '../../../student-shared/data-classes'


@Component({
  selector: 'app-my-student-info',
  templateUrl: './my-student-info.component.html',
  styleUrls: ['./my-student-info.component.css']
})
export class MyStudentInfoComponent implements OnInit {
  @Input() student: StudentModel;
  
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-student-group-item',
  templateUrl: './my-student-group-item.component.html',
  styleUrls: ['./my-student-group-item.component.css']
})
export class MyStudentGroupItemComponent implements OnInit {
	@Input() itemData: any;

	group: any;
	block: any;
	piece: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  	this.itemData.group.subscribe(group => this.group = group)
  	this.itemData.block.subscribe(group => this.block = group)
  	this.itemData.piece.subscribe(group => this.piece = group)
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-student-group-item',
  templateUrl: './my-student-group-item.component.html',
  styleUrls: ['./my-student-group-item.component.css']
})
export class MyStudentGroupItemComponent implements OnInit {
  @Output() sendData = new EventEmitter();
  @Output() sendKey = new EventEmitter();
	@Input() itemData: any;
  @Input() last: any;
  @Input() highlightKey: string;

	group: any;
	block: any;
	piece: any;

  constructor() { }

  ngOnInit() {
      this.itemData.group.subscribe(group => this.group = group)
      this.itemData.block.subscribe(group => this.block = group)
      this.itemData.piece.subscribe(group => {
          this.piece = group
          if (this.last){
            this.choose()
          }
      })
  }

  choose() {
    const dataToSend = {
      'group': this.group,
      'block': this.block
    };
    this.sendData.emit(dataToSend);
    this.sendKey.emit(this.piece.$key)
  }


}

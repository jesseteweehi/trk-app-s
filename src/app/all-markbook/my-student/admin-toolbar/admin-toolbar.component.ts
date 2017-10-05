import { Component, OnInit, Input } from '@angular/core';

import { UserModel } from '../../../users/models/data-classes'




@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.css']
})
export class AdminToolbarComponent implements OnInit {

  @Input() user: UserModel

  constructor() { }

  ngOnInit() {
  	
  }

}

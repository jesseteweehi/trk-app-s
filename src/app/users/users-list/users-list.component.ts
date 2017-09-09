import { Component, OnInit } from '@angular/core';
import { UsersService } from '../models/users.service'

import { UserModel } from '../models/data-classes'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: UserModel[]

  constructor(private us: UsersService) { }

  ngOnInit() {
  	this.us.findAllUsers().subscribe(results => this.users = results)
  }

  create(type:string, value:string) {
  	this.us.createEmail(type, value) 
  }

}

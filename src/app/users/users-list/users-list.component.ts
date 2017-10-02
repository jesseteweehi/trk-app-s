import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../models/users.service'
import {MdDialog, MdSnackBar} from '@angular/material';


import { UserModel } from '../models/data-classes'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: UserModel[]
  step = 0;

  constructor(private us: UsersService,
              public snackBar: MdSnackBar) { }

  ngOnInit() {
  	this.us.findAllUsers().subscribe(results => this.users = results)
  }

  change(change, key, input) {
    this.us.changeUserRole(change, key, input).subscribe(
                      () => {
                          this.snackBar.open('Role Saved','Awesome',{ duration:2000 })
                      },
                      err => { 
                          this.snackBar.open('Error Saving Role','Bugger',{ duration:2000 })
                      }
                  )
  }

  

  // create(type:string, value:string) {
  // 	this.us.createEmail(type, value) 
  // }

}

@Component({
  selector: 'users-remove-list',
  template: `
 
  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>

  <br>

   {{allStudents?.length}} Users
  <br>

  <md-list>

    <md-list-item *ngFor="let student of filtered">
    {{student.email}}
    <button class="right" md-icon-button (click)="addToStudentList(student)"><md-icon>delete</md-icon></button>
    </md-list-item>
  </md-list>

   <br>

  <md-chip-list>
    <md-chip *ngFor="let student of studentList">{{student.email}}
    <button class="right" md-icon-button (click)="removeFromStudentList(student)"><md-icon>close</md-icon></button>
    </md-chip>
  </md-chip-list>

  <br>

  <button md-button md-dialog-close color="primary" *ngIf="studentList.length > 0" (click)="sendStudentList()">Remove Users</button>


  `,
  styles: [`
    .small {
      font-size: 10px;
    }

    .right {
      margin-left: auto
    }

     md-list {
      height: 60%;
      overflow: scroll;
    }
    
    md-list-item:not(:last-child) {
        border-bottom: solid 1px lightgrey
    }

    md-list-item p {
      padding-left: 20px;
      color: lightgrey;
    }
  `]
})
export class UsersListRemoveComponent {
  studentList: UserModel[] = []
  @Output() studentsToRemove = new EventEmitter(); 
  @Input() allStudents: UserModel[];

  filtered: UserModel[];

  constructor(
      public dialog: MdDialog,
      public snackBar: MdSnackBar ) {
  }

  ngOnChanges() {
    this.filtered = this.allStudents

  }

  addToStudentList(student) {
    if (!this.studentList.includes(student)) {
      this.studentList.push(student)
    }    
  }

  removeFromStudentList(student) {
    const index = this.studentList.indexOf(student); 
    if (index > -1) {
      this.studentList.splice(index, 1);
    }  
  }

  sendStudentList() {
    this.studentsToRemove.emit(this.studentList)
  }


  search(search:string) {
    this.filtered = this.allStudents.filter(student => student.profile.email.toLowerCase().includes(search) );
    }
}



@Component({
  selector: 'users-add-list',
  template: `
 

  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>



  <md-list>
    <md-list-item *ngFor="let student of filtered">
    {{student.email}}
    <button class="right" md-icon-button (click)="addToStudentList(student)"><md-icon>add</md-icon></button>
    </md-list-item>
  </md-list>

  <br>

  <md-chip-list>
    <md-chip *ngFor="let student of studentList">{{student.email}}
    <button class="right" md-icon-button (click)="removeFromStudentList(student)"><md-icon>close</md-icon></button>
    </md-chip>
  </md-chip-list>

   <br>

  <button md-button md-dialog-close color="primary" *ngIf="studentList.length > 0" (click)="sendStudentList()">Add Users</button>



  `,
  styles: [`
    .right {
      margin-left: auto
    }

    md-list {
      height: 60%;
      overflow: scroll;
    }
    
    md-list-item:not(:last-child) {
        border-bottom: solid 1px lightgrey
    }

    md-list-item p {
      padding-left: 20px;
      color: lightgrey;
    }
  `]
})
export class UsersListAddComponent {
  studentList: UserModel[] = []
  @Output() studentsToAdd = new EventEmitter(); 
  @Input() allStudents: UserModel[];

  filtered: UserModel[];

  constructor(
      public snackBar: MdSnackBar ) {}

  ngOnChanges() {
    this.filtered = this.allStudents
  }

  addToStudentList(student) {
    if (!this.studentList.includes(student)) {
      this.studentList.push(student)
    }    
  }

  removeFromStudentList(student) {
    const index = this.studentList.indexOf(student); 
    if (index > -1) {
      this.studentList.splice(index, 1);
    }  
  }

  sendStudentList() {
    this.studentsToAdd.emit(this.studentList)
  }

  search(search:string) {
    this.filtered = this.allStudents.filter(student => student.profile.email.toLowerCase().includes(search) );
    }
}


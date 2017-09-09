import { Component, Inject, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdDialogConfig, MdSnackBar } from '@angular/material';
import { StudentModel } from './data-classes';

@Component({
  selector: 'app-student-card-list',
  template: `
 
  <md-input-container mat-typography class="full-width">
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>

  <div class="wrapper">
    <md-card *ngFor="let student of filtered">
      <md-card-title>{{student.firstName}} {{student.lastName}}</md-card-title>
      <md-card-subtitle>{{student.yrlvl}} <br> {{student.id}}</md-card-subtitle> 
    <md-card-footer>
      <a md-icon-button color="primary" routerLink="{{student.$key}}"><md-icon>info</md-icon></a>
    </md-card-footer>
    </md-card>
  </div>

  `,
  styles: [`
    .full-width {
      width: 100%;
      font-size: 25px;
      font: Roboto;
      text-align: center;
    }

    .wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr
    }
  `]
})

export class StudentListCardComponent {
  @Input() allStudents: StudentModel[];

  filtered: StudentModel[];

  constructor() {}

  ngOnChanges() {
    this.filtered = this.allStudents
  }

  search(search:string) {
    this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }
}



@Component({
  selector: 'app-student-list',
  template: `
 
  <md-input-container>
    <input class="full-width" mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>

  <md-list>
    <md-list-item *ngFor="let student of filtered">
    {{student.firstName}} {{student.lastName}} 
    </md-list-item>
  </md-list>

  `,
  styles: [`
    .full-width {
      width: 100%;
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

export class StudentListComponent {
  @Input() allStudents: StudentModel[];

  filtered: StudentModel[];

  ngOnChanges() {
    this.filtered = this.allStudents
  }

  search(search:string) {
    this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }
}

@Component({
  selector: 'app-student-add-list-new',
  template: `
 

  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>



  <md-list>
    <md-list-item *ngFor="let student of filtered">
    {{student.firstName}} {{student.lastName}} <p>{{student.yrlvl}}</p>
    <button class="right" md-icon-button (click)="addToStudentList(student)"><md-icon>add</md-icon></button>
    </md-list-item>
  </md-list>

  <br>

  <md-chip-list>
    <md-chip *ngFor="let student of studentList">{{student.firstName}} {{student.lastName}}
    <button class="right" md-icon-button (click)="removeFromStudentList(student)"><md-icon>close</md-icon></button>
    </md-chip>
  </md-chip-list>

   <br>

  <button md-button md-dialog-close color="primary" *ngIf="studentList.length > 0" (click)="sendStudentList()">Add Students</button>



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
export class StudentListAddNewComponent {
  studentList: StudentModel[] = []
  @Output() studentsToAdd = new EventEmitter(); 
  @Input() allStudents: StudentModel[];

  filtered: StudentModel[];

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
    this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }
}

@Component({
  selector: 'app-student-add-list',
  template: `
 

  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>



  <md-list>
    <md-list-item *ngFor="let student of filtered">
    {{student.firstName}} {{student.lastName}} <p>{{student.yrlvl}}</p>
    <button class="right" md-icon-button (click)="addToStudentList(student)"><md-icon>add</md-icon></button>
    </md-list-item>
  </md-list>

  <br>

  <md-chip-list>
    <md-chip *ngFor="let student of studentList">{{student.firstName}} {{student.lastName}}
    <button class="right" md-icon-button (click)="removeFromStudentList(student)"><md-icon>close</md-icon></button>
    </md-chip>
  </md-chip-list>

   <br>

  <button md-button md-dialog-close color="primary" *ngIf="studentList.length > 0" (click)="sendStudentList()">Add Students</button>



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
export class StudentListAddComponent {
  studentList: StudentModel[] = []
  @Output() studentsToAdd = new EventEmitter(); 
  @Input() allStudents: StudentModel[];

  filtered: StudentModel[];

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
    this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }
}

@Component({
  selector: 'app-student-remove-list',
  template: `
 
  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>



  <br>

   {{allStudents?.length}} Students

  <br>

  <md-list>

    <md-list-item *ngFor="let student of filtered">
    {{student.firstName}} {{student.lastName}} <p>{{student.yrlvl}}</p>
    <button class="right" md-icon-button (click)="addToStudentList(student)"><md-icon>delete</md-icon></button>
    </md-list-item>
  </md-list>

   <br>

  <md-chip-list>
    <md-chip *ngFor="let student of studentList">{{student.firstName}} {{student.lastName}}
    <button class="right" md-icon-button (click)="removeFromStudentList(student)"><md-icon>close</md-icon></button>
    </md-chip>
  </md-chip-list>

  <br>

  <button md-button md-dialog-close color="primary" *ngIf="studentList.length > 0" (click)="sendStudentList()">Remove Students</button>


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
export class StudentListRemoveComponent {
  studentList: StudentModel[] = []
  @Output() studentsToRemove = new EventEmitter(); 
  @Input() allStudents: StudentModel[];

  filtered: StudentModel[];

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
    this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }
}
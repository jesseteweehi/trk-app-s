import { Component, Inject, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdDialogConfig, MdSnackBar } from '@angular/material';
import { StudentModel } from '.././students/models/data-classes';


@Component({
  selector: 'app-student-list',
  template: `
 
  {{allStudents?.length}}


  <md-input-container>
    <input mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  </md-input-container>



  <md-list>
    <md-list-item *ngFor="let student of filtered">
    {{student.firstName}} {{student.lastName}} <p>{{student.yrlvl}}</p>
    <button class="right" md-icon-button (click)="removeStudents(student)"><md-icon>add</md-icon></button>
    </md-list-item>

  </md-list>
  `,
  styles: [`
    .right {
      margin-left: auto
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
  @Output() studentsToRemove = new EventEmitter<StudentModel[]>(); 
  @Input() allStudents: StudentModel[];

  filtered: StudentModel[];

  constructor(
      public dialog: MdDialog,
      public snackBar: MdSnackBar ) {}

  ngOnChanges() {
    this.filtered = this.allStudents
  }

  openDialogStudent() {
  let dialogRef = this.dialog.open();
  dialogRef.afterClosed().subscribe(result => {
    this.studentsToRemove.emit(result);
      });
  }

  search(search:string) {
    this.filtered = this.allStudents.filter(student => student.firstName.toLowerCase().includes(search) );
    }
}
import { combineLatest } from 'rxjs/operator/combineLatest';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter'
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';



import { TeacherService } from '../teacher.service';
import { LearningGroup, LearningArea } from './../../global/models/classes';
import { LearningGroupDialogComponent } from './../forms/learning-group-forms.component';
import { combineAll } from 'rxjs/operators/combineAll';

@Component({
  selector: 'app-learning-group-list',
  templateUrl: './learning-group-list.component.html',
  styleUrls: ['./learning-group-list.component.css']
})
export class LearningGroupListComponent implements OnInit {
  DialogRef: MatDialogRef<LearningGroupDialogComponent>;

  items: Observable<LearningGroup[]>;
  observable$: Observable<any>;


  constructor(private ts: TeacherService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
      this.items = this.ts.findList('learningGroup');
  }


  add(item?: LearningGroup) {
    this.DialogRef = this.dialog.open(LearningGroupDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
        this.messagefromPromise(this.ts.changeObject(`/learningGroup/${item.key}`, x.data.value));
        } else {
        this.messagefromPromise(this.ts.createLearningGroup(x.data.value), 'Learning Group Added');
        }
      });
  }

  delete(item: LearningGroup) {
    this.messagefromPromise(this.ts.changeObject(`/learningGroup/${item.key}`), 'Learning Group Deleted')
  }

  messagefromPromise(data: Promise<any>, success = 'Success', error = 'Bugger') {
    data
      .then(_ => this.openSnackBar(success, 'Awesome'))
      .catch(err => this.openSnackBar(`error`, 'Bugger'));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}


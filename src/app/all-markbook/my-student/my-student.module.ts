import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStudentRoutingModule}  from './my-student-routing.module';

import { MyMaterialModule } from '../../my-material/my-material.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StudentSharedModule } from '../../student-shared/student-shared.module';
import { MarkbookModule } from '../markbook/markbook.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';



import { MyStudentsService } from './models/my-student.service';

import { LearningAreaItemComponent,
		 MyStudentLearningGroupItemComponent,
		 MyStudentLearningBlockItemComponent, } from './my-student-items/my-students-items.component'


import { MyStudentContainerComponent } from './my-student-container/my-student-container.component';
import { MyStudentGroupComponent } from './my-student-group/my-student-group.component';
import { MyStudentInfoComponent } from './my-student-info/my-student-info.component';
import { MyStudentFocusComponent } from './my-student-focus/my-student-focus.component';
import { MyStudentLearningPieceComponent } from './my-student-focus/my-student-learning-piece/my-student-learning-piece.component';
import { MyStudentLearningPieceDialogComponent } from './my-student-focus/my-student-learning-piece/my-student-learning-piece-dialog.component';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';



@NgModule({
	imports: [
	CommonModule,
	MyStudentRoutingModule,
	MyMaterialModule,
	StudentSharedModule,
	MarkbookModule, 
	AngularFireDatabaseModule,
	ReactiveFormsModule	
	],

	providers: [MyStudentsService],

	declarations: [
	LearningAreaItemComponent,
	MyStudentContainerComponent,
	MyStudentGroupComponent,
	MyStudentInfoComponent,
	MyStudentFocusComponent,
	MyStudentLearningPieceComponent,
	MyStudentLearningGroupItemComponent,
	MyStudentLearningBlockItemComponent,
	MyStudentLearningPieceDialogComponent,
	AdminToolbarComponent],

	entryComponents:[MyStudentLearningPieceDialogComponent]
,
})

export class MyStudentModule {}
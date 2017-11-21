import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStudentRoutingModule}  from './my-student-routing.module';

import { MyMaterialModule } from '../../my-material/my-material.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StudentSharedModule } from '../../student-shared/student-shared.module';
import { MarkbookModule } from '../markbook/markbook.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { PostsModule } from '../../posts/posts.module'



import { MyStudentsService } from './models/my-student.service';

import { LearningAreaItemComponent,
		 MyStudentLearningGroupItemComponent,
		 MyStudentLearningBlockItemComponent, } from './my-student-items/my-students-items.component'


import { MyStudentContainerComponent } from './my-student-container/my-student-container.component';
// import { MyStudentGroupComponent } from './my-student-group/my-student-group.component';
import { MyStudentInfoComponent } from './my-student-info/my-student-info.component';
// import { MyStudentFocusComponent } from './my-student-focus/my-student-focus.component';
import { MyStudentLearningPieceComponent } from './my-student-learning-piece/my-student-learning-piece.component';
// import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';
// import { MyStudentEnrolledComponent } from './my-student-enrolled/my-student-enrolled.component';
// import { MyStudentResourcesComponent } from './my-student-resources/my-student-resources.component';
// import { MyStudentEnrolledExpPanelComponent } from './my-student-enrolled-exp-panel/my-student-enrolled-exp-panel.component';
// import { MyStudentGroupExpPanelComponent } from './my-student-group-exp-panel/my-student-group-exp-panel.component';
import { MyStudentLearningComponent } from './my-student-learning/my-student-learning.component';
import { MyStudentInputComponent } from './my-student-input/my-student-input.component';



@NgModule({
	imports: [
	CommonModule,
	MyStudentRoutingModule,
	MyMaterialModule,
	StudentSharedModule,
	MarkbookModule,
	PostsModule, 
	AngularFireDatabaseModule,
	ReactiveFormsModule	
	],

	providers: [MyStudentsService],

	declarations: [
	LearningAreaItemComponent,
	MyStudentContainerComponent,
	// MyStudentGroupComponent,
	MyStudentInfoComponent,
	// MyStudentFocusComponent,
	MyStudentLearningPieceComponent,
	MyStudentLearningGroupItemComponent,
	MyStudentLearningBlockItemComponent,
	// AdminToolbarComponent,
	// MyStudentEnrolledComponent,
	// MyStudentResourcesComponent,
	// MyStudentEnrolledExpPanelComponent,
	// MyStudentGroupExpPanelComponent,
	MyStudentLearningComponent,
	MyStudentInputComponent],

	entryComponents:[]
,
})

export class MyStudentModule {}
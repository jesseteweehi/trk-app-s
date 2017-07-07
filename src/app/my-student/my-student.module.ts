import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStudentRoutingModule}  from './my-student-routing.module';

import { MyStudentContainerComponent } from './my-student-container/my-student-container.component';
import { MyStudentGroupComponent } from './my-student-group/my-student-group.component';

@NgModule({
	imports: [
	CommonModule,
	MyStudentRoutingModule
	
	],

	declarations: [
	MyStudentContainerComponent,
	MyStudentGroupComponent]

})

export class MyStudentModule {}
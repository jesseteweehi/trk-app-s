import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStudentRoutingModule}  from './my-student-routing.module';

import { MyStudentContainerComponent } from './my-student-container/my-student-container.component';

@NgModule({
	imports: [
	CommonModule,
	MyStudentRoutingModule
	
	],

	declarations: [
	MyStudentContainerComponent]

})

export class MyStudentModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from '../my-material/my-material.module';
import { MarkbookModule } from '../markbook/markbook.module'

import { OverviewRoutingModule } from './overview-routing.module'

import { OverviewContainerComponent } from './overview-container/overview-container.component';
import { OverviewContainerVerticalComponent } from './overview-container-vertical/overview-container-vertical.component';
import { OverviewGroupsListDialogsComponent } from './overview-dialogs/overview-dialogs.component';
import { OverviewListsComponent } from './overview-lists/overview-lists.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
  	OverviewRoutingModule,
  	MarkbookModule
  ],
  declarations: [
  OverviewContainerComponent, 
  OverviewContainerVerticalComponent, 
  OverviewGroupsListDialogsComponent,
  OverviewListsComponent
  ],
  entryComponents: [
  	OverviewGroupsListDialogsComponent
  ]
})
export class OverviewModule { }

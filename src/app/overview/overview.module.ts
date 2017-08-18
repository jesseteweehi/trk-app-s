import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from '../my-material/my-material.module';

import { OverviewRoutingModule } from './overview-routing.module'

import { OverviewContainerComponent } from './overview-container/overview-container.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
  	OverviewRoutingModule
  ],
  declarations: [OverviewContainerComponent]
})
export class OverviewModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDashboardRoutingModule } from './my-dashboard-routing.module';
import { MyMaterialModule } from '../my-material/my-material.module';

import { MyDashboardContainerComponent } from './my-dashboard-container/my-dashboard-container.component';

@NgModule({
  imports: [
    CommonModule,
    MyDashboardRoutingModule
  ],
  declarations: [MyDashboardContainerComponent]
})
export class MyDashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';


import { MyMaterialModule } from '../my-material/my-material.module';
import { ProfileContainerComponent } from './profile-container/profile-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MyMaterialModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileContainerComponent]
})
export class ProfileModule { }

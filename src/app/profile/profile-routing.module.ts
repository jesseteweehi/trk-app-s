import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileContainerComponent } from './profile-container/profile-container.component'

const ProfileAppRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':profileid',
        component: ProfileContainerComponent
      }
    ]
    
  }
];


@NgModule({
  imports: [RouterModule.forChild(ProfileAppRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}


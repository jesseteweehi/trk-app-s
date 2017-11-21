import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { MyMaterialModule } from '../my-material/my-material.module'
import { PostsService } from './models/posts.service'

import { PostsListComponent } from './posts-list/posts-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
  ],
  declarations: [PostsListComponent],
  providers: [PostsService],
  exports: [PostsListComponent]
})
export class PostsModule { }

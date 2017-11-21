import { Component, OnInit, Input } from '@angular/core';

import { PostModel } from '../models/data-classes'

import { FormGroup, FormBuilder } from '@angular/forms'

import {PostsService} from '../models/posts.service'


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent {
  @Input() posts: PostModel[];
  @Input() blockId: string;


  form: FormGroup;

  constructor(private ps: PostsService, 
              public fb: FormBuilder) {

    this.form = this.fb.group({
  	  title: '',
  	  description: '',
  	  url: '' 
  	});

  }

  create(form, type) {
  	form.value.posttype = type
  	
  	console.log(form)

  }

  delete(postKey) {
  	console.log(postKey)
  }

}

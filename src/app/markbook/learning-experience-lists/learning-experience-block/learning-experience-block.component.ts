import { Component, OnInit, Input } from '@angular/core';

import { HeaderModel } from '../../models/data-classes'

@Component({
  selector: 'app-learning-block-header',
  template:
  `
  <md-card class='header' *ngFor="let x of xheaders; let i = index" [ngStyle]="xheader(i+1)">
		<md-card-subtitle>
			<button class="right" md-icon-button [mdMenuTriggerFor]="menu"><md-icon>more_horiz</md-icon></button>
		</md-card-subtitle>

		<md-card-title>{{x.title}}</md-card-title>
		<md-card-content>{{x.description}}</md-card-content>

	<md-menu #menu="mdMenu">
	  <button md-menu-item> Settings </button>
	  <button md-menu-item> Help </button>
	</md-menu>
		
	</md-card>

  `,
  styles: [
  `

  `
  ]
})
export class LearningExperienceBlockComponent implements OnInit {
  @Input() header: HeaderModel;

  constructor() { }

  ngOnInit() {
  }

}

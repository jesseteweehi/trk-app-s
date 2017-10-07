import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CohortModel } from '../models/data-classes';

@Component({
	selector: 'app-cohorts-list',
	template:
	`
	<md-input-container>
    	<input class="full-width" mdInput placeholder="Search"(keyup)="search(input.value)" #input>
  	</md-input-container>

 	<md-list>
  	 	<md-list-item *ngFor="let cohort of filtered">
    		{{cohort.title}} | {{cohort.description}}
    	<button class="right" md-icon-button md-dialog-close (click)="chooseCohort(cohort)"><md-icon>add</md-icon></button>
    	</md-list-item>
  	</md-list>
	`,
	styles:[`
	.full-width {
	  width: 100%;
	}
	
	md-list-item:not(:last-child) {
	    border-bottom: solid 1px lightgrey
	}

	md-list-item p {
	  padding-left: 20px;
	  color: lightgrey;
	}
	.right {
	  margin-left: auto
	}
	`]
})

export class CohortsList {
	@Input() allCohorts: CohortModel[];
	@Output() cohortChosen = new EventEmitter();

	filtered: CohortModel[];

	ngOnChanges() {
	  	this.filtered = this.allCohorts
	}

	chooseCohort(cohort) {
	  this.cohortChosen.emit(cohort)
	}

	search(search:string) {
	  	this.filtered = this.allCohorts.filter(cohort => cohort.title.toLowerCase().includes(search) );
	}
}

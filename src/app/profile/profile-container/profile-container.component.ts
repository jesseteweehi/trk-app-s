import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css']
})
export class ProfileContainerComponent implements OnInit {

	profileId: string;

  	constructor(
  		private route: ActivatedRoute
  		) { }

  	ngOnInit() {
  		this.profileId = this.route.snapshot.params['profile'];
  	}

}

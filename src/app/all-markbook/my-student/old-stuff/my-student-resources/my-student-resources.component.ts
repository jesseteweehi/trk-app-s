import { Component, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { LearningExperienceService} from '../../markbook/models/learning-experience.service'
import { ResourceModel } from '../../markbook/models/data-classes'
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-my-student-resources',
  templateUrl: './my-student-resources.component.html',
  styleUrls: ['./my-student-resources.component.css']
})
export class MyStudentResourcesComponent implements OnChanges {
	@Input() blockKey: string;

	form: FormGroup;
	resources: ResourceModel[];

	public openString : string = ''

	constructor(private ls:LearningExperienceService,
				public snackBar: MdSnackBar,
				public fb: FormBuilder){
		this.form = this.fb.group({
  	  		title: '',
  	  		url: '', 
  		});
	}

  	ngOnChanges() {
  		this.ls.findResourcesForBlock(this.blockKey).subscribe(result => this.resources = result)
  	}

  	remove(key:string) {
  		this.ls.removeResourceForBlock(this.blockKey, key).subscribe(
                           () => {
                                   this.snackBar.open('Resource Removed','Awesome',{ duration:2000 })
                               },
                               err => { 
                                   this.snackBar.open('Error removing resource ${err}','Bugger',{ duration:2000 })
                               }
                           );
  	}

  	open(){
      this.openString = this.blockKey;    
    }

    close(){
      this.openString = '';     
    }

    create(form){
    	this.ls.createResourceForBlock(this.blockKey, form.value).subscribe(
                           () => {
                                   this.snackBar.open('Resource Added','Awesome',{ duration:2000 })
                               },
                               err => { 
                                   this.snackBar.open('Error Adding resource ${err}','Bugger',{ duration:2000 })
                               }
                           );
    	this.form.reset()
    }


}

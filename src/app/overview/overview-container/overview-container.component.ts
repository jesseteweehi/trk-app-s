import { Component, OnInit } from '@angular/core';
import { OverviewGroupsListDialogsComponent } from '../overview-dialogs/overview-dialogs.component'
import { MdDialog } from '@angular/material';


@Component({
  selector: 'app-overview-container',
  templateUrl: './overview-container.component.html',
  styleUrls: ['./overview-container.component.css']
})
export class OverviewContainerComponent implements OnInit {

  constructor(private dialog: MdDialog) { }

  ngOnInit() {

  }

  openGroups() {
    let dialogRef = this.dialog.open(OverviewGroupsListDialogsComponent, {
      position: {
          top: '0',
        },
        height: '90%',
        width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
         if (result)  
         {console.log(result)}                
              });
  }

}

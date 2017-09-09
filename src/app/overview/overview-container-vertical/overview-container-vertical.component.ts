import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LearningExperienceService } from '../../markbook/models/learning-experience.service'
import { LearningAssessmentPieceModel,
		 LearningAssessmentBlockModel,
		 LearningAssessmentGroupModel } from '../../markbook/models/data-classes'


@Component({
  selector: 'app-overview-container-vertical',
  templateUrl: './overview-container-vertical.component.html',
  styleUrls: ['./overview-container-vertical.component.css']
})
export class OverviewContainerVerticalComponent implements OnInit {
	pieces: LearningAssessmentPieceModel[];
	blocks: LearningAssessmentGroupModel[];
  group: LearningAssessmentGroupModel;
	object: Object = {};
  groupId: string;

  constructor(
    private ls: LearningExperienceService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Need to sort our Archived as Well
    // Order by Learning Level or Strand etc (Whatever is used to categorise here later on)
    this.groupId = this.route.snapshot.params['groupid'];
    this.ls.findGroupForKey(this.groupId).subscribe(group => this.group = group)
  	this.ls.findBlocksForGroup(this.groupId).subscribe(blocks => {
  			this.blocks = blocks;
        blocks.forEach(block => {
          this.object[block.$key] = [];
        })
        this.ls.findLPiecesForLG(this.groupId).subscribe(pieces => {
            this.pieces = pieces
            pieces.map(piece => {
                this.object[piece.parent].push(piece)
              })
          })  			
  		})
  	}

    c(i){
      console.log(i)
      let styles = {

      }
      return styles
    }

    column1(i){
      let styles= {
         'grid-template-columns': '1fr 1fr 1fr',
         'grid-auto-rows': '20px'
      }
      return styles
    }

    column2(i){
      // think the problem is thats the objects isn't loaded yet before it comes through.
      let num: number = i
      let end: number = 0
      while(num){
        let blockKey: string = this.blocks[i].$key;
        let rowLength: number = 0
        if (rowLength === 0) {
          rowLength = 1;
        } else {
          let rowLength: number = this.object[blockKey].length;
        }
        end = end + (rowLength + 1)
        console.log(end)
        num--;        
      }
      let blockKey: string = this.blocks[i].$key;
      let rowLength: number = this.object[blockKey].length;
      if (rowLength === 0) {
        rowLength = 1;
      }
      console.log('rowLength End',end)
      console.log('rowLength start',rowLength)
      const start: number = end - rowLength
      console.log('numbers', start, end)
      let styles= {
        'grid-row': start +'/'+ end, 
        'grid-column': '1/2' 
        }
        return styles
    }

    // column2(i){
    // Issue is if length of piece array = 0 still need to create block
    // also if array is small like 1 need to marry the start and end properly so they line up.   
    //   if (i > 1) {       
    //     let num: number = i 
    //     let end: number = 0
    //     while(num > 0) {     
    //     let blockkey: string = this.blocks[i-1].$key;
    //     let rowLength: number = this.object[blockkey].length;
    //     if( rowLength === 0) { rowLength = 1};
    //     console.log(rowLength)      
    //     end = end + rowLength
    //     num--;
    //     }
    //     const start: number = end - this.object[this.blocks[i-2].$key].length
    //     let styles= {
    //     'grid-row': start +'/'+ end, 
    //     'grid-column': '1/2' 
    //     }
    //     return styles 
    //   }
    //   else {
    //     const start: number = 1
    //     const end: number =  this.object[this.blocks[i].$key].length
    //     let styles= {
    //     'grid-row': start +'/'+ end, 
    //     'grid-column': '1/2'  
    //     }
    //     return styles 
    //   };    
    // }


    // so if i = 0 we at the start therefore row start will be 1 and the end 
    // will be object[block.$key].length (+1)
    // Then the start will be for if index is 3. 
    // Must get object[block[index]].length from index 2,1 and 0 and row will start on the sum of these lengths.
    //  object[block[index]].length
  

    // column3(start,end){
    //   let styles= {
    //     'grid-row': start +'/' + end,    
    //   }
    //   return styles
    // }


}

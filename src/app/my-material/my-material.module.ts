import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';
import 'hammerjs';


import {MdMenuModule, 
		MdButtonModule, 
		MdToolbarModule, 
		MdAutocompleteModule, 
		MdInputModule,
    MdDialogModule,
		MdCardModule,
    MdSnackBarModule,
    MdTooltipModule,
    MdIconModule,
    MdListModule,
    MdSelectModule,
    MdSidenavModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdMenuModule,
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdAutocompleteModule,
    MdDialogModule,
    MdCardModule,
    MdSnackBarModule,
    MdTooltipModule,
    MdIconModule,
    MdListModule,
    MdSelectModule,
    MdSidenavModule
 
  ],
  exports: [
    MdMenuModule,
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdAutocompleteModule,
    MdDialogModule,
    MdCardModule,
    MdSnackBarModule,
    MdTooltipModule,
    MdIconModule,
    MdListModule,
    MdSelectModule,
    MdSidenavModule
 
  ],
  declarations: []
})
export class MyMaterialModule { }



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import {CdkTableModule} from '@angular/cdk';


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
    MdSidenavModule,
    MdChipsModule,
    MdTabsModule,
    MdTableModule
    } from '@angular/material';

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
    MdSidenavModule,
    MdChipsModule,
    MdTabsModule,
    CdkTableModule,
    MdTableModule
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
    MdSidenavModule,
    MdChipsModule,
    MdTabsModule,
    CdkTableModule,
    MdTableModule
  ],
  declarations: []
})
export class MyMaterialModule { }



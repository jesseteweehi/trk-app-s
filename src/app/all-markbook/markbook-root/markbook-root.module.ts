import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkbookRootRoutingModule} from  './markbook-root-router.module'
import { MyMaterialModule } from '../../my-material/my-material.module'

import { MenuComponent } from './menu.component'


@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    MarkbookRootRoutingModule,
  ],
  declarations: [MenuComponent]
})
export class MarkbookRootModule { }

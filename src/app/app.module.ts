import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


//Routes
import { AppRoutingModule }   from './app-routing.module';

//Firebase and Angularfire2 Modules
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

// Modules
import { MyMaterialModule } from './my-material/my-material.module'
import { SharedSecurityModule } from './shared-security/shared-security.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MenuComponent } from './menu/menu.component'


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    SharedSecurityModule 
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

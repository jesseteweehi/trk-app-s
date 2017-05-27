import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';

//Firebase and Angularfire2 Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

//Material Modules
import { MyMaterialModule } from './my-material/my-material.module'

//components
import { StudentSearchComponent } from './student-search/student-search.component';
import { HeaderComponent } from './header/header.component';

//Feature Modules
import { MarkbookModule } from './markbook/markbook.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    MarkbookModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

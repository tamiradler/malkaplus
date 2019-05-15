import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { DemoMaterialModule } from './material-module';
import { DishComponent } from './menu/dish/dish.component';
import { ErrorMessageHolderComponent } from './error-message-holder/error-message-holder.component';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiModule } from 'src/swaggergenerate/api.module';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    CommentComponent,
    SignInComponent,
    DishComponent,
    ErrorMessageHolderComponent,
    LoadSpinnerComponent,
    MenuComponent,
    NavbarComponent,
    HomeComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DemoMaterialModule,
    ApiModule.forRoot({rootUrl: environment.serverUrl})
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { DishItemComponent } from './menu/dish/dish-item/dish-item.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { AddDishComponent } from './add-menu/add-dish/add-dish.component';
import { AddDishItemComponent } from './add-menu/add-dish/add-dish-item/add-dish-item.component';
import { AddDishesComponent } from './add-dishes/add-dishes.component';
import { FilterPipe } from './add-dishes/filter.pipe';
import { ShowMenuComponent } from './show-menu/show-menu.component';
import { CookieService } from 'ngx-cookie-service';

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
    DatePickerComponent,
    DishItemComponent,
    AddMenuComponent,
    AddDishComponent,
    AddDishItemComponent,
    AddDishesComponent,
    FilterPipe,
    ShowMenuComponent
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
    CookieService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { HousingService } from './services/housing.service';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegisterComponent } from './User/user-register/user-register.component';
import { AuthService } from './services/auth.service';
import { AlertifyService } from './services/alertify.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PropertyDetailComponent } from './property/detail-property/detail-property.component';
import { GalleryModule } from 'ng-gallery';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { HttpErrorInterceptorService } from './services/httperror-interceptor.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    SortPipe,
    FilterPipe,
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
      NavBarComponent,
      PropertyDetailComponent,
      AddPropertyComponent,
      UserLoginComponent,
      UserRegisterComponent,

   ],
  imports: [
    GalleryModule ,
    BsDatepickerModule.forRoot() ,
    ButtonsModule.forRoot(),
    TabsModule,
    BrowserAnimationsModule,
    BsDropdownModule,
    BrowserModule ,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [ {
    provide : HTTP_INTERCEPTORS ,
    useClass : HttpErrorInterceptorService,
    multi : true
  },
    DatePipe,
     HousingService  , AuthService , AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgModule, inject } from '@angular/core';
import { PropertyListComponent } from './property/property-list/property-list.component';
import {  RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegisterComponent } from './User/user-register/user-register.component';
import { PropertyDetailComponent } from './property/detail-property/detail-property.component';
import { PropertyDetailResolverService } from './property/property-detail-resolver.service';


const routes: Routes = [
  //{path : 'rent-property' , component :  },
  {path : 'rent-property' , component : PropertyListComponent },
  {path : 'detail-property/:id' ,
   component : PropertyDetailComponent , resolve : {pdr : PropertyDetailResolverService}
   } ,
  {path : 'add-property' , component : AddPropertyComponent },
  {path : 'user/login' , component : UserLoginComponent },
  {path : 'user/register' , component : UserRegisterComponent },
  {path : '' , component : PropertyListComponent },
  {path : '**' , component : PropertyListComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]

})




export class AppRoutingModule {


 }

import { NgModule } from '@angular/core';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PropertyCardComponent } from './property/property-card/property-card.component';

const routes: Routes = [

  {path : '' , redirectTo :'House' , pathMatch : 'full'},
  {path : 'House' , component : PropertyCardComponent } ,
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

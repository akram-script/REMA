/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,  of, tap , map, Observable } from 'rxjs';
import { IProperty } from '../Model/iproperty';
import { property } from '../Model/property';

@Injectable({
  providedIn : 'root'
})
export class HousingService {


  constructor(private http : HttpClient) { }

  addProperty(property: property) {
   localStorage.setItem('newProp',JSON.stringify(property)) ;
  }


  GetHouses(sellRent : number) : Observable<IProperty[] | undefined> {
    return this.http.get('data/properties.json').pipe(
      map( data => {
            const propertiesArray : Array<IProperty> = [] ;
            console.log(sellRent) ;
            for (const id in data) {
              if(data.hasOwnProperty(id) && data[id as keyof object]['SellRent'] === sellRent){
                propertiesArray.push(data[id as keyof object]);
              }
            }
            return propertiesArray ;
      }) ,
      tap((Response) => this.log(Response)) ,
      catchError((error)=> this.handleError(error , undefined))
    ) ;
  }
  private log(response : any){
    console.table(response);
   }
   private handleError(error : Error , errorValue :any){
    console.error(error) ;
    return of(errorValue) ;
   }
}

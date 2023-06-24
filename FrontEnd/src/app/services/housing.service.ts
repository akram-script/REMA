/* eslint-disable @typescript-eslint/no-unused-vars */
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


  getProperty(propertyId: number) :Observable<property>{
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<IProperty> = [];
        const localProps = JSON.parse(localStorage.getItem('newProp'));
        if (localProps) {
          console.log(localProps);
          this.pushToAllProps(localProps, propertiesArray);
        }
        this.pushToAllProps(data, propertiesArray);
        const property = propertiesArray.find(property => property.ID === propertyId);
        return property;
      }),
      tap(response => this.log(response)),
      catchError(error => this.handleError(error, undefined))
    );
  }


  addProperty(property: property) {
    let newProp = [property];

    const storedProp = localStorage.getItem('newProp');
    if (storedProp) {
      try {
        const parsedProp = JSON.parse(storedProp);
        if (Array.isArray(parsedProp)) {
          newProp = [property, ...parsedProp];
        } else {
          newProp = [property, parsedProp];
        }
      } catch (error) {
        console.error('Error parsing storedProp:', error);
      }
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }


  GetHouses(sellRent? : number) : Observable<IProperty[] | undefined> {
    return this.http.get('data/properties.json').pipe(
      map( data => {
            const propertiesArray : Array<IProperty> = [] ;
            const localProps = JSON.parse(localStorage.getItem('newProp'));
            if(localProps) {
              console.log(localProps);
              this.pushToProps(localProps, sellRent, propertiesArray);
            }
            this.pushToProps(data, sellRent, propertiesArray);
            return propertiesArray ;
      }) ,
      tap((Response) => this.log(Response)) ,
      catchError((error)=> this.handleError(error , undefined))
    ) ;
  }
  private pushToProps(localProps: any, sellRent: number, propertiesArray: IProperty[]) {
    for (const id in localProps) {
      if (localProps.hasOwnProperty(id) && localProps[id as keyof object]['SellRent'] === sellRent) {
        propertiesArray.push(localProps[id as keyof object]);
      }
    }
  }
  private pushToAllProps(localProps: any, propertiesArray: IProperty[]) {
    for (const id in localProps) {
      if (localProps.hasOwnProperty(id) && localProps[id as keyof object]) {
        propertiesArray.push(localProps[id as keyof object]);
      }
    }
  }

  newPropId() : number{
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID',String(+localStorage.getItem('PID')+1));
      return +localStorage.getItem('PID') ;
    }else{
      localStorage.setItem('PID','101');
      return 101 ;
    }

  }

  private log(response : any){
    console.table(response);
   }
   private handleError(error : Error , errorValue :any){
    console.error(error) ;
    return of(errorValue) ;
   }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,  of, tap , map, Observable } from 'rxjs';
import { IProperty } from '../Model/iproperty';
import { property } from '../Model/property';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn : 'root'
})
export class HousingService {

  constructor(private router : Router,private http : HttpClient) { }

  apiUrl = environment.apiUrl ;

getAllCities() :Observable<string[]>{
  console.log(this.apiUrl);
  return this.http.get<string[]>(this.apiUrl+'/City/Cities');
}

  getProperty(propertyId: number) :Observable<property>{
    return this.http.get<property>(this.apiUrl + '/property/detail/'+propertyId.toString());
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


  GetHouses(sellRent? : number) : Observable<property[] | undefined> {
    return this.http.get<property[]>(this.apiUrl + '/property/list/'+sellRent.toString());
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
    this.router.navigate(['/']);
    return of(errorValue) ;
   }

   getPropertyAge(dateofEstablishment: Date): string
    {
        const today = new Date();
        const estDate = new Date(dateofEstablishment);
        let age = today.getFullYear() - estDate.getFullYear();
        const m = today.getMonth() - estDate.getMonth();

        // Current month smaller than establishment month or
        // Same month but current date smaller than establishment date
        if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
            age --;
        }

        // Establshment date is future date
        if(today < estDate) {
            return '0';
        }

        // Age is less than a year
        if(age === 0) {
            return 'Less than a year';
        }

        return age.toString();
    }
}

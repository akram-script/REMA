/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IProperty } from 'src/app/Model/iproperty';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  Properties : Array<IProperty> | undefined = [] ;
  sellRent : number = 1 ;
  /**
   *
   */
  constructor(private route : ActivatedRoute,private service : HousingService) {}

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
        this.sellRent = 2
    }

    this.service.GetHouses(this.sellRent).subscribe(properties => {
      this.Properties = properties ;
      const newproperty  = JSON.parse(localStorage.getItem('newProp')) ;
      if(newproperty.SellRent == this.sellRent){
        this.Properties = [newproperty , ...this.Properties]
      }

      }) ;
  }
}
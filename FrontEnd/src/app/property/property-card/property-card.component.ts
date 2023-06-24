/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/Model/ipropertybase';


@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
  @Input()
  property : IPropertyBase   ;
  @Input()
  hideIcons : boolean ;

  ngOnInit(): void {
  }

}

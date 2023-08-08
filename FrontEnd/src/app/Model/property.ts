import { Photo } from "./Photo";
import { IPropertyBase } from "./ipropertybase";

export class property implements IPropertyBase{
  id: number;
  sellRent: number;
  name: string;
  propertyTypeId : number ;
  propertyType: string;
  bhk: number;
  furnishingTypeId : number;
  furnishingType: string;
  price: number;
  builtArea: number;
  carpetArea?: number;
  address: string;
  address2?: string;
  cityId : number;
  city: string;
  floorNo?: number;
  totalFloor?: string;
  readyToMove: boolean;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: string;
  estPossessionOn?: Date;
  image?: string;
  description?: string;
  totalFloors? : number ;
  photos?: Photo[];
}

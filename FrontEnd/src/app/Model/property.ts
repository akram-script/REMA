import { IPropertyBase } from "./ipropertybase";

export class property implements IPropertyBase{
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  bhk: number;
  furnishingType: string;
  price: number;
  builtArea: number;
  carpetArea?: number;
  address: string;
  address2?: string;
  city: string;
  floorNo?: string;
  totalFloor?: string;
  readyToMove: number;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: number;
  estPossessionOn?: Date;
  image?: string;
  description?: string;
  totalFloors? : string
}

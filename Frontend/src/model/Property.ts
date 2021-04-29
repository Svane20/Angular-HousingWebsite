import { IProperty } from './IProperty';

export class Property implements IProperty {
  Id: number;
  SellRent: number;
  Address: string;
  PType: string;
  FType: string;
  MonthlyRent: number;
  Aconto: number;
  SecurityDeposit: number;
  BuiltArea: number;
  FloorLevel?: string;
  PostalCode: number;
  City: string;
  Description?: string;
  ReadyToMove?: number;
  NumberOfRooms: number;
  Posession: string;
  PosessionOn?: string;
  AgeOfProperty: string;
  Image?: string;
  PostedOn: string;
}

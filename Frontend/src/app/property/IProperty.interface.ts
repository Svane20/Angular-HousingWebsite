export interface IProperty {
  Id: number;
  SellRent: number;
  Address: string;
  Address2: string;
  FloorLevel: string;
  PostalCode: number;
  NumberOfRooms: number;
  TypeOfRooms: Array<string>;
  PType: string;
  fType: number;
  MonthlyRent: number;
  Aconto: number;
  SecurityDeposit: number;
  BuiltArea: number;
  Posession: string;
  PostedOn: Date;
  Description: string;
  AgeOfProperty: number;
  Facilities: Array<string>;
  Image?: string;
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  Property: any = {
    Id: 1,
    Name: 'Jagtvej',
    nRooms: '2 Rooms',
    Type: 'Apartment',
    Size: '68 m2',
    ZipCode: '5000 Odense C',
    Price: '6700 kr',
  };
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  //
  propertyTypes: Array<string> = ['House', 'Apartment', 'Room'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  typeOfRooms: any = {
    bathroom: true,
    kitchen: true,
    bedroom: false,
    livingRoom: false,
  };

  facilities: any = {
    elevator: false,
    animalsAllowed: false,
    studentResident: false,
    balcony: false,
    parkingSpot: false,
  };

  propertyView: IProperty = {
    Id: null,
    SellRent: null,
    Address: '',
    Address2: '',
    FloorLevel: '',
    PostalCode: null,
    NumberOfRooms: null,
    TypeOfRooms: ['', '', '', ''],
    MonthlyRent: null,
    PType: '',
    fType: null,
    Aconto: null,
    SecurityDeposit: null,
    BuiltArea: null,
    Posession: '',
    PostedOn: null,
    Description: '',
    AgeOfProperty: null,
    Facilities: [''],
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log('Congrats, form Submitted');
    console.log(this.addPropertyForm);
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }
}

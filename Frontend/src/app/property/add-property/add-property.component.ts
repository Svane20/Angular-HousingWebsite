import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from 'src/model/IProperty';
import { Property } from 'src/model/Property';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;
  addPropertyForm: FormGroup;
  nextClicked: boolean;
  property = new Property();

  propertyTypes: Array<string> = ['House', 'Apartment'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  cityList: any[];

  propertyView: IProperty = {
    Id: null,
    SellRent: null,
    Address: '',
    Price: null,
    Aconto: null,
    SecurityDeposit: null,
    PType: '',
    FType: null,
    BuiltArea: null,
    Description: null,
    FloorLevel: null,
    PostalCode: null,
    City: '',
    ReadyToMove: null,
    NumberOfRooms: null,
    PosessionOn: null,
    AgeOfProperty: null,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private housingService: HousingService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.CreateAddPropertyForm();
    this.housingService.getAllCities().subscribe((data) => {
      this.cityList = data;
    });
  }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        NumberOfRooms: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        Aconto: [null, Validators.required],
        SecurityDeposit: [null, Validators.required],
      }),
      AddressInfo: this.fb.group({
        Address: [null, Validators.required],
        FloorLevel: [null],
        PostalCode: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        City: [null, Validators.required],
      }),
      OtherInfo: this.fb.group({
        ReadyToMove: [null, Validators.required],
        PosessionOn: [null],
        AgeOfProperty: [null],
        Description: [null],
      }),
    });
  }

  //Getter Methods for tabs
  get BasicInfo() {
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
  }

  //Getter Methods for contain of tabs

  get SellRent() {
    return this.BasicInfo.controls.SellRent as FormControl;
  }

  get NumberOfRooms() {
    return this.BasicInfo.controls.NumberOfRooms as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls.PType as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls.FType as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls.Price as FormControl;
  }

  get Aconto() {
    return this.PriceInfo.controls.Aconto as FormControl;
  }

  get SecurityDeposit() {
    return this.PriceInfo.controls.SecurityDeposit as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls.Address as FormControl;
  }

  get FloorLevel() {
    return this.AddressInfo.controls.FloorLevel as FormControl;
  }

  get PostalCode() {
    return this.AddressInfo.controls.PostalCode as FormControl;
  }

  get BuiltArea() {
    return this.AddressInfo.controls.BuiltArea as FormControl;
  }

  get City() {
    return this.AddressInfo.controls.City as FormControl;
  }

  get ReadyToMove() {
    return this.OtherInfo.controls.ReadyToMove as FormControl;
  }

  get PosessionOn() {
    return this.OtherInfo.controls.PosessionOn as FormControl;
  }

  get AgeOfProperty() {
    return this.OtherInfo.controls.AgeOfProperty as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls.Description as FormControl;
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Congrats, your property have been listed');

      if (this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.alertify.error(
        'Please review the form and provide all valid entries'
      );
    }
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropertyId();
    this.property.SellRent = +this.SellRent.value;
    this.property.NumberOfRooms = this.NumberOfRooms.value;
    this.property.PType = this.PType.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Aconto = this.Aconto.value;
    this.property.SecurityDeposit = this.SecurityDeposit.value;
    this.property.Address = this.Address.value;
    this.property.FloorLevel = this.FloorLevel.value;
    this.property.PostalCode = this.PostalCode.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.City = this.City.value;
    this.property.ReadyToMove = this.ReadyToMove.value;
    this.property.Posession = this.PosessionOn.value;
    this.property.AgeOfProperty = this.AgeOfProperty.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[NextTabId].active = true;
    }
  }
}

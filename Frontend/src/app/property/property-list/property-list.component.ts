import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from 'src/model/IProperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: Array<IProperty> = [];
  City = '';
  SearchCity = '';
  SortByParam = '';
  SortDirection = 'asc';

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; //Means we are on rent-property
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      (data) => {
        this.properties = data;
      },
      (error) => {
        this.alertify.error("Can't be accessed, please try again later");
      }
    );
  }

  onCityFilter() {
    this.SearchCity = this.City;
  }

  onCityFilterClear() {
    this.SearchCity = '';
    this.City = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
